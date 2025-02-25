import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { BaseGraph } from './BaseGraph';

export class AukusMapGraph extends BaseGraph {
    constructor(container, data, settings = {}) {
        super(container, settings);
        this.data = this.processInputData(data);
        this.showLabels = false;
        this.visualizationType = settings.aukus?.visualizationType || 'default';
        this.createMap();
    }

    processInputData(data) {
        const processedData = {};

        if (data && data.rows) {
            data.rows.forEach(row => {
                if (row.length >= 2) {
                    const country = row[0]?.value;
                    const state = row[1]?.value;

                    if (country && state) {
                        // Use the state name directly as the key
                        const key = state;
                        if (!processedData[key]) {
                            processedData[key] = {
                                entries: []
                            };
                        }

                        // Get the weight from the first cell (country cell)
                        const weight = parseFloat(row[0].weight) || 1;

                        // Get only the remaining path components (excluding country and state)
                        const pathComponents = row.slice(2)
                            .filter(cell => cell && cell.value && cell.value.trim() !== '')
                            .map(cell => cell.value.trim());

                        // Add entry with weight and path components
                        processedData[key].entries.push({
                            weight: weight,
                            path: pathComponents,
                            text: row[2]?.value || '' // Store the text v alue for display
                        });

                        console.log(`Added entry for ${key} with weight ${weight}`); // Debug log
                    }
                }
            });
        }
        console.log('Processed AUKUS Map Data:', processedData); // Debug log
        return processedData;
    }

    getRegionKey(country, state) {
        // Map country names to their respective region IDs
        const countryMap = {
            'United Kingdom': 'GBR',
            'England': 'ENG',
            'Scotland': 'SCT',
            'Wales': 'WLS',
            'Northern Ireland': 'NIR',
            'United States': 'USA',
            'Australia': 'AUS'
        };

        // For UK regions, use their specific IDs
        if (country === 'United Kingdom') {
            const ukRegionMap = {
                'England': 'ENG',
                'Scotland': 'SCT',
                'Wales': 'WLS',
                'Northern Ireland': 'NIR'
            };
            return ukRegionMap[state] || state;
        }

        // Return the country code if it exists, otherwise return the full name
        return countryMap[country] || country;
    }

