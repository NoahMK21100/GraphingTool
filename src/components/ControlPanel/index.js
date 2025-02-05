import React, { useState } from 'react';
import './ControlPanel.css';

const ControlPanel = ({ onUpdateGraph }) => {
    const [activeTab, setActiveTab] = useState('edit');
    const [nodes, setNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodeName, setNodeName] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    const handleAddNode = () => {
        if (!nodeName) return;

        const newNode = {
            id: nodes.length + 1,
            name: nodeName,
            section: selectedSection
        };

        const updatedNodes = [...nodes, newNode];
        setNodes(updatedNodes);
        onUpdateGraph({ type: 'ADD_NODE', node: newNode });
        setNodeName('');
        setSelectedSection('');
    };

    return (
        <div className="control-panel">
            {/* Tab Navigation */}
            <div className="tab-navigation">
                <button
                    className={`tab ${activeTab === 'edit' ? 'active' : ''}`}
                    onClick={() => setActiveTab('edit')}
                >
                    Edit
                </button>
                <button
                    className={`tab ${activeTab === 'connect' ? 'active' : ''}`}
                    onClick={() => setActiveTab('connect')}
                >
                    Connect
                </button>
                <button
                    className={`tab ${activeTab === 'style' ? 'active' : ''}`}
                    onClick={() => setActiveTab('style')}
                >
                    Style
                </button>
            </div>

            {/* Edit Tab */}
            {activeTab === 'edit' && (
                <div className="tab-content">
                    <div className="edit-node">
                        <h3>Edit Node</h3>
                        <input
                            type="text"
                            placeholder="Node Name"
                            value={nodeName}
                            onChange={(e) => setNodeName(e.target.value)}
                            className="input-field"
                        />
                        <select
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                            className="input-field"
                        >
                            <option value="">Select Section</option>
                            <option value="1">Section 1</option>
                            <option value="2">Section 2</option>
                            <option value="3">Section 3</option>
                        </select>
                        <button onClick={handleAddNode} className="button primary">
                            Add New Node
                        </button>
                    </div>

                    <div className="nodes-list">
                        <h3>Nodes</h3>
                        <div className="nodes-container">
                            {nodes.map((node) => (
                                <div
                                    key={node.id}
                                    className={`node-item ${selectedNode?.id === node.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedNode(node)}
                                >
                                    {node.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Connect Tab */}
            {activeTab === 'connect' && (
                <div className="tab-content">
                    <h3>Create Connection</h3>
                    <select className="input-field">
                        <option value="">Source Node</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.name}</option>
                        ))}
                    </select>
                    <select className="input-field">
                        <option value="">Target Node</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.name}</option>
                        ))}
                    </select>
                    <div className="weight-slider">
                        <label>Weight:</label>
                        <input type="range" min="1" max="10" defaultValue="5" />
                        <span>5</span>
                    </div>
                    <button className="button primary">Add Connection</button>
                    <div className="connections-list">
                        <h3>Existing Connections</h3>
                        <div className="connections-container">
                            {/* Connections will be listed here */}
                        </div>
                    </div>
                </div>
            )}

            {/* Style Tab */}
            {activeTab === 'style' && (
                <div className="tab-content">
                    <h3>Color Scheme</h3>
                    <select className="input-field">
                        <option value="default">Default</option>
                    </select>

                    {/* Node Colors */}
                    <div className="node-colors">
                        <div>
                            <label>Level 1</label>
                            <span style={{ backgroundColor: document.getElementById('nodeColor1')?.value || '#818cf8' }}></span>
                        </div>
                        <div>
                            <label>Level 2</label>
                            <span style={{ backgroundColor: document.getElementById('nodeColor2')?.value || '#a78bfa' }}></span>
                        </div>
                        <div>
                            <label>Level 3</label>
                            <span style={{ backgroundColor: document.getElementById('nodeColor3')?.value || '#ec4899' }}></span>
                        </div>
                        <div>
                            <label>Level 4</label>
                            <span style={{ backgroundColor: document.getElementById('nodeColor4')?.value || '#f43f5e' }}></span>
                        </div>
                        <div>
                            <label>Level 5</label>
                            <span style={{ backgroundColor: document.getElementById('nodeColor5')?.value || '#f59e0b' }}></span>
                        </div>
                    </div>

                    {/* Sankey Settings */}
                    <div className="sankey-controls" data-graph-type="sankey">
                        <h3>Sankey Settings</h3>
                        <div className="spacing-control">
                            <label>Node Padding</label>
                            <input type="range" id="nodePadding" min="0" max="100" value="30" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ControlPanel;