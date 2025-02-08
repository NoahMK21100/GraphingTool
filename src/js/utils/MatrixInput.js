export class MatrixInput {
    constructor(container) {
        this.container = container;
        this.columns = [
            'Mission Type',
            'Domain',
            'Operation Type',
            'System Type',
            'Platform',
            'Variant'
        ];
        this.rows = [[]];
        this.addRow(); // Add initial row
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const addButton = this.container.querySelector('.add-row-button');
        if (addButton) {
            addButton.addEventListener('click', () => this.addRow());
        }
    }

    addRow() {
        const row = document.createElement('div');
        row.className = 'matrix-row';

        // Create cells with inputs
        this.columns.forEach((columnName, index) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';

            const input = document.createElement('input');
            input.type = 'text';
            input.setAttribute('data-column', columnName);
            input.addEventListener('input', () => this.emitChange());
            cell.appendChild(input);

            if (index < this.columns.length - 1) {
                const weightInput = document.createElement('input');
                weightInput.type = 'number';
                weightInput.className = 'link-weight';
                weightInput.min = '0.1';
                weightInput.step = '0.1';
                weightInput.value = '1';
                weightInput.addEventListener('input', () => this.emitChange());
                cell.appendChild(weightInput);
            }

            row.appendChild(cell);
        });

        const rowContainer = document.createElement('div');
        rowContainer.className = 'row-container';
        rowContainer.appendChild(row);

        // Create action buttons container
        const actionButtons = document.createElement('div');
        actionButtons.className = 'row-action-buttons';

        const duplicateBtn = document.createElement('button');
        duplicateBtn.className = 'row-btn duplicate';
        duplicateBtn.textContent = 'Duplicate';
        duplicateBtn.onclick = () => {
            const newRowContainer = this.duplicateRow(rowContainer);
            rowContainer.parentNode.insertBefore(newRowContainer, rowContainer.nextSibling);
            this.emitChange();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'row-btn delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            const allRows = this.container.querySelectorAll('.row-container');
            if (allRows.length > 1) {
                rowContainer.remove();
                this.emitChange();
            }
        };

        actionButtons.appendChild(duplicateBtn);
        actionButtons.appendChild(deleteBtn);
        rowContainer.appendChild(actionButtons);

        this.container.appendChild(rowContainer);
        this.rows.push(row);
    }

    duplicateRow(rowContainer) {
        const originalRow = rowContainer.querySelector('.matrix-row');
        const newRowContainer = document.createElement('div');
        newRowContainer.className = 'row-container';

        const newRow = originalRow.cloneNode(true);

        // Copy text input values
        const originalInputs = originalRow.querySelectorAll('input[type="text"]');
        const newInputs = newRow.querySelectorAll('input[type="text"]');
        newInputs.forEach((input, index) => {
            input.value = originalInputs[index].value;
            input.addEventListener('input', () => this.emitChange());
        });

        // Copy weight input values
        const originalWeights = originalRow.querySelectorAll('.link-weight');
        const newWeights = newRow.querySelectorAll('.link-weight');
        newWeights.forEach((input, index) => {
            input.value = originalWeights[index].value;
            input.addEventListener('input', () => this.emitChange());
        });

        newRowContainer.appendChild(newRow);

        // Clone action buttons
        const newActionButtons = rowContainer.querySelector('.row-action-buttons').cloneNode(true);
        newActionButtons.querySelector('.duplicate').onclick = () => {
            const newerRowContainer = this.duplicateRow(newRowContainer);
            newRowContainer.parentNode.insertBefore(newerRowContainer, newRowContainer.nextSibling);
            this.emitChange();
        };
        newActionButtons.querySelector('.delete').onclick = () => {
            const allRows = this.container.querySelectorAll('.row-container');
            if (allRows.length > 1) {
                newRowContainer.remove();
                this.emitChange();
            }
        };

        newRowContainer.appendChild(newActionButtons);
        return newRowContainer;
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
            let currentLevel = hierarchy;

            row.forEach((cell, columnIndex) => {
                if (!cell.value.trim()) return;

                const nodeId = `${cell.value}_${columnIndex}`;
                if (!levelMap.has(nodeId)) {
                    const newNode = {
                        name: cell.value,
                        value: parseFloat(cell.weight) || 1,
                        children: []
                    };

                    levelMap.set(nodeId, newNode);

                    if (columnIndex === 0) {
                        hierarchy.children.push(newNode);
                    } else {
                        const parentCell = row[columnIndex - 1];
                        if (parentCell && parentCell.value.trim()) {
                            const parentId = `${parentCell.value}_${columnIndex - 1}`;
                            const parent = levelMap.get(parentId);
                            if (parent) {
                                parent.children.push(newNode);
                            }
                        }
                    }
                }
            });
        });

        return hierarchy;
    }

    getData() {
        const data = [];
        const rows = this.container.querySelectorAll('.matrix-row');

        console.log("Getting data from matrix rows:", rows.length); // Debug log

        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('.matrix-cell');

            cells.forEach(cell => {
                const textInput = cell.querySelector('input[type="text"]');
                const weightInput = cell.querySelector('.link-weight');

                console.log("Cell value:", textInput?.value, "Weight:", weightInput?.value); // Debug log

                rowData.push({
                    value: textInput ? textInput.value : '',
                    weight: weightInput ? parseFloat(weightInput.value) || 1 : 1
                });
            });

            if (rowData.some(item => item.value)) {
                data.push(rowData);
            }
        });

        console.log("Final matrix data:", data); // Debug log
        return {
            columns: this.columns,
            rows: data
        };
    }

    setData(data) {
        this.container.innerHTML = '';
        data.rows.forEach((rowData) => {
            const row = document.createElement('div');
            row.className = 'matrix-row';

            rowData.forEach((item) => {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';

                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.value = item.value;
                textInput.addEventListener('input', () => this.emitChange());

                cell.appendChild(textInput);

                if (item.weight !== undefined) {
                    const weightInput = document.createElement('input');
                    weightInput.type = 'number';
                    weightInput.className = 'link-weight';
                    weightInput.min = '0.1';
                    weightInput.step = '0.1';
                    weightInput.value = item.weight.toString();
                    weightInput.addEventListener('input', () => this.emitChange());
                    cell.appendChild(weightInput);
                }

                row.appendChild(cell);
            });

            this.container.appendChild(row);
        });
    }

    emitChange() {
        const event = new CustomEvent('matrixchange', {
            detail: this.getData()
        });
        this.container.dispatchEvent(event);
    }

    setColumns(columns) {
        this.columns = columns;
        // Clear and rebuild the header
        const header = this.container.querySelector('.matrix-header');
        if (header) {
            header.remove();
        }
        this.buildHeader();
    }

    buildHeader() {
        const header = document.createElement('div');
        header.className = 'matrix-header';
        this.columns.forEach(column => {
            const cell = document.createElement('div');
            cell.className = 'header-cell';
            cell.textContent = column;
            header.appendChild(cell);
        });
        this.container.insertBefore(header, this.container.firstChild);
    }
} 