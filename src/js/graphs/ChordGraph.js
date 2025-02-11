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
        const { matrix, sortedNodes } = this.createSortedMatrix();
        const chords = this.createChordLayout(matrix);
        const svg = this.createBaseSVG();
        const { group, ribbons } = this.createChordElements(svg, chords, sortedNodes);
        this.setupInteractivity(group, ribbons, sortedNodes);
    }

    createSortedMatrix() {
        const sortedNodes = [...this.data.nodes].sort((a, b) => {
            const aIsCountry = this.isCountryNode(a.id);
            const bIsCountry = this.isCountryNode(b.id);
            if (aIsCountry && !bIsCountry) return 1;
            if (!aIsCountry && bIsCountry) return -1;
            return 0;
        });

        const nodeMap = new Map(sortedNodes.map((node, i) => [node.id, i]));
        const matrix = Array(sortedNodes.length).fill(0).map(() =>
            Array(sortedNodes.length).fill(0)
        );

        this.data.links.forEach(link => {
            const sourceIndex = nodeMap.get(link.source);
            const targetIndex = nodeMap.get(link.target);
            if (sourceIndex !== undefined && targetIndex !== undefined) {
                matrix[sourceIndex][targetIndex] = link.value || 1;
                matrix[targetIndex][sourceIndex] = link.value || 1;
            }
        });

        return { matrix, sortedNodes };
    }

    isCountryNode(nodeId) {
        return this.data.links.some(link =>
            link.target === nodeId && !this.data.links.some(l => l.source === nodeId)
        );
    }

    createChordLayout(matrix) {
        const chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);
        return chord(matrix);
    }

    createBaseSVG() {
        return d3.select(this.chartContainer)
            .append('svg')
            .attr('viewBox', [-this.width / 2, -this.height / 2, this.width, this.height])
            .attr('width', '100%')
            .attr('height', '100%');
    }

    createChordElements(svg, chords, sortedNodes) {
        const arc = d3.arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.outerRadius);

        const ribbon = d3.ribbon()
            .radius(this.innerRadius);

        const group = this.createGroups(svg, chords, arc, sortedNodes);
        const ribbons = this.createRibbons(svg, chords, ribbon);

        return { group, ribbons };
    }

    createGroups(svg, chords, arc, sortedNodes) {
        const group = svg.append('g')
            .selectAll('g')
            .data(chords.groups)
            .join('g');

        group.append('path')
            .attr('fill', d => this.getNodeColor(d))
            .attr('d', arc);

        group.append('text')
            .attr('dy', '.35em')
            .attr('transform', d => {
                const angle = (d.startAngle + d.endAngle) / 2;
                const radius = this.outerRadius + 10;
                const x = Math.cos(angle - Math.PI / 2) * radius;
                const y = Math.sin(angle - Math.PI / 2) * radius;
                let rotation = (angle * 180 / Math.PI - 90);
                if (rotation > 90) rotation -= 180;
                if (rotation < -90) rotation += 180;
                return `translate(${x},${y}) rotate(${rotation})`;
            })
            .attr('text-anchor', d => {
                const angle = (d.startAngle + d.endAngle) / 2;
                return angle > Math.PI ? 'end' : 'start';
            })
            .style('font-size', '12px')
            .text(d => sortedNodes[d.index].name);

        return group;
    }

    createRibbons(svg, chords, ribbon) {
        const ribbons = svg.append('g')
            .attr('fill-opacity', 0.67)
            .selectAll('path')
            .data(chords)
            .join('path')
            .attr('d', ribbon)
            .attr('fill', d => this.getNodeColor(d.source))
            .attr('stroke', d => d3.rgb(this.getNodeColor(d.source)).darker());

        return ribbons;
    }

    setupInteractivity(group, ribbons, sortedNodes) {
        function highlightConnected(event, d, isRibbon = false) {
            // Set everything to very low opacity first
            ribbons.attr('fill-opacity', 0.1);
            group.style('opacity', 0.1);

            if (isRibbon) {
                // When hovering over a ribbon, highlight only that specific connection
                const sourceIndex = d.source.index;
                const targetIndex = d.target.index;

                // Highlight only this specific ribbon
                d3.select(event.currentTarget).attr('fill-opacity', 0.8);

                // Highlight only the two connected groups
                group.filter(g => g.index === sourceIndex || g.index === targetIndex)
                    .style('opacity', 1)
                    .selectAll('text')
                    .style('opacity', 1);
            } else {
                // When hovering over any node (including technology), highlight all its connections
                const connectedRibbons = ribbons.filter(r =>
                    r.source.index === d.index || r.target.index === d.index
                );

                // Highlight all connected ribbons
                connectedRibbons.attr('fill-opacity', 0.8);

                // Highlight the hovered group
                group.filter(g => g.index === d.index)
                    .style('opacity', 1)
                    .selectAll('text')
                    .style('opacity', 1);

                // Highlight connected groups
                const connectedIndices = new Set(
                    connectedRibbons.data()
                        .flatMap(r => [r.source.index, r.target.index])
                );

                group.filter(g => connectedIndices.has(g.index))
                    .style('opacity', 1)
                    .selectAll('text')
                    .style('opacity', 1);
            }
        }

        function resetHighlight() {
            ribbons.attr('fill-opacity', 0.67);
            group.style('opacity', 1)
                .selectAll('text')
                .style('opacity', 1);
        }

        group
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => highlightConnected(event, d, false))
            .on('mouseout', resetHighlight);

        ribbons
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => highlightConnected(event, d, true))
            .on('mouseout', resetHighlight)
            .append('title')
            .text(d =>
                `${sortedNodes[d.source.index].name} ↔ ${sortedNodes[d.target.index].name}`
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