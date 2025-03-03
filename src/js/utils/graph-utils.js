// graph-utils.js

class GraphUtils {
    constructor(options = {}) {
        this.themes = {
            default: {
                level1: "#818cf8",
                level2: "#a78bfa",
                level3: "#ec4899",
                level4: "#f43f5e"
            },
            ocean: {
                level1: "#0ea5e9",
                level2: "#0284c7",
                level3: "#0369a1",
                level4: "#075985"
            },
            forest: {
                level1: "#059669",
                level2: "#047857",
                level3: "#065f46",
                level4: "#064e3b"
            }
        };
        
        this.currentTheme = this.themes[options.theme || 'default'];
        this.container = options.container;
        this.width = options.width || 1000;
        this.height = options.height || 600;
        this.margin = options.margin || { top: 20, right: 150, bottom: 20, left: 150 };
    }

    createGradientDefs(svg, links) {
        const defs = svg.append("defs");
        
        links.forEach((link, i) => {
            const gradient = defs.append("linearGradient")
                .attr("id", `gradient-${i}`)
                .attr("gradientUnits", "userSpaceOnUse");

            // Different gradient settings for Sankey vs Force
            if (link.source.x0 !== undefined) { // Sankey
                gradient
                    .attr("x1", link.source.x1)
                    .attr("x2", link.target.x0);
            } else { // Force
                gradient
                    .attr("x1", "0%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "0%");
            }

            gradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", this.getNodeColor(link.source));

            gradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", this.getNodeColor(link.target));
        });
    }

    getNodeColor(node) {
        return this.currentTheme[`level${(node.level || node.column || 0) + 1}`];
    }

    createTooltip() {
        return d3.select(this.container)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    }

    showTooltip(tooltip, data, event) {
        tooltip
            .html(this.formatTooltipContent(data))
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px")
            .transition()
            .duration(200)
            .style("opacity", 1);
    }

    hideTooltip(tooltip) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0);
    }

    formatTooltipContent(data) {
        let content = `<strong>${data.name}</strong>`;
        if (data.value) {
            content += `<br>Value: ${data.value}`;
        }
        return content;
    }

    handleNodeHover(node, links, allNodes, allLinks) {
        const connectedNodes = new Set([node.id]);
        const connectedLinks = new Set();

        // Find connections
        links.forEach((link, i) => {
            if (link.source.id === node.id || link.target.id === node.id) {
                connectedNodes.add(link.source.id);
                connectedNodes.add(link.target.id);
                connectedLinks.add(i);
            }
        });

        // Update visual states
        allNodes.classed("faded", n => !connectedNodes.has(n.id));
        allLinks.classed("faded", (l, i) => !connectedLinks.has(i));
    }

    handleMouseOut(allNodes, allLinks) {
        allNodes.classed("faded", false);
        allLinks.classed("faded", false);
    }

    setTheme(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = this.themes[themeName];
            return true;
        }
        return false;
    }

    addTheme(name, colors) {
        this.themes[name] = colors;
    }
}

export { GraphUtils };