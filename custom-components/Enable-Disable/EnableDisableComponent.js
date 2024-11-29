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

    // Provide metadata for the component in the builder
    static get builderInfo() {
      return {
        title: 'Enable/Disable Toggle',
        group: 'basic',
        icon: 'toggle-on',
        weight: 20,
        schema: EnableDisableComponent.schema(),
      };
    }

    // Set default schema for the component
    get defaultSchema() {
      return EnableDisableComponent.schema();
    }

    // Constructor to initialize the component
    constructor(component, options, data) {
      super(component, options, data);
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
          <label>${this.component.label}</label>
          <input type="checkbox" ${this.dataValue ? 'checked' : ''}>
        </div>`);
    }

    // Attach event listeners and element interactions
    attach(element) {
      super.attach(element);

      const checkbox = element.querySelector('input[type="checkbox"]');

      // Add change event listener to update value on checkbox toggle
      checkbox.addEventListener('change', (event) => {
        this.setValue(event.target.checked);
      });

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
    getValue() {
      return super.getValue();
    }

    // Set a new value for the component
    setValue(value, flags = {}) {
      return super.setValue(value, flags);
    }

    // Update the value with optional flags
    updateValue(value, flags = {}) {
      return super.updateValue(value, flags);
    }
  }

  // Register the component with Formio
  Formio.Components.addComponent('enabledisable', EnableDisableComponent);
})();