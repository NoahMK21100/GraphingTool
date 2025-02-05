import * as d3 from 'd3';
import { GRAPH_CONSTANTS } from '../../config/constants';

export class GraphUtils {
    constructor(settings = {}) {
        this.settings = settings;
    }

    // Core utility methods
    static createSvgContainer(container, width, height) {
        return d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, width, height])
            .attr('preserveAspectRatio', 'xMidYMid meet');
    }

    static calculateDimensions(container, margin = GRAPH_CONSTANTS.DEFAULT_MARGIN) {
        const width = container.clientWidth - margin.left - margin.right;
        const height = container.clientHeight - margin.top - margin.bottom;
        return { width, height };
    }

    // Node styling
    getNodeColor(node) {
        if (!node) return this.settings.colors.level1;
        const level = (node.depth || node.column || 0) + 1;
        return this.settings.colors[`level${level}`];
    }

    static getNodeRadius(d, minRadius = GRAPH_CONSTANTS.MIN_NODE_RADIUS, maxRadius = GRAPH_CONSTANTS.MAX_NODE_RADIUS) {
        return d.value ?
            Math.max(minRadius, Math.min(maxRadius, Math.sqrt(d.value) * 2)) :
            minRadius;
    }

    // Interaction handlers
    static createDragBehavior(simulation) {
        return d3.drag()
            .on('start', (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }

    // Tooltip handling
    static createTooltip() {
        return d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
    }

    static showTooltip(tooltip, event, content) {
        tooltip
            .html(content)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .transition()
            .duration(200)
            .style('opacity', 1);
    }

    static hideTooltip(tooltip) {
        tooltip.transition()
            .duration(200)
            .style('opacity', 0);
    }
} 