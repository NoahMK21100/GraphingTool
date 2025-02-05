import * as d3 from 'd3';
import { BaseGraph } from './BaseGraph';

export class SunburstGraph extends BaseGraph {
    constructor(container, data, settings) {
        super(container);

        if (!data || !data.name || !data.children) {
            throw new Error('Invalid data structure provided');
        }

        this.data = data;
        this.settings = settings || {};

        // Get dimensions from chart container
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;
        this.radius = Math.min(this.width, this.height) / 8;

        this.createSunburstDiagram();
    }

    getNodeColor(d) {
        // For root node
        if (!d.parent) return '#ffffff00';

        // Get the path from root to this node
        const path = d.ancestors().reverse();
        // The level is the index in the path (minus 1 to skip root, plus 1 to start at level1)
        const level = path.indexOf(d); // This will naturally give us 1-5 instead of 0-4
        return this.settings.colors[`level${level}`] || '#818cf8';
    }

    getNodeOpacity() {
        return this.settings.opacity?.nodes ?? 0.85;
    }

    getNodeStroke(d) {
        // Don't show outline for root node or invisible nodes
        if (!d.parent || !this.arcVisible(d.current)) return 'none';
        if (!this.settings.display?.showOutlines) return 'none';

        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '#ffffff' : '#000000';
    }

    getNodeStrokeWidth(d) {
        // Don't show outline for root node or invisible nodes
        if (!d.parent || !this.arcVisible(d.current)) return 0;
        if (!this.settings.display?.showOutlines) return 0;

        return 1.5;
    }

    getNodeStrokeOpacity(d) {
        // Don't show outline for root node or invisible nodes
        if (!d.parent || !this.arcVisible(d.current)) return 0;
        if (!this.settings.display?.showOutlines) return 0;

        return 0.8;
    }

    createSunburstDiagram() {
        this.chartContainer.innerHTML = '';

        const partition = data => {
            const root = d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);
            return d3.partition()
                .size([2 * Math.PI, root.height + 1])
                (root);
        };

        const root = partition(this.data);
        root.each(d => d.current = d);

        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(this.radius * 1.5)
            .innerRadius(d => d.y0 * this.radius)
            .outerRadius(d => Math.max(d.y0 * this.radius, d.y1 * this.radius - 1));

        const svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('viewBox', [-this.width / 2, -this.height / 2, this.width, this.height])
            .style('font', '14px sans-serif')
            .style('width', '100%')
            .style('height', '100%');

        this.svg = svg; // Store reference for updates

        const g = svg.append('g');

        const path = g
            .selectAll('path')
            .data(root.descendants().slice(1))
            .join('path')
            .attr('fill', d => this.getNodeColor(d))
            .attr('fill-opacity', d => this.arcVisible(d.current) ? this.getNodeOpacity() : 0)
            .attr('stroke', d => this.getNodeStroke(d))
            .attr('stroke-width', d => this.getNodeStrokeWidth(d))
            .attr('stroke-opacity', d => this.getNodeStrokeOpacity(d))
            .attr('d', d => arc(d.current));

        path.filter(d => d.children)
            .style('cursor', 'pointer')
            .on('click', clicked);

        const format = d3.format(',d');
        path.append('title')
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join('/')}\n${format(d.value)}`);

        const label = g
            .selectAll('text')
            .data(root.descendants().slice(1))
            .join('text')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .style('user-select', 'none')
            .attr('dy', '0.35em')
            .attr('fill-opacity', d => +this.labelVisible(d.current))
            .attr('transform', d => this.labelTransform(d.current))
            .style('font-size', '12px')
            .text(d => d.data.name);

        const parent = g
            .append('circle')
            .datum(root)
            .attr('r', this.radius)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .style('cursor', 'pointer')
            .on('click', clicked);

        const self = this;

        function clicked(event, p) {
            parent.datum(p.parent || root);

            root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });

            const t = g.transition().duration(750);

            // Immediately hide outlines of nodes that will be invisible
            path.filter(d => !self.arcVisible(d.target))
                .attr('stroke-opacity', 0)
                .attr('stroke-width', 0);

            path.transition(t)
                .tween('data', d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => {
                        d.current = i(t);
                        // Update stroke properties during the transition
                        if (!self.arcVisible(d.current)) {
                            d3.select(this)
                                .attr('stroke-opacity', 0)
                                .attr('stroke-width', 0);
                        }
                    };
                })
                .filter(function (d) {
                    return +this.getAttribute('fill-opacity') || self.arcVisible(d.target);
                })
                .attr('fill-opacity', d => self.arcVisible(d.target) ? self.getNodeOpacity() : 0)
                .attr('stroke', d => self.getNodeStroke(d))
                .attr('stroke-width', d => self.getNodeStrokeWidth(d))
                .attr('stroke-opacity', d => self.getNodeStrokeOpacity(d))
                .attrTween('d', d => () => arc(d.current));

            label.transition(t)
                .filter(function (d) {
                    return +this.getAttribute('fill-opacity') || self.labelVisible(d.target);
                })
                .attr('fill-opacity', d => +self.labelVisible(d.target))
                .attrTween('transform', d => () => self.labelTransform(d.current));
        }
    }

    arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * this.radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    handleResize() {
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;
        this.radius = Math.min(this.width, this.height) / 8;

        this.createSunburstDiagram();
    }

    update() {
        if (!this.svg) return;

        // Update paths
        this.svg.selectAll('path')
            .attr('fill', d => this.getNodeColor(d))
            .attr('fill-opacity', d => this.arcVisible(d.current) ? this.getNodeOpacity() : 0)
            .attr('stroke', d => this.getNodeStroke(d))
            .attr('stroke-width', d => this.getNodeStrokeWidth(d))
            .attr('stroke-opacity', d => this.getNodeStrokeOpacity(d));

        // Update labels
        this.svg.selectAll('text')
            .style('fill', this.currentLabelColor);
    }
} 