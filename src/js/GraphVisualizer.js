import MatrixInput from '../components/MatrixInput';

class GraphVisualizer {
    constructor() {
        // Initialize container reference
        this.container = document.getElementById('visualization-container');
        if (!this.container) {
            throw new Error('Visualization container not found');
        }

        // Clear container
        this.container.innerHTML = '';

        // Create wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'graph-wrapper';

        // Create title container FIRST
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';

        const title = document.createElement('h1');
        title.className = 'main-title';
        const subtitle = document.createElement('p');
        subtitle.className = 'subtitle';

        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);
        this.wrapper.appendChild(titleContainer);

        // Create chart container SECOND
        this.chartContainer = document.createElement('div');
        this.chartContainer.className = 'chart-container';
        this.wrapper.appendChild(this.chartContainer);

        // Append wrapper to container LAST
        this.container.appendChild(this.wrapper);

        // Initialize settings with default values
        this.settings = {
            colors: {
                level0: document.getElementById('nodeColor0')?.value || '#818cf8',
                level1: document.getElementById('nodeColor1')?.value || '#a78bfa',
                level2: document.getElementById('nodeColor2')?.value || '#ec4899',
                level3: document.getElementById('nodeColor3')?.value || '#f43f5e',
                level4: document.getElementById('nodeColor4')?.value || '#f59e0b'
            },
            sankey: {
                nodePadding: 30
            },
            force: {
                linkDistance: 100,
                chargeStrength: -300
            }
        };

        this.flowParser = new FlowParser();
        this.setupEventListeners();
        this.initializeFromURL();

        // Initialize MatrixInput
        const inputContainer = document.getElementById('input-container');
        this.matrixInput = new MatrixInput(inputContainer);
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
        // Clear container
        if (this.currentGraph) {
            this.currentGraph.destroy();
        }

        try {
            const matrixData = this.matrixInput.getData();
            let graphData;

            // Use appropriate data format based on graph type
            if (type.toLowerCase() === 'sunburst') {
                graphData = this.flowParser.parseSunburstData(matrixData);
            } else if (type.toLowerCase() === 'chord') {
                graphData = this.flowParser.parseChordData(matrixData);
            } else if (type.toLowerCase() === 'circle') {
                graphData = this.flowParser.parseCirclePackingData(matrixData);
            } else {
                graphData = this.flowParser.parseMatrix(matrixData);
            }

            if (!graphData) {
                throw new Error('Invalid data structure');
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
                default:
                    this.currentGraph = new SankeyGraph(this.container, graphData, this.settings);
                    break;
            }

            this.updateTitles();
            this.toggleGraphControls(type);
        } catch (error) {
            console.error('Error creating graph:', error);
            this.container.innerHTML = `<div class="error">Error creating graph: ${error.message}</div>`;
        }
    }
}