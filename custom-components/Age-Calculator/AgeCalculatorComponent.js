(function () {
    const FieldComponent = Formio.Components.components.field;
  
    class AgeCalculatorComponent extends FieldComponent {
      static schema(...extend) {
        return FieldComponent.schema({
          type: 'ageCalculator',
          label: 'Age Calculator',
          key: 'ageCalculator',
          input: true,
          components: [
            {
              label: 'Date of Birth',
              key: 'dob',
              type: 'textfield',
              input: true,
              placeholder: 'YYYY-MM-DD',
            },
            {
              label: 'Years',
              key: 'years',
              type: 'textfield',
              input: true,
              disabled: true,
            },
            {
              label: 'Months',
              key: 'months',
              type: 'textfield',
              input: true,
              disabled: true,
            },
            {
              label: 'Days',
              key: 'days',
              type: 'textfield',
              input: true,
              disabled: true,
            },
          ],
          ...extend,
        });
      }
  
      static get builderInfo() {
        return {
          title: 'Age Calculator',
          group: 'basic',
          icon: 'calendar',
          weight: 10,
          schema: AgeCalculatorComponent.schema(),
        };
      }
  
      get defaultSchema() {
        return AgeCalculatorComponent.schema();
      }
  
      constructor(component, options, data) {
        super(component, options, data);
      }
  
      render(content) {
        return super.render(`
          <div class="age-calculator-component">
            <div>
              <label for="dob">Date of Birth</label>
              <input type="date" ref="dobInput" id="dob" />
            </div>
            <div>
              <label for="years">Years</label>
              <input type="text" ref="yearsOutput" id="years" readonly />
            </div>
            <div>
              <label for="months">Months</label>
              <input type="text" ref="monthsOutput" id="months" readonly />
            </div>
            <div>
              <label for="days">Days</label>
              <input type="text" ref="daysOutput" id="days" readonly />
            </div>
          </div>
        `);
      }
  
      attach(element) {
        this.loadRefs(element, {
          dobInput: 'single',
          yearsOutput: 'single',
          monthsOutput: 'single',
          daysOutput: 'single',
        });
  
        this.addEventListener(this.refs.dobInput, 'change', () => {
          const dob = new Date(this.refs.dobInput.value);
          if (!isNaN(dob)) {
            const today = new Date();
            const age = this.calculateAge(dob, today);
  
            this.refs.yearsOutput.value = age.years;
            this.refs.monthsOutput.value = age.months;
            this.refs.daysOutput.value = age.days;
          }
        });
  
        return super.attach(element);
      }
  
      calculateAge(dob, today) {
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
  
        if (days < 0) {
          months--;
          days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Get days in the previous month
        }
  
        if (months < 0) {
          years--;
          months += 12;
        }
  
        return { years, months, days };
      }
    }
  
    Formio.Components.addComponent('ageCalculator', AgeCalculatorComponent);
  })();
  