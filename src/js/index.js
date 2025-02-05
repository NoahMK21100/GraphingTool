// src/js/index.js
import { ForceGraph } from './graphs/ForceGraph';
import { SankeyGraph } from './graphs/SankeyGraph';
import { SunburstGraph } from './graphs/SunburstGraph';
import { ChordGraph } from './graphs/ChordGraph';
import { CirclePackingGraph } from './graphs/CirclePackingGraph';
import { FlowParser } from './utils/FlowParser';
import { exportToSVG, exportToPNG } from './utils/exportUtils';
import { MatrixInput } from './utils/MatrixInput';

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
            sankey: {
                nodePadding: 30
            },
            force: {
                linkDistance: 100,
                chargeStrength: -300
            }
        };

        this.colorPresets = {
            default: ['#818cf8', '#a78bfa', '#ec4899', '#f43f5e'],
            distinct: ['#2563eb', '#7c3aed', '#db2777', '#dc2626'],
            nature: ['#059669', '#8b5cf6', '#d97706', '#b91c1c'],
            contrast: ['#0369a1', '#4f46e5', '#be185d', '#b45309'],
            modern: ['#0284c7', '#7c3aed', '#e11d48', '#ea580c'],
            bold: ['#1d4ed8', '#7e22ce', '#be123c', '#92400e'],
            vivid: ['#0ea5e9', '#8b5cf6', '#f43f5e', '#f59e0b'],
            deep: ['#1e40af', '#6d28d9', '#9d174d', '#92400e'],
            bright: ['#0284c7', '#6d28d9', '#db2777', '#ea580c']
        };

        this.setupEventListeners();
        this.setupThemeToggle();
        this.initializeFromURL();

        // Add this to your initialization code
        document.querySelector('.add-row-button').addEventListener('click', () => {
            this.matrixInput.addRow();
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

        ['nodeColor0', 'nodeColor1', 'nodeColor2', 'nodeColor3', 'nodeColor4'].forEach((id, index) => {
            document.getElementById(id)?.addEventListener('input', (e) => {
                this.settings.colors[`level${index}`] = e.target.value;
                this.updateGraph();
                this.updateURL();
            });
        });

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
        // Hide all controls first
        document.querySelectorAll('[data-graph-type]').forEach(el => {
            el.classList.remove('active');
        });

        // Show selected graph's controls
        const controls = document.querySelector(`[data-graph-type="${type}"]`);
        if (controls) {
            controls.classList.add('active');
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