class MatrixInput {
    constructor(container) {
        this.container = container;
        this.columns = ['Tech Type', 'Subsystem', 'Component', 'Manufacturing'];
        this.rows = [[]];
        this.init();
    }

    init() {
        this.container.innerHTML = '';
        this.container.className = 'matrix-input';

        // Create header
        const header = this.createHeader();
        this.container.appendChild(header);

        // Create matrix container
        this.matrixContainer = document.createElement('div');
        this.matrixContainer.className = 'matrix-container';
        this.container.appendChild(this.matrixContainer);

        // Create initial row
        this.addRow();

        // Create control buttons
        const controls = this.createControls();
        this.container.appendChild(controls);
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'matrix-header';

        this.columns.forEach((title, index) => {
            const cell = document.createElement('div');
            cell.className = 'header-cell';

            const input = document.createElement('input');
            input.type = 'text';
            input.value = title;
            input.addEventListener('change', () => {
                this.columns[index] = input.value;
                this.emitChange();
            });

            cell.appendChild(input);
            header.appendChild(cell);
        });

        return header;
    }

    addRow() {
        const row = document.createElement('div');
        row.className = 'matrix-row';

        this.columns.forEach(() => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';

            const input = document.createElement('input');
            input.type = 'text';
            input.addEventListener('input', () => this.emitChange());

            cell.appendChild(input);
            row.appendChild(cell);
        });

        // Add delete button for row
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-row';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', () => {
            row.remove();
            this.emitChange();
        });

        row.appendChild(deleteBtn);
        this.matrixContainer.appendChild(row);
    }

    createControls() {
        const controls = document.createElement('div');
        controls.className = 'matrix-controls';

        const addRowBtn = document.createElement('button');
        addRowBtn.textContent = 'Add Row';
        addRowBtn.addEventListener('click', () => this.addRow());

        controls.appendChild(addRowBtn);
        return controls;
    }

    getData() {
        const data = [];
        const rows = this.matrixContainer.querySelectorAll('.matrix-row');

        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll('input').forEach(input => {
                rowData.push(input.value);
            });
            if (rowData.some(value => value)) { // Only add if row has any values
                data.push(rowData);
            }
        });

        return {
            columns: this.columns,
            rows: data
        };
    }

    emitChange() {
        const event = new CustomEvent('matrixchange', {
            detail: this.getData()
        });
        this.container.dispatchEvent(event);
    }
}

export default MatrixInput;
