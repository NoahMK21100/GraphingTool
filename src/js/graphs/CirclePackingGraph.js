import * as d3 from 'd3';
import { BaseGraph } from './BaseGraph';

export class CirclePackingGraph extends BaseGraph {
    constructor(container, data, settings) {
        super(container);

        if (!data) {
            throw new Error('Invalid data structure provided');
        }

        this.data = data;
        this.settings = settings || {};
        this.width = this.chartContainer.clientWidth;
        this.height = this.chartContainer.clientHeight;
        this.padding = 20;
        this.currentFocus = null;
        this.view = [this.width / 2, this.height / 2, this.width];

        // Bind methods to preserve context
        this.getNodeColor = this.getNodeColor.bind(this);
        this.createCirclePacking();
    }

    getNodeColor(d) {
        if (!d.depth) return '#ffffff00'; // transparent root node
        if (!d.children) return 'transparent'; // make leaf nodes transparent instead of white
        const level = Math.min(d.depth - 1, 4); // cap at level 4 and adjust for 0-based index
        return this.settings.colors[`level${level + 1}`] || '#818cf8';
    }

    createCirclePacking() {
        this.chartContainer.innerHTML = '';

        // Calculate the effective dimensions
        const minDimension = Math.min(this.width, this.height);

        // Create the SVG container
        const svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, this.width, this.height])
            .style('cursor', 'pointer');

        // Create the pack layout with more padding for top level
        const pack = d3.pack()
            .size([minDimension - this.padding * 2, minDimension - this.padding * 2])
            .padding(d => d.depth === 0 ? 30 : d.depth === 1 ? 20 : 5);

        const root = d3.hierarchy(this.data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        const packedData = pack(root);
        this.currentFocus = root;

        // Center the visualization
        const g = svg.append('g')
            .attr('transform', `translate(${(this.width - minDimension) / 2 + this.padding},${(this.height - minDimension) / 2 + this.padding})`);

        // Create the circle nodes
        const node = g.selectAll('circle')
            .data(packedData.descendants())
            .join('circle')
            .attr('fill', d => this.getNodeColor(d))
            .attr('fill-opacity', d => d.depth === 0 ? 0 : 0.85)
            .attr('pointer-events', d => !d.children || d.depth === 0 ? 'none' : null)
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .attr('r', d => d.r)
            .attr('stroke', d => {
                if (d.depth === 0) return null;
                const color = d3.color(this.getNodeColor(d));
                return d.depth === 1 && color ? color.darker(0.2) : null;
            })
            .attr('stroke-width', d => d.depth === 1 ? 2 : 1)
            .attr('stroke-opacity', d => d.depth === 0 ? 0 : 0.3);

        // Store the instance reference for event handlers
        const self = this;

        // Add hover effects
        node.filter(d => d.depth !== 0)
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)
                    .attr('stroke-opacity', 0.5);
            })
            .on('mouseout', function (event, d) {
                const color = d3.color(self.getNodeColor(d));
                d3.select(this)
                    .attr('stroke', d.depth === 1 && color ? color.darker(0.2) : null)
                    .attr('stroke-width', d.depth === 1 ? 2 : 1)
                    .attr('stroke-opacity', 0.3);
            })
            .on('click', (event, d) => {
                event.stopPropagation();  // Prevent event bubbling
                this.focusOn(event, d);
            });

        // Add labels with proper positioning
        const label = g.selectAll('text')
            .data(packedData.descendants().filter(d => d.depth !== 0))
            .join('text')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .style('font-family', 'Inter, sans-serif')
            .style('font-size', d => Math.min(d.r / 3, 14) + 'px')
            .style('font-weight', 600)  // Make all labels bold
            .style('fill', d => d3.color(this.getNodeColor(d)).darker(1))
            .style('pointer-events', 'none')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'middle')
            .style('fill-opacity', d => d.parent === root ? 1 : 0)
            .style('display', d => d.parent === root ? 'inline' : 'none')
            .text(d => d.data.name);

        // Store references
        this.node = node;
        this.label = label;
        this.root = root;
        this.svg = svg;
        this.g = g;

        // Initial zoom to root
        this.zoomTo([root.x, root.y, root.r * 2]);
    }

    focusOn(event, d) {
        if (!d || !this.g || d.depth === 0) return;

        const focus = d === this.currentFocus ? d.parent || this.root : d;
        const transition = this.svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween('zoom', () => {
                const i = d3.interpolateZoom(this.view, [focus.x, focus.y, focus.r * 2]);
                return t => this.zoomTo(i(t));
            });

        this.currentFocus = focus;

        // Update label visibility with fade effect
        this.label
            .filter(function (d) {
                return d.parent === focus || this.style.display === 'inline';
            })
            .transition(transition)
            .style('fill-opacity', d => d.parent === focus ? 1 : 0)
            .on('start', function (d) {
                if (d.parent === focus) this.style.display = 'inline';
            })
            .on('end', function (d) {
                if (d.parent !== focus) this.style.display = 'none';
            });
    }

    zoomTo(v) {
        if (!this.g || !v) return;

        const k = Math.min(this.width, this.height) / v[2];
        this.view = v;

        const newX = this.width / 2 - v[0] * k;
        const newY = this.height / 2 - v[1] * k;

        this.g.attr('transform', `translate(${newX},${newY}) scale(${k})`);
        this.node.attr('r', d => d.r);
    }

    handleResize() {
        this.width = this.chartContainer.clientWidth;
        this.height = this.chartContainer.clientHeight;
        this.view = [this.width / 2, this.height / 2, this.width];
        this.createCirclePacking();
    }
} 