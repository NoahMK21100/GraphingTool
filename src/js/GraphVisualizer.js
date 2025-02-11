import MatrixInput from '../components/MatrixInput';
import { ExampleDataManager } from './utils/ExampleDataManager.js';
import { MatrixInput as MatrixInputUtils } from './utils/MatrixInput.js';

class GraphVisualizer {
    constructor() {
        this.initializeContainers();
        this.initializeSettings();
        this.setupEventListeners();
        this.setupThemeToggle();
        this.initializeFromURL();
    }

    initializeContainers() {
        this.container = document.getElementById('visualization-container');
        this.currentGraph = null;
        this.flowParser = new FlowParser();

        const matrixContainer = document.querySelector('.matrix-container');
        if (!matrixContainer) {
            console.error('Matrix container not found');
            return;
        }
        this.matrixInput = new MatrixInput(matrixContainer);
    }

    initializeSettings() {
        this.settings = {
            colors: this.initializeColors(),
            opacity: {
                nodes: 0.85,
                links: 0.6
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
            }
        };
    }

    initializeColors() {
        return {
            level1: document.getElementById('nodeColor1')?.value || '#ff4d6a',
            level2: document.getElementById('nodeColor2')?.value || '#ec4899',
            level3: document.getElementById('nodeColor3')?.value || '#a78bfa',
            level4: document.getElementById('nodeColor4')?.value || '#f59e0b',
            level5: document.getElementById('nodeColor5')?.value || '#818cf8'
        };
    }

    setupEventListeners() {
        this.setupMatrixListeners();
        this.setupGraphControls();
        this.setupColorControls();
        this.setupExportControls();
        this.setupTitleControls();
        this.setupResizeHandler();
    }

    setupMatrixListeners() {
        this.matrixInput.container.addEventListener('matrixchange', (event) => {
            const matrixData = event.detail;
            const graphData = this.flowParser.parseMatrix(matrixData);
            this.updateGraph(graphData);
        });

        document.getElementById('graphType')?.addEventListener('change', (e) => {
            this.switchGraph(e.target.value);
            this.toggleGraphControls(e.target.value);
            this.updateURL();
        });
    }

    setupGraphControls() {
        document.getElementById('nodePadding')?.addEventListener('input', (e) => {
            this.settings.sankey.nodePadding = parseInt(e.target.value);
            if (this.currentGraph instanceof SankeyGraph) {
                this.updateGraph();
            }
        });
    }

    setupColorControls() {
        // Color preset listener
        document.getElementById('colorPreset')?.addEventListener('change', (e) => {
            const colors = this.colorPresets[e.target.value];
            colors.forEach((color, i) => {
                // Update the color inputs visually
                const input = document.getElementById(`nodeColor${i}`);
                if (input) {
                    input.value = color;
                    // Update the settings object
                    this.settings.colors[`level${i}`] = color;
                }
            });
            // Force graph update
            this.updateGraph();
        });

        // Color controls
        ['nodeColor0', 'nodeColor1', 'nodeColor2', 'nodeColor3', 'nodeColor4'].forEach((id, index) => {
            document.getElementById(id)?.addEventListener('input', (e) => {
                this.settings.colors[`level${index}`] = e.target.value;
                this.updateGraph();
                this.updateURL();
            });
        });
    }

    setupExportControls() {
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
    }

    setupTitleControls() {
        // Title updates
        ['companyName', 'techName'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                this.updateTitles();
                this.updateURL();
            });
        });
    }

    setupResizeHandler() {
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

    updateGraph(data = null) {
        const graphType = document.getElementById('graphType')?.value || 'sankey';

        if (!data) {
            const matrixData = this.matrixInput.getData();
            data = this.flowParser.parseMatrix(matrixData);
        }

        this.switchGraph(graphType, data);
    }

    // Update URL state to include matrix data
    updateURL() {
        const state = {
            type: document.getElementById('graphType')?.value,
            matrix: this.matrixInput.getData(),
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

    // Load state from URL
    initializeFromURL() {
        const params = new URLSearchParams(window.location.search);

        // Set graph type
        const type = params.get('type') || 'sankey';
        const graphTypeSelect = document.getElementById('graphType');
        if (graphTypeSelect) graphTypeSelect.value = type;

        // Load matrix data
        try {
            const matrixData = JSON.parse(params.get('matrix') || '{}');
            if (matrixData.columns && matrixData.rows) {
                // Initialize matrix with saved data
                this.matrixInput.setData(matrixData);
            }
        } catch (e) {
            console.warn('Failed to parse matrix data from URL');
        }

        // Load other settings
        document.getElementById('companyName')?.value = params.get('company') || '';
        document.getElementById('techName')?.value = params.get('tech') || '';

        try {
            const colors = JSON.parse(params.get('colors') || '{}');
            Object.entries(colors).forEach(([key, value]) => {
                this.settings.colors[key] = value;
                document.getElementById(`nodeColor${key.slice(-1)}`)?.value = value;
            });
        } catch (e) {
            console.warn('Failed to parse color settings from URL');
        }

        // Initial graph update
        this.updateGraph();
    }

    switchGraph(type, data = null) {
        if (this.currentGraph) {
            this.currentGraph.destroy();
        }

        try {
            const matrixData = this.matrixInput.getData();
            const graphTypeMap = {
                sunburst: () => this.flowParser.parseSunburstData(matrixData),
                chord: () => this.flowParser.parseChordData(matrixData),
                circle: () => this.flowParser.parseCirclePackingData(matrixData),
                default: () => this.flowParser.parseMatrix(matrixData)
            };

            const parser = graphTypeMap[type.toLowerCase()] || graphTypeMap.default;
            const graphData = parser();

            if (!graphData) {
                throw new Error('Invalid data structure');
            }

            const graphClassMap = {
                sunburst: SunburstGraph,
                force: ForceGraph,
                chord: ChordGraph,
                circle: CirclePackingGraph,
                default: SankeyGraph
            };

            const GraphClass = graphClassMap[type.toLowerCase()] || graphClassMap.default;
            this.currentGraph = new GraphClass(this.container, graphData, this.settings);

            this.updateTitles();
            this.toggleGraphControls(type);
        } catch (error) {
            console.error('Error creating graph:', error);
            this.container.innerHTML = `<div class="error">Error creating graph: ${error.message}</div>`;
        }
    }
}