import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { BaseGraph } from './BaseGraph';
import { GraphUtils } from '../utils/GraphUtils';

export class SankeyGraph extends BaseGraph {
    constructor(container, data, settings) {
        super(container);

        // Handle empty or invalid data
        if (!data || !data.nodes || !data.links || data.nodes.length === 0) {
            this.chartContainer.innerHTML = '';
            return;
        }

        this.data = {
            nodes: data.nodes.map(node => ({
                ...node,
                id: node.id || node.name,
                name: node.name || node.id
            })),
            links: data.links.map(link => ({
                ...link,
                value: link.value || 1,
                source: typeof link.source === 'object' ? link.source.id : link.source,
                target: typeof link.target === 'object' ? link.target.id : link.target
            }))
        };

        this.settings = settings || {
            sankey: {
                nodePadding: 50,
                linkOpacity: 0.5
            }
        };

        // Initialize visualization
        this.svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, this.width, this.height]);

        this.createSankeyDiagram();
    }

    getNodeColor(node) {
        const level = (node.column || 0) + 1;  // Add 1 to match level numbers 1-5
        return this.settings.colors[`level${level}`] || (level === 5 ? '#818cf8' : '#818cf8');
    }

    getNodeOpacity() {
        return this.settings.opacity?.nodes ?? 0.85;
    }

    getLinkOpacity() {
        return this.settings.opacity?.links ?? 0.6;
    }

    getNodeStroke(d) {
        if (!this.settings.display?.showOutlines) return 'none';
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '#ffffff' : '#1e293b';
    }

    getNodeStrokeWidth(d) {
        if (!this.settings.display?.showOutlines) return 0;
        return 2;
    }

    getNodeStrokeOpacity(d) {
        if (!this.settings.display?.showOutlines) return 0;
        return 0.9;
    }

    createSankeyDiagram() {
        // Clear existing content
        this.svg.selectAll('*').remove();

        // Get the actual container dimensions
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;

        // Calculate margins based on container size
        const isSidebarCollapsed = document.querySelector('.sidebar').classList.contains('collapsed');
        this.margin = {
            top: 20,
            right: 40,  // Reduced fixed margin
            bottom: 20,
            left: 40    // Reduced fixed margin
        };

        // Calculate actual diagram dimensions
        const width = this.width - this.margin.left - this.margin.right;
        const height = this.height - this.margin.top - this.margin.bottom;

        // Create main group with adjusted transform
        const g = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        try {
            // Setup sankey generator with adjusted settings
            const sankeyLayout = sankey()
                .nodeId(d => d.id)
                .nodeWidth(15)
                .nodePadding(this.settings.sankey.nodePadding)
                .extent([[0, 0], [width, height]]);

            // Process the data
            const { nodes, links } = sankeyLayout(this.data);

            // Create gradients
            const defs = this.svg.append('defs');
            links.forEach((link, i) => {
                const gradient = defs.append('linearGradient')
                    .attr('id', `link-gradient-${i}`)
                    .attr('gradientUnits', 'userSpaceOnUse')
                    .attr('x1', link.source.x1)
                    .attr('x2', link.target.x0);

                gradient.append('stop')
                    .attr('offset', '0%')
                    .attr('stop-color', this.getNodeColor(link.source));

                gradient.append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', this.getNodeColor(link.target));
            });

            // Draw links
            const link = g.append('g')
                .selectAll('path')
                .data(links)
                .join('path')
                .attr('class', 'link')
                .attr('d', sankeyLinkHorizontal())
                .attr('stroke', (d, i) => `url(#link-gradient-${i})`)
                .attr('stroke-width', d => Math.max(1, d.width))
                .attr('fill', 'none')
                .attr('opacity', this.getLinkOpacity());

            // Draw nodes
            const node = g.append('g')
                .selectAll('g')
                .data(nodes)
                .join('g')
                .attr('class', 'node')
                .attr('transform', d => `translate(${d.x0},${d.y0})`);

            // Add rectangles
            node.append('rect')
                .attr('height', d => Math.max(d.y1 - d.y0, 1))
                .attr('width', d => d.x1 - d.x0)
                .attr('fill', d => this.getNodeColor(d))
                .attr('fill-opacity', this.getNodeOpacity())
                .attr('stroke', d => this.getNodeStroke(d))
                .attr('stroke-width', d => this.getNodeStrokeWidth(d))
                .attr('stroke-opacity', d => this.getNodeStrokeOpacity(d));

            // Add labels
            node.each(function (d) {
                const g = d3.select(this);
                const padding = 20;

                // Position text based on node position
                const isLeftSide = d.x0 < width / 2;
                const x = isLeftSide ? -padding : (d.x1 - d.x0 + padding);

                // Create text element with proper positioning
                const text = g.append('text')
                    .attr('x', x)
                    .attr('y', (d.y1 - d.y0) / 2)
                    .attr('dy', '0.35em')
                    .attr('text-anchor', isLeftSide ? 'end' : 'start');

                // Simple text wrapping - split into two lines if text is too long
                const maxLength = 25; // characters before wrapping
                if (d.name.length > maxLength) {
                    const words = d.name.split(' ');
                    let firstLine = [];
                    let secondLine = [];
                    let currentLength = 0;

                    words.forEach(word => {
                        if (currentLength + word.length <= maxLength) {
                            firstLine.push(word);
                            currentLength += word.length + 1;
                        } else {
                            secondLine.push(word);
                        }
                    });

                    text.append('tspan')
                        .attr('x', x)
                        .text(firstLine.join(' '));

                    text.append('tspan')
                        .attr('x', x)
                        .attr('dy', '1.2em')
                        .text(secondLine.join(' '));
                } else {
                    text.text(d.name);
                }

                // Add background with padding
                const bbox = text.node().getBBox();
                g.insert('rect', 'text')
                    .attr('class', 'label-background')
                    .attr('x', isLeftSide ? bbox.x - 4 : x - 4)
                    .attr('y', bbox.y - 2)
                    .attr('width', bbox.width + 8)
                    .attr('height', bbox.height + 4)
                    .attr('fill', 'white')
                    .attr('opacity', 0.8);
            });

            // Setup interactions
            this.setupInteractions(node, link);

        } catch (error) {
            console.error('Error in createSankeyDiagram:', error);
            throw error;
        }

        // Update SVG dimensions and viewBox
        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, this.width, this.height])
            .attr('preserveAspectRatio', 'xMidYMid meet');
    }

    setupInteractions(node, link) {
        const highlight = (d) => {
            node.style('opacity', 0.1);
            link.style('opacity', 0.1);

            const relatedNodes = new Set([d.id]);
            const relatedLinks = new Set();

            this.data.links.forEach((l, i) => {
                if (l.source.id === d.id || l.target.id === d.id) {
                    relatedNodes.add(l.source.id);
                    relatedNodes.add(l.target.id);
                    relatedLinks.add(i);
                }
            });

            node.filter(n => relatedNodes.has(n.id))
                .style('opacity', 1);

            link.filter((l, i) => relatedLinks.has(i))
                .style('opacity', 1);
        };

        const unhighlight = () => {
            node.style('opacity', 1);
            link.style('opacity', this.settings.sankey.linkOpacity);
        };

        node
            .on('mouseover', (event, d) => highlight(d))
            .on('mouseout', unhighlight)
            .style('cursor', 'pointer');
    }

    handleResize() {
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;

        // Update SVG dimensions
        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, this.width, this.height]);

        // Recalculate margins based on container size
        const isSidebarCollapsed = document.querySelector('.sidebar').classList.contains('collapsed');
        this.margin = {
            top: 20,
            right: isSidebarCollapsed ? 40 : 80,
            bottom: 20,
            left: isSidebarCollapsed ? 60 : 120
        };

        // Recreate the diagram with new dimensions
        this.createSankeyDiagram();
    }

    update() {
        // Update node appearance
        this.svg.selectAll('.node rect')
            .attr('fill-opacity', this.getNodeOpacity())
            .attr('stroke', d => this.getNodeStroke(d))
            .attr('stroke-width', d => this.getNodeStrokeWidth(d))
            .attr('stroke-opacity', d => this.getNodeStrokeOpacity(d));

        // Update link opacity
        this.svg.selectAll('.link')
            .attr('opacity', this.getLinkOpacity());
    }

    getConnectedWithPath(d, isNode = true) {
        const connected = new Set();
        const connectedLinks = new Set();

        if (!isNode) {
            connected.add(d.source.id).add(d.target.id);
            this.data.links.forEach((link, i) => {
                if (link.source.id === d.source.id && link.target.id === d.target.id) {
                    connectedLinks.add(i);
                }
            });
            return { nodes: connected, links: connectedLinks };
        }

        // Trace both directions for complete path
        const traceFullPath = (nodeId, forward = true) => {
            this.data.links.forEach((link, i) => {
                if (forward && link.source.id === nodeId) {
                    if (!connected.has(link.target.id)) {
                        connected.add(link.source.id);
                        connected.add(link.target.id);
                        connectedLinks.add(i);
                        traceFullPath(link.target.id, true);
                    }
                } else if (!forward && link.target.id === nodeId) {
                    if (!connected.has(link.source.id)) {
                        connected.add(link.source.id);
                        connected.add(link.target.id);
                        connectedLinks.add(i);
                        traceFullPath(link.source.id, false);
                    }
                }
            });
        };

        connected.add(d.id);
        traceFullPath(d.id, true);   // Trace forward
        traceFullPath(d.id, false);  // Trace backward

        return { nodes: connected, links: connectedLinks };
    }

    // Override the resize method specifically for Sankey
    resize() {
        // Recreate the diagram with new dimensions
        this.createSankeyDiagram();
    }
}