    // Add Australian states data
    getAustralianStates() {
        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: { STATE_NAME: "Western Australia" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[112.9, -14.7], [129, -14.7], [129, -31.5], [129, -34.7], [120.9, -34.7], [115.7, -31.5], [112.9, -24.3], [112.9, -14.7]]]
                    }
                },
                {
                    type: "Feature",
                    properties: { STATE_NAME: "Northern Territory" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[129, -14.7], [138, -14.7], [138, -26], [129, -26], [129, -14.7]]]
                    }
                },
                {
                    type: "Feature",
                    properties: { STATE_NAME: "South Australia" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[129, -26], [138, -26], [141, -26], [141, -34], [138, -38], [129, -34.7], [129, -26]]]
                    }
                },
                {
                    type: "Feature",
                    properties: { STATE_NAME: "Queensland" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[138, -14.7], [153.6, -14.7], [153.6, -28.2], [141, -28.2], [141, -26], [138, -26], [138, -14.7]]]
                    }
                },
                {
                    type: "Feature",
                    properties: { STATE_NAME: "New South Wales" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[141, -28.2], [153.6, -28.2], [153.6, -34.7], [149.9, -37.5], [141, -34], [141, -28.2]]]
                    }
                },
                {
                    type: "Feature",
                    properties: { STATE_NAME: "Victoria" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[141, -34], [149.9, -37.5], [149.9, -39], [141, -38], [141, -34]]]
                    }
                },
                {
                    type: "Feature",
                    properties: { STATE_NAME: "Tasmania" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[144.5, -40], [148.5, -40], [148.5, -43.5], [144.5, -43.5], [144.5, -40]]]
                    }
                }
            ]
        };
    }

    // Helper function to calculate spike length based on data
    calculateSpikeLength(entry) {
        // Create a scale for spike lengths
        const scale = d3.scaleLinear()
            .domain([0.1, 10])
            .range([10, 50])  // Reduced range to match D3 example
            .clamp(true);

        return scale(parseFloat(entry.weight) || 1);
    }

    // Helper function to create spike path
    createSpikePath(length, width = 7) {
        // Create a vertical spike pointing upward
        const x1 = -width / 2;
        const y1 = 0;
        const x2 = 0;
        const y2 = -length;  // Negative to point upward
        const x3 = width / 2;
        const y3 = 0;

        return `M${x1},${y1}L${x2},${y2}L${x3},${y3}Z`;
    }

    // Helper function to get evenly spaced points within state bounds
    getEvenlySpacedPoints(feature, geoPath, count) {
        const bounds = geoPath.bounds(feature);
        const [[x0, y0], [x1, y1]] = bounds;
        const width = x1 - x0;
        const height = y1 - y0;
        const points = [];

        // Try multiple random points for each entry
        for (let i = 0; i < count; i++) {
            let validPoint = null;
            let attempts = 0;

            while (!validPoint && attempts < 20) {
                const x = x0 + Math.random() * width;
                const y = y0 + Math.random() * height;

                // Check if point is inside the feature
                if (d3.geoContains(feature, geoPath.projection().invert([x, y]))) {
                    // Ensure minimum distance from other points
                    const minDistance = Math.min(width, height) * 0.1;
                    const isFarEnough = points.every(([px, py]) => {
                        const distance = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
                        return distance > minDistance;
                    });

                    if (isFarEnough || points.length === 0) {
                        validPoint = [x, y];
                        break;
                    }
                }
                attempts++;
            }

            if (validPoint) {
                points.push(validPoint);
            }
        }

        return points;
    }

    // Helper function to create tooltip content
    createTooltipContent(d, stateData, entry) {
        if (!stateData || !stateData.entries || stateData.entries.length === 0) return '';

        let tooltipContent = `<strong>${d.properties.name || d.properties.STATE_NAME}</strong>`;

        if (entry) {
            // Single entry for spike or bubble
            tooltipContent += '<br><br>';
            if (entry.weight !== 1) {
                tooltipContent += `Weight: ${entry.weight}<br>`;
            }
            if (entry.path && entry.path.length > 0) {
                entry.path.forEach(component => {
                    tooltipContent += `${component}<br>`;
                });
            } else if (entry.text) {
                tooltipContent += `${entry.text}<br>`;
            }
        } else {
            // All entries for state hover
            tooltipContent += `<br><small>(${stateData.entries.length} connections)</small><br><br>`;
            stateData.entries.forEach((entry, index) => {
                if (entry.weight !== 1) {
                    tooltipContent += `Weight: ${entry.weight}<br>`;
                }
                if (entry.path && entry.path.length > 0) {
                    entry.path.forEach(component => {
                        tooltipContent += `${component}<br>`;
                    });
                } else if (entry.text) {
                    tooltipContent += `${entry.text}<br>`;
                }
                if (index < stateData.entries.length - 1) {
                    tooltipContent += '<br>';
                }
            });
        }

        return tooltipContent;
    }

    // Helper function to add spikes to a group
    addSpikesToGroup(group, features, geoPath, getData) {
        features.forEach(feature => {
            const stateData = getData(feature);
            if (!stateData || !stateData.entries || stateData.entries.length === 0) return;

            const points = this.getEvenlySpacedPoints(feature, geoPath, stateData.entries.length);
            const spikeGroup = group.append('g')
                .attr('class', 'spike-group');

            stateData.entries.forEach((entry, i) => {
                if (points[i]) {
                    const [x, y] = points[i];
                    const spikeLength = this.calculateSpikeLength(entry);

                    spikeGroup.append('path')
                        .attr('class', 'spike')
                        .attr('d', this.createSpikePath(spikeLength))
                        .attr('transform', `translate(${x},${y})`)
                        .attr('fill', 'red')
                        .attr('fill-opacity', 0.5)
                        .attr('stroke', 'red')
                        .attr('stroke-width', 0.5)
                        .on('mouseover', (event) => {
                            d3.select(event.currentTarget)
                                .style('fill-opacity', 0.8)
                                .style('stroke-width', 1);

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

                            tooltip.html(this.createTooltipContent(feature, stateData, entry))
                                .style('left', `${event.pageX + 10}px`)
                                .style('top', `${event.pageY - 28}px`);
                        })
                        .on('mousemove', (event) => {
                            const tooltip = d3.select('.tooltip');
                            if (!tooltip.empty()) {
                                tooltip
                                    .style('left', `${event.pageX + 10}px`)
                                    .style('top', `${event.pageY - 28}px`);
                            }
                        })
                        .on('mouseout', (event) => {
                            d3.select('.tooltip').remove();
                            d3.select(event.currentTarget)
                                .style('fill-opacity', 0.5)
                                .style('stroke-width', 0.5);
                        });
                }
            });
        });
    }

    // Helper function to calculate bubble radius based on data
    calculateBubbleRadius(stateData) {
        if (!stateData || !stateData.entries || stateData.entries.length === 0) return 0;

        // Calculate radius based on the sum of weights
        const totalWeight = stateData.entries.reduce((sum, entry) => sum + (entry.weight || 1), 0);
        const scale = d3.scaleLinear()
            .domain([0.1, 20]) // Adjust domain based on expected total weight range
            .range([10, 40]); // Adjust range for desired bubble sizes
        return scale(totalWeight);
    }

    // Helper function to add bubbles to a group
    addBubblesToGroup(group, features, path, getData) {
        // Remove any existing bubble groups
        group.selectAll('.bubble-group').remove();

        features.forEach(feature => {
            const stateData = getData(feature);
            if (!stateData || !stateData.entries || stateData.entries.length === 0) return;

            // Get evenly spaced points for multiple bubbles
            const points = this.getEvenlySpacedPoints(feature, path, stateData.entries.length);
            const bubbleGroup = group.append('g')
                .attr('class', 'bubble-group');

            // Create a bubble for each entry
            stateData.entries.forEach((entry, i) => {
                if (points[i]) {
                    const [x, y] = points[i];

                    // Calculate bubble radius based on individual entry weight
                    const radius = this.calculateBubbleRadiusForEntry(entry);

                    bubbleGroup.append('circle')
                        .attr('class', 'bubble')
                        .attr('cx', x)
                        .attr('cy', y)
                        .attr('r', radius)
                        .attr('fill', 'red')
                        .attr('fill-opacity', 0.5)
                        .attr('stroke', 'red')
                        .attr('stroke-width', 0.5)
                        .on('mouseover', (event) => {
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

                            // Show tooltip for this specific entry
                            tooltip.html(this.createTooltipContent(feature, stateData, entry))
                                .style('left', (event.pageX + 10) + 'px')
                                .style('top', (event.pageY - 28) + 'px');

                            d3.select(event.currentTarget)
                                .style('fill-opacity', 0.8)
                                .style('stroke-width', '1.5');
                        })
                        .on('mousemove', (event) => {
                            const tooltip = d3.select('.tooltip');
                            if (!tooltip.empty()) {
                                tooltip
                                    .style('left', (event.pageX + 10) + 'px')
                                    .style('top', (event.pageY - 28) + 'px');
                            }
                        })
                        .on('mouseout', (event) => {
                            d3.select('.tooltip').remove();
                            d3.select(event.currentTarget)
                                .style('fill-opacity', 0.5)
                                .style('stroke-width', '0.5');
                        });
                }
            });
        });
    }

    // Add a new helper function to calculate bubble radius for a single entry
    calculateBubbleRadiusForEntry(entry) {
        // Create a scale for bubble radius based on entry weight
        const scale = d3.scaleLinear()
            .domain([0.1, 10]) // Adjust domain based on expected weight range
            .range([5, 20])    // Adjust range for desired bubble sizes
            .clamp(true);

        return scale(parseFloat(entry.weight) || 1);
    }

    // Helper function to update visualization elements
    updateVisualization() {
        // Remove existing visualization elements
        d3.selectAll('.spike-group').remove();
        d3.selectAll('.bubble-group').remove();

        // Update state hover behavior based on visualization type
        const states = d3.selectAll('.state, .au-state, .subunit');
        if (this.visualizationType === 'spike' || this.visualizationType === 'bubble') {
            // Disable hover effects for states in spike and bubble modes
            states
                .on('mouseover', null)
                .on('mousemove', null)
                .on('mouseout', null);
        } else {
            // Re-enable hover effects for other modes
            states
                .style('opacity', this.getNodeOpacity())
                .style('stroke-width', '0.5')
                .on('mouseover', (event, d) => {
                    const stateData = this.data[d.properties.name || d.properties.STATE_NAME];
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

                    let tooltipContent = `<strong>${d.properties.name || d.properties.STATE_NAME}</strong>`;
                    if (stateData && stateData.entries && stateData.entries.length > 0) {
                        tooltipContent = this.createTooltipContent(d, stateData, null);
                    }

                    tooltip.html(tooltipContent)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');

                    d3.select(event.currentTarget)
                        .style('opacity', 1)
                        .style('stroke-width', '1.5');
                })
                .on('mousemove', (event) => {
                    const tooltip = d3.select('.tooltip');
                    if (!tooltip.empty()) {
                        tooltip
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 28) + 'px');
                    }
                })
                .on('mouseout', (event) => {
                    d3.select('.tooltip').remove();
                    d3.select(event.currentTarget)
                        .style('opacity', this.getNodeOpacity())
                        .style('stroke-width', '0.5');
                });
        }

        if (this.visualizationType === 'spike') {
            this.addSpikes();
        } else if (this.visualizationType === 'bubble') {
            this.addBubbles();
        }
    }

    // Helper function to add spikes to the map
    addSpikes() {
        const svg = d3.select(this.chartContainer).select('svg');

        // Add spikes for US states
        const usGroup = svg.select('.us-group');
        if (usGroup.size() > 0) {
            this.addSpikesToGroup(
                usGroup,
                topojson.feature(this.usStatesData, this.usStatesData.objects.states).features,
                this.usPath,
                d => this.data[d.properties.name]
            );
        }

        // Add spikes for Australian states
        const auGroup = svg.select('.au-group');
        if (auGroup.size() > 0) {
            this.addSpikesToGroup(
                auGroup,
                this.auStatesData.features,
                this.auPath,
                d => this.data[d.properties.STATE_NAME || d.properties.name]
            );
        }

        // Add spikes for UK regions
        const ukGroup = svg.select('.uk-group');
        if (ukGroup.size() > 0) {
            this.addSpikesToGroup(
                ukGroup,
                this.subunits.features.filter(d => d.id !== "IRL"),
                this.path,
                d => this.data[d.id] || this.data[d.properties.name]
            );
        }
    }

    // Helper function to add bubbles to the map
    addBubbles() {
        const svg = d3.select(this.chartContainer).select('svg');

        // Add bubbles for US states
        const usGroup = svg.select('.us-group');
        if (usGroup.size() > 0) {
            this.addBubblesToGroup(
                usGroup,
                topojson.feature(this.usStatesData, this.usStatesData.objects.states).features,
                this.usPath,
                d => this.data[d.properties.name]
            );
        }

        // Add bubbles for Australian states
        const auGroup = svg.select('.au-group');
        if (auGroup.size() > 0) {
            this.addBubblesToGroup(
                auGroup,
                this.auStatesData.features,
                this.auPath,
                d => this.data[d.properties.STATE_NAME || d.properties.name]
            );
        }

        // Add bubbles for UK regions
        const ukGroup = svg.select('.uk-group');
        if (ukGroup.size() > 0) {
            this.addBubblesToGroup(
                ukGroup,
                this.subunits.features.filter(d => d.id !== "IRL"),
                this.path,
                d => this.data[d.id] || this.data[d.properties.name]
            );
        }
    }

    async createMap() {
        try {
            this.chartContainer.innerHTML = '';

            const width = Math.max(1400, this.width);
            const height = Math.max(1000, this.height);

            const svg = d3.select(this.chartContainer)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [0, 0, width, height])
                .style('width', '100%')
                .style('height', 'auto')
                .style('background-color', 'var(--bg-primary)');

            const g = svg.append('g');

            // Load US states data
            const response = await fetch('https://unpkg.com/us-atlas@3/states-10m.json');
            if (!response.ok) {
                throw new Error('Failed to load US states data');
            }
            this.usStatesData = await response.json();

            // Create US projection
            const usProjection = d3.geoAlbersUsa()
                .fitSize([width * 0.4, height * 0.35], topojson.feature(this.usStatesData, this.usStatesData.objects.states))
                .translate([width * 0.25, height * 0.45]);

            this.usPath = d3.geoPath(usProjection);

            // Draw US states
            const usGroup = g.append('g')
                .attr('class', 'us-group');

            usGroup.selectAll('.state')
                .data(topojson.feature(this.usStatesData, this.usStatesData.objects.states).features)
                .join('path')
                .attr('class', 'state')
                .attr('d', this.usPath)
                .attr('fill', this.settings.colors.level1)
                .attr('stroke', 'white')
                .attr('stroke-width', '0.5')
                .style('opacity', this.getNodeOpacity())
                .on('mouseover', (event, d) => {
                    const stateData = this.data[d.properties.name];
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
                    if (stateData && stateData.paths && stateData.paths.length > 0) {
                        tooltipContent = this.createTooltipContent(d, stateData, null);
                    }

                    tooltip.html(tooltipContent)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');

                    d3.select(event.currentTarget)
                        .style('opacity', 1)
                        .style('stroke-width', '1.5');
                })
                .on('mousemove', (event) => {
                    const tooltip = d3.select('.tooltip');
                    if (!tooltip.empty()) {
                        tooltip
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 28) + 'px');
                    }
                })
                .on('mouseout', (event) => {
                    d3.select('.tooltip').remove();
                    d3.select(event.currentTarget)
                        .style('opacity', this.getNodeOpacity())
                        .style('stroke-width', '0.5');
                });

            // Add US state labels
            usGroup.selectAll(".us-state-label")
                .data(topojson.feature(this.usStatesData, this.usStatesData.objects.states).features)
                .join("text")
                .attr("class", "state-label us-state-label")
                .attr("transform", d => `translate(${this.usPath.centroid(d)})`)
                .attr("text-anchor", "middle")
                .attr("dy", ".35em")
                .attr("fill", "var(--text-primary)")
                .attr("font-size", "6px")
                .style("display", this.showLabels ? "block" : "none")
                .text(d => d.properties.name);

            // Load Australian states data
            const auResponse = await fetch('https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.json');
            if (!auResponse.ok) {
                throw new Error('Failed to load Australian states data');
            }
            this.auStatesData = await auResponse.json();

            // Create Australia projection
            const auProjection = d3.geoMercator()
                .center([134, -27])
                .scale(700)
                .translate([width * 0.8, height * 0.5]);

            this.auPath = d3.geoPath(auProjection);

            // Draw Australian states
            const auGroup = g.append('g')
                .attr('class', 'au-group');

            auGroup.selectAll(".au-state")
                .data(this.auStatesData.features)
                .join("path")
                .attr("class", "au-state")
                .attr("d", this.auPath)
                .attr("fill", this.settings.colors.level3)
                .attr("stroke", "white")
                .attr("stroke-width", "0.5")
                .style('opacity', this.getNodeOpacity())
                .on('mouseover', (event, d) => {
                    const stateData = this.data[d.properties.STATE_NAME || d.properties.name];
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

                    let tooltipContent = `<strong>${d.properties.STATE_NAME || d.properties.name}</strong>`;
                    if (stateData && stateData.paths && stateData.paths.length > 0) {
                        tooltipContent = this.createTooltipContent(d, stateData, null);
                    }

                    tooltip.html(tooltipContent)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');

                    d3.select(event.currentTarget)
                        .style('opacity', 1)
                        .style('stroke-width', '1.5');
                })
                .on('mousemove', (event) => {
                    const tooltip = d3.select('.tooltip');
                    if (!tooltip.empty()) {
                        tooltip
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 28) + 'px');
                    }
                })
                .on('mouseout', (event) => {
                    d3.select('.tooltip').remove();
                    d3.select(event.currentTarget)
                        .style('opacity', this.getNodeOpacity())
                        .style('stroke-width', '0.5');
                });

            // Add Australian state labels
            auGroup.selectAll(".au-state-label")
                .data(this.auStatesData.features)
                .join("text")
                .attr("class", "state-label au-state-label")
                .attr("transform", d => `translate(${this.auPath.centroid(d)})`)
                .attr("text-anchor", "middle")
                .attr("dy", ".35em")
                .attr("fill", "var(--text-primary)")
                .attr("font-size", "8px")
                .style("display", this.showLabels ? "block" : "none")
                .text(d => d.properties.STATE_NAME || d.properties.name);

            // Load UK data
            const ukResponse = await fetch('https://bost.ocks.org/mike/map/uk.json');
            if (!ukResponse.ok) {
                throw new Error('Failed to load UK data');
            }
            const uk = await ukResponse.json();

            // Create UK projection
            const projection = d3.geoAlbers()
                .center([0, 55.4])
                .rotate([4.4, 0])
                .parallels([50, 60])
                .scale(1300)
                .translate([width * 0.5, height * 0.1]);

            const path = d3.geoPath()
                .projection(projection);

            // Convert TopoJSON to GeoJSON
            const subunits = topojson.feature(uk, uk.objects.subunits);

            // Draw UK regions
            const ukGroup = g.append('g')
                .attr('class', 'uk-group');

            // Draw UK subunits (countries)
            ukGroup.selectAll(".subunit")
                .data(subunits.features)
                .join("path")
                .attr("class", d => "subunit " + d.id)
                .attr("d", path)
                .attr("fill", this.settings.colors.level2)
                .attr("stroke", "white")
                .attr("stroke-width", "0.5")
                .style("opacity", this.getNodeOpacity())
                .on('mouseover', (event, d) => {
                    const stateData = this.data[d.id] || this.data[d.properties.name];
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
                    if (stateData && stateData.paths && stateData.paths.length > 0) {
                        tooltipContent = this.createTooltipContent(d, stateData, null);
                    }

                    tooltip.html(tooltipContent)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');

                    d3.select(event.currentTarget)
                        .style('opacity', 1)
                        .style('stroke-width', '1.5');
                })
                .on('mousemove', (event) => {
                    const tooltip = d3.select('.tooltip');
                    if (!tooltip.empty()) {
                        tooltip
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 28) + 'px');
                    }
                })
                .on('mouseout', (event) => {
                    d3.select('.tooltip').remove();
                    d3.select(event.currentTarget)
                        .style('opacity', this.getNodeOpacity())
                        .style('stroke-width', '0.5');
                });

            // Add country labels
            ukGroup.selectAll(".subunit-label")
                .data(subunits.features.filter(d => d.id !== "IRL"))
                .join("text")
                .attr("class", "state-label subunit-label")
                .attr("transform", d => "translate(" + path.centroid(d) + ")")
                .attr("dy", ".35em")
                .attr("fill", "var(--text-primary)")
                .attr("font-size", "8px")
                .style("text-anchor", "middle")
                .style("display", this.showLabels ? "block" : "none")
                .text(d => d.properties.name);

            // Store the path and projection objects
            this.path = path;
            this.projection = projection;
            this.subunits = subunits;

            // Add visualization elements based on type
            this.updateVisualization();

            // Add zoom behavior
            const zoom = d3.zoom()
                .scaleExtent([0.5, 8])
                .on('zoom', (event) => {
                    g.attr('transform', event.transform);
                });

            svg.call(zoom);

        } catch (error) {
            console.error('Error loading map data:', error);
            this.chartContainer.innerHTML = '<div class="error">Error loading map data: ' + error.message + '</div>';
        }
    }

    toggleLabels(show) {
        this.showLabels = show;
        if (this.chartContainer) {
            d3.select(this.chartContainer)
                .selectAll(".state-label")
                .style("display", show ? "block" : "none");
        }
    }

    update() {
        this.visualizationType = this.settings.aukus?.visualizationType || 'default';
        this.updateVisualization();
    }

    destroy() {
        if (this.chartContainer) {
            this.chartContainer.innerHTML = '';
        }
    }
} 