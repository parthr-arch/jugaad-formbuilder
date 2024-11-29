// ContactComponent.js
(function() {
  // Importing the base field component from Formio
  const FieldComponent = Formio.Components.components.field;

  // Defining the ContactComponent class that extends FieldComponent
  class ContactComponent extends FieldComponent {
      // Static method to define the schema for the component
      static schema(...extend) {
          return FieldComponent.schema({
              type: 'contact',        // Type of the component
              label: 'Contact',       // Label for the component
              key: 'contact',         // Key used to reference the component
              ...extend,              // Allow extending the schema with additional properties
          });
      }

      // Builder information for the component in the Formio builder interface
      static get builderInfo() {
          return {
              title: 'Contact',      // Title displayed in builder
              group: 'basic',        // Grouping in builder
              icon: 'contact',       // Icon representing the component
              weight: 10,            // Weight for ordering components in builder
              schema: ContactComponent.schema(),  // Schema definition
          };
      }

      // Default schema for instances of this component
      get defaultSchema() {
          return ContactComponent.schema();
      }

      // Constructor to initialize the component with passed parameters
      constructor(component, options, data) {
          super(component, options, data);  // Call base class constructor
      }

      // Initialization method called after construction
      init() {
          super.init();  // Call base class init method
      }

      // Override inputInfo to customize input information if needed
      get inputInfo() {
          const info = super.inputInfo;  // Get default input info from base class
          return info;                    // Return customized info (if any)
      }

      // Render method to create HTML structure for the contact form
      render() {
          return super.render(`
              <div class="contact-component">
                  <form>
                      <label for="fname">First Name</label>
                      <input type="text" id="fname" name="firstname" placeholder="Your name..">
                      
                      <label for="lname">Last Name</label>
                      <input type="text" id="lname" name="lastname" placeholder="Your last name..">
                      
                      <label for="country">Country</label>
                      <select id="country" name="country">
                          <option value="australia">Australia</option>
                          <option value="canada">Canada</option>
                          <option value="usa">USA</option>
                      </select>
                      
                      <label for="subject">Subject</label>
                      <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
                      
                      <input type="submit" value="Submit">
                  </form>
              </div>
          `);
      }

      // Method to remove this component from its parent container
      removeComponent() {
          if (confirm("Are you sure you want to remove this contact?")) {
              this.root.removeComponent(this);  // Remove component if confirmed
          }
      }

      // Method to attach event listeners or additional functionality to the element
      attach(element) {
          super.attach(element);  // Call base class attach method
          return element;  // Return the attached element
      }

      // Method to edit the label of the contact component through a prompt dialog
      editComponent() {
          const newLabel = prompt("Enter new label for the contact:", this.component.label);
          if (newLabel !== null && newLabel !== "") {
              this.component.label = newLabel;  // Update label if valid input is provided
              this.redraw();                    // Redraw component to reflect changes
          }
      }

      getValue() {
          return super.getValue();  // Return current value of the component from base class
      }

      setValue(value, flags = {}) {
          return super.setValue(value, flags);  // Set new value using base class method
      }

      updateValue(value, flags = {}) {
          return super.updateValue(value, flags);  // Update value using base class method
      }
  }

  // Registering the ContactComponent with Formio's components registry
  Formio.Components.addComponent('contact', ContactComponent);
})();