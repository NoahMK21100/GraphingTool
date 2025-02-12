import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { BaseGraph } from './BaseGraph';

export class WorldMapGraph extends BaseGraph {
    constructor(container, data, settings) {
        super(container, settings);
        this.data = data;
        this.settings = settings;
        this.createMap();
    }

    async createMap() {
        // Clear container
        this.chartContainer.innerHTML = '';

        // Create SVG
        const svg = d3.select(this.chartContainer)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', [0, 0, this.width, this.height])
            .attr('style', 'max-width: 100%; height: auto;');

        // Create a container for all map elements
        const g = svg.append('g');

        // Create projection
        const projection = d3.geoEqualEarth()
            .fitExtent([[2, 2], [this.width - 2, this.height - 2]], { type: "Sphere" });
        const path = d3.geoPath(projection);

        // Add zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

        // Function to handle country click
        const handleCountryClick = (event, d) => {
            event.stopPropagation(); // Prevent click from bubbling to svg

            const bounds = path.bounds(d);
            const dx = bounds[1][0] - bounds[0][0];
            const dy = bounds[1][1] - bounds[0][1];
            const x = (bounds[0][0] + bounds[1][0]) / 2;
            const y = (bounds[0][1] + bounds[1][1]) / 2;
            const scale = Math.min(4, 0.9 / Math.max(dx / this.width, dy / this.height));
            const translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];

            svg.transition()
                .duration(750)
                .call(zoom.transform,
                    d3.zoomIdentity
                        .translate(translate[0], translate[1])
                        .scale(scale)
                );
        };

        // Function to handle background click (zoom out)
        const handleBackgroundClick = () => {
            svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        };

        // Create color scale using the node colors from settings
        const getCountryColor = (countryData, countryName) => {
            if (!countryData || !countryData.paths.length) return '#ccc';

            // Get unique countries and assign them colors sequentially
            const uniqueCountries = Object.keys(this.data);
            const countryIndex = uniqueCountries.indexOf(countryName);

            // Cycle through the 5 colors based on country order
            const colorLevel = (countryIndex % 5) + 1;
            return this.settings.colors[`level${colorLevel}`];
        };

        try {
            // Fetch world topology data
            const response = await fetch('https://unpkg.com/world-atlas@2/countries-50m.json');
            const world = await response.json();
            const countries = topojson.feature(world, world.objects.countries);
            const countrymesh = topojson.mesh(world, world.objects.countries);

            // Add sphere (background)
            g.append('path')
                .datum({ type: 'Sphere' })
                .attr('fill', 'var(--bg-primary)')
                .attr('stroke', 'var(--text-primary)')
                .attr('d', path)
                .on('click', handleBackgroundClick);

            // Add countries
            g.append('g')
                .selectAll('path')
                .data(countries.features)
                .join('path')
                .attr('fill', d => {
                    const countryData = this.data[d.properties.name];
                    return getCountryColor(countryData, d.properties.name);
                })
                .attr('d', path)
                .attr('stroke', 'var(--bg-primary)')
                .attr('stroke-width', '0.5')
                .style('opacity', this.getNodeOpacity())
                .on('click', handleCountryClick)
                .on('mouseover', (event, d) => {
                    const countryData = this.data[d.properties.name];
                    const tooltip = d3.select('body')
                        .append('div')
                        .attr('class', 'tooltip')
                        .style('position', 'absolute')
                        .style('background', 'var(--bg-secondary)')
                        .style('color', 'var(--text-primary)')
                        .style('padding', '8px')
                        .style('border-radius', '4px')
                        .style('font-size', '12px')
                        .style('pointer-events', 'none')
                        .style('z-index', '100')
                        .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)');

                    let tooltipContent = `<strong>${d.properties.name}</strong>`;
                    if (countryData && countryData.paths.length > 0) {
                        tooltipContent += `<br><small>(${countryData.paths.length} connections)</small><br><br>`;
                        countryData.paths.forEach((path, pathIndex) => {
                            path.forEach((component, index) => {
                                tooltipContent += component;
                                if (index < path.length - 1) {
                                    tooltipContent += '<br>';
                                }
                            });
                            if (pathIndex < countryData.paths.length - 1) {
                                tooltipContent += '<br><br>';
                            }
                        });
                    }

                    tooltip.html(tooltipContent);

                    tooltip
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');

                    d3.select(event.currentTarget)
                        .style('opacity', 1)
                        .style('stroke-width', '1.5');
                })
                .on('mousemove', (event) => {
                    d3.select('.tooltip')
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                })
                .on('mouseout', (event) => {
                    d3.select('.tooltip').remove();
                    d3.select(event.currentTarget)
                        .style('opacity', this.getNodeOpacity())
                        .style('stroke-width', '0.5');
                });

            // Add mesh
            g.append('path')
                .datum(countrymesh)
                .attr('fill', 'none')
                .attr('stroke', 'var(--bg-primary)')
                .attr('stroke-width', '0.5')
                .attr('d', path);

        } catch (error) {
            console.error('Error loading world map data:', error);
            this.chartContainer.innerHTML = '<div class="error">Error loading world map data</div>';
        }
    }

    update() {
        this.createMap();
    }

    destroy() {
        if (this.chartContainer) {
            this.chartContainer.innerHTML = '';
        }
    }
} 