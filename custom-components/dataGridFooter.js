(function(){
    const component = Formio.Components;
    const FieldComponent = Formio.Components.components.field;
    let rootScope;
    let editFormComponents;
    let root;
    let dataGridListInForm;

    class DataGridFooterComponent extends FieldComponent {

        static schema(...extend) {
            return FieldComponent.schema({
                type: 'dataGridFooter',
                label: 'Data Grid Footer',
                key: 'dataGridFooter',
                input: false, // Not an input component
                placeholder: '',
                description: 'Displays footer information for a data grid.',
            ...extend,
            });
        }
    
        static get builderInfo() {
            return {
                title: 'Data Grid Footer',
                group: 'layout', // Add to the 'Layout' group in the builder
                icon: 'table', // Choose an appropriate icon
                weight: 10, // Position in the builder group
                schema: DataGridFooterComponent.schema(),
            };
        }

        constructor(component, options, data) {
            super(component, options, data);
            this.handleDropdownChange = this.handleDropdownChange.bind(this); 
            this.component.key = this.generateDynamicKey();
            root = this.root;
            rootScope = window.angular ? window.angular.element(document).injector().get('$rootScope') : null;
        }

        generateDynamicKey() {
            const baseKey = this.component.key || 'dataGridFooter';
            const uniqueSuffix = Math.random().toString(36).substring(2, 8); // Random 6-character string
            return `${baseKey}_${uniqueSuffix}`;
        }

        
        get defaultSchema() {
            return DataGridFooterComponent.schema();
        }

        // Enable drag, drop, and editing features in the builder
        get emptyValue() {
            return '';
        }

        

    // Override the render method to add footer details
    render() {
            // Extract the "component-btn-group" block from the parent render
            const parentRender = super.render();
            const parser = new DOMParser();
            const parentDoc = parser.parseFromString(parentRender, 'text/html');

            // Extract the "component-btn-group" block
            const btnGroupElement = parentDoc.querySelector('.component-btn-group');
            const btnGroup = btnGroupElement ? btnGroupElement.outerHTML : '';
            // Replace the entire template while preserving the "component-btn-group"
            const dataGridToBindKey = this.component?.dropdown1;
            const findDataGridComponentDetail = this.parent.components.find(component => component.key === dataGridToBindKey)

            
            setTimeout(() => {
                const parentDiv = document.getElementById(findDataGridComponentDetail?.id); // Replace 'ek7b3dr' with the actual ID if different
                if (parentDiv) {
                    // Find the table inside the targeted parent div
                    const table = parentDiv.querySelector('table.datagrid-table');

                    if (table) {
                        // Select the <tfoot> element of the table
                        const tfoot = table.querySelector('tfoot');
                        if(tfoot){
                            const checkForExistingRow = tfoot.querySelectorAll('tr');
                            checkForExistingRow?.forEach(footerRow => {
                                if (footerRow?.getAttribute('id') !== `${dataGridToBindKey}-footer-label` && footerRow?.getAttribute('id') !== `${dataGridToBindKey}-footer-total`) {
                                    // Create a new <tr> element
                                    const newRow = document.createElement('tr');
                                    newRow.setAttribute('id', `${dataGridToBindKey}-footer-label`)
                                    const newSumRow = document.createElement('tr');
                                    newSumRow.setAttribute('id', `${dataGridToBindKey}-footer-total`)
    
                                    // Create and populate <td> elements for the new row
                                    const totalLabels = [];
                                    const totalValues = []
                                    findDataGridComponentDetail.components.forEach(record => {
                                        if(this.component.columnMappingGrid.map(columns => columns.columnDropdown).includes(record.key)){
                                            const label = this.component.columnMappingGrid.find(obj => obj.columnDropdown === record.key)
                                            totalLabels.push({key: record.key,label: label.labelField})
                                            totalValues.push({key: record.key,label: 0})
                                        }else {
                                            totalLabels.push({key: '',label:''})
                                            totalValues.push({key: '',label:''})
                                        }
                                    })    
                                    
                                    totalLabels.forEach((colData) => {
                                        const td = document.createElement('td');
                                        if(colData.key){
                                            td.setAttribute('id', `${colData.key}-label`)
                                        }
                                        
                                        td.innerHTML = `<b>${colData.label}</b>` || ''; // Set the text content for each column
                                        newRow.appendChild(td);
                                    });
                                    totalValues.forEach((colData) => {
                                        const td = document.createElement('td');
                                        if(colData.key){
                                            td.setAttribute('id', `${colData.key}-total`)
                                        }
                                        
                                        td.innerHTML = `<b>${colData.label}</b>` || ''; // Set the text content for each column
                                        newSumRow.appendChild(td);
                                    });
    
                                    // Append the new <tr> to the <tfoot>
                                    tfoot.insertBefore(newSumRow, tfoot.firstChild);
                                    tfoot.insertBefore(newRow, tfoot.firstChild);
                                    
                                    
    
                                } else {
                                    console.error('No <tfoot> found in the table.');
                                }
                            })
                            
                        } else {
                            console.error('No table found inside the parent div.');
                        }
                    }
                } else {
                    console.error('Parent div with the specified ID not found.');
                }
            }, 100);
            
            return `
                <div tabindex="-1" ref="dragComponent" class="builder-component" >
                    ${btnGroup}
                    <div id="${this.component.key}"><b>合計金額: 0</b></div>        
                </div>
            `;
        }
        
        attach(element) {
            // Listen for changes in the form data
            if (this.root) {
                    
                this.onChangeHandler = (changed) => {
                    const data = changed.data;
                    if (data) {
                        let sum = 0;
                        const fetchComponentDetail = rootScope?.formSchema?.components?.filter(
                            (component) => component.type === 'dataGridFooter'
                        );
                        const updatedGrid = changed.changed?.instance?.component?.type === 'datagrid' ? changed.changed?.instance?.component : changed.changed?.instance?.parent?.component;
                        fetchComponentDetail?.filter(component => component.dropdown1 === updatedGrid?.key || component.component?.dropdown1 === updatedGrid?.key)?.forEach((gridComponent) => {
                            gridComponent = gridComponent?.dropdown1 ? gridComponent : gridComponent.component
                            const selectedDataGridKey = gridComponent?.dropdown1 // Key from dropdown1
                            const selectedColumnKey = gridComponent?.dropdown2 // Key from dropdown2

                            if(selectedDataGridKey){
                                gridComponent?.columnMappingGrid.forEach(columnObj => {
                                    if (selectedDataGridKey && columnObj.columnDropdown && data[selectedDataGridKey]) {
                                        const rows = data[selectedDataGridKey];
                                        sum = rows.reduce(
                                            (total, row) => total + (parseFloat(row[columnObj.columnDropdown]) || 0),
                                            0
                                        );

                                        // **Save footer values in form submission data**
                                        if (!this.root.submission.data.dataGridFooterData) {
                                            this.root.submission.data.dataGridFooterData = {};
                                        }
                                        this.root.submission.data.dataGridFooterData[selectedDataGridKey] = this.root.submission.data.footerData[selectedDataGridKey] || {};
                                        this.root.submission.data.dataGridFooterData[selectedDataGridKey][columnObj.columnDropdown] = sum;

                                        const dataGridElement = document.getElementById(updatedGrid?.id);
        
                                        const table = dataGridElement?.querySelector('table.datagrid-table');
        
                                        if (table) {
                                            const getSumColumn = document.getElementById(`${columnObj.columnDropdown}-total`)
                                            if(getSumColumn){
                                                getSumColumn.innerHTML = `<b>${sum}</b>`
                                            }
                                        }
                                    }
                                })
                            }
                        });
                        if(changed.changed?.instance?.parent?.type === 'form'){
                            const dataGridElement = document.getElementById(updatedGrid?.id);
                            const table = dataGridElement?.querySelector('table.datagrid-table');
                            const tfoot = table.querySelector('tfoot');
                            const checkForExistingRow = tfoot.querySelectorAll('tr');
                            if(tfoot){

                            
                            checkForExistingRow?.forEach(footerRow => {
                                if (footerRow?.getAttribute('id') !== `${updatedGrid?.key}-footer-label`  && footerRow?.getAttribute('id') !== `${updatedGrid?.key}-footer-total`) {
                                    // Create a new <tr> element
                                    const newRow = document.createElement('tr');   
                                    newRow.setAttribute('id', `${updatedGrid?.key}-footer-label`)
                                    const newSumRow = document.createElement('tr');   
                                    newRow.setAttribute('id', `${updatedGrid?.key}-footer-total`)
    
                                    // Create and populate <td> elements for the new row
                                    const totalLabels = [];
                                    const totalValues = []
                                    updatedGrid.components.forEach(record => {
                                        if(this.component.columnMappingGrid.map(columns => columns.columnDropdown).includes(record.key)){
                                            const label = this.component.columnMappingGrid.find(obj => obj.columnDropdown === record.key)
                                            totalLabels.push({key: record.key,label: label.labelField})
                                            totalValues.push({key: record.key,label: sum})
                                        }else {
                                            totalLabels.push({key: '',label:''})
                                            totalValues.push({key: '',label:''})
                                        }
                                        
                                    })    
                                
                                   
                                    totalLabels.forEach((colData) => {
                                        const td = document.createElement('td');
                                        if(colData.key){
                                            td.setAttribute('id', `${colData.key}-label`)
                                        }
                                        
                                        td.innerHTML = `<b>${colData.label}</b>` || ''; // Set the text content for each column
                                        newRow.appendChild(td);
                                    });
                                    totalValues.forEach((colData) => {
                                        const td = document.createElement('td');
                                        if(colData.key){
                                            td.setAttribute('id', `${colData.key}-total`)
                                        }
                                        
                                        td.innerHTML = `<b>${colData.label}</b>` || ''; // Set the text content for each column
                                        newSumRow.appendChild(td);
                                    });
    
                                    // Append the new <tr> to the <tfoot>
                                    tfoot.insertBefore(newSumRow, tfoot.firstChild);
                                    tfoot.insertBefore(newRow, tfoot.firstChild);
                                }
                            })
                        }
                            
                        }
                    }
                };
            
                this.root.on('change', this.onChangeHandler); // Add the listener
            }
            return super.attach(element);
        }

        // Redraw the edit form to reflect the changes made to dropdown2
        redrawEditForm() {
            const form = this.root;  // Access the form instance
            if (form && form.editForm) {
                form.editForm.rebuild();  // Trigger a form rebuild to apply the updated dropdown options
            }
        }

       
        // Handle the dropdown change event
        handleDropdownChange(value) {
            const selectedGrid = this.getDataGridColumns(value); // Fetch columns for the selected grid

            const dataGridComponent = {
                type: 'datagrid',
                key: 'columnMappingGrid',
                label: 'Column Mapping',
                components: [
                    {
                        type: 'select',
                        key: 'columnDropdown',
                        label: 'Select Column',
                        dataSrc: 'values',
                        data: {
                            values: selectedGrid.map(col => ({ label: col, value: col })),
                        }
                    },
                    {
                        type: 'textfield',
                        key: 'labelField',
                        label: 'Label'
                    }
                ]
            };
        
            this.updateFormComponents(dataGridComponent);
            
        }

        // Function to fetch column names of the selected Data Grid
        getDataGridColumns(gridKey) {
            const selectedGrid = dataGridListInForm.find(grid => grid.value === gridKey);
            return selectedGrid ? selectedGrid.columns : [];
        }

        // Function to update the form dynamically
        updateFormComponents(newComponent) {
            const formComponents = editFormComponents.components;
            
            // Remove existing Data Grid if present
            const existingIndex = formComponents.findIndex(comp => comp.key === 'columnMappingGrid');
            if (existingIndex !== -1) {
                formComponents.splice(existingIndex, 1);
            }

            // Add new Data Grid component
            formComponents.push(newComponent);
            
            // Refresh form rendering (assumes `redraw()` or similar method is available)
            // this.prototype.redraw();
        }

        // Add dropdown fields to the edit form
        static editForm = () => {
            const editForm = FieldComponent.editForm();

            // Add custom settings to the Display tab
            const tabs = editForm.components.find((tab) => tab.key === 'tabs')
            rootScope = window.angular ? window.angular.element(document).injector().get('$rootScope') : null;
            // Fetch the datagrid list dynamically

            const dataGridList = (rootScope?.formSchema?.components || [])
            .filter((component) => component.type === 'datagrid')
            dataGridListInForm = dataGridList.map((item) => ({ label: item.label, value: item.key }));
            editFormComponents = tabs.components.find((component) => component.key === 'display');
            let columnList = []
            dataGridList.forEach((item) => {
                columnList = [...columnList,...item.components.filter((field) => field.type === 'textfield' || field.type === 'number').map((field) => ({ label: field.label, value: field.key }))]
            })
           
            
            editFormComponents.components.push(
                {
                    type: 'select',
                    key: 'dropdown1',
                    label: 'Select data grid to attach',
                    placeholder: 'Select an option',
                    dataSrc: 'values',
                    data: {
                        values: dataGridListInForm,
                    },
                    weight: 20, // Position in the Display tab
                    onChange: (value) => this.prototype.handleDropdownChange.call(this.prototype, value), 
                },
                {
                    type: 'datagrid',
                    key: 'columnMappingGrid',
                    label: 'Column Mapping',
                    components: [
                        {
                            type: 'select',
                            key: 'columnDropdown',
                            label: 'Select Column',
                            data: {
                                values: columnList,
                            }
                        },
                        {
                            type: 'textfield',
                            key: 'labelField',
                            label: 'Label'
                        }
                    ]
                }
            );


            return editForm;
        };
        
    }


    component.addComponent('dataGridFooter', DataGridFooterComponent);
})()