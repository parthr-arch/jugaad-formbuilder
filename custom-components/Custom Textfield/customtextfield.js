(function () {
  // Extend the FieldComponent from Formio
  const FieldComponent = Formio.Components.components.field;
  var rootScope;
  let root;
  let registeredId = [];

  class CustomTextFieldComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'customtextfield',
        label: 'Custom Text Field',
        // label: 'Custom Text Field',
        key: 'customtextfield',
        input: true,
        linkedDatePicker: '', // Field key of the linked date picker
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        // title: 'Text Field',
        title: 'Custom Text Field',
        group: 'basic',
        icon: 'text-width',
        weight: 20,
        schema: CustomTextFieldComponent.schema(),
      };
    }

    constructor(component, options, data) {
      super(component, options, data);
      root = this.root;
      rootScope = window.angular ? window.angular.element(document).injector().get('$rootScope') : null;
    }


    get defaultSchema() {
      return CustomTextFieldComponent.schema();
    }

    render(content) {
      const { label, key } = this.component;
      
      if(registeredId.includes(this.id)){
        const existingElement = document.getElementById(this.id);
        return super.render(`<div class="custom-textfield-component">${existingElement?.outerHTML}</div>`);
      }

      return super.render(`
        <div class="custom-textfield-component">
          <input type="text" id="${this.id}-input" class="days-count form-control" readonly>
          <small id="${this.id}-info" class="text-muted"></small>
        </div>
    `);
    }

    attach(element) {
      super.attach(element);
      const componentKey = this.component.key;
      const inputElement = document.getElementById(`${this.id}-input`);
      const infoElement = document.getElementById(`${this.id}-info`);

      if (!inputElement) {
        // console.error("Input element not found for custom text field.");
        return;
      }

      // Watch the linked date picker value
      const linkedDatePickerKey = this.component.linkedDatePicker;

      if (!linkedDatePickerKey) {
        // console.warn("No linked date picker specified.");
        // infoElement.textContent = "No linked date picker selected.";
        return;
      }

      // Wait for the form to be fully initialized before accessing components
      const form = this.root;

      const updateLinkedValue = () => {
        // Get the linked component (date picker) by its key
        const linkedComponent = form.getComponent(linkedDatePickerKey);
        if (linkedComponent && linkedComponent.dataValue) {
          const { startDate, endDate } = linkedComponent.dataValue;

          if (startDate && endDate) {
            // Calculate days between the selected start and end date
            const days = moment(endDate).diff(moment(startDate), 'days');
            // inputElement.value = `${days} days`; // Update the input field with the days difference
            inputElement.value = `${days}`; // Update the input field with the days difference
            // infoElement.textContent = `Linked to: ${linkedDatePickerKey}`;
          } else {
            inputElement.value = '';
            // infoElement.textContent = "Invalid date range selected.";
          }
        } else {
          inputElement.value = '';
          // infoElement.textContent = "No data available from the linked date picker.";
        }
      };

      // Listen for changes in the form data (use Form.io's 'change' event)
      if (this.root) {
        this.root.on('change', (changed) => {
          const data = changed.data;
          const parentComponent = changed.changed?.instance?.parent?.component?.type === 'datagrid' ?  changed.changed?.instance?.parent?.component : changed.changed?.instance?.component
          if(parentComponent?.type === 'datagrid'){
            const customTextField = parentComponent?.components?.find(component => component.type === "customtextfield")
            registeredId.push(this.id)
            const allTextField = document.getElementById(parentComponent.id).querySelectorAll('.days-count')
            if(allTextField.length > 0){
              data[parentComponent?.key].forEach((record, index) => {
                // console.log(customTextField);
                const days = moment(record[customTextField.linkedDatePicker]?.endDate).diff(moment(record[customTextField.linkedDatePicker]?.startDate), 'days');
                allTextField[index].value = days;
                allTextField[index].setAttribute("value", days)
              })
            }
          }else {
            registeredId.push(this.id)
            updateLinkedValue(); 
          }
          // Trigger the update when the form changes
        });
      }

      // Ensure the initial value is set based on the linked date picker
      updateLinkedValue();

      return element;
    }

    static editForm() {
      // Helper function to recursively find extended datepickers in nested components
      function findExtendedDatepickers(components) {
        let result = [];
        if (!components || !Array.isArray(components)) return result;
    
        components.forEach((component) => {
          if (component.type === 'extendeddatepicker') {
            result.push(component);
          }
          // Check if the component has nested components (like columns, fieldsets, etc.)
          if (component.components) {
            result = result.concat(findExtendedDatepickers(component.components));
          }
          // Check for other nested structures (e.g., columns or rows in a datagrid or panel)
          if (component.columns) {
            if (Array.isArray(component.columns)) {
              component.columns.forEach((column) => {
                if (column.components) {
                  result = result.concat(findExtendedDatepickers(column.components));
                }
              });
            }
          }
          if (component.rows) {
            if (Array.isArray(component.rows)) {
              component.rows.forEach((row) => {
                row.forEach((cell) => {
                  if (cell.components) {
                    result = result.concat(findExtendedDatepickers(cell.components));
                  }
                });
              });
            }
          }
        });
    
        return result;
      }
    
      var editForm = FieldComponent.editForm();
      var tabs = editForm.components.find((tab) => tab.key === 'tabs');
      rootScope = window.angular ? window.angular.element(document).injector().get('$rootScope') : null;
    
      // Get all extended date pickers from the nested structure
      const extendedDatepickers = findExtendedDatepickers(rootScope?.formSchema?.components);
      const dataGridListInForm = extendedDatepickers.map((item) => ({
        label: item.label,
        value: item.key,
      }));
    
      var editFormComponents = tabs.components.find((component) => component.key === 'display');
      editFormComponents.components.push(
        {
          type: 'textfield',
          key: 'label',
          label: 'Label',
          input: true,
          weight: 0,
        },
        {
          type: 'select',
          input: true,
          key: 'linkedDatePicker',
          label: 'Link to Date Picker',
          placeholder: 'Select a date picker',
          dataSrc: 'values',
          data: {
            values: dataGridListInForm,
          },
          weight: 20,
          tooltip: 'Select a date picker to link with this text field.',
          onChange: function (value) {
            // console.log(value);
          }
        }
      );
    
      return editForm;
    }
    
  }

  // Register the component for reuse
  Formio.Components.addComponent('customtextfield', CustomTextFieldComponent);
})();
