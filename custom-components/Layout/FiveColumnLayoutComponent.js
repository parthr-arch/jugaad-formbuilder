// FiveColumnsComponent.js
(function () {
  const ColumnsComponent = Formio.Components.components.columns;

  class FiveColumnsComponent extends ColumnsComponent {
    static schema(...extend) {
      return ColumnsComponent.schema({
        type: 'fivecolumns',
        label: 'Five Columns',
        key: 'fivecolumns',
        columns: [
          { components: [], width: 2, offset: 0, push: 0, pull: 0, size: 'md' },
          { components: [], width: 2, offset: 0, push: 0, pull: 0, size: 'md' },
          { components: [], width: 2, offset: 0, push: 0, pull: 0, size: 'md' },
          { components: [], width: 2, offset: 0, push: 0, pull: 0, size: 'md' },
          { components: [], width: 2, offset: 0, push: 0, pull: 0, size: 'md' },
        ],
        clearOnHide: false,
        input: false,
        tableView: false,
        persistent: false,
        autoAdjust: false,
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Five Columns',
        group: 'layout',
        icon: 'th-large', // You can modify the icon as per your preference
        weight: 10,
        schema: FiveColumnsComponent.schema(),
      };
    }

    get defaultSchema() {
      return FiveColumnsComponent.schema();
    }

    constructor(component, options, data) {
      super(component, options, data);
    }

    init() {
      super.init();
    }

    render(content) {
      return super.render(`
        <div class="five-columns-component">
          <div class="row">
            ${this.component.columns
              .map(
                (column, index) => `
                <div class="col-${column.size}-${column.width}">
                  ${this.renderComponents(column.components)}
                </div>
              `
              )
              .join('')}
          </div>
        </div>
      `);
    }

    attach(element) {
      this.loadRefs(element, {
        container: 'single',
      });

      return super.attach(element);
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

  // Corrected editForm method
  FiveColumnsComponent.editForm = function () {
    const editForm = ColumnsComponent.editForm();
    editForm.components.forEach((tab) => {
      if (tab.key === 'display') {
        tab.components.push({
          type: 'select',
          input: true,
          label: 'Bootstrap Size',
          key: 'size',
          data: {
            values: [
              { label: 'Extra Small (xs)', value: 'xs' },
              { label: 'Small (sm)', value: 'sm' },
              { label: 'Medium (md)', value: 'md' },
              { label: 'Large (lg)', value: 'lg' },
              { label: 'Extra Large (xl)', value: 'xl' },
            ],
          },
          defaultValue: 'md',
          weight: 50,
          tooltip: 'Select the Bootstrap size class for the columns.',
          validate: {
            required: true,
          },
        });
      }
    });
    return editForm;
  };

  Formio.Components.addComponent('fivecolumns', FiveColumnsComponent);
})();
