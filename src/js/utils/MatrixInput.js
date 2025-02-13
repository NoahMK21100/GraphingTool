export class MatrixInput {
    constructor(container) {
        this.container = container;
        this.columns = [
            'Level 1',
            'Level 2',
            'Level 3',
            'Level 4',
            'Level 5'
        ];
        this.rows = [[]];
        this.currentGraphType = '';
        this.countryList = [
            "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
            "Bahrain", "Bangladesh", "Belarus", "Belgium", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
            "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
            "Colombia", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti",
            "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
            "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Guinea",
            "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
            "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait",
            "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Madagascar",
            "Malawi", "Malaysia", "Mali", "Mauritania", "Mexico", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique",
            "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
            "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
            "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Singapore",
            "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
            "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Trinidad and Tobago",
            "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
            "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
        ];
        this.addRow(); // Add initial row
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const addButton = this.container.querySelector('.add-row-button');
        if (addButton) {
            addButton.addEventListener('click', () => this.addRow());
        }
    }

    setGraphType(type) {
        this.currentGraphType = type;
        this.updateAllRows();
    }

    updateAllRows() {
        const rows = this.container.querySelectorAll('.matrix-row');
        rows.forEach(row => {
            row.querySelectorAll('.matrix-cell').forEach((cell, columnIndex) => {
                const currentInput = cell.querySelector('input, select');
                // If the input already exists and we're not switching to/from worldmap, just update its value
                if (currentInput &&
                    ((this.currentGraphType === 'worldmap' && currentInput.tagName === 'SELECT') ||
                        (this.currentGraphType !== 'worldmap' && currentInput.tagName === 'INPUT'))) {
                    return;
                }

                const currentValue = currentInput?.value || '';
                const currentWeight = cell.querySelector('.link-weight')?.value || '1';
                cell.innerHTML = '';

                // Create the appropriate input type
                if (columnIndex === 0 && this.currentGraphType === 'worldmap') {
                    cell.appendChild(this.createFirstColumnInput(currentValue));
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = currentValue;
                    input.style.width = '100%';
                    input.style.padding = '4px';
                    input.style.borderRadius = '4px';
                    input.style.border = '1px solid var(--border-color)';
                    input.style.backgroundColor = 'var(--input-bg)';
                    input.style.color = 'var(--text-primary)';
                    input.style.fontSize = '12px';
                    input.setAttribute('data-column', this.columns[columnIndex]);
                    // Use a debounced event listener for input changes
                    let timeout;
                    input.addEventListener('input', (e) => {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => this.emitChange(), 100);
                    });
                    cell.appendChild(input);
                }

                // Add weight input
                const weightInput = document.createElement('input');
                weightInput.type = 'number';
                weightInput.className = 'link-weight';
                weightInput.min = '0.1';
                weightInput.step = '0.1';
                weightInput.value = currentWeight;
                // Use a debounced event listener for weight changes
                let timeout;
                weightInput.addEventListener('input', (e) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => this.emitChange(), 100);
                });
                cell.appendChild(weightInput);
            });
        });
    }

    createFirstColumnInput(value = '') {
        let input;
        if (this.currentGraphType === 'worldmap') {
            input = document.createElement('select');
            input.className = 'country-select';
            input.style.width = '100%';
            input.style.padding = '4px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid var(--border-color)';
            input.style.backgroundColor = 'var(--input-bg)';
            input.style.color = 'var(--text-primary)';
            input.style.fontSize = '12px';

            // Add empty option
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Select a country...';
            input.appendChild(emptyOption);

            // Add country options
            this.countryList.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                if (country === value) {
                    option.selected = true;
                }
                input.appendChild(option);
            });

            input.addEventListener('change', () => this.emitChange());
        } else {
            // For all other graph types, create a regular text input
            input = document.createElement('input');
            input.type = 'text';
            input.value = value;
            input.style.width = '100%';
            input.style.padding = '4px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid var(--border-color)';
            input.style.backgroundColor = 'var(--input-bg)';
            input.style.color = 'var(--text-primary)';
            input.style.fontSize = '12px';
            input.setAttribute('data-column', this.columns[0]);
            // Use a debounced event listener for input changes
            let timeout;
            input.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.emitChange(), 100);
            });
        }
        return input;
    }

    addRow() {
        const row = document.createElement('div');
        row.className = 'matrix-row';

        // Create cells with inputs
        this.columns.forEach((columnName, index) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';

            // Add main input (either select for first column in world map or text input)
            if (index === 0 && this.currentGraphType === 'worldmap') {
                cell.appendChild(this.createFirstColumnInput());
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.style.width = '100%';
                input.style.padding = '4px';
                input.style.borderRadius = '4px';
                input.style.border = '1px solid var(--border-color)';
                input.style.backgroundColor = 'var(--input-bg)';
                input.style.color = 'var(--text-primary)';
                input.style.fontSize = '12px';
                input.setAttribute('data-column', columnName);
                // Use a debounced event listener for input changes
                let timeout;
                input.addEventListener('input', (e) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => this.emitChange(), 100);
                });
                cell.appendChild(input);
            }

            // Add weight input
            const weightInput = document.createElement('input');
            weightInput.type = 'number';
            weightInput.className = 'link-weight';
            weightInput.min = '0.1';
            weightInput.step = '0.1';
            weightInput.value = '1';
            // Use a debounced event listener for weight changes
            let timeout;
            weightInput.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.emitChange(), 100);
            });
            cell.appendChild(weightInput);

            row.appendChild(cell);
        });

        const rowContainer = document.createElement('div');
        rowContainer.className = 'row-container';
        rowContainer.appendChild(row);

        // Add action buttons
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

        // Copy text/select input values
        const originalInputs = originalRow.querySelectorAll('input[type="text"], select');
        const newInputs = newRow.querySelectorAll('input[type="text"], select');
        newInputs.forEach((input, index) => {
            input.value = originalInputs[index].value;
            input.addEventListener('input', () => this.emitChange());
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => this.emitChange());
            }
        });

        // Copy weight input values for all columns except the last
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

        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('.matrix-cell');

            cells.forEach(cell => {
                // Check for both input and select elements
                const inputElement = cell.querySelector('input[type="text"], select');
                const weightInput = cell.querySelector('.link-weight');

                rowData.push({
                    value: inputElement ? inputElement.value : '',
                    weight: weightInput ? parseFloat(weightInput.value) || 1 : 1
                });
            });

            // Only add row if it has at least one non-empty value
            if (rowData.some(item => item.value.trim())) {
                data.push(rowData);
            }
        });

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

            rowData.forEach((item, index) => {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';

                // Create main input (either select or text input)
                if (index === 0 && this.currentGraphType === 'worldmap') {
                    cell.appendChild(this.createFirstColumnInput(item.value));
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = item.value;
                    input.addEventListener('input', () => this.emitChange());
                    cell.appendChild(input);
                }

                // Add weight input for all columns
                const weightInput = document.createElement('input');
                weightInput.type = 'number';
                weightInput.className = 'link-weight';
                weightInput.min = '0.1';
                weightInput.step = '0.1';
                weightInput.value = item.weight ? item.weight.toString() : '1';
                weightInput.addEventListener('input', () => this.emitChange());
                cell.appendChild(weightInput);

                row.appendChild(cell);
            });

            const rowContainer = document.createElement('div');
            rowContainer.className = 'row-container';
            rowContainer.appendChild(row);

            // Add action buttons
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