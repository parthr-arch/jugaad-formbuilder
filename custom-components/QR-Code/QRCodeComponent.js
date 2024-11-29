(function () {
    const FieldComponent = Formio.Components.components.field;
  
    class QRCodeComponent extends FieldComponent {
      static schema(...extend) {
        return FieldComponent.schema({
          type: 'qrcode',
          label: 'QR Code Generator',
          key: 'qrCode',
          input: true,
          placeholder: 'Enter text to generate QR code',
          persistent: true,
          validate: {
            required: false,
          },
          ...extend,
        });
      }
  
      static get builderInfo() {
        return {
          title: 'QR Code',
          group: 'advanced',
          icon: 'qrcode',
          weight: 20,
          schema: QRCodeComponent.schema(),
        };
      }
  
      get defaultSchema() {
        return QRCodeComponent.schema();
      }
  
      constructor(component, options, data) {
        super(component, options, data);
      }
  
      render() {
        return super.render(`
          <div class="qr-code-component">
            <label>${this.component.label}</label>
            <input 
              type="text" 
              class="form-control" 
              ref="qrInput" 
              placeholder="${this.component.placeholder}"
            />
            <div ref="qrCodeCanvas" class="qr-code-canvas" style="margin-top: 10px;"></div>
          </div>
        `);
      }
  
      attach(element) {
        this.loadRefs(element, {
          qrInput: 'single',
          qrCodeCanvas: 'single',
        });
  
        // Attach event listener to input field to generate QR code dynamically
        this.addEventListener(this.refs.qrInput, 'input', () => {
          this.generateQRCode(this.refs.qrInput.value);
        });
  
        return super.attach(element);
      }
  
      generateQRCode(value) {
        if (!value) {
          this.refs.qrCodeCanvas.innerHTML = ''; // Clear QR code if input is empty
          return;
        }
  
        // Clear any existing QR code
        this.refs.qrCodeCanvas.innerHTML = '';
  
        // Generate QR code using the qrcode.js library
        const qrCode = new QRCode(this.refs.qrCodeCanvas, {
          text: value,
          width: 128,
          height: 128,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H, // High correction level
        });
      }
    }
  
    // Register the custom QR Code component
    Formio.Components.addComponent('qrcode', QRCodeComponent);
  })();
  