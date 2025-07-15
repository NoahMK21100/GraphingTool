import * as d3 from 'd3';
import { GraphUtils } from '../utils/GraphUtils';
import { GRAPH_CONSTANTS } from '../../config/constants';

export class BaseGraph {
    constructor(container, settings = {}) {
        if (!container) {
            throw new Error('Container element must be provided');
        }

        this.chartContainer = container;
        this.wrapper = container.closest('.graph-wrapper');
        this.settings = settings;

        if (!this.wrapper) {
            // If no wrapper exists, create one
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'graph-wrapper';
            container.parentNode.insertBefore(this.wrapper, container);
            this.wrapper.appendChild(container);
        }

        // Set default dimensions and margins
        this.margin = { ...GRAPH_CONSTANTS.DEFAULT_MARGIN };
        const { width, height } = GraphUtils.calculateDimensions(this.wrapper, this.margin);
        this.width = width;
        this.height = height;

        // Store theme-related colors
        this.labelColors = {
            light: '#1e293b',  // Dark text for light mode
            dark: '#f1f5f9'    // Light text for dark mode
        };

        // Create title container if it doesn't exist
        let titleContainer = this.wrapper.querySelector('.title-container');
        if (!titleContainer) {
            titleContainer = document.createElement('div');
            titleContainer.className = 'title-container';

            const title = document.createElement('h1');
            title.className = 'main-title';

            const subtitle = document.createElement('p');
            subtitle.className = 'subtitle';

            titleContainer.appendChild(title);
            titleContainer.appendChild(subtitle);
            this.wrapper.insertBefore(titleContainer, this.chartContainer);
        }

        // Set up theme change observer
        this.setupThemeObserver();

        // Initial label color setup
        this.updateLabelColors();
    }

