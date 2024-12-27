(function () {
  const FieldComponent = Formio.Components.components.field;
  const registeredId = [];

  class ExtendedDatePickerComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'extendeddatepicker',
        label: 'Extended Date Picker',
        key: 'extendeddatepicker',
        input: true,
        pickerType: 'daterangepicker', // Default picker type
        enableTypeSelector: true, // Custom property to enable dropdown
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Extended Date Picker',
        group: 'basic',
        icon: 'calendar',
        weight: 20,
        schema: ExtendedDatePickerComponent.schema(),
      };
    }

    get defaultSchema() {
      return ExtendedDatePickerComponent.schema();
    }

    render(content) {
      if(registeredId.includes(this.id)){
        const existingElement = document.getElementById(this.id);
        return `<div class="extended-datepicker-component">${existingElement?.outerHTML}</div>`
      }
      return super.render(`
        <div class="extended-datepicker-component">
          <div id="${this.id}"
               class="datepicker-container"
               style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
            <i class="fa fa-calendar"></i>&nbsp;
            <span>Select Date</span>
            <i class="fa fa-caret-down"></i>
          </div>
          <input id="${this.id}-output" type="text" class="form-control" disabled style="margin-top: 10px; display: none;" />
        </div>
      `);
    }

    attach(element) {
      super.attach(element);

      const containerElement = document.getElementById(this.id);
      const outputElement = document.getElementById(`${this.id}-output`);

      if (!containerElement) {
        console.error("Picker container not found.");
        return;
      }

       // Clean up any existing instance for this container
      // this.cleanupPicker(containerElement);

      // Initialize the picker based on its type
      this.initializePicker(containerElement, outputElement, this.component.pickerType || 'daterangepicker');
      
      return element;
    }

    cleanupPicker(containerElement) {
      const existingPicker = $(containerElement).data('daterangepicker');
      if (existingPicker) {
        existingPicker.remove(); // Properly destroy the existing picker instance
      }
      $(containerElement).off(); // Remove all associated event listeners
    }

    initializePicker(containerElement, outputElement, pickerType) {
      const start = moment().subtract(29, 'days');
      const end = moment();
    
      const updateDisplay = (start, end, format) => {
        const diffInDays = end.diff(start, 'days');
        const diffInMonths = end.diff(start, 'months');
        const diffInYears = end.diff(start, 'years');
    
        let displayValue = '';
        switch (format) {
          case 'days':
            displayValue = `${diffInDays} Days`;
            break;
          case 'daysMonths':
            const months = diffInMonths % 12;
            displayValue = `${Math.floor(diffInMonths / 12)} Years, ${months} Months, ${diffInDays} Days`;
            break;
          case 'daysMonthsYears':
            const fullMonths = diffInMonths % 12;
            const fullYears = Math.floor(diffInMonths / 12);
            displayValue = `${fullYears} Years, ${fullMonths} Months, ${diffInDays} Days`;
            break;
          default:
            displayValue = '';
        }
    
        $(outputElement).val(displayValue).show();
        
        $(containerElement).find('span').html(
          `${start.format('MMMM D, YYYY')} - ${end.format('MMMM D, YYYY')}`
        );
      };
    
      // Clear previous bindings
      // $(containerElement).off();
    
      switch (pickerType) {
        case 'daterangepicker':
          if(registeredId.includes(this.id)){
            break;
          }
          registeredId.push(this.id);
          $(containerElement).daterangepicker(
            {
              startDate: start,
              endDate: end,
            },
            (start, end) => {
              this.setValue({ startDate: start, endDate: end });
              // Update the displayed date range
              $(containerElement).find('span').html(
                `${start.format('MMMM D, YYYY')} - ${end.format('MMMM D, YYYY')}`
              );
            }
          );
          // Ensure the initial display is correct
          $(containerElement).find('span').html(
            `${start.format('MMMM D, YYYY')} - ${end.format('MMMM D, YYYY')}`
          );
          break;
    
        case 'singledatepicker':
          $(containerElement).daterangepicker(
            {
              singleDatePicker: true,
              startDate: start,
            },
            (date) => {
              this.setValue({ date });
              $(outputElement).hide(); // No output for single date picker
              $(containerElement).find('span').html(date.format('MMMM D, YYYY'));
            }
          );
          break;
    
        case 'datetimepicker':
          $(containerElement).daterangepicker(
            {
              singleDatePicker: true,
              timePicker: true,
              timePicker24Hour: true,
              startDate: start,
              locale: { format: 'MM/DD/YYYY HH:mm' },
            },
            (date) => {
              this.setValue({ datetime: date });
              $(outputElement).hide(); // No output for single datetime picker
              $(containerElement).find('span').html(date.format('MM/DD/YYYY HH:mm'));
            }
          );
          break;
    
        case 'daypicker':
          $(containerElement).daterangepicker(
            {
              startDate: start,
              endDate: end,
            },
            (start, end) => {
              this.setValue({ startDate: start, endDate: end });
              updateDisplay(start, end, 'days');
            }
          );
          updateDisplay(start, end, 'days');
          break;
    
        case 'daymonthpicker':
          $(containerElement).daterangepicker(
            {
              startDate: start,
              endDate: end,
            },
            (start, end) => {
              this.setValue({ startDate: start, endDate: end });
              updateDisplay(start, end, 'daysMonths');
            }
          );
          updateDisplay(start, end, 'daysMonths');
          break;
    
        case 'daymonthyearpicker':
          $(containerElement).daterangepicker(
            {
              startDate: start,
              endDate: end,
            },
            (start, end) => {
              this.setValue({ startDate: start, endDate: end });
              updateDisplay(start, end, 'daysMonthsYears');
            }
          );
          updateDisplay(start, end, 'daysMonthsYears');
          break;
    
        default:
          console.error(`Invalid picker type: ${pickerType}`);
      }
    }
    

    static editForm() {
      return FieldComponent.editForm([
        {
          key: 'display',
          ignore: false,
          components: [
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
              key: 'pickerType',
              label: 'Picker Type',
              placeholder: 'Select Picker Type',
              dataSrc: 'values',
              data: {
                values: [
                  { label: 'Date Range Picker', value: 'daterangepicker' },
                  { label: 'Single Date Picker', value: 'singledatepicker' },
                  { label: 'Single Date Picker with Time', value: 'datetimepicker' },
                  { label: 'Days Only', value: 'daypicker' },
                  { label: 'Days and Months', value: 'daymonthpicker' },
                  { label: 'Days, Months, and Years', value: 'daymonthyearpicker' },
                ],
              },
              weight: 10,
              tooltip: 'Choose the type of date picker.',
            },
          ],
        },
      ]);
    }
  }

  // Register the component for reuse
  Formio.Components.addComponent('extendeddatepicker', ExtendedDatePickerComponent);
})();
