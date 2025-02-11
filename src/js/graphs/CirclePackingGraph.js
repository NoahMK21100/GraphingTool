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
        this.focus = null;
        this.view = [this.width / 2, this.height / 2, this.width];

        // Font size scale for different depths
        this.fontScale = d3.scaleOrdinal()
            .domain([1, 3])
            .range([24, 16]);

        this.createCirclePacking();
    }

    setCircleColor(d) {
        if (!d.depth) return 'transparent';
        if (!d.children) return 'transparent';

        let obj = d;
        while (obj.depth > 1) {
            obj = obj.parent;
        }

        // Use the node colors from settings
        const level = `level${d.depth}`;
        const color = this.settings.colors?.[level];

        if (!color) return '#818cf8'; // Default fallback color

        // Convert to HSL for lightness adjustment if needed
        const baseColor = d3.hsl(color);
        baseColor.l += d.depth === 1 ? 0 : d.depth * 0.1;
        baseColor.opacity = this.settings.opacity?.nodes || 0.85; // Apply opacity from settings
        return baseColor;
    }

    updateStyles() {
        // Update circle styles based on settings
        this.node
            .attr('fill', d => this.setCircleColor(d))
            .attr('stroke', d => this.settings.display?.showOutlines ? this.setCircleColor(d) : 'none')
            .attr('stroke-width', this.settings.display?.showOutlines ? 1 : 0);
    }

    zoomTo(v) {
        const k = this.width / v[2];
        this.view = v;

        this.label
            .attr('transform', d =>
                `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
            )
            .style('display', d => {
                // Show labels for all nodes that are:
                // 1. Parent nodes (depth === 1)
                // 2. Children of the currently focused node
                // 3. Large enough to be readable
                const isParent = d.depth === 1;
                const isChild = d.parent && d.parent === this.focus;
                const threshold = 20;
                return (isParent || isChild) && d.r * k > threshold ? 'inline' : 'none';
            })
            .style('font-size', d => {
                const size = Math.min(d.r * k / 5, this.fontScale(d.depth));
                return `${Math.max(8, size)}px`;
            });

        this.node.attr('transform', d =>
            `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );

        this.node.attr('r', d => d.r * k);
    }

    zoom(d) {
        const focus0 = this.focus;
        this.focus = d;

        const transition = this.svg.transition()
            .duration(750)
            .tween('zoom', () => {
                // If zooming to root, use a larger view width to scale everything down
                const targetWidth = (!d.parent) ? this.focus.r * 2.8 : this.focus.r * 2;
                const i = d3.interpolateZoom(this.view, [this.focus.x, this.focus.y, targetWidth]);
                return t => this.zoomTo(i(t));
            });

        // Remove the problematic label transitions
        this.label
            .style('fill-opacity', d => d.parent === this.focus ? 1 : 0)
            .style('display', d => d.parent === this.focus ? 'inline' : 'none');
    }

    createCirclePacking() {
        this.chartContainer.innerHTML = '';

        // Calculate dimensions with padding
        const padding = 50;
        const minDimension = Math.min(this.width, this.height);
        const effectiveSize = minDimension - (padding * 2);

        const pack = d3.pack()
            .size([effectiveSize, effectiveSize])
            .padding(3);

        const root = d3.hierarchy(this.data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        const packedData = pack(root);
        this.focus = root;

        // Create SVG with adjusted viewBox
        this.svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('viewBox', [
                -(minDimension) / 2,
                -(minDimension) / 2,
                minDimension * 1.2,
                minDimension * 1.2
            ])
            .style('display', 'block')
            .style('width', '95%')
            .style('height', '95%')
            .style('margin', 'auto')
            .style('cursor', 'pointer')
            .on('click', (event) => {
                event.stopPropagation();
                this.zoom(root);
            });

        // Store reference to this for event handlers
        const self = this;

        // Add a transform to the container group to center everything
        const container = this.svg.append('g')
            .attr('transform', `translate(${padding},${padding})`);

        this.node = container.selectAll('circle')
            .data(root.descendants().slice(1))
            .join('circle')
            .attr('fill', d => this.setCircleColor(d))
            .attr('stroke', d => this.settings.display?.showOutlines ? this.setCircleColor(d) : 'none')
            .attr('stroke-width', this.settings.display?.showOutlines ? 1 : 0)
            .attr('pointer-events', d => !d.children ? 'none' : null)
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('stroke', d.depth == 1 ? 'black' : 'white')
                    .attr('stroke-width', 2);
            })
            .on('mouseout', function (event, d) {
                d3.select(this)
                    .attr('stroke', self.settings.display?.showOutlines ? self.setCircleColor(d) : 'none')
                    .attr('stroke-width', self.settings.display?.showOutlines ? 1 : 0);
            })
            .on('click', (event, d) => {
                if (this.focus !== d) {
                    this.zoom(d);
                    event.stopPropagation();
                }
            });

        // Get the current theme
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

        this.label = this.svg.append('g')
            .style('fill', isDarkMode ? 'white' : '#1a1a1a')
            .style('text-shadow', isDarkMode ?
                '2px 2px 0px black' :
                '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .selectAll('text')
            .data(root.descendants())
            .join('text')
            .style('fill-opacity', d => d.parent === root ? 1 : 0)
            .style('display', d => d.parent === root ? 'inline' : 'none')
            .style('font-size', d => `${this.fontScale(d.depth)}px`)
            .style('font-weight', 'bold')
            .text(d => d.data.name);

        // Initial zoom with scaled down view
        this.zoomTo([root.x, root.y, root.r * 2.8]); // Even larger scale for better visibility
    }

    // Add update method to handle settings changes
    update() {
        this.updateStyles();
    }
} 