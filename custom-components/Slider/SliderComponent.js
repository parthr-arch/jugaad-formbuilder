(function () {
  const FieldComponent = Formio.Components.components.field;

  class SliderComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'slider',
        label: 'Slider Component',
        key: 'slider',
        inputType: 'range',
        input: true,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0,  // Set default value for the slider
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Slider',
        group: 'basic',
        icon: 'sliders',
        weight: 10,
        schema: SliderComponent.schema(),
      };
    }

    get defaultSchema() {
      return SliderComponent.schema();
    }

    constructor(component, options, data) {
      super(component, options, data);
      this.value = this.dataValue || this.component.defaultValue || 0;
    }

    render() {
      return super.render(`
        <div class="slider-component">
          <label>${this.component.label}</label>
          <input 
            type="range" 
            ref="sliderInput" 
            min="${this.component.min}" 
            max="${this.component.max}" 
            step="${this.component.step}" 
            value="${this.value}"
          />
          <span ref="sliderValue">${this.value}</span>
        </div>
      `);
    }

    attach(element) {
      super.attach(element);

      this.loadRefs(element, {
        sliderInput: 'single',
        sliderValue: 'single',
      });

      // Update value on input change
      this.addEventListener(this.refs.sliderInput, 'input', (event) => {
        const newValue = parseInt(event.target.value, 10);
        this.setValue(newValue);
        this.updateSliderValue(newValue);
      });

      // Initialize slider value display
      this.updateSliderValue(this.value);

      return element;
    }

    setValue(value, flags = {}) {
      if (value !== this.value) {
        this.value = value;
        if (this.refs.sliderInput) {
          this.refs.sliderInput.value = value;
          this.updateSliderValue(value);
        }
      }
      return super.setValue(value, flags);
    }

    getValue() {
      return this.value;
    }

    updateSliderValue(value) {
      if (this.refs.sliderValue) {
        this.refs.sliderValue.innerHTML = value;
      }
    }
  }

  Formio.Components.addComponent('slider', SliderComponent);
})();
