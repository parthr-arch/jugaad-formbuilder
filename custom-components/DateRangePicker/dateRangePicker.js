(function () {
  const FieldComponent = Formio.Components.components.field;

  class DateRangePickerComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'daterangepicker',
        label: 'Date Range Picker',
        key: 'daterange',
        input: true,
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Date Range Picker',
        group: 'basic',
        icon: 'calendar',
        weight: 20,
        schema: DateRangePickerComponent.schema(),
      };
    }

    get defaultSchema() {
      return DateRangePickerComponent.schema();
    }

    render(content) {
      const { label, key } = this.component;
      return super.render(`
        <div class="daterangepicker-component">
          <div id="${key}" 
               class="daterangepicker-container"
               style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
            <i class="fa fa-calendar"></i>&nbsp;
            <span></span> 
            <i class="fa fa-caret-down"></i>
          </div>
        </div>
      `);
    }

    attach(element) {
      super.attach(element);

      const elementId = this.component.key;
      const inputElement = document.getElementById(elementId);

      if (!inputElement) {
        console.error(`Element with ID ${elementId} not found.`);
        return;
      }

      const start = moment().subtract(29, 'days');
      const end = moment();

      const updateDisplay = (start, end) => {
        $(`#${elementId} span`).html(
          `${start.format('MMMM D, YYYY')} - ${end.format('MMMM D, YYYY')}`
        );
      };

      let isInternalUpdate = false;

      $(`#${elementId}`).daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [
              moment().subtract(1, 'month').startOf('month'),
              moment().subtract(1, 'month').endOf('month'),
            ],
          },
        },
        (start, end) => {
          if (!isInternalUpdate) {
            isInternalUpdate = true;
            this.setValue({ startDate: start, endDate: end });
            updateDisplay(start, end);
            isInternalUpdate = false;
          }
        }
      );

      updateDisplay(start, end);

      return element;
    }

    setValue(value) {
      if (!value || (this.data && this.data.startDate === value.startDate && this.data.endDate === value.endDate)) {
        return;
      }

      this.data = value;
      const inputElement = $(`#${this.component.key}`);
      const start = moment(value.startDate);
      const end = moment(value.endDate);

      inputElement.data('daterangepicker').setStartDate(start);
      inputElement.data('daterangepicker').setEndDate(end);
    }
  }

  // Registering the component for reuse
  Formio.Components.addComponent('daterangepicker', DateRangePickerComponent);
})();
