import * as d3 from 'd3';
import { BaseGraph } from './BaseGraph';

export class CollapsibleTreeGraph extends BaseGraph {
    constructor(container, data, settings) {
        super(container);
        this.data = data;
        this.settings = settings || {};
        this.createTreeDiagram();
    }

    createTreeDiagram() {
        this.chartContainer.innerHTML = '';
        const containerRect = this.chartContainer.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        // Simple margins
        this.margin = { top: 40, right: 40, bottom: 40, left: 40 };

        // Create hierarchy and calculate size
        const root = d3.hierarchy(this.data);

        // Make nodes a reasonable size
        const nodeWidth = 180;
        const nodeHeight = 45;

        // Calculate spacing based on container size
        const dx = nodeHeight * 2;      // Vertical spacing between nodes
        const dy = nodeWidth * 1.2;     // Reduced horizontal spacing between levels

        // Create tree layout with fixed node sizes
        const tree = d3.tree()
            .nodeSize([dx, dy])
            .separation((a, b) => (a.parent == b.parent ? 1 : 1.2));

        // Center the root node
        root.x0 = height / 2;
        root.y0 = 0;  // Start from the left edge

        // Create SVG that fills the container
        this.svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            // Simple viewBox that matches container dimensions
            .attr('viewBox', [0, 0, width, height])
            .style('font', '16px sans-serif')
            .style('user-select', 'none');

        // Add a centered group for all content
        const g = this.svg.append('g')
            .attr('transform', `translate(${width * 0.2},${height / 2})`);

        const gLink = g.append('g')
            .attr('fill', 'none')
            .attr('stroke', '#555')
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', 1.5);

        const gNode = g.append('g')
            .attr('cursor', 'pointer')
            .attr('pointer-events', 'all');

        const update = (source) => {
            const duration = 250;
            const nodes = root.descendants().reverse();
            const links = root.links();

            // Update the tree layout
            tree(root);

            const transition = this.svg.transition()
                .duration(duration);

            // Update nodes
            const node = gNode.selectAll('g')
                .data(nodes, d => d.id);

            const nodeEnter = node.enter().append('g')
                .attr('transform', d => `translate(${source.y0},${source.x0})`)
                .attr('class', 'node')
                .on('click', (event, d) => {
                    // Toggle children visibility on click
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    update(d);
                });

            nodeEnter.append('rect')
                .attr('x', -nodeWidth / 2)
                .attr('y', -nodeHeight / 2)
                .attr('width', nodeWidth)
                .attr('height', nodeHeight)
                .attr('rx', 15)  // More rounded corners
                .attr('fill', d => this.settings.colors[`level${d.depth + 1}`] || '#999')
                // Add visual indicator if node has hidden children
                .attr('stroke-width', d => (d._children && d._children.length > 0) ? 2 : 1)
                .attr('stroke', '#666');

            nodeEnter.append('text')
                .attr('dy', '0.31em')
                .attr('x', 0)
                .attr('text-anchor', 'middle')
                .text(d => d.data.name)
                .style('fill', 'white')
                .style('font-size', '15px')  // Bigger text
                .call(wrap, nodeWidth - 30);  // More text padding

            // Update existing nodes
            node.merge(nodeEnter).transition(transition)
                .attr('transform', d => `translate(${d.y},${d.x})`);

            // Remove exiting nodes
            node.exit().transition(transition).remove()
                .attr('transform', d => `translate(${source.y},${source.x})`);

            // Update links
            const link = gLink.selectAll('path')
                .data(links, d => d.target.id);

            link.enter().append('path')
                .attr('d', d => {
                    const o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                })
                .merge(link).transition(transition)
                .attr('d', diagonal);

            link.exit().transition(transition).remove()
                .attr('d', d => {
                    const o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                });

            // Store old positions
            root.eachBefore(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        };

        // Text wrapping function
        function wrap(text, width) {
            text.each(function () {
                const node = d3.select(this);
                const words = node.text().split(/\s+/);

                if (words.length > 2) {
                    node.text(words.slice(0, 2).join(' ') + '...');
                }
            });
        }

        // Define diagonal link path
        const diagonal = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        // Initialize the display
        root.descendants().forEach((d, i) => {
            d.id = i;
        });

        // Initial update
        update(root);
    }

    handleResize() {
        // Add a small delay to ensure the container size is updated
        setTimeout(() => {
            this.createTreeDiagram();
        }, 100);
    }
} 