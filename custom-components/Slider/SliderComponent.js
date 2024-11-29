// SliderComponent.js
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
    }

    init() {
      super.init();
    }

    get inputInfo() {
      const info = super.inputInfo;
      return info;
    }

    render(content) {
      return super.render(`
          <div class="slider-component">
              <input 
                  type="range" 
                  ref="sliderInput" 
                  min="${this.component.min}" 
                  max="${this.component.max}" 
                  step="${this.component.step}" 
                  value="${this.dataValue || 0}"
              />
              <span ref="sliderValue">${this.dataValue || 0}</span>
          </div>
      `);
    }


    removeComponent() {
      this.remove();
    }

    attach(element) {
      this.loadRefs(element, {
        sliderInput: 'single',
        sliderValue: 'single',
        editButton: 'single',
        removeButton: 'single'
      });

      // Handle input value changes
      this.addEventListener(this.refs.sliderInput, 'input', (event) => {
        const value = parseInt(event.target.value);
        this.setValue(value);
        this.refs.sliderValue.innerHTML = value;
      });

      // Handle edit button click
      this.addEventListener(this.refs.editButton, 'click', () => {
        this.editComponent();
      });

      // Handle remove button click
      this.addEventListener(this.refs.removeButton, 'click', () => {
        this.removeComponent();
      });

      return super.attach(element);
    }
    editComponent() {
      const newLabel = prompt("Enter new label for the slider:", this.component.label);
      if (newLabel !== null && newLabel !== "") {
        this.component.label = newLabel;
        this.redraw();
      }
    }

    removeComponent() {
      if (confirm("Are you sure you want to remove this slider?")) {
        this.root.removeComponent(this);
      }
    }

    getValue() {
      return super.getValue();
    }

    setValue(value, flags = {}) {
      return super.setValue(value, flags);
    }

    updateValue(value, flags = {}) {
      return super.updateValue(value, flags);
    }
  }

  Formio.Components.addComponent('slider', SliderComponent);
})();
