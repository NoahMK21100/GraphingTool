import { EXAMPLE_DATA } from '../../config/exampleData.js';

export class ExampleDataManager {
    constructor(matrixInput) {
        this.matrixInput = matrixInput;
        this.setupEventListeners();
        this.populateDropdown();
    }

    setupEventListeners() {
        const select = document.getElementById('exampleData');
        if (select) {
            select.addEventListener('change', this.handleSelection.bind(this));
        }
    }

    populateDropdown() {
        const select = document.getElementById('exampleData');
        if (!select) return;

        select.innerHTML = '<option value="">Select an example...</option>';

        // Group by companies
        Object.entries(EXAMPLE_DATA.companies).forEach(([companyId, company]) => {
            // Create company optgroup with cleaned name
            const optgroup = document.createElement('optgroup');
            optgroup.label = company.name.split('(')[0].trim();

            // Add technology options under each company with cleaned names
            Object.entries(company.technologies).forEach(([techId, tech]) => {
                const option = document.createElement('option');
                option.value = `${companyId}.${techId}`;
                option.textContent = tech.name.split('(')[0].trim();
                optgroup.appendChild(option);
            });

            select.appendChild(optgroup);
        });
    }

    handleSelection(event) {
        const value = event.target.value;
        if (!value) return;

        const [companyId, techId] = value.split('.');
        const company = EXAMPLE_DATA.companies[companyId];
        const tech = company?.technologies[techId];

        if (!company || !tech) return;

        // Update company and tech name
        document.getElementById('companyName').value = company.name;
        document.getElementById('techName').value = tech.name;

        // Clear existing rows and add initial row
        this.matrixInput.setData({
            columns: this.matrixInput.columns,
            rows: [[]]
        });

        // Add each row of data
        tech.data.forEach((rowData, index) => {
            if (index > 0) {
                this.matrixInput.addRow();
            }

            // Get the current row's inputs
            const currentRow = this.matrixInput.container.querySelectorAll('.matrix-row')[index];
            const inputs = currentRow.querySelectorAll('input[type="text"]');
            const weights = currentRow.querySelectorAll('input[type="number"]');

            // Fill in the values
            rowData.forEach((value, i) => {
                if (inputs[i]) {
                    inputs[i].value = value;
                }
            });

            // Set all weights to 1
            weights.forEach(weight => {
                weight.value = 1;
            });
        });

        this.matrixInput.emitChange();
    }
}
