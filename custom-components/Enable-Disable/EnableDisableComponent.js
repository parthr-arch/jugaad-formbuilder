// EnableDisableComponent.js
(function () {
  // Extend the base FieldComponent from Formio
  const FieldComponent = Formio.Components.components.field;

  // Define the EnableDisableComponent class
  class EnableDisableComponent extends FieldComponent {

    // Define the schema for the component
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'enabledisable',
        label: 'Enable/Disable',
        key: 'enabledisable',
        inputType: 'checkbox',
        input: true,
        ...extend,
      });
    }


    // Set default schema for the component
    get defaultSchema() {
      return EnableDisableComponent.schema();
    }

    // Constructor to initialize the component
    static get builderInfo() {
      return {
        title: 'Enable/Disable Toggle',
        group: 'basic',
        icon: 'toggle-on',
        weight: 20,
        schema: EnableDisableComponent.schema(),
      };
    }

    constructor(component, options, data) {
      super(component, options, data);
      this.value = this.dataValue || this.component.defaultValue || false;
    }

    // Initialize the component
    init() {
      super.init();
    }

    // Get input information for rendering
    get inputInfo() {
      const info = super.inputInfo;
      return info;
    }

    // Render the component's HTML structure
    render() {
      return super.render(`
        <div class="enable-disable-component">
          <label>
            <input type="checkbox" ref="toggleCheckbox" ${this.value ? 'checked' : ''}>
            ${this.component.label}
          </label>
        </div>
      `);
    }

    attach(element) {
      super.attach(element);

      this.loadRefs(element, {
        toggleCheckbox: 'single',
      });

      // Update value on checkbox change
      this.addEventListener(this.refs.toggleCheckbox, 'change', (event) => {
        const newValue = event.target.checked;
        this.setValue(newValue);
      });

      // Ensure initial value is displayed correctly
      this.setValue(this.value);

      return element;
    }

    // Remove the component from the form
    removeComponent() {
      if (confirm("Are you sure you want to remove this slider?")) {
        this.root.removeComponent(this);
      }
    }

    // Edit the component's label through a prompt
    editComponent() {
      const newLabel = prompt("Enter new label for the slider:", this.component.label);

      if (newLabel !== null && newLabel !== "") {
        this.component.label = newLabel;
        this.redraw();
      }
    }

    // Get the current value of the component
    setValue(value, flags = {}) {
      if (value !== this.value) {
        this.value = value;
        if (this.refs.toggleCheckbox) {
          this.refs.toggleCheckbox.checked = value;
        }
      }
      return super.setValue(value, flags);
    }

    getValue() {
      return this.value;
    }

    // Update the value with optional flags
    updateValue(value, flags = {}) {
      return super.updateValue(value, flags);
    }
  }

  // Register the component with Formio
  Formio.Components.addComponent('enabledisable', EnableDisableComponent);
})();