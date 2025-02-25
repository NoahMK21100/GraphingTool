export class FlowParser {
    parseMatrix(matrixData) {
        const { columns, rows } = matrixData;
        const nodes = [];
        const links = [];

        // Create nodes from matrix data
        rows.forEach((row, rowIndex) => {
            let lastValidNodeId = null;

            row.forEach((cell, colIndex) => {
                if (!cell.value.trim()) return;

                const nodeId = `${cell.value}_${colIndex}`;
                if (!nodes.some(n => n.id === nodeId)) {
                    nodes.push({
                        id: nodeId,
                        name: cell.value,
                        column: colIndex
                    });
                }

                // Create links to the last valid node we found
                if (lastValidNodeId) {
                    const weight = parseFloat(row[colIndex - 1]?.weight) || 1;
                    links.push({
                        source: lastValidNodeId,
                        target: nodeId,
                        value: weight * 10
                    });
                }

                lastValidNodeId = nodeId;
            });
        });

        const result = {
            nodes: Array.from(nodes),
            links
        };
        return result;
    }

    parseWorldMapData(matrixData) {
        const { rows } = matrixData;
        const worldData = {};

        rows.forEach(row => {
            if (row.length < 2 || !row[0].value.trim()) return;

            const country = row[0].value.trim();
            if (!worldData[country]) {
                worldData[country] = {
                    paths: []
                };
            }

            // Create a path array with all non-empty values from the row
            const path = row
                .map(cell => cell.value.trim())
                .filter(value => value !== '');

            if (path.length > 0) {
                worldData[country].paths.push(path);
            }
        });

        console.log('Processed World Map Data:', worldData);
        return worldData;
    }

    parseSunburstData(matrixData) {
        const { rows } = matrixData;
        const hierarchy = {
            name: "root",
            children: []
        };

        // Create a map to store nodes at each level
        const levelMap = new Map();

        rows.forEach(row => {
            let currentPath = [];

            row.forEach((cell, columnIndex) => {
                if (!cell.value.trim()) return;

                currentPath.push(cell.value);
                const nodeId = currentPath.join('/');

                if (!levelMap.has(nodeId)) {
                    const newNode = {
                        name: cell.value,
                        value: parseFloat(cell.weight) || 1,
                        children: []
                    };

                    levelMap.set(nodeId, newNode);

                    if (columnIndex === 0) {
                        // First level nodes go directly under root
                        hierarchy.children.push(newNode);
                    } else {
                        // Find parent using the path without the current node
                        const parentPath = currentPath.slice(0, -1).join('/');
                        const parent = levelMap.get(parentPath);
                        if (parent) {
                            if (!parent.children) {
                                parent.children = [];
                            }
                            parent.children.push(newNode);
                        }
                    }
                }
            });
        });

        // Clean up empty children arrays and set values
        const cleanHierarchy = (node) => {
            if (node.children && node.children.length === 0) {
                delete node.children;
            } else if (node.children) {
                node.children.forEach(cleanHierarchy);
                // If node has children, set its value to sum of children
                node.value = node.children.reduce((sum, child) => sum + (child.value || 0), 0);
            }
            return node;
        };

        return cleanHierarchy(hierarchy);
    }

    parseChordData(matrixData) {
        const { rows } = matrixData;
        const nodes = new Map();
        const links = [];

        // First pass: collect unique nodes
        rows.forEach(row => {
            row.forEach((cell, colIndex) => {
                if (!cell.value.trim()) return;

                const nodeId = `${cell.value}_${colIndex}`;
                if (!nodes.has(nodeId)) {
                    nodes.set(nodeId, {
                        id: nodeId,
                        name: cell.value,
                        column: colIndex
                    });
                }
            });
        });

        // Second pass: create links with values
        rows.forEach(row => {
            // Create links between all nodes in the row
            for (let i = 0; i < row.length; i++) {
                if (!row[i].value.trim()) continue;
                const sourceId = `${row[i].value}_${i}`;

                for (let j = i + 1; j < row.length; j++) {
                    if (!row[j].value.trim()) continue;
                    const targetId = `${row[j].value}_${j}`;

                    // Add bidirectional links with weights
                    const weight = parseFloat(row[i].weight) || 1;
                    links.push({
                        source: sourceId,
                        target: targetId,
                        value: weight
                    });
                }
            }
        });

        return {
            nodes: Array.from(nodes.values()),
            links: links
        };
    }

    parseCirclePackingData(matrixData) {
        const { rows } = matrixData;

        // Create a map to store unique values at each level
        const levelMap = new Map();

        // First pass: collect unique values at each level
        rows.forEach(row => {
            row.forEach((cell, index) => {
                if (!cell.value.trim()) return;

                if (!levelMap.has(index)) {
                    levelMap.set(index, new Set());
                }
                levelMap.get(index).add(cell.value);
            });
        });

        // Create the root node
        const root = {
            name: "root",
            children: []
        };

        // Convert Sets to Arrays and create initial nodes
        const levelNodes = new Map();
        levelMap.forEach((values, level) => {
            levelNodes.set(level, new Map());
            values.forEach(value => {
                levelNodes.get(level).set(value, {
                    name: value,
                    children: [],
                    value: 0
                });
            });
        });

        // Second pass: build hierarchy and calculate values
        rows.forEach(row => {
            let lastNode = null;
            let lastLevel = -1;

            row.forEach((cell, level) => {
                if (!cell.value.trim()) return;

                const currentNode = levelNodes.get(level).get(cell.value);
                currentNode.value += parseFloat(cell.weight) || 1;

                // Connect to parent if exists
                if (lastNode && level > lastLevel) {
                    if (!lastNode.children.includes(currentNode)) {
                        lastNode.children.push(currentNode);
                    }
                }

                lastNode = currentNode;
                lastLevel = level;
            });
        });

        // Add top-level nodes to root
        if (levelNodes.has(0)) {
            root.children = Array.from(levelNodes.get(0).values());
        }

        // Clean up empty children arrays and calculate final values
        const cleanNode = (node) => {
            if (!node.children || node.children.length === 0) {
                delete node.children;
                return node.value;
            }

            // Remove duplicates from children
            node.children = Array.from(new Set(node.children));

            const childrenSum = node.children.reduce((sum, child) => {
                return sum + cleanNode(child);
            }, 0);

            node.value = childrenSum + node.value;
            return node.value;
        };

        cleanNode(root);
        return root;
    }
}