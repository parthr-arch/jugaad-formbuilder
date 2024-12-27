(function () {
  // Extend the FieldComponent from Formio
  const FieldComponent = Formio.Components.components.textfield;
  var rootScope;
  let root;
  let registeredId = [];

  class TextFieldComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: "textfield",
        label: "Text Input",
        input: true,
        linkedDatePicker: '',
        personalInfo: false,
        lineWorksTeamsLinkage: false,
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: "Text Input",
        group: 'basic',
        icon: 'text-width',
        weight: 20,
        schema: TextFieldComponent.schema(),
      };
    }

    constructor(component, options, data) {
      super(component, options, data);
      root = this.root;
      rootScope = window.angular ? window.angular.element(document).injector().get('$rootScope') : null;
    }

    get defaultSchema() {
      return TextFieldComponent.schema();
    }

    render(content) {
      const { label, key } = this.component;

      if (registeredId.includes(this.id)) {
        const existingElement = document.getElementById(this.id);
        if (existingElement) {
          return super.render(`<div class="textfield-component">${existingElement?.outerHTML}</div>`);
        }

      }

      return super.render(`
        <div class="textfield-component">
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
        return;
      }

      const linkedDatePickerKey = this.component.linkedDatePicker;
      if (!linkedDatePickerKey) {
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
            inputElement.value = `${days}`; // Update the input field with the days difference
          } else {
            inputElement.value = '';
          }
        } else {
          inputElement.value = '';
        }
      };

      // Listen for changes in the form data (use Form.io's 'change' event)
      if (this.root) {
        this.root.on('change', (changed) => {
          const data = changed.data;
          const parentComponent = changed.changed?.instance?.parent?.component?.type === 'datagrid' ? changed.changed?.instance?.parent?.component : changed.changed?.instance?.component
          if (parentComponent?.type === 'datagrid') {
            const TextField = parentComponent?.components?.find(component => component.type === "textfield")
            registeredId.push(this.id)
            const allTextField = document.getElementById(parentComponent.id).querySelectorAll('.days-count')
            if (allTextField.length > 0) {
              data[parentComponent?.key].forEach((record, index) => {
                const days = moment(record[TextField.linkedDatePicker]?.endDate).diff(moment(record[TextField.linkedDatePicker]?.startDate), 'days');
                allTextField[index].value = days;
                allTextField[index].setAttribute("value", days)
              })
            }
          } else {
            registeredId.push(this.id)
            updateLinkedValue();
          }
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
          if (component.components) {
            result = result.concat(findExtendedDatepickers(component.components));
          }
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
    
      // Generate the base edit form
      var editForm = FieldComponent.editForm();
      
      // Find the "tabs" component
      var tabs = editForm.components.find((tab) => tab.key === 'tabs');
      
      if (tabs) {
        // Find and hide API and Logic tabs
        const apiTab = tabs.components.find((component) => component.key === 'api');
        const logicTab = tabs.components.find((component) => component.key === 'logic');
        if (apiTab) apiTab.ignore = true;
        if (logicTab) logicTab.ignore = true;
    
        // Modify the Display tab
        const displayTab = tabs.components.find((component) => component.key === 'display');
        if (displayTab) {
          displayTab.components.push(
            {
              type: 'select',
              input: true,
              key: 'linkedDatePicker',
              label: 'Link to Date Picker',
              placeholder: 'Select a date picker',
              dataSrc: 'values',
              data: {
                values: findExtendedDatepickers(rootScope?.formSchema?.components).map((item) => ({
                  label: item.label,
                  value: item.key,
                })),
              },
              weight: 20,
              tooltip: 'Select a date picker to link with this text field.',
            },
            {
              type: 'checkbox',
              input: true,
              key: 'personalInfo',
              label: 'Link with Personal Info',
              tooltip: 'Check if this field is for personal information.',
              weight: 25,
            },
            {
              type: 'checkbox',
              input: true,
              key: 'lineWorksTeamsLinkage',
              label: 'Link with LINE WORKS/Teams',
              tooltip: 'Check if this field is linked to LINE WORKS or Teams.',
              weight: 30,
            },
            {
              type: 'checkbox',
              input: true,
              key: 'validateWithKatakana',
              label: 'Link with Katakana',
              tooltip: 'Check if this field is for katakana information.',
              weight: 25,
            },
            {
              type: 'checkbox',
              input: true,
              key: 'validateWithHiragana',
              label: 'Link with Hiragana',
              tooltip: 'Check if this field is for hiragana information.',
              weight: 30,
            }
          );
        }
      }
    
      return editForm;
    }

  }

  // Register the component for reuse
  Formio.Components.addComponent("textfield", TextFieldComponent);
})();
