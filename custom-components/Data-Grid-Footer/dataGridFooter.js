(function(){
    const component = Formio.Components;
    const FieldComponent = Formio.Components.components.field;
    let rootScope;
    let editFormComponents;
    let root;

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

            // Debounce function to limit rapid calls
            const debounce = (func, delay) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => func(...args), delay);
                };
            };
            
            setTimeout(() => {
                const parentDiv = document.getElementById(findDataGridComponentDetail?.id); // Replace 'ek7b3dr' with the actual ID if different
                if (parentDiv) {
                    // Find the table inside the targeted parent div
                    const table = parentDiv.querySelector('table.datagrid-table');

                    if (table) {
                        // Select the <tfoot> element of the table
                        const tfoot = table.querySelector('tfoot');

                        if (tfoot) {
                            // Create a new <tr> element
                            const newRow = document.createElement('tr');

                            // Create and populate <td> elements for the new row
                            const columns = [{key: '', label: '合計金額'}];
                            if(findDataGridComponentDetail.components.length > 1){
                                findDataGridComponentDetail.components.slice(1,findDataGridComponentDetail.components.length).forEach(record => {
                                    if(record.key === this.component?.dropdown2){
                                        columns.push({key: record.key,label:'0'})
                                    }else {
                                        columns.push({key: '',label:''})
                                    }
                                })    
                            }
                            columns.push({key: '',label:''})
                            columns.forEach((colData) => {
                                const td = document.createElement('td');
                                if(colData.key){
                                    td.setAttribute('id', colData.key)
                                }
                                
                                td.innerHTML = `<b>${colData.label}</b>` || '';// Set the text content for each column
                                newRow.appendChild(td);
                            });

                            // Append the new <tr> to the <tfoot>
                            tfoot.insertBefore(newRow, tfoot.firstChild);

                        } else {
                            console.error('No <tfoot> found in the table.');
                        }
                    } else {
                        console.error('No table found inside the parent div.');
                    }
                } else {
                    console.error('Parent div with the specified ID not found.');
                }
            }, 100);
            
            return `
                <div tabindex="-1" ref="dragComponent" class="builder-component" style="visibility: hidden">
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
                            
                            if (selectedDataGridKey && selectedColumnKey && data[selectedDataGridKey]) {
                                const rows = data[selectedDataGridKey];
                                sum = rows.reduce(
                                    (total, row) => total + (parseFloat(row[selectedColumnKey]) || 0),
                                    0
                                );

                                const dataGridElement = document.getElementById(updatedGrid?.id);

                                const table = dataGridElement?.querySelector('table.datagrid-table');

                                if (table) {
                                    const getSumColumn = document.getElementById(gridComponent?.dropdown2)
                                    if(getSumColumn){
                                        getSumColumn.innerHTML = `<b>${sum}</b>`
                                    }
                                }
                            }
                        });
                        if(changed.changed?.instance?.parent?.type === 'form'){
                            const dataGridElement = document.getElementById(updatedGrid?.id);
                            const table = dataGridElement?.querySelector('table.datagrid-table');
                            const tfoot = table.querySelector('tfoot');

                            if (tfoot) {
                                // Create a new <tr> element
                                const newRow = document.createElement('tr');

                                // Create and populate <td> elements for the new row
                                const columns = [{key: '', label: '合計金額'}];
                                if(updatedGrid.components.length > 1){
                                    updatedGrid.components.slice(1,updatedGrid.components.length).forEach(record => {
                                        if(record.key === this.component?.dropdown2){
                                            columns.push({key: record.key,label: sum})
                                        }else {
                                            columns.push({key: '',label:''})
                                        }
                                    })    
                                }
                                columns.push({key: '',label:''})
                                columns.forEach((colData) => {
                                    const td = document.createElement('td');
                                    if(colData.key){
                                        td.setAttribute('id', colData.key)
                                    }
                                    
                                    td.innerHTML = `<b>${colData.label}</b>` || ''; // Set the text content for each column
                                    newRow.appendChild(td);
                                });

                                // Append the new <tr> to the <tfoot>
                                tfoot.insertBefore(newRow, tfoot.firstChild);
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
            this.dropdownValue = value.data.dropdown1;

            const columnList = (rootScope?.formSchema?.components || [])
                .filter((component) => component.type === 'datagrid' && component.key === this.dropdownValue)
                .flatMap((datagrid) => datagrid.components)
                .filter((field) => field.type === 'textfield' || field.type === 'number')
                .map((field) => ({ label: field.key, value: field.key }));

            console.log('Updating dropdown 2 options:', columnList);

            // Update dropdown2's options dynamically
            const dropdown2 = editFormComponents.components.find((comp) => comp.key === 'dropdown2');
            if (dropdown2) {
                dropdown2.data.values = columnList; // Update options
                this.redrawEditForm();
            }
            
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
            let dataGridListInForm = dataGridList.map((item) => ({ label: item.label, value: item.key }));

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
                    type: 'select',
                    key: 'dropdown2',
                    label: 'Select Column for Sum',
                    placeholder: 'Select an option',
                    dataSrc: 'values',
                    data: {
                        values: columnList,
                    },
                    weight: 21, // Position in the Display tab
                }
            );

        
            return editForm;
        };
        
    }


    component.addComponent('dataGridFooter', DataGridFooterComponent);
})()