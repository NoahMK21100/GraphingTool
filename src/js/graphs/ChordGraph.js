import * as d3 from 'd3';
import { BaseGraph } from './BaseGraph';

export class ChordGraph extends BaseGraph {
    constructor(container, data, settings) {
        super(container);

        if (!data || !data.nodes || !data.links) {
            throw new Error('Invalid data structure provided');
        }

        this.data = data;
        this.settings = settings || {};

        // Get dimensions from chart container
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;
        this.outerRadius = Math.min(this.width, this.height) * 0.4;
        this.innerRadius = this.outerRadius - 20;

        this.createChordDiagram();
    }

    getNodeColor(d) {
        const level = d.index % 4;  // Cycle through 4 colors
        return this.settings.colors[`level${level + 1}`] || '#818cf8';
    }

    createChordDiagram() {
        this.chartContainer.innerHTML = '';

        // Create matrix from nodes and links
        const nodeMap = new Map(this.data.nodes.map((node, i) => [node.id, i]));
        const matrix = Array(this.data.nodes.length).fill(0).map(() =>
            Array(this.data.nodes.length).fill(0)
        );

        // Fill matrix with link values
        this.data.links.forEach(link => {
            const sourceIndex = nodeMap.get(link.source);
            const targetIndex = nodeMap.get(link.target);
            if (sourceIndex !== undefined && targetIndex !== undefined) {
                matrix[sourceIndex][targetIndex] = link.value || 1;
                matrix[targetIndex][sourceIndex] = link.value || 1; // Make it bidirectional
            }
        });

        // Create the chord layout
        const chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);

        const chords = chord(matrix);

        // Create SVG
        const svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('viewBox', [-this.width / 2, -this.height / 2, this.width, this.height])
            .attr('width', '100%')
            .attr('height', '100%');

        // Create the group arc generator
        const arc = d3.arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.outerRadius);

        // Create the ribbon generator
        const ribbon = d3.ribbon()
            .radius(this.innerRadius);

        // Add the outer arcs
        const group = svg.append('g')
            .selectAll('g')
            .data(chords.groups)
            .join('g');

        group.append('path')
            .attr('fill', d => this.getNodeColor(d))
            .attr('d', arc);

        // Add labels with improved positioning
        group.append('text')
            .attr('dy', '.35em')
            .attr('transform', d => {
                const angle = (d.startAngle + d.endAngle) / 2;
                const radius = this.outerRadius + 10;
                const x = Math.cos(angle - Math.PI / 2) * radius;
                const y = Math.sin(angle - Math.PI / 2) * radius;
                let rotation = (angle * 180 / Math.PI - 90);
                // Adjust rotation to prevent upside-down text
                if (rotation > 90) rotation -= 180;
                if (rotation < -90) rotation += 180;
                return `translate(${x},${y}) rotate(${rotation})`;
            })
            .attr('text-anchor', d => {
                const angle = (d.startAngle + d.endAngle) / 2;
                return angle > Math.PI ? 'end' : 'start';
            })
            .style('font-size', '12px')
            .text(d => this.data.nodes[d.index].name);

        // Add the ribbons
        const ribbons = svg.append('g')
            .attr('fill-opacity', 0.67)
            .selectAll('path')
            .data(chords)
            .join('path')
            .attr('d', ribbon)
            .attr('fill', d => this.getNodeColor(d.source))
            .attr('stroke', d => d3.rgb(this.getNodeColor(d.source)).darker());

        // Add improved interactivity
        function highlightConnected(event, d, isRibbon = false) {
            // Reset all elements to low opacity
            ribbons.attr('fill-opacity', 0.2);
            group.style('opacity', 0.2);

            if (isRibbon) {
                // Highlight only the hovered ribbon and its connected nodes
                const sourceIndex = d.source.index;
                const targetIndex = d.target.index;

                d3.select(event.currentTarget).attr('fill-opacity', 0.8);
                group.filter(g => g.index === sourceIndex || g.index === targetIndex)
                    .style('opacity', 1);
            } else {
                // Highlight only ribbons connected to the hovered group
                ribbons.filter(r => r.source.index === d.index || r.target.index === d.index)
                    .attr('fill-opacity', 0.8);
                group.filter(g => g.index === d.index)
                    .style('opacity', 1);
            }
        }

        function resetHighlight() {
            ribbons.attr('fill-opacity', 0.67);
            group.style('opacity', 1);
        }

        // Apply interactivity to groups
        group
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => highlightConnected(event, d, false))
            .on('mouseout', resetHighlight);

        // Apply interactivity to ribbons
        ribbons
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => highlightConnected(event, d, true))
            .on('mouseout', resetHighlight)
            .append('title')
            .text(d =>
                `${this.data.nodes[d.source.index].name} ↔ ${this.data.nodes[d.target.index].name}`
            );
    }

    handleResize() {
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;
        this.outerRadius = Math.min(this.width, this.height) * 0.4;
        this.innerRadius = this.outerRadius - 20;

        this.createChordDiagram();
    }
} 