(function () {
    const FieldComponent = Formio.Components.components.field;
  
    class ExtendedColumnsComponent extends FieldComponent {
      static schema(...extend) {
        return FieldComponent.schema({
          type: 'extendedColumns',
          label: 'Extended Columns Layout',
          key: 'extendedColumns',
          input: false,
          customColumns: 'md', // Default column size
          customBlocks: 3, // Default number of columns
          columnLabels: [], // Labels for each column
          columnColors: [], // Background colors for each column
          ...extend,
        });
      }
  
      static editForm(...extend) {
        const editForm = FieldComponent.editForm(...extend);
        editForm.components = editForm.components.map((tab) => {
          if (tab.key === 'display') {
            tab.components.push(
              {
                type: 'select',
                input: true,
                key: 'customColumns',
                label: 'Column Size',
                placeholder: 'Select column size',
                dataSrc: 'values',
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
                weight: 10,
                tooltip: 'Choose a responsive column size.',
              },
              {
                type: 'select',
                input: true,
                key: 'customBlocks',
                label: 'Number of Columns',
                placeholder: 'Select number of columns',
                dataSrc: 'values',
                data: {
                  values: Array.from({ length: 12 }, (_, i) => ({
                    label: `${i + 1}`,
                    value: i + 1,
                  })),
                },
                defaultValue: 3,
                weight: 20,
                tooltip: 'Specify the number of columns (1-12).',
              },
              {
                type: 'editgrid',
                key: 'columnLabels',
                label: 'Column Labels',
                tooltip: 'Set custom labels for each column.',
                components: [
                  {
                    type: 'textfield',
                    key: 'label',
                    label: 'Label',
                    placeholder: 'Enter column label',
                    input: true,
                  },
                ],
                weight: 30,
              },
              {
                type: 'editgrid',
                key: 'columnColors',
                label: 'Column Background Colors',
                tooltip: 'Set a background color for each column.',
                components: [
                  {
                    type: 'textfield',
                    key: 'color',
                    label: 'Background Color',
                    placeholder: 'Enter a CSS color (e.g., #f00, red)',
                    input: true,
                  },
                ],
                weight: 40,
              }
            );
          }
          return tab;
        });
        return editForm;
      }
  
      static get builderInfo() {
        return {
          title: 'Extended Columns Layout',
          group: 'layout',
          icon: 'columns',
          weight: 20,
          schema: ExtendedColumnsComponent.schema(),
        };
      }
  
      get defaultSchema() {
        return ExtendedColumnsComponent.schema();
      }
  
      constructor(component, options, data) {
        super(component, options, data);
        this.customColumns = this.component.customColumns || 'md';
        this.customBlocks = this.component.customBlocks || 3;
        this.columnLabels = this.component.columnLabels || [];
        this.columnColors = this.component.columnColors || [];
      }
  
      render() {
        const blocks = parseInt(this.customBlocks, 10);
        const columnClass = `col-${this.customColumns}-${12 / blocks}`;
        return super.render(`
          <div class="extended-columns-component">
            <div class="row">
              ${Array.from({ length: blocks }, (_, index) => {
                const label = this.columnLabels[index]?.label || `Column ${index + 1}`;
                const color = this.columnColors[index]?.color || 'transparent';
                return `
                  <div class="${columnClass}" style="background-color: ${color}; padding: 10px;">
                    <div class="column-block">
                      <strong>${label}</strong>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `);
      }
  
      attach(element) {
        this.loadRefs(element, { gridContainer: 'single' });
        return super.attach(element);
      }
  
      getValue() {
        return {
          customColumns: this.customColumns,
          customBlocks: this.customBlocks,
          columnLabels: this.columnLabels,
          columnColors: this.columnColors,
        };
      }
  
      setValue(value, flags = {}) {
        if (value) {
          this.customColumns = value.customColumns || this.customColumns;
          this.customBlocks = value.customBlocks || this.customBlocks;
          this.columnLabels = value.columnLabels || this.columnLabels;
          this.columnColors = value.columnColors || this.columnColors;
          this.redraw();
        }
        return super.setValue(value, flags);
      }
    }
  
    // Register the component in Form.io
    Formio.Components.addComponent('extendedColumns', ExtendedColumnsComponent);
  })();
  