    setupThemeObserver() {
        // Create a MutationObserver to watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.updateLabelColors();
                }
            });
        });

        // Start observing the document element for theme changes
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    updateLabelColors() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        this.currentLabelColor = theme === 'dark' ? '#f1f5f9' : '#1e293b';

        if (this.wrapper) {
            const svg = this.wrapper.querySelector('svg');
            if (svg) {
                // Update node labels
                svg.querySelectorAll('.node text, .node-label, .label').forEach(label => {
                    label.style.fill = this.currentLabelColor;
                });

                // Update axis labels if they exist
                svg.querySelectorAll('.axis text, .axis-label').forEach(label => {
                    label.style.fill = this.currentLabelColor;
                });

                // Update any other text elements
                svg.querySelectorAll('text:not(.main-title):not(.subtitle)').forEach(text => {
                    if (!text.hasAttribute('data-preserve-color')) {
                        text.style.fill = this.currentLabelColor;
                    }
                });
            }
        }
    }

    // Helper method to create labels with theme-aware colors
    createLabel(text, className = '') {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.textContent = text;
        label.setAttribute('class', `${className} graph-label`);
        label.style.fill = isDarkMode ? this.labelColors.dark : this.labelColors.light;
        return label;
    }

    updateTitleColors() {
        const title = this.wrapper.querySelector('.main-title');
        const subtitle = this.wrapper.querySelector('.subtitle');
        const titleContainer = this.wrapper.querySelector('.title-container');

        if (title) title.style.color = 'var(--text-primary)';
        if (subtitle) subtitle.style.color = 'var(--text-secondary)';
        if (titleContainer) titleContainer.style.background = 'var(--bg-primary)';

        // Also update graph labels
        this.updateLabelColors();
    }

    updateTitles(companyName, techName) {
        const title = this.wrapper.querySelector('.main-title');
        const subtitle = this.wrapper.querySelector('.subtitle');

        if (title) {
            title.textContent = companyName || '';
            title.style.color = 'var(--text-primary)';
        }
        if (subtitle) {
            subtitle.textContent = techName || '';
            subtitle.style.color = 'var(--text-secondary)';
        }

        // Also update graph labels
        this.updateLabelColors();
    }

    getNodeColor(d) {
        return GraphUtils.getNodeColor(d, this.settings.colors);
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
        return theme === 'dark' ? '#ffffff' : '#000000';
    }

    getNodeStrokeWidth(d) {
        if (!this.settings.display?.showOutlines) return 0;
        return 1.5;
    }

    getNodeStrokeOpacity(d) {
        if (!this.settings.display?.showOutlines) return 0;
        return 0.8;
    }

    getNodeRadius(d) {
        return GraphUtils.getNodeRadius(d, GRAPH_CONSTANTS.MIN_NODE_RADIUS, GRAPH_CONSTANTS.MAX_NODE_RADIUS);
    }

    getNodePadding() {
        return this.settings.sankey?.nodePadding || 30;
    }

    createSvg() {
        // Clear any existing SVG
        this.chartContainer.innerHTML = '';
        return GraphUtils.createSvgContainer(this.chartContainer, this.width, this.height);
    }

    handleResize() {
        // Get new dimensions accounting for margin
        const containerRect = this.chartContainer.getBoundingClientRect();
        this.width = containerRect.width;
        this.height = containerRect.height;

        // Update SVG dimensions and viewBox
        if (this.svg) {
            this.svg
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', [0, 0, this.width, this.height])
                .attr('preserveAspectRatio', 'xMidYMid meet');

            // Center the content group if it exists
            const g = this.svg.select('g');
            if (g.node()) {
                const gBBox = g.node().getBBox();
                const scale = Math.min(
                    this.width / gBBox.width,
                    this.height / gBBox.height
                ) * 0.95;

                const translateX = (this.width - gBBox.width * scale) / 2 - gBBox.x * scale;
                const translateY = (this.height - gBBox.height * scale) / 2 - gBBox.y * scale;

                g.attr('transform', `translate(${translateX},${translateY}) scale(${scale})`);
            }
        }
    }

    setupBaseInteractions(nodes, links) {
        const tooltip = GraphUtils.createTooltip();

        nodes
            .on('mouseover', (event, d) => {
                GraphUtils.showTooltip(tooltip, event, d.name);
                this.highlightConnections(d, nodes, links);
            })
            .on('mouseout', () => {
                GraphUtils.hideTooltip(tooltip);
                this.resetHighlight(nodes, links);
            });

        links
            .on('mouseover', (event, d) => {
                GraphUtils.showTooltip(tooltip, event,
                    `${d.source.name} → ${d.target.name}`);
            })
            .on('mouseout', () => {
                GraphUtils.hideTooltip(tooltip);
            });
    }

    highlightConnections(d, nodes, links) {
        nodes.style('opacity', n =>
            GraphUtils.isConnected(d, n, this.data.links) ? 1 : 0.1);
        links.style('opacity', l =>
            (l.source === d || l.target === d) ? 1 : 0.1);
    }

    resetHighlight(nodes, links) {
        nodes.style('opacity', 1);
        links.style('opacity', 1);
    }

    update() {
        // To be implemented by child classes
        console.warn('Update method not implemented');
    }

    destroy() {
        if (this.chartContainer) {
            this.chartContainer.innerHTML = '';
        }
    }

    resize() {
        // Get new container dimensions
        const bounds = this.chartContainer.getBoundingClientRect();
        this.width = bounds.width;
        this.height = bounds.height;

        // Update SVG dimensions
        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, this.width, this.height])
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Get the main content group
        const g = this.svg.select('g');
        if (g.node()) {
            const gBBox = g.node().getBBox();

            // Calculate scale to fit content while maintaining aspect ratio
            const scale = Math.min(
                this.width / gBBox.width,
                this.height / gBBox.height
            ) * 0.95; // 95% to add some padding

            // Calculate translation to center the content
            const translateX = (this.width - gBBox.width * scale) / 2 - gBBox.x * scale;
            const translateY = (this.height - gBBox.height * scale) / 2 - gBBox.y * scale;

            // Apply transform smoothly
            g.transition()
                .duration(300) // Match sidebar transition duration
                .attr('transform', `translate(${translateX},${translateY}) scale(${scale})`);
        }

        // Force redraw if needed
        if (this.draw) {
            this.draw();
        }
    }
}