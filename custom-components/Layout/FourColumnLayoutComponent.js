(function () {
  const ColumnsComponent = Formio.Components.components.columns;

  class FourColumnsComponent extends ColumnsComponent {
    static schema(...extend) {
      return ColumnsComponent.schema({
        type: 'fourcolumns',
        label: 'Four Columns',
        key: 'fourcolumns',
        columns: [
          { components: [], width: 3, offset: 0, push: 0, pull: 0, size: 'md' },
          { components: [], width: 3, offset: 0, push: 0, pull: 0, size: 'md' },
          { components: [], width: 3, offset: 0, push: 0, pull: 0, size: 'md' },
          { components: [], width: 3, offset: 0, push: 0, pull: 0, size: 'md' },
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
        title: 'Four Columns',
        group: 'layout',
        icon: 'columns', // Icon for four columns
        weight: 10,
        schema: FourColumnsComponent.schema(),
      };
    }

    get defaultSchema() {
      return FourColumnsComponent.schema();
    }

    constructor(component, options, data) {
      super(component, options, data);
    }

    render() {
      return super.render(`
        <div class="four-columns-component">
          <div class="row">
            ${this.component.columns
              .map(
                (column, index) => `
                <div class="col-${column.size}-${column.width}">
                  <div ref="column-${index}" class="column-container"></div>
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
        [`column-*`]: 'multiple',
      });

      this.refs[`column-*`].forEach((container, index) => {
        this.attachComponents(container, this.component.columns[index].components);
      });

      return super.attach(element);
    }

    getValue() {
      return this.component.columns.map((column) => 
        this.getComponents(column.components).map((component) => component.getValue())
      );
    }

    setValue(value, flags = {}) {
      value.forEach((columnValue, index) => {
        const column = this.component.columns[index];
        if (column) {
          columnValue.forEach((val, compIndex) => {
            const component = this.getComponentById(column.components[compIndex]?.id);
            if (component) {
              component.setValue(val, flags);
            }
          });
        }
      });

      return super.setValue(value, flags);
    }

    updateValue(value, flags = {}) {
      return super.updateValue(value, flags);
    }
  }

  FourColumnsComponent.editForm = function () {
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

  Formio.Components.addComponent('fourcolumns', FourColumnsComponent);
})();
