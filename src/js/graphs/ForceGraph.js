import * as d3 from 'd3';
import { BaseGraph } from './BaseGraph';
import { GraphUtils } from '../utils/GraphUtils';

export class ForceGraph extends BaseGraph {
    constructor(container, data, settings) {
        super(container);

        if (!data || !data.nodes || !data.links) {
            throw new Error('Invalid data structure provided');
        }

        this.data = data;
        this.settings = settings;

        // Get dimensions from chart container
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;

        this.margin = {
            top: 40,
            right: 120,
            bottom: 40,
            left: 100
        };

        // Adjust width and height for margins
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;

        if (!this.width || !this.height) {
            throw new Error('Container dimensions not properly set');
        }

        this.selectedNode = null;  // Add this line to track selected node

        this.createForceGraph();
    }

    createForceGraph() {
        const width = this.wrapper.clientWidth;
        const height = this.wrapper.clientHeight;

        // Create SVG with proper bounds
        this.svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, width, height])
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Create the force simulation
        this.simulation = d3.forceSimulation(this.data.nodes)
            .force('link', d3.forceLink(this.data.links)
                .id(d => d.id)
                .distance(100))
            .force('charge', d3.forceManyBody()
                .strength(-500))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide()
                .radius(d => this.getNodeRadius(d) + 10));

        // Draw the links
        const link = this.svg.append('g')
            .selectAll('line')
            .data(this.data.links)
            .join('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', this.getLinkOpacity())
            .attr('stroke-width', 1);

        // Draw the nodes
        const node = this.svg.append('g')
            .selectAll('g')
            .data(this.data.nodes)
            .join('g')
            .attr('class', 'node')
            .call(this.drag(this.simulation));

        // Add circles to nodes
        node.append('circle')
            .attr('r', d => this.getNodeRadius(d))
            .attr('fill', d => this.getNodeColor(d))
            .attr('fill-opacity', this.getNodeOpacity())
            .attr('stroke', d => this.getNodeStroke(d))
            .attr('stroke-width', d => this.getNodeStrokeWidth(d))
            .attr('stroke-opacity', d => this.getNodeStrokeOpacity(d));

        // Add labels
        node.append('text')
            .text(d => d.name)
            .attr('x', 0)
            .attr('y', d => this.getNodeRadius(d) + 15)
            .attr('text-anchor', 'middle')
            .attr('class', 'node-label');

        // Store references
        this.node = node;
        this.link = link;

        // Update positions on tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Setup interactions
        this.setupInteractions(node, link);
    }

    drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }

    setupInteractions(node, link) {
        const highlight = (d) => {
            const connectedNodes = new Set();
            const connectedLinks = new Set();

            this.data.links.forEach((l, i) => {
                if (l.source.id === d.id || l.target.id === d.id) {
                    connectedNodes.add(l.source.id);
                    connectedNodes.add(l.target.id);
                    connectedLinks.add(i);
                }
            });

            // Update opacity for non-connected nodes and links
            node.selectAll('circle')
                .attr('fill-opacity', n => connectedNodes.has(n.id) ? this.getNodeOpacity() : 0.1);
            link.attr('stroke-opacity', (l, i) => connectedLinks.has(i) ? this.getLinkOpacity() : 0.1);
        };

        const unhighlight = () => {
            // Reset opacity to original settings
            node.selectAll('circle')
                .attr('fill-opacity', this.getNodeOpacity());
            link.attr('stroke-opacity', this.getLinkOpacity());
        };

        node
            .on('mouseover', (event, d) => highlight(d))
            .on('mouseout', unhighlight)
            .style('cursor', 'pointer');
    }

    getNodeRadius(node) {
        // Base sizes for each column level
        const baseSize = [45, 35, 25, 20, 15, 10][node.column] || 10;

        // Get the maximum value of any single link connected to this node
        let maxWeight = 0;
        this.data.links.forEach(link => {
            if (link.source.id === node.id || link.target.id === node.id) {
                maxWeight = Math.max(maxWeight, parseFloat(link.value) || 1);
            }
        });

        // Use a smaller scale factor to prevent excessive growth
        const scaleFactor = [1.2, 1.5, 1.8, 2][node.column] || 2;

        // Scale based on maximum link value instead of total
        return baseSize + (Math.sqrt(maxWeight) / scaleFactor);
    }

    getNodeColor(node) {
        const level = node.depth || node.column || 0;
        return this.settings.colors[`level${level + 1}`] || this.settings.colors.level1;  // Default to level1 color instead of hardcoded
    }

    getNodePadding() {
        return this.settings.padding || 10;
    }

    getNodeOpacity() {
        return this.settings.opacity.nodes;
    }

    getLinkOpacity() {
        return this.settings.opacity.links;
    }

    getNodeStroke(node) {
        if (!this.settings.display?.showOutlines) return 'none';
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '#ffffff' : '#000000';
    }

    getNodeStrokeWidth(node) {
        if (!this.settings.display?.showOutlines) return 0;
        return 1.5;
    }

    getNodeStrokeOpacity(node) {
        if (!this.settings.display?.showOutlines) return 0;
        return 0.8;
    }

    drawGraph() {
        if (!this.currentData) return;

        this.context.save();
        this.context.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

        // Draw links
        this.currentData.links.forEach(link => {
            const isHighlighted = this.hoveredNode &&
                (this.hoveredNeighbors.has(link.source.id) &&
                    this.hoveredNeighbors.has(link.target.id));

            this.context.beginPath();
            this.context.moveTo(link.source.x, link.source.y);
            this.context.lineTo(link.target.x, link.target.y);
            this.context.strokeStyle = "#a78bfa";
            this.context.lineWidth = isHighlighted ? 2 : 1;
            this.context.globalAlpha = isHighlighted ? 0.8 :
                this.hoveredNode ? 0.1 : 0.3;
            this.context.stroke();
        });

        // Reset alpha
        this.context.globalAlpha = 1;

        // Draw nodes
        this.currentData.nodes.forEach(node => {
            const isHighlighted = this.hoveredNode &&
                this.hoveredNeighbors.has(node.id);

            this.context.globalAlpha = isHighlighted ? 1 :
                this.hoveredNode ? 0.3 : 1;

            const radius = this.getNodeRadius(node);

            this.context.beginPath();
            this.context.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            this.context.fillStyle = this.getNodeColor(node);
            this.context.fill();

            // Add outline
            this.context.strokeStyle = 'black';
            this.context.lineWidth = 1.4;
            this.context.stroke();

            // Draw label with background for visibility
            if (!this.hoveredNode || isHighlighted) {
                this.drawNodeLabel(node, radius);
            }
        });

        this.context.restore();
    }

    drawNodeLabel(node, radius) {
        const fontSize = node.type === 'technology' ? 14 :
            node.type === 'domain' ? 12 : 10;

        this.context.font = `500 ${fontSize}px -apple-system, system-ui, sans-serif`;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        const text = node.id;
        const textY = node.y + radius + 12;

        // Draw text background
        const metrics = this.context.measureText(text);
        const padding = 4;
        const bgWidth = metrics.width + (padding * 2);
        const bgHeight = fontSize + (padding * 2);

        this.context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.context.fillRect(
            node.x - (bgWidth / 2),
            textY - (bgHeight / 2),
            bgWidth,
            bgHeight
        );

        // Draw text
        this.context.fillStyle = '#374151';
        this.context.fillText(text, node.x, textY);
    }

    progress(p) {
        this.context.save();
        this.context.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.context.fillStyle = '#818cf8';
        this.context.fillRect(-20, -1, 40 * p, 2);
        this.context.restore();
    }

    update() {
        if (!this.node || !this.link) return;

        // Update node appearance
        this.node.selectAll('circle')
            .attr('fill-opacity', this.getNodeOpacity())
            .attr('stroke', d => this.getNodeStroke(d))
            .attr('stroke-width', d => this.getNodeStrokeWidth(d))
            .attr('stroke-opacity', d => this.getNodeStrokeOpacity(d));

        // Update link opacity
        this.link.attr('stroke-opacity', this.getLinkOpacity());

        // Restart simulation with a small alpha to trigger movement
        this.simulation.alpha(0.3).restart();
    }
}