// src/js/index.js
import { ForceGraph } from './graphs/ForceGraph';
import { SankeyGraph } from './graphs/SankeyGraph';
import { SunburstGraph } from './graphs/SunburstGraph';
import { ChordGraph } from './graphs/ChordGraph';
import { CirclePackingGraph } from './graphs/CirclePackingGraph';
import { WorldMapGraph } from './graphs/WorldMapGraph';
import { AukusMapGraph } from './graphs/AukusMapGraph';
import { FlowParser } from './utils/FlowParser';
import { exportToSVG, exportToPNG } from './utils/exportUtils';
import { MatrixInput } from './utils/MatrixInput';
import { ExampleDataManager } from './utils/ExampleDataManager.js';

function initTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize theme on page load
initTheme();

class GraphVisualizer {
    constructor() {
        this.container = document.getElementById('visualization-container');
        this.currentGraph = null;
        this.flowParser = new FlowParser();

        // Initialize MatrixInput
        const matrixContainer = document.querySelector('.matrix-container');
        if (!matrixContainer) {
            console.error('Matrix container not found');
            return;
        }
        this.matrixInput = new MatrixInput(matrixContainer);

        // Initialize settings with default values
        this.settings = {
            colors: {
                level1: document.getElementById('nodeColor1')?.value || '#ff4d6a',
                level2: document.getElementById('nodeColor2')?.value || '#ec4899',
                level3: document.getElementById('nodeColor3')?.value || '#a78bfa',
                level4: document.getElementById('nodeColor4')?.value || '#f59e0b',
                level5: document.getElementById('nodeColor5')?.value || '#818cf8'
            },
            opacity: {
                nodes: 1.0,
                links: 0.8
            },
            sankey: {
                nodePadding: 30
            },
            force: {
                linkDistance: 100,
                chargeStrength: -300
            },
            display: {
                showOutlines: true
            },
            aukus: {
                visualizationType: 'default'
            }
        };

        this.colorPresets = {
            default: {
                level1: '#818cf8',  // Indigo
                level2: '#a78bfa',  // Purple
                level3: '#ec4899',  // Pink
                level4: '#f43f5e',  // Rose
                level5: '#f59e0b'   // Amber
            },
            aukus: {
                level1: '#002868',  // Navy Blue (US Flag Blue)
                level2: '#012169',  // Royal Blue (UK Flag Blue)
                level3: '#00247d',  // Royal Blue (Australian Flag Blue)
                level4: '#C8102E',  // Red (Common in all flags)
                level5: '#FFFFFF'   // White (Common in all flags)
            },
            vibrantJewel: {
                level1: '#0ea5e9',  // Vivid Sky Blue
                level2: '#6366f1',  // Electric Indigo
                level3: '#8b5cf6',  // Rich Purple
                level4: '#d946ef',  // Bright Magenta
                level5: '#ec4899'   // Deep Pink
            },
            earthTones: {
                level1: '#78350f',  // Deep Brown
                level2: '#92400e',  // Rich Copper
                level3: '#b45309',  // Warm Bronze
                level4: '#d97706',  // Golden Brown
                level5: '#f59e0b'   // Amber
            },
            deepOcean: {
                level1: '#0c4a6e',  // Dark Ocean Blue
                level2: '#075985',  // Deep Sea Blue
                level3: '#0369a1',  // Rich Marine
                level4: '#0284c7',  // Bright Ocean
                level5: '#0ea5e9'   // Vivid Azure
            },
            emeraldDream: {
                level1: '#064e3b',  // Dark Emerald
                level2: '#065f46',  // Deep Forest
                level3: '#047857',  // Rich Emerald
                level4: '#059669',  // Bright Jade
                level5: '#10b981'   // Vivid Green
            },
            royalPurple: {
                level1: '#3b0764',  // Deep Purple
                level2: '#4c1d95',  // Royal Purple
                level3: '#5b21b6',  // Rich Violet
                level4: '#6d28d9',  // Bright Purple
                level5: '#7c3aed'   // Electric Violet
            },
            sunsetGlow: {
                level1: '#7c2d12',  // Deep Rust
                level2: '#9a3412',  // Rich Terra
                level3: '#c2410c',  // Bright Orange
                level4: '#ea580c',  // Vivid Orange
                level5: '#f97316'   // Glowing Orange
            },
            modernMuted: {
                level1: '#60a5fa',  // Muted Blue
                level2: '#a78bfa',  // Muted Purple
                level3: '#f472b6',  // Muted Pink
                level4: '#34d399',  // Muted Green
                level5: '#fbbf24'   // Muted Yellow
            },
            nordic: {
                level1: '#64748b',  // Slate
                level2: '#78716c',  // Warm Gray
                level3: '#92400e',  // Rich Brown
                level4: '#78350f',  // Deep Brown
                level5: '#451a03'   // Dark Brown
            },
            freshMint: {
                level1: '#99f6e4',  // Fresh Mint
                level2: '#a5f3fc',  // Sky Blue
                level3: '#bae6fd',  // Light Blue
                level4: '#86efac',  // Light Green
                level5: '#d9f99d'   // Lime Green
            },
            crimsonShades: {
                level1: '#881337',  // Deep Crimson
                level2: '#9f1239',  // Rich Ruby
                level3: '#be123c',  // Bright Ruby
                level4: '#e11d48',  // Vivid Red
                level5: '#f43f5e'   // Glowing Rose
            },
            deepForest: {
                level1: '#14532d',  // Dark Forest
                level2: '#166534',  // Deep Pine
                level3: '#15803d',  // Rich Forest
                level4: '#16a34a',  // Bright Forest
                level5: '#22c55e'   // Vivid Green
            },
            midnightBlue: {
                level1: '#1e3a8a',  // Deep Navy
                level2: '#1e40af',  // Rich Navy
                level3: '#1d4ed8',  // Bright Navy
                level4: '#2563eb',  // Electric Blue
                level5: '#3b82f6'   // Vivid Blue
            }
        };

        this.setupEventListeners();
        this.setupThemeToggle();
        this.initializeFromURL();

        // Add this to your initialization code
        document.querySelector('.add-row-button').addEventListener('click', () => {
            this.matrixInput.addRow();
        });

        // Node padding slider
        document.getElementById('nodePadding')?.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.settings.sankey.nodePadding = value;
            document.getElementById('nodePaddingValue').textContent = value;
            if (this.currentGraph) {
                this.currentGraph.update();
            }
        });

        // Opacity slider
        document.getElementById('opacitySlider')?.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.settings.opacity.nodes = value;
            this.settings.opacity.links = Math.max(0.3, value - 0.2); // Links slightly more transparent
            document.getElementById('opacityValue').textContent = value.toFixed(2);
            if (this.currentGraph) {
                this.currentGraph.update();
            }
        });

        // Show outlines toggle
        document.getElementById('showOutlines')?.addEventListener('change', (e) => {
            this.settings.display.showOutlines = e.target.checked;
            if (this.currentGraph) {
                this.currentGraph.update();
            }
        });

        // Show state labels toggle
        document.getElementById('showStateLabels')?.addEventListener('change', (e) => {
            if (this.currentGraph instanceof AukusMapGraph) {
                this.currentGraph.toggleLabels(e.target.checked);
            }
        });

        // Initialize slider values
        document.getElementById('nodePaddingValue').textContent = this.settings.sankey.nodePadding;
        document.getElementById('opacityValue').textContent = this.settings.opacity.nodes.toFixed(2);

        // Initialize example data manager
        this.exampleManager = new ExampleDataManager(this.matrixInput);

        // AUKUS visualization type change
        document.getElementById('aukusVizType')?.addEventListener('change', (e) => {
            this.settings.aukus.visualizationType = e.target.value;
            if (this.currentGraph instanceof AukusMapGraph) {
                this.currentGraph.update();
            }
        });
    }

    setupEventListeners() {
        // Matrix input listener
        this.matrixInput.container.addEventListener('matrixchange', (event) => {
            const matrixData = event.detail;
            const graphData = this.flowParser.parseMatrix(matrixData);
            this.updateGraph(graphData);
        });

        // Graph type switching
        document.getElementById('graphType')?.addEventListener('change', (e) => {
            this.switchGraph(e.target.value);
            this.toggleGraphControls(e.target.value);
            this.updateURL();
        });

        // Generate button
        document.getElementById('generateBtn')?.addEventListener('click', () => {
            this.updateGraph();
        });

        // Clear button
        document.getElementById('clearBtn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                this.matrixInput.setData({ columns: this.matrixInput.columns, rows: [[]] });
                this.updateGraph();
            }
        });

        // Background style control
        document.getElementById('backgroundStyle')?.addEventListener('change', (e) => {
            const selectedStyle = e.target.value;
            this.settings.background = this.backgroundStyles[selectedStyle];
            this.updateGraph();
            this.updateURL();
        });

        ['nodeColor1', 'nodeColor2', 'nodeColor3', 'nodeColor4', 'nodeColor5'].forEach((id, index) => {
            document.getElementById(id)?.addEventListener('input', (e) => {
                this.settings.colors[`level${index + 1}`] = e.target.value;
                this.updateGraph();
                this.updateURL();
            });
        });

        // Color preset listener
        document.getElementById('colorPreset')?.addEventListener('change', (e) => {
            const selectedScheme = e.target.value;
            const colorScheme = this.colorPresets[selectedScheme];

            // Update the color inputs visually and settings
            Object.entries(colorScheme).forEach(([level, color]) => {
                const input = document.getElementById(`nodeColor${level.slice(-1)}`);
                if (input) {
                    input.value = color;
                    this.settings.colors[level] = color;
                }
            });

            // Force graph update
            this.updateGraph();
        });

        // Sankey-specific controls
        document.getElementById('nodePadding')?.addEventListener('input', (e) => {
            this.settings.sankey.nodePadding = parseInt(e.target.value);
            if (this.currentGraph instanceof SankeyGraph) {
                this.updateGraph();
            }
        });

        // Export controls
        document.getElementById('exportPNG')?.addEventListener('click', () => {
            if (this.currentGraph) {
                exportToPNG(this.currentGraph.wrapper);
            }
        });

        document.getElementById('exportSVG')?.addEventListener('click', () => {
            if (this.currentGraph) {
                exportToSVG(this.currentGraph.wrapper);
            }
        });

        // Title updates
        ['companyName', 'techName'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                this.updateTitles();
                this.updateURL();
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                if (this.currentGraph) {
                    this.currentGraph.handleResize();
                }
            }, 250);
        });
    }

    toggleGraphControls(type) {
        // Show/hide node padding based on graph type
        const nodePaddingControl = document.querySelector('.slider-control:has(#nodePadding)');
        if (nodePaddingControl) {
            nodePaddingControl.style.display = type === 'sankey' ? 'flex' : 'none';
        }

        // Show/hide outline toggle based on graph type
        const outlineControl = document.querySelector('.slider-control:has(#showOutlines)');
        if (outlineControl) {
            outlineControl.style.display = ['sankey', 'force', 'circle'].includes(type) ? 'flex' : 'none';
        }

        // Show/hide opacity control based on graph type
        const opacityControl = document.querySelector('.slider-control:has(#opacitySlider)');
        if (opacityControl) {
            opacityControl.style.display = ['sankey', 'force', 'circle'].includes(type) ? 'flex' : 'none';
        }

        // Show/hide state labels toggle based on graph type
        const stateLabelsControl = document.querySelector('.slider-control:has(#showStateLabels)');
        if (stateLabelsControl) {
            stateLabelsControl.style.display = type === 'aukusmap' ? 'flex' : 'none';
        }

        // Show/hide entire graph settings container
        const graphSettings = document.querySelector('.graph-settings');
        if (graphSettings) {
            const hasSettings = ['sankey', 'force', 'circle', 'aukusmap'].includes(type);
            graphSettings.style.display = hasSettings ? 'block' : 'none';
        }

        // Show/hide AUKUS visualization type selector
        const aukusVizControl = document.querySelector('.aukus-viz-type');
        if (aukusVizControl) {
            aukusVizControl.style.display = type === 'aukusmap' ? 'flex' : 'none';
        }
    }

    updateTitles() {
        const companyName = document.getElementById('companyName')?.value || '';
        const techName = document.getElementById('techName')?.value || '';

        if (this.currentGraph) {
            this.currentGraph.updateTitles(companyName, techName);
        }
    }

    updateGraph(data = null) {
        const graphType = document.getElementById('graphType')?.value || 'sankey';

        if (!data) {
            const matrixData = this.matrixInput.getData();
            data = this.flowParser.parseMatrix(matrixData);
        }

        this.switchGraph(graphType, data);
        this.updateURL();
    }

    switchGraph(type, data = null) {
        // Clear container
        if (this.currentGraph) {
            this.currentGraph.destroy();
        }

        try {
            const matrixData = this.matrixInput.getData();
            let graphData;

            // Handle world map separately since it has a different data structure
            if (type.toLowerCase() === 'worldmap') {
                this.matrixInput.setGraphType('worldmap');
                const countryData = {};
                matrixData.rows.forEach(row => {
                    // For world map, the first cell might be a select element
                    const firstCell = row[0];
                    const countryName = firstCell?.value;
                    if (countryName) {
                        if (!countryData[countryName]) {
                            countryData[countryName] = {
                                paths: []
                            };
                        }

                        // Get all non-empty values from the remaining cells
                        const path = row.slice(1)
                            .filter(cell => cell && cell.value && cell.value.trim() !== '')
                            .map(cell => cell.value.trim());

                        if (path.length > 0) {
                            countryData[countryName].paths.push(path);
                        }
                    }
                });

                this.currentGraph = new WorldMapGraph(this.container, countryData, this.settings);
                this.updateTitles();
                this.toggleGraphControls(type);
                return;
            }

            // Use appropriate data format based on graph type
            if (type.toLowerCase() === 'sunburst') {
                this.matrixInput.setGraphType('');
                graphData = this.flowParser.parseSunburstData(matrixData);
            } else if (type.toLowerCase() === 'chord') {
                this.matrixInput.setGraphType('');
                graphData = this.flowParser.parseChordData(matrixData);
            } else if (type.toLowerCase() === 'circle') {
                this.matrixInput.setGraphType('');
                graphData = this.flowParser.parseCirclePackingData(matrixData);
            } else if (type.toLowerCase() === 'aukusmap') {
                this.matrixInput.setGraphType('aukusmap');
                graphData = matrixData; // Pass the raw matrix data directly to AukusMapGraph
            } else {
                this.matrixInput.setGraphType('');
                graphData = this.flowParser.parseMatrix(matrixData);
            }

            // Create new graph based on type
            switch (type.toLowerCase()) {
                case 'sunburst':
                    this.currentGraph = new SunburstGraph(this.container, graphData, this.settings);
                    break;
                case 'force':
                    this.currentGraph = new ForceGraph(this.container, graphData, this.settings);
                    break;
                case 'chord':
                    this.currentGraph = new ChordGraph(this.container, graphData, this.settings);
                    break;
                case 'circle':
                    this.currentGraph = new CirclePackingGraph(this.container, graphData, this.settings);
                    break;
                case 'aukusmap':
                    this.matrixInput.setGraphType('aukusmap');
                    this.currentGraph = new AukusMapGraph(this.container, graphData, this.settings);
                    break;
                default:
                    this.currentGraph = new SankeyGraph(this.container, graphData, this.settings);
                    break;
            }

            this.updateTitles();
            this.toggleGraphControls(type);
        } catch (error) {
            console.warn('Graph initialization warning:', error);
            // Clear the container without showing error message
            if (this.container) {
                this.container.innerHTML = '';
            }
        }
    }

    // URL state management
    updateURL() {
        const state = {
            type: document.getElementById('graphType')?.value,
            input: document.getElementById('flowInput')?.value,
            company: document.getElementById('companyName')?.value,
            tech: document.getElementById('techName')?.value,
            colors: this.settings.colors
        };

        const params = new URLSearchParams();
        Object.entries(state).forEach(([key, value]) => {
            if (value) {
                params.set(key, typeof value === 'object' ? JSON.stringify(value) : value);
            }
        });

        window.history.replaceState({}, '', `?${params.toString()}`);
    }

    initializeFromURL() {
        const params = new URLSearchParams(window.location.search);

        // Restore state from URL parameters
        if (params.has('input')) {
            const flowInput = document.getElementById('flowInput');
            if (flowInput) flowInput.value = params.get('input');
        }

        if (params.has('company')) {
            const companyInput = document.getElementById('companyName');
            if (companyInput) companyInput.value = params.get('company');
        }

        if (params.has('tech')) {
            const techInput = document.getElementById('techName');
            if (techInput) techInput.value = params.get('tech');
        }

        if (params.has('colors')) {
            try {
                const colors = JSON.parse(params.get('colors'));
                Object.entries(colors).forEach(([level, color]) => {
                    const picker = document.getElementById(`nodeColor${level.slice(-1)}`);
                    if (picker) picker.value = color;
                });
                this.settings.colors = colors;
            } catch (e) {
                console.error('Error parsing colors from URL:', e);
            }
        }

        // Initialize graph with URL parameters
        const graphType = params.get('type') || 'sankey';
        const graphTypeSelect = document.getElementById('graphType');
        if (graphTypeSelect) graphTypeSelect.value = graphType;

        this.switchGraph(graphType);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);

                if (this.currentGraph) {
                    this.updateGraph();
                }
            });
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new GraphVisualizer();
});