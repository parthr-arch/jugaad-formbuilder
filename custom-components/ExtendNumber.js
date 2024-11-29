(function () {
  // Extend the NumberComponent from Formio
  const NumberComponent = Formio.Components.components.number;
  var rootScope;

  class CustomNumberComponent extends NumberComponent {
    static schema(...extend) {
      return NumberComponent.schema({
        type: 'customnumber',
        label: 'Custom Number Field',
        key: 'customnumber',
        input: true,
        linkedDatePicker: '', // Field key of the linked date picker
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Custom Number Field',
        group: 'basic',
        icon: 'hashtag',
        weight: 20,
        schema: CustomNumberComponent.schema(),
      };
    }

    get defaultSchema() {
      return CustomNumberComponent.schema();
    }

    render(content) {
      const { label, key } = this.component;

      return super.render(`
        <div class="custom-number-component">
          <input type="number" id="${key}" class="form-control" readonly>
          <small id="${key}-info" class="text-muted"></small>
        </div>
      `);
    }

    attach(element) {
      super.attach(element);

      const componentKey = this.component.key;
      const inputElement = document.getElementById(componentKey);
      const infoElement = document.getElementById(`${componentKey}-info`);

      if (!inputElement) {
        // console.error("Input element not found for custom number field.");
        return;
      }

      // Watch the linked date picker value
      const linkedDatePickerKey = this.component.linkedDatePicker;

      if (!linkedDatePickerKey) {
        // console.warn("No linked date picker specified.");
        infoElement.textContent = "No linked date picker selected.";
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
            infoElement.textContent = `Linked to: ${linkedDatePickerKey}`;
          } else {
            inputElement.value = '';
            infoElement.textContent = "Invalid date range selected.";
          }
        } else {
          inputElement.value = '';
          infoElement.textContent = "No data available from the linked date picker.";
        }
      };

      // Listen for changes in the form data (use Form.io's 'change' event)
      if (this.root) {
        this.root.on('change', (changed) => {
          const data = changed.data;
          updateLinkedValue(); // Trigger the update when the form changes
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
            component.columns.forEach((column) => {
              if (column.components) {
                result = result.concat(findExtendedDatepickers(column.components));
              }
            });
          }
          if (component.rows) {
            component.rows.forEach((row) => {
              row.forEach((cell) => {
                if (cell.components) {
                  result = result.concat(findExtendedDatepickers(cell.components));
                }
              });
            });
          }
        });

        return result;
      }

      var editForm = NumberComponent.editForm();
      var tabs = editForm.components.find((tab) => tab.key === 'tabs');
      rootScope = window.angular ? window.angular.element(document).injector().get('$rootScope') : null;

      // Get all extended date pickers from the nested structure
      const extendedDatepickers = findExtendedDatepickers(rootScope?.formSchema?.components);
      const dataGridListInForm = extendedDatepickers.map((item) => ({
        label: item.label,
        value: item.key,
      }));

      var displayTab = tabs.components.find((component) => component.key === 'display');
      displayTab.components.push(
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
          tooltip: 'Select a date picker to link with this number field.',
        }
      );

      return editForm;
    }
  }

  // Register the component for reuse
  Formio.Components.addComponent('customnumber', CustomNumberComponent);
})();
