(function () {
    const FieldComponent = Formio.Components.components.field;
    console.log(FieldComponent);
    console.log(Formio.Components);
    
    class ColumnsLayoutComponent extends FieldComponent {
      static schema(...extend) {
        return FieldComponent.schema({
          type: 'columnsLayout',
          label: 'Columns Layout',
          key: 'columnsLayout',
          input: false,
          columns: [
            { components: [], width: 6, offset: 0, push: 0, pull: 0 },
            { components: [], width: 6, offset: 0, push: 0, pull: 0 },
          ],
          ...extend,
        });
      }
  
      static get builderInfo() {
        return {
          title: 'Columns Layout',
          group: 'layout',
          icon: 'fa fa-columns',
          weight: 10,
          documentation: 'http://help.form.io/userguide/#columns',
          schema: ColumnsLayoutComponent.schema(),
        };
      }
  
      get defaultSchema() {
        return ColumnsLayoutComponent.schema();
      }
  
      render() {
        return super.render(`
          <div>
            <label>${this.component.label}</label>
            <div class="row">
              ${this.component.columns
                .map(
                  (col, index) => `
                    <div class="col-md-${col.width}">
                      <div class="panel panel-default">
                        <div class="panel-heading">
                          <strong>Column ${index + 1}</strong>
                        </div>
                        <div class="panel-body">
                          <div class="formio-container" data-column-index="${index}">
                            ${col.components
                              .map(
                                component =>
                                  `<div>${this.renderComponent(component)}</div>`
                              )
                              .join('')}
                          </div>
                          <button type="button" class="btn btn-primary btn-sm add-field" data-column-index="${index}">
                            Add Field
                          </button>
                        </div>
                      </div>
                    </div>`
                )
                .join('')}
            </div>
          </div>
        `);
      }
  
      renderComponent(component) {
        return `
          <div>
            <label>${component.label}</label>
            <input type="text" class="form-control" placeholder="${component.placeholder || ''}" />
          </div>
        `;
      }
  
      attach(element) {
        super.attach(element);
  
        // Handle adding fields
        const addFieldButtons = element.querySelectorAll('.add-field');
        addFieldButtons.forEach(button => {
          button.addEventListener('click', event => {
            const columnIndex = event.target.getAttribute('data-column-index');
            this.addFieldToColumn(columnIndex);
          });
        });
  
        return element;
      }
  
      addFieldToColumn(index) {
        // Add a new field to the specified column
        this.component.columns[index].components.push({
          label: `Field ${this.component.columns[index].components.length + 1}`,
          placeholder: 'Enter text...',
          key: `field_${index}_${this.component.columns[index].components.length}`,
          type: 'textfield',
        });
        this.redraw();
      }
  
      redraw() {
        // Re-render the component
        this.render();
      }
    }
  
    // Register the component
    Formio.Components.addComponent('columnsLayout', ColumnsLayoutComponent);
  })();
  