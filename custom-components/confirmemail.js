(function () {
  const FieldComponent = Formio.Components.components.field;

  class ConfirmEmailComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'confirmemail',
        label: 'Confirm Email Component',
        refs: 'ConfirmEmailComponent',
        ref: 'ConfirmEmailComponent',
        key: 'confirmemail',
        input: true,
        components: [
          {
            label: 'Email',
            key: 'email',
            type: 'textfield',
            inputType: 'email',
            input: true,
            validate: {
              required: true,
              pattern: '^\\S+@\\S+\\.\\S+$', // Regex for email validation
              customMessage: 'Please enter a valid email address.',
            },
          },
          {
            label: 'Confirm Email',
            key: 'confirmEmail',
            type: 'textfield',
            inputType: 'email',
            input: true,
            validate: {
              required: true,
              pattern: '^\\S+@\\S+\\.\\S+$', // Regex for email validation
              customMessage: 'Please enter a valid email address.',
            },
          },
        ],
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Confirm Email',
        group: 'basic',
        icon: 'envelope',
        weight: 20,
        schema: ConfirmEmailComponent.schema(),
      };
    }

    get defaultSchema() {
      return ConfirmEmailComponent.schema();
    }

    constructor(component, options, data) {
      super(component, options, data);
      this.dataValue = this.dataValue || {}; // Ensure dataValue is initialized
    }

    render(content) {
      const emailValue = this.dataValue.email || '';
      const confirmEmailValue = this.dataValue.confirmEmail || '';
      
      return super.render(`
        <div class="form-group ">
          <div class="row">
            <div class="col-md-6">
              <label class="form-label">${this.component.components[0].label}</label>
              <input 
                type="email" 
                class="form-control" 
                ref="emailInput" 
                value="${emailValue}"
              />
              <div ref="emailError" class="error" style="color:red;display:none">
                Please enter a valid email address.
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label" >${this.component.components[1].label}</label>
              <input 
                type="email" 
                class="form-control" 
                ref="confirmEmailInput" 
                value="${confirmEmailValue}"
              />
              <div ref="confirmEmailError" class="error" style="color:red;display:none">
                Please enter a valid email address.
              </div>
              <div ref="matchError" class="error" style="color:red;display:none">
                Emails do not match.
              </div>
            </div>
          </div>
        </div>
      `);
    }

    attach(element) {
      this.loadRefs(element, {
        emailInput: 'single',
        confirmEmailInput: 'single',
        confirmEmailLabel: 'single',
        emailError: 'single',
        confirmEmailError: 'single',
        matchError: 'single',
      });

      
      this.addEventListener(this.refs.emailInput, 'input', this.validateEmails.bind(this));
      this.addEventListener(this.refs.confirmEmailInput, 'input', this.validateEmails.bind(this));
      
      this.hideConfirmEmailLabel();
      return super.attach(element);
    }

    hideConfirmEmailLabel() {
      if (this.refs.confirmEmailLabel) {
        this.refs.confirmEmailLabel.style.display = 'none';
      }
    }

    validateEmails() {
      const email = this.refs.emailInput.value.trim();
      const confirmEmail = this.refs.confirmEmailInput.value.trim();
      const emailRegex = /^\S+@\S+\.\S+$/;

      // Email field validation
      if (email && !emailRegex.test(email)) {
        this.refs.emailError.style.display = 'block';
      } else {
        this.refs.emailError.style.display = 'none';
      }

      // Confirm Email field validation
      if (confirmEmail && !emailRegex.test(confirmEmail)) {
        this.refs.confirmEmailError.style.display = 'block';
      } else {
        this.refs.confirmEmailError.style.display = 'none';
      }

      // Matching emails validation
      if (email && confirmEmail && email !== confirmEmail) {
        this.refs.matchError.style.display = 'block';
      } else {
        this.refs.matchError.style.display = 'none';
      }

      this.setValue({ email, confirmEmail });
    }

    getValue() {
      return this.dataValue;
    }

    setValue(value, flags = {}) {
      if (value) {
        if (value.email) this.refs.emailInput.value = value.email;
        if (value.confirmEmail) this.refs.confirmEmailInput.value = value.confirmEmail;
      }
      return super.setValue(value, flags);
    }

    updateValue(value, flags = {}) {
      return super.updateValue(value, flags);
    }
  }

  Formio.Components.addComponent('confirmemail', ConfirmEmailComponent);
})();
