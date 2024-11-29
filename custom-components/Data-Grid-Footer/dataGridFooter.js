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
                root = this.root;
                rootScope = window.angular ? window.angular.element(document).injector().get('$rootScope') : null;
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
                
                return `
                    <div tabindex="-1" ref="dragComponent" class="builder-component">
                        ${btnGroup}
                        <div ref="component" class="formio-component formio-component-dataGridFooter">
                            <table class="data-grid-footer" >
                                <tbody>
                                    <tr>
                                        <td id="${this.component.key}">Custom Footer Content: Sum = 0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }
            
            attach(element) {
                // Listen for changes in the form data
                if (this.root) {
                        
                    this.onChangeHandler = (changed) => {
                        const data = changed.data;
                        if (data) {
                            
                            const fetchComponentDetail = rootScope?.formSchema?.components?.filter(
                                (component) => component.type === 'dataGridFooter'
                            );
                            const updatedGridKey = changed.changed?.instance?.component?.type === 'datagrid' ? changed.changed?.instance?.component?.key : changed.changed?.instance?.parent?.component?.key;
                            fetchComponentDetail?.filter(component => component.dropdown1 === updatedGridKey || component.component?.dropdown1 === updatedGridKey)?.forEach((gridComponent) => {
                                gridComponent = gridComponent?.dropdown1 ? gridComponent : gridComponent.component
                                const selectedDataGridKey = gridComponent?.dropdown1 // Key from dropdown1
                                const selectedColumnKey = gridComponent?.dropdown2 // Key from dropdown2
                                
                                if (selectedDataGridKey && selectedColumnKey && data[selectedDataGridKey]) {
                                    const rows = data[selectedDataGridKey];
                                    const sum = rows.reduce(
                                        (total, row) => total + (parseFloat(row[selectedColumnKey]) || 0),
                                        0
                                    );
                                    const footerCell = document.getElementById(gridComponent.key);
                                    if (footerCell) {
                                        footerCell.textContent = `Custom Footer Content: Sum = ${sum}`;
                                    }
                                }
                            });
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

                // console.log('Updating dropdown 2 options:', columnList);

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