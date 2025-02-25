export class MatrixInput {
    constructor(container) {
        this.container = container;
        this.columns = ['Technology', 'Master Effects', 'Tech Type', 'Subsystem', 'Component', 'Manufacturer'];
        this.rows = [[]];
        this.currentGraphType = 'sankey';
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
        this.aukusCountryStateMap = {
            'United States': [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
                'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
                'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
                'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
                'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
                'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
                'Wisconsin', 'Wyoming'
            ],
            'Australia': [
                'Western Australia', 'Northern Territory', 'South Australia', 'Queensland',
                'New South Wales', 'Victoria', 'Tasmania', 'Australian Capital Territory'
            ],
            'United Kingdom': [
                'England', 'Scotland', 'Wales', 'Northern Ireland'
            ]
        };
        this.masterEffects = [
            'Attrite', 'Block', 'Breach', 'Canalise', 'Clear', 'Coerce', 'Contain',
            'Control', 'Damage', 'Deceive', 'Defeat', 'Defend', 'Degrade', 'Delay',
            'Deny', 'Destroy', 'Deter', 'Dimish', 'Disrupt', 'Divert', 'Educate',
            'Enhance', 'Exploit', 'Expose', 'Guard', 'Harass', 'Influence', 'Inform',
            'Interdict', 'Isolate', 'Know', 'Limit', 'Mislead', 'Neutralise',
            'Penetrate', 'Persuade', 'Prevent', 'Protect', 'Retain', 'Secure',
            'Shape', 'Stabilise', 'Suppress', 'Undermine', 'Understand', 'Usurp'
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
                const currentInput = cell.querySelector('input[type="text"], select');
                const currentWeightInput = cell.querySelector('.link-weight');
                const currentValue = currentInput?.value || '';
                const currentWeight = currentWeightInput?.value || '1';

                // Only update if we need to change input type for special map cases
                const needsUpdate = (
                    (this.currentGraphType === 'worldmap' && columnIndex === 0) ||
                    (this.currentGraphType === 'aukusmap' && (columnIndex === 0 || columnIndex === 1))
                );

                if (!needsUpdate) {
                    // Keep existing text input if it exists
                    if (!currentInput || currentInput.tagName !== 'INPUT') {
                        cell.innerHTML = '';
                        const input = this.createDefaultInput(currentValue, columnIndex);
                        cell.appendChild(input);
                        cell.appendChild(this.createWeightInput(currentWeight));
                    }
                    return;
                }

                cell.innerHTML = '';

                // Handle World Map
                if (this.currentGraphType === 'worldmap' && columnIndex === 0) {
                    const countrySelect = document.createElement('select');
                    countrySelect.className = 'country-select';
                    countrySelect.style.width = '100%';
                    countrySelect.style.padding = '4px';
                    countrySelect.style.borderRadius = '4px';
                    countrySelect.style.border = '1px solid var(--border-color)';
                    countrySelect.style.backgroundColor = 'var(--input-bg)';
                    countrySelect.style.color = 'var(--text-primary)';
                    countrySelect.style.fontSize = '12px';

                    const emptyOption = document.createElement('option');
                    emptyOption.value = '';
                    emptyOption.textContent = 'Select a country...';
                    countrySelect.appendChild(emptyOption);

                    this.countryList.forEach(country => {
                        const option = document.createElement('option');
                        option.value = country;
                        option.textContent = country;
                        if (country === currentValue) {
                            option.selected = true;
                        }
                        countrySelect.appendChild(option);
                    });

                    countrySelect.addEventListener('change', () => this.emitChange());
                    cell.appendChild(countrySelect);
                    cell.appendChild(this.createWeightInput(currentWeight));
                    return;
                }
                // Handle AUKUS Map
                else if (this.currentGraphType === 'aukusmap') {
                    if (columnIndex === 0) {
                        // Country dropdown
                        const countrySelect = document.createElement('select');
                        countrySelect.className = 'country-select';
                        countrySelect.style.width = '100%';
                        countrySelect.style.padding = '4px';
                        countrySelect.style.borderRadius = '4px';
                        countrySelect.style.border = '1px solid var(--border-color)';
                        countrySelect.style.backgroundColor = 'var(--input-bg)';
                        countrySelect.style.color = 'var(--text-primary)';
                        countrySelect.style.fontSize = '12px';

                        const emptyOption = document.createElement('option');
                        emptyOption.value = '';
                        emptyOption.textContent = 'Select a country...';
                        countrySelect.appendChild(emptyOption);

                        Object.keys(this.aukusCountryStateMap).forEach(country => {
                            const option = document.createElement('option');
                            option.value = country;
                            option.textContent = country;
                            if (country === currentValue) {
                                option.selected = true;
                            }
                            countrySelect.appendChild(option);
                        });

                        countrySelect.addEventListener('change', (e) => {
                            const selectedCountry = e.target.value;
                            const stateSelect = row.querySelectorAll('.matrix-cell')[1].querySelector('.state-select');

                            // Clear existing options except the first one
                            while (stateSelect.options.length > 1) {
                                stateSelect.remove(1);
                            }

                            if (selectedCountry) {
                                const states = this.aukusCountryStateMap[selectedCountry] || [];
                                states.forEach(state => {
                                    const option = document.createElement('option');
                                    option.value = state;
                                    option.textContent = state;
                                    stateSelect.appendChild(option);
                                });
                            }
                            this.emitChange();
                        });

                        cell.appendChild(countrySelect);
                        cell.appendChild(this.createWeightInput(currentWeight));
                        return;
                    }

                    if (columnIndex === 1) {
                        // Create state select that's always visible
                        const stateSelect = document.createElement('select');
                        stateSelect.className = 'state-select';
                        stateSelect.style.width = '100%';
                        stateSelect.style.padding = '4px';
                        stateSelect.style.borderRadius = '4px';
                        stateSelect.style.border = '1px solid var(--border-color)';
                        stateSelect.style.backgroundColor = 'var(--input-bg)';
                        stateSelect.style.color = 'var(--text-primary)';
                        stateSelect.style.fontSize = '12px';

                        const emptyOption = document.createElement('option');
                        emptyOption.value = '';
                        emptyOption.textContent = 'Select a state...';
                        stateSelect.appendChild(emptyOption);

                        // Get the selected country from the first column
                        const selectedCountry = row.querySelectorAll('.matrix-cell')[0].querySelector('select')?.value;

                        if (selectedCountry) {
                            const states = this.aukusCountryStateMap[selectedCountry] || [];
                            states.forEach(state => {
                                const option = document.createElement('option');
                                option.value = state;
                                option.textContent = state;
                                if (state === currentValue) {
                                    option.selected = true;
                                }
                                stateSelect.appendChild(option);
                            });
                        }

                        stateSelect.addEventListener('change', () => this.emitChange());
                        cell.appendChild(stateSelect);
                        cell.appendChild(this.createWeightInput(currentWeight));
                        return;
                    }
                }
                // Default case: regular text input
                else {
                    const input = this.createDefaultInput(currentValue, columnIndex);
                    cell.appendChild(input);
                    cell.appendChild(this.createWeightInput(currentWeight));
                }
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

    createDefaultInput(value = '', columnIndex = 0) {
        // If this is the Master Effects column (index 1), create a dropdown for non-map types
        if (columnIndex === 1 && this.currentGraphType !== 'worldmap' && this.currentGraphType !== 'aukusmap') {
            const select = document.createElement('select');
            select.className = 'matrix-input';
            this.setupSelectStyles(select);

            // Add empty option
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Select Effect...';
            select.appendChild(emptyOption);

            // Add master effects options
            this.masterEffects.forEach(effect => {
                const option = document.createElement('option');
                option.value = effect;
                option.textContent = effect;
                if (effect === value) {
                    option.selected = true;
                }
                select.appendChild(option);
            });

            select.addEventListener('change', () => {
                // Ensure the change event is emitted even when selecting empty option
                this.emitChange();
            });
            return select;
        }

        // For other columns or map types, create regular text input
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'matrix-input';
        input.value = value;
        input.addEventListener('input', () => this.emitChange());
        return input;
    }

    createWeightInput(value = '1') {
        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.className = 'link-weight';
        weightInput.min = '0.1';
        weightInput.step = '0.1';
        weightInput.value = value;
        weightInput.style.width = '100%';
        weightInput.style.padding = '4px';
        weightInput.style.marginTop = '4px';
        weightInput.style.borderRadius = '4px';
        weightInput.style.border = '1px solid var(--border-color)';
        weightInput.style.backgroundColor = 'var(--input-bg)';
        weightInput.style.color = 'var(--text-primary)';
        weightInput.style.fontSize = '12px';
        weightInput.addEventListener('input', () => this.emitChange());
        return weightInput;
    }

    createAukusInputs(cell, currentValue = '') {
        const currentWeight = cell.querySelector('input[type="number"]')?.value || '1';

        // Clear existing content
        cell.innerHTML = '';

        // Create country select
        const countrySelect = document.createElement('select');
        countrySelect.className = 'country-select';
        countrySelect.style.width = '100%';
        countrySelect.style.padding = '4px';
        countrySelect.style.borderRadius = '4px';
        countrySelect.style.border = '1px solid var(--border-color)';
        countrySelect.style.backgroundColor = 'var(--input-bg)';
        countrySelect.style.color = 'var(--text-primary)';
        countrySelect.style.fontSize = '12px';

        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Select a country...';
        countrySelect.appendChild(emptyOption);

        // Add country options
        Object.keys(this.aukusCountryStateMap).forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });

        // Create state select (always visible but initially empty)
        const stateSelect = document.createElement('select');
        stateSelect.className = 'state-select';
        stateSelect.style.width = '100%';
        stateSelect.style.padding = '4px';
        stateSelect.style.borderRadius = '4px';
        stateSelect.style.border = '1px solid var(--border-color)';
        stateSelect.style.backgroundColor = 'var(--input-bg)';
        stateSelect.style.color = 'var(--text-primary)';
        stateSelect.style.fontSize = '12px';
        stateSelect.style.marginTop = '4px';

        // Add empty option to state select
        const emptyStateOption = document.createElement('option');
        emptyStateOption.value = '';
        emptyStateOption.textContent = 'Select a state...';
        stateSelect.appendChild(emptyStateOption);

        // Add event listener for country selection
        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;

            // Clear state select
            stateSelect.innerHTML = '';
            stateSelect.appendChild(emptyStateOption);

            if (selectedCountry) {
                const states = this.aukusCountryStateMap[selectedCountry] || [];
                states.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            }

            this.emitChange();
        });

        // Add event listener for state selection
        stateSelect.addEventListener('change', () => this.emitChange());

        // Set initial values if they exist
        if (currentValue) {
            const [country, state] = currentValue.split('|');
            if (country) {
                countrySelect.value = country;
                // Trigger change event to populate states
                const event = new Event('change');
                countrySelect.dispatchEvent(event);

                if (state) {
                    stateSelect.value = state;
                }
            }
        }

        // Append selects and weight input
        cell.appendChild(countrySelect);
        cell.appendChild(stateSelect);
        cell.appendChild(this.createWeightInput(currentWeight));
    }

    addRow() {
        const row = document.createElement('div');
        row.className = 'matrix-row';

        // Create cells with inputs
        this.columns.forEach((columnName, index) => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';

            // Handle special cases for World Map and AUKUS Map
            if (this.currentGraphType === 'worldmap' && index === 0) {
                // Create country dropdown for World Map
                const countrySelect = document.createElement('select');
                countrySelect.className = 'country-select';
                countrySelect.style.width = '100%';
                countrySelect.style.padding = '4px';
                countrySelect.style.borderRadius = '4px';
                countrySelect.style.border = '1px solid var(--border-color)';
                countrySelect.style.backgroundColor = 'var(--input-bg)';
                countrySelect.style.color = 'var(--text-primary)';
                countrySelect.style.fontSize = '12px';

                const emptyOption = document.createElement('option');
                emptyOption.value = '';
                emptyOption.textContent = 'Select a country...';
                countrySelect.appendChild(emptyOption);

                this.countryList.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    countrySelect.appendChild(option);
                });

                countrySelect.addEventListener('change', () => this.emitChange());
                cell.appendChild(countrySelect);
            } else if (this.currentGraphType === 'aukusmap') {
                if (index === 0) {
                    // Create AUKUS country dropdown
                    const countrySelect = document.createElement('select');
                    countrySelect.className = 'country-select';
                    countrySelect.style.width = '100%';
                    countrySelect.style.padding = '4px';
                    countrySelect.style.borderRadius = '4px';
                    countrySelect.style.border = '1px solid var(--border-color)';
                    countrySelect.style.backgroundColor = 'var(--input-bg)';
                    countrySelect.style.color = 'var(--text-primary)';
                    countrySelect.style.fontSize = '12px';

                    const emptyOption = document.createElement('option');
                    emptyOption.value = '';
                    emptyOption.textContent = 'Select a country...';
                    countrySelect.appendChild(emptyOption);

                    Object.keys(this.aukusCountryStateMap).forEach(country => {
                        const option = document.createElement('option');
                        option.value = country;
                        option.textContent = country;
                        countrySelect.appendChild(option);
                    });

                    countrySelect.addEventListener('change', (e) => {
                        const selectedCountry = e.target.value;
                        const stateCell = row.querySelectorAll('.matrix-cell')[1];
                        stateCell.innerHTML = '';

                        if (selectedCountry) {
                            const stateSelect = document.createElement('select');
                            stateSelect.className = 'state-select';
                            stateSelect.style.width = '100%';
                            stateSelect.style.padding = '4px';
                            stateSelect.style.borderRadius = '4px';
                            stateSelect.style.border = '1px solid var(--border-color)';
                            stateSelect.style.backgroundColor = 'var(--input-bg)';
                            stateSelect.style.color = 'var(--text-primary)';
                            stateSelect.style.fontSize = '12px';

                            const emptyStateOption = document.createElement('option');
                            emptyStateOption.value = '';
                            emptyStateOption.textContent = 'Select a state...';
                            stateSelect.appendChild(emptyStateOption);

                            const states = this.aukusCountryStateMap[selectedCountry] || [];
                            states.forEach(state => {
                                const option = document.createElement('option');
                                option.value = state;
                                option.textContent = state;
                                stateSelect.appendChild(option);
                            });

                            stateSelect.addEventListener('change', () => this.emitChange());
                            stateCell.appendChild(stateSelect);
                            stateCell.appendChild(this.createWeightInput('1'));
                        }
                        this.emitChange();
                    });

                    cell.appendChild(countrySelect);
                }
            } else {
                // Default case: regular text input
                const input = this.createDefaultInput('', index);
                cell.appendChild(input);
            }

            // Add weight input for all cells except AUKUS Map state cell (index 1)
            if (!(this.currentGraphType === 'aukusmap' && index === 1)) {
                const weightInput = this.createWeightInput('1');
                cell.appendChild(weightInput);
            }

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

        // Copy text/select input values and add event listeners
        const originalInputs = originalRow.querySelectorAll('input[type="text"], select');
        const newInputs = newRow.querySelectorAll('input[type="text"], select');
        newInputs.forEach((input, index) => {
            input.value = originalInputs[index].value;
            input.addEventListener('input', () => this.emitChange());
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => this.emitChange());
            }
        });

        // Copy weight input values and add event listeners
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
        // Store the current graph type to maintain proper input types
        const currentType = this.currentGraphType;

        // Clear the container
        this.container.innerHTML = '';

        // If no data or empty rows, create one empty row with proper input types
        if (!data.rows || data.rows.length === 0) {
            // Create a new empty row
            const row = document.createElement('div');
            row.className = 'matrix-row';

            // Create cells with proper input types based on current graph type
            this.columns.forEach((columnName, index) => {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';

                if (currentType === 'worldmap' && index === 0) {
                    // Create country dropdown for World Map
                    const countrySelect = document.createElement('select');
                    countrySelect.className = 'country-select';
                    this.setupSelectStyles(countrySelect);

                    const emptyOption = document.createElement('option');
                    emptyOption.value = '';
                    emptyOption.textContent = 'Select a country...';
                    countrySelect.appendChild(emptyOption);

                    this.countryList.forEach(country => {
                        const option = document.createElement('option');
                        option.value = country;
                        option.textContent = country;
                        countrySelect.appendChild(option);
                    });

                    countrySelect.addEventListener('change', () => this.emitChange());
                    cell.appendChild(countrySelect);
                } else if (currentType === 'aukusmap') {
                    if (index === 0) {
                        // Create AUKUS country dropdown
                        const countrySelect = document.createElement('select');
                        countrySelect.className = 'country-select';
                        this.setupSelectStyles(countrySelect);

                        const emptyOption = document.createElement('option');
                        emptyOption.value = '';
                        emptyOption.textContent = 'Select a country...';
                        countrySelect.appendChild(emptyOption);

                        Object.keys(this.aukusCountryStateMap).forEach(country => {
                            const option = document.createElement('option');
                            option.value = country;
                            option.textContent = country;
                            countrySelect.appendChild(option);
                        });

                        countrySelect.addEventListener('change', (e) => {
                            const selectedCountry = e.target.value;
                            const stateCell = row.querySelectorAll('.matrix-cell')[1];
                            stateCell.innerHTML = '';

                            if (selectedCountry) {
                                const stateSelect = document.createElement('select');
                                stateSelect.className = 'state-select';
                                this.setupSelectStyles(stateSelect);

                                const emptyStateOption = document.createElement('option');
                                emptyStateOption.value = '';
                                emptyStateOption.textContent = 'Select a state...';
                                stateSelect.appendChild(emptyStateOption);

                                const states = this.aukusCountryStateMap[selectedCountry] || [];
                                states.forEach(state => {
                                    const option = document.createElement('option');
                                    option.value = state;
                                    option.textContent = state;
                                    stateSelect.appendChild(option);
                                });

                                stateSelect.addEventListener('change', () => this.emitChange());
                                stateCell.appendChild(stateSelect);
                                stateCell.appendChild(this.createWeightInput('1'));
                            }
                            this.emitChange();
                        });

                        cell.appendChild(countrySelect);
                    }
                } else {
                    // Default case: regular text input
                    const input = this.createDefaultInput('', index);
                    cell.appendChild(input);
                }

                // Add weight input for all cells except AUKUS Map state cell
                if (!(currentType === 'aukusmap' && index === 1)) {
                    const weightInput = this.createWeightInput('1');
                    cell.appendChild(weightInput);
                }

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
            return;
        }

        // Process existing data rows
        data.rows.forEach((rowData) => {
            const row = document.createElement('div');
            row.className = 'matrix-row';

            rowData.forEach((item, index) => {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';

                if (currentType === 'worldmap' && index === 0) {
                    this.createAukusOrWorldMapInput(cell, item.value, 'worldmap');
                } else if (currentType === 'aukusmap' && (index === 0 || index === 1)) {
                    this.createAukusOrWorldMapInput(cell, item.value, 'aukusmap', index);
                } else {
                    const input = this.createDefaultInput(item.value || '', index);
                    cell.appendChild(input);
                }

                if (!(currentType === 'aukusmap' && index === 1)) {
                    const weightInput = this.createWeightInput(item.weight?.toString() || '1');
                    cell.appendChild(weightInput);
                }

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

    // Helper method to setup select element styles
    setupSelectStyles(select) {
        select.style.width = '100%';
        select.style.padding = '4px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid var(--border-color)';
        select.style.backgroundColor = 'var(--input-bg)';
        select.style.color = 'var(--text-primary)';
        select.style.fontSize = '12px';
    }

    // Helper method to create inputs for AUKUS or World Map
    createAukusOrWorldMapInput(cell, value, type, index = 0) {
        const select = document.createElement('select');
        select.className = type === 'worldmap' ? 'country-select' : (index === 0 ? 'country-select' : 'state-select');
        this.setupSelectStyles(select);

        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = type === 'worldmap' ? 'Select a country...' :
            (index === 0 ? 'Select a country...' : 'Select a state...');
        select.appendChild(emptyOption);

        const options = type === 'worldmap' ? this.countryList :
            (index === 0 ? Object.keys(this.aukusCountryStateMap) :
                this.aukusCountryStateMap[value] || []);

        options.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue;
            if (optionValue === value) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener('change', () => this.emitChange());
        cell.appendChild(select);
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
            // Don't set any text content for the headers
            header.appendChild(cell);
        });
        this.container.insertBefore(header, this.container.firstChild);
    }
} 