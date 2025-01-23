var builderOptions = {
    noDefaultSubmitButton: true, // Optional: Remove the submit button
    "editForm": {
        "textfield": [
            {
                key: 'api',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: true
            },
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'logic',
                ignore: true
            },
            {
                key: 'validation',
                ignore: true
            },
            {
                key: 'data',
                ignore: true
            },
            {
                key: 'display',
                ignore: true
            },
            {
                type: 'textfield',
                input: true,
                label: 'Setting',
                weight: 12,
                key: 'Setting',
                ignore: false,
                components: [
                    //   addons
                    // {
                    //     type: 'editgrid',
                    //     addAnother: 'Add Addon',
                    //     saveRow: 'Save Addon',
                    //     weight: 28,
                    //     input: true,
                    //     key: 'addons',
                    //     label: 'Addons',
                    //     templates: {
                    //         // eslint-disable-next-line quotes
                    //         header: `<div class="row">
                    //                             <div class="col-6">{{ t(components[0].label) }}</div>
                    //                             <div class="col-4">Settings</div>
                    //                           </div>`,
                    //         // eslint-disable-next-line quotes
                    //         row: `<div class="row">
                    //                           <div class="col-6">
                    //                             {{ row.name.label }}
                    //                           </div>
                    //                           <div class="col-4 text-muted">
                    //                             Click Edit to see addon's settings
                    //                           </div>
                                
                    //                           {% if (!instance.options.readOnly && !instance.disabled) { %}
                    //                             <div class="col-2">
                    //                               <div class="btn-group pull-right">
                    //                                 <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass('edit') }}"></i></button>
                    //                                 {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
                    //                                   <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass('trash') }}"></i></button>
                    //                                 {% } %}
                    //                               </div>
                    //                             </div>
                    //                           {% } %}
                    //                         </div>`,
                    //     },
                    //     components: [
                    //         {
                    //             label: 'Name',
                    //             tableView: true,
                    //             key: 'name',
                    //             type: 'select',
                    //             dataSrc: 'custom',
                    //             data: {
                    //                 custom: function ({ instance }) {
                    //                     const componentType = instance?.root?.data?.type;
                    //                     const availableAddons = Object.keys(Addons).filter((key) => {
                    //                         if (Addons[key]?.info?.supportedComponents?.includes(componentType)) {
                    //                             return true;
                    //                         }
                    //                         return false;
                    //                     });
                    //                     return availableAddons.map((addonKey) => ({
                    //                         value: addonKey,
                    //                         label: Addons[addonKey].info.label || addonKey,
                    //                     }));
                    //                 },
                    //             },
                    //             input: true,
                    //             validate: {
                    //                 required: true,
                    //             },
                    //         },
                    //         ...editForms,
                    //     ]
                    // },
                   // conditional
                    {
                        type: 'panel',
                        title: 'Simple',
                        key: 'simple-conditional',
                        theme: 'default',
                        weight: 105,
                        components: [
                            {
                                type: 'select',
                                input: true,
                                label: 'This component should Display:',
                                key: 'conditional.show',
                                dataSrc: 'values',
                                data: {
                                    values: [
                                        { label: 'True', value: 'true' },
                                        { label: 'False', value: 'false' }
                                    ]
                                }
                            },
                            {
                                type: 'select',
                                input: true,
                                label: 'When the form component:',
                                key: 'conditional.when',
                                dataSrc: 'custom',
                                valueProperty: 'value',
                                data: {
                                    custom(context) {
                                        return getContextComponents(context);
                                    }
                                }
                            },
                            {
                                type: 'textfield',
                                input: true,
                                label: 'Has the value:',
                                key: 'conditional.eq'
                            },
                            {
                                weight: 0,
                                type: 'textfield',
                                input: true,
                                key: 'key',
                                label: 'Property Name',
                                tooltip: 'The name of this field in the API endpoint.',
                                validate: {
                                    pattern: '(\\w|\\w[\\w-.]*\\w)',
                                    patternMessage: 'The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.',
                                    required: true
                                }
                            },
                            {
                                weight: 100,
                                type: 'tags',
                                input: true,
                                label: 'Field Tags',
                                storeas: 'array',
                                tooltip: 'Tag the field for use in custom logic.',
                                key: 'tags'
                            },
                            {
                                weight: 200,
                                type: 'datamap',
                                label: 'Custom Properties',
                                tooltip: 'This allows you to configure any custom properties for this component.',
                                key: 'properties',
                                valueComponent: {
                                    type: 'textfield',
                                    key: 'value',
                                    label: 'Value',
                                    placeholder: 'Value',
                                    input: true
                                }
                            },
                            {
                                weight: 0,
                                type: 'checkbox',
                                label: 'Multiple Values',
                                tooltip: 'Allows multiple values to be entered for this field.',
                                key: 'multiple',
                                input: true
                            },
                            {
                                type: 'textfield',
                                label: 'Default Value',
                                key: 'defaultValue',
                                weight: 5,
                                placeholder: 'Default Value',
                                tooltip: 'The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
                                input: true
                            },
                            {
                                weight: 30,
                                type: 'radio',
                                label: 'Persistent',
                                tooltip: 'A persistent field will be stored in database when the form is submitted.',
                                key: 'persistent',
                                input: true,
                                inline: true,
                                defaultValue: true,
                                values: [
                                    { label: 'None', value: false },
                                    { label: 'Server', value: true },
                                    { label: 'Client', value: 'client-only' },
                                ]
                            },
                            {
                                weight: 150,
                                type: 'checkbox',
                                label: 'Protected',
                                tooltip: 'A protected field will not be returned when queried via API.',
                                key: 'protected',
                                input: true
                            },
                            {
                                type: 'checkbox',
                                input: true,
                                weight: 200,
                                key: 'dbIndex',
                                label: 'Database Index',
                                tooltip: 'Set this field as an index within the database. Increases performance for submission queries.'
                            },
                            {
                                weight: 400,
                                type: 'checkbox',
                                label: 'Encrypted',
                                tooltip: 'Encrypt this field on the server. This is two way encryption which is not suitable for passwords.',
                                key: 'encrypted',
                                input: true,
                                logic: [
                                    {
                                        name: 'disabled',
                                        trigger: {
                                            type: 'javascript',
                                            javascript: 'result = !instance.root.options.sac;'
                                        },
                                        actions: [
                                            {
                                                name: 'disabled',
                                                type: 'property',
                                                property: {
                                                    label: 'Disabled',
                                                    value: 'disabled',
                                                    type: 'boolean'
                                                },
                                                state: true
                                            }
                                        ]
                                    },
                                    {
                                        name: 'disabledToolTip',
                                        trigger: {
                                            type: 'javascript',
                                            javascript: 'result = !instance.root.options.sac;'
                                        },
                                        actions: [
                                            {
                                                name: 'addDisabledTooltip',
                                                type: 'property',
                                                property: {
                                                    label: 'Tooltip',
                                                    value: 'tooltip',
                                                    type: 'string'
                                                },
                                                text: 'Only available with Security Module. Contact sales@form.io for more information.'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'select',
                                input: true,
                                key: 'redrawOn',
                                label: 'Redraw On',
                                weight: 600,
                                tooltip: 'Redraw this component if another component changes. This is useful if interpolating parts of the component like the label.',
                                dataSrc: 'custom',
                                valueProperty: 'value',
                                data: {
                                    custom(context) {
                                        var values = [];
                                        values.push({ label: 'Any Change', value: 'data' });
                                        context.utils.eachComponent(context.instance.options.editForm.components, function (component, path) {
                                            if (component.key !== context.data.key) {
                                                values.push({
                                                    label: component.label || component.key,
                                                    value: path
                                                });
                                            }
                                        });
                                        return values;
                                    }
                                },
                                conditional: {
                                    json: { '!': [{ var: 'data.dataSrc' }] },
                                },
                            },
                            {
                                weight: 700,
                                type: 'checkbox',
                                label: 'Omit Value From Submission Data When Conditionally Hidden',
                                key: 'clearOnHide',
                                defaultValue: true,
                                tooltip: 'When a field is conditionally hidden, omit the value from the submission data.',
                                input: true
                            },
                            {
                                type: 'checkbox',
                                input: true,
                                weight: 1100,
                                key: 'calculateServer',
                                label: 'Calculate Value on server',
                                tooltip: 'Checking this will run the calculation on the server. This is useful if you wish to override the values submitted with the calculations performed on the server.'
                            },
                            {
                                type: 'checkbox',
                                input: true,
                                weight: 1200,
                                key: 'allowCalculateOverride',
                                label: 'Allow Manual Override of Calculated Value',
                                tooltip: 'When checked, this will allow the user to manually override the calculated value.'
                            },
                            {
                                weight: 0,
                                type: 'textfield',
                                input: true,
                                key: 'label',
                                label: 'Label',
                                placeholder: 'Field Label',
                                tooltip: 'The label for this field that will appear next to it.',
                                validate: {
                                    required: true
                                },
                                autofocus: true,
                            },
                            {
                                type: 'select',
                                input: true,
                                key: 'labelPosition',
                                label: 'Label Position',
                                tooltip: 'Position for the label for this field.',
                                weight: 20,
                                defaultValue: 'top',
                                dataSrc: 'values',
                                data: {
                                    values: [
                                        { label: 'Top', value: 'top' },
                                        { label: 'Left (Left-aligned)', value: 'left-left' },
                                        { label: 'Left (Right-aligned)', value: 'left-right' },
                                        { label: 'Right (Left-aligned)', value: 'right-left' },
                                        { label: 'Right (Right-aligned)', value: 'right-right' },
                                        { label: 'Bottom', value: 'bottom' }
                                    ]
                                }
                            },
                            {
                                type: 'number',
                                input: true,
                                key: 'labelWidth',
                                label: 'Label Width',
                                tooltip: 'The width of label on line in percentages.',
                                clearOnHide: false,
                                weight: 30,
                                placeholder: '30',
                                suffix: '%',
                                validate: {
                                    min: 0,
                                    max: 100
                                },
                                conditional: {
                                    json: {
                                        and: [
                                            { '!==': [{ var: 'data.labelPosition' }, 'top'] },
                                            { '!==': [{ var: 'data.labelPosition' }, 'bottom'] },
                                        ]
                                    }
                                }
                            },
                            {
                                type: 'number',
                                input: true,
                                key: 'labelMargin',
                                label: 'Label Margin',
                                tooltip: 'The width of label margin on line in percentages.',
                                clearOnHide: false,
                                weight: 30,
                                placeholder: '3',
                                suffix: '%',
                                validate: {
                                    min: 0,
                                    max: 100
                                },
                                conditional: {
                                    json: {
                                        and: [
                                            { '!==': [{ var: 'data.labelPosition' }, 'top'] },
                                            { '!==': [{ var: 'data.labelPosition' }, 'bottom'] },
                                        ]
                                    }
                                }
                            },
                            {
                                weight: 100,
                                type: 'textfield',
                                input: true,
                                key: 'placeholder',
                                label: 'Placeholder',
                                placeholder: 'Placeholder',
                                tooltip: 'The placeholder text that will appear when this field is empty.'
                            },
                            {
                                weight: 200,
                                type: 'textarea',
                                input: true,
                                key: 'description',
                                label: 'Description',
                                placeholder: 'Description for this field.',
                                tooltip: 'The description is text that will appear below the input field.',
                                editor: 'ace',
                                as: 'html',
                                wysiwyg: {
                                    minLines: 3,
                                    isUseWorkerDisabled: true,
                                },
                            },
                            {
                                weight: 300,
                                type: 'textarea',
                                input: true,
                                key: 'tooltip',
                                label: 'Tooltip',
                                placeholder: 'To add a tooltip to this field, enter text here.',
                                tooltip: 'Adds a tooltip to the side of this field.',
                                editor: 'ace',
                                as: 'html',
                                wysiwyg: {
                                    minLines: 3,
                                    isUseWorkerDisabled: true,
                                },
                            },
                            {
                                weight: 500,
                                type: 'textfield',
                                input: true,
                                key: 'customClass',
                                label: 'Custom CSS Class',
                                placeholder: 'Custom CSS Class',
                                tooltip: 'Custom CSS class to add to this component.'
                            },
                            {
                                weight: 600,
                                type: 'textfield',
                                input: true,
                                key: 'tabindex',
                                label: 'Tab Index',
                                placeholder: '0',
                                tooltip: 'Sets the tabindex attribute of this component to override the tab order of the form. See the <a href=\'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex\'>MDN documentation</a> on tabindex for more information.'
                            },
                            {
                                weight: 1100,
                                type: 'checkbox',
                                label: 'Hidden',
                                tooltip: 'A hidden field is still a part of the form, but is hidden from view.',
                                key: 'hidden',
                                input: true
                            },
                            {
                                weight: 1200,
                                type: 'checkbox',
                                label: 'Hide Label',
                                tooltip: 'Hide the label (title, if no label) of this component. This allows you to show the label in the form builder, but not when it is rendered.',
                                key: 'hideLabel',
                                input: true
                            },
                            {
                                weight: 1350,
                                type: 'checkbox',
                                label: 'Initial Focus',
                                tooltip: 'Make this field the initially focused element on this form.',
                                key: 'autofocus',
                                input: true
                            },
                            {
                                weight: 1370,
                                type: 'checkbox',
                                label: 'Show Label in DataGrid',
                                tooltip: 'Show the label inside each row when in a Datagrid.',
                                key: 'dataGridLabel',
                                input: true,
                                customConditional(context) {
                                    return context.instance.options?.flags?.inDataGrid;
                                }
                            },
                            {
                                weight: 1400,
                                type: 'checkbox',
                                label: 'Disabled',
                                tooltip: 'Disable the form input.',
                                key: 'disabled',
                                input: true
                            },
                            {
                                weight: 1500,
                                type: 'checkbox',
                                label: 'Table View',
                                tooltip: 'Shows this value within the table view of the submissions.',
                                key: 'tableView',
                                input: true
                            },
                            {
                                weight: 1600,
                                type: 'checkbox',
                                label: 'Modal Edit',
                                tooltip: 'Opens up a modal to edit the value of this component.',
                                key: 'modalEdit',
                                input: true
                            },
                            {
                                label: 'HTML Attributes',
                                type: 'datamap',
                                input: true,
                                key: 'attributes',
                                keyLabel: 'Attribute Name',
                                valueComponent: {
                                    type: 'textfield',
                                    key: 'value',
                                    label: 'Attribute Value',
                                    input: true
                                },
                                tooltip: 'Provide a map of HTML attributes for component\'s input element (attributes provided by other component settings or other attributes generated by form.io take precedence over attributes in this grid)',
                                addAnother: 'Add Attribute',
                            },
                            {
                                type: 'panel',
                                legend: 'PDF Overlay',
                                title: 'PDF Overlay',
                                key: 'overlay',
                                tooltip: 'The settings inside apply only to the PDF forms.',
                                weight: 2000,
                                collapsible: true,
                                collapsed: true,
                                components: [
                                    {
                                        type: 'textfield',
                                        input: true,
                                        key: 'overlay.style',
                                        label: 'Style',
                                        placeholder: '',
                                        tooltip: 'Custom styles that should be applied to this component when rendered in PDF.'
                                    },
                                    {
                                        type: 'textfield',
                                        input: true,
                                        key: 'overlay.page',
                                        label: 'Page',
                                        placeholder: '',
                                        tooltip: 'The PDF page to place this component.'
                                    },
                                    {
                                        type: 'textfield',
                                        input: true,
                                        key: 'overlay.left',
                                        label: 'Left',
                                        placeholder: '',
                                        tooltip: 'The left margin within a page to place this component.'
                                    },
                                    {
                                        type: 'textfield',
                                        input: true,
                                        key: 'overlay.top',
                                        label: 'Top',
                                        placeholder: '',
                                        tooltip: 'The top margin within a page to place this component.'
                                    },
                                    {
                                        type: 'textfield',
                                        input: true,
                                        key: 'overlay.width',
                                        label: 'Width',
                                        placeholder: '',
                                        tooltip: 'The width of the component (in pixels).'
                                    },
                                    {
                                        type: 'textfield',
                                        input: true,
                                        key: 'overlay.height',
                                        label: 'Height',
                                        placeholder: '',
                                        tooltip: 'The height of the component (in pixels).'
                                    },
        
                                ]
                            },
                            // {
                            //     weight: 0,
                            //     input: true,
                            //     label: 'Advanced Logic',
                            //     key: 'logic',
                            //     templates: {
                            //         header: '<div class="row"> \n  <div class="col-sm-6">\n    <strong>{{ value.length }} {{ ctx.t("Advanced Logic Configured") }}</strong>\n  </div>\n</div>',
                            //         row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <button class="btn btn-default editRow">{{ ctx.t("Edit") }}</button> \n      <button class="btn btn-danger removeRow">{{ ctx.t("Delete") }}</button> \n    </div> \n  </div> \n</div>',
                            //         footer: '',
                            //     },
                            //     type: 'editgrid',
                            //     addAnother: 'Add Logic',
                            //     saveRow: 'Save Logic',
                            //     components: [
                            //         {
                            //             weight: 0,
                            //             input: true,
                            //             inputType: 'text',
                            //             label: 'Logic Name',
                            //             key: 'name',
                            //             validate: {
                            //                 required: true,
                            //             },
                            //             type: 'textfield',
                            //         },
                            //         {
                            //             weight: 10,
                            //             key: 'triggerPanel',
                            //             input: false,
                            //             title: 'Trigger',
                            //             tableView: false,
                            //             components: [
                            //                 {
                            //                     weight: 0,
                            //                     input: true,
                            //                     tableView: false,
                            //                     components: [
                            //                         {
                            //                             weight: 0,
                            //                             input: true,
                            //                             label: 'Type',
                            //                             key: 'type',
                            //                             tableView: false,
                            //                             data: {
                            //                                 values: [
                            //                                     {
                            //                                         value: 'simple',
                            //                                         label: 'Simple',
                            //                                     },
                            //                                     {
                            //                                         value: 'javascript',
                            //                                         label: 'Javascript',
                            //                                     },
                            //                                     {
                            //                                         value: 'json',
                            //                                         label: 'JSON Logic',
                            //                                     },
                            //                                     {
                            //                                         value: 'event',
                            //                                         label: 'Event',
                            //                                     },
                            //                                 ],
                            //                             },
                            //                             dataSrc: 'values',
                            //                             template: '<span>{{ item.label }}</span>',
                            //                             type: 'select',
                            //                         },
                            //                         {
                            //                             weight: 10,
                            //                             label: '',
                            //                             key: 'simple',
                            //                             type: 'container',
                            //                             tableView: false,
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'simple';
                            //                             },
                            //                             components: [
                            //                                 {
                            //                                     input: true,
                            //                                     key: 'show',
                            //                                     label: 'Show',
                            //                                     type: 'hidden',
                            //                                     tableView: false,
                            //                                     calculateValue() {
                            //                                         return true;
                            //                                     },
                            //                                 },
                            //                                 {
                            //                                     type: 'select',
                            //                                     input: true,
                            //                                     label: 'When the form component:',
                            //                                     key: 'when',
                            //                                     dataSrc: 'custom',
                            //                                     valueProperty: 'value',
                            //                                     tableView: false,
                            //                                     data: {
                            //                                         custom(context) {
                            //                                             return getContextComponents(context);
                            //                                         },
                            //                                     },
                            //                                 },
                            //                                 {
                            //                                     type: 'textfield',
                            //                                     input: true,
                            //                                     label: 'Has the value:',
                            //                                     key: 'eq',
                            //                                     tableView: false,
                            //                                 },
                            //                             ],
                            //                         },
                            //                         {
                            //                             weight: 10,
                            //                             type: 'textarea',
                            //                             key: 'javascript',
                            //                             rows: 5,
                            //                             editor: 'ace',
                            //                             as: 'javascript',
                            //                             input: true,
                            //                             tableView: false,
                            //                             placeholder: `result = (data['mykey'] > 1);`,
                            //                             description: '"row", "data", and "component" variables are available. Return "result".',
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'javascript';
                            //                             },
                            //                         },
                            //                         {
                            //                             weight: 10,
                            //                             type: 'textarea',
                            //                             key: 'json',
                            //                             rows: 5,
                            //                             editor: 'ace',
                            //                             label: 'JSON Logic',
                            //                             as: 'json',
                            //                             input: true,
                            //                             tableView: false,
                            //                             placeholder: `{ ... }`,
                            //                             description: '"row", "data", "component" and "_" variables are available. Return the result to be passed to the action if truthy.',
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'json';
                            //                             },
                            //                         },
                            //                         {
                            //                             weight: 10,
                            //                             type: 'textfield',
                            //                             key: 'event',
                            //                             label: 'Event Name',
                            //                             placeholder: 'event',
                            //                             description: 'The event that will trigger this logic. You can trigger events externally or via a button.',
                            //                             tableView: false,
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'event';
                            //                             },
                            //                         },
                            //                     ],
                            //                     key: 'trigger',
                            //                     type: 'container',
                            //                 },
                            //             ],
                            //             type: 'panel',
                            //         },
                            //         {
                            //             weight: 20,
                            //             input: true,
                            //             label: 'Actions',
                            //             key: 'actions',
                            //             tableView: false,
                            //             templates: {
                            //                 header: '<div class="row"> \n  <div class="col-sm-6"><strong>{{ value.length }} {{ ctx.t("actions") }}</strong></div>\n</div>',
                            //                 row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <button class="btn btn-default editRow">{{ ctx.t("Edit") }}</button> \n      <button class="btn btn-danger removeRow">{{ ctx.t("Delete") }}</button> \n    </div> \n  </div> \n</div>',
                            //                 footer: '',
                            //             },
                            //             type: 'editgrid',
                            //             addAnother: 'Add Action',
                            //             saveRow: 'Save Action',
                            //             components: [
                            //                 {
                            //                     weight: 0,
                            //                     title: 'Action',
                            //                     input: false,
                            //                     key: 'actionPanel',
                            //                     type: 'panel',
                            //                     components: [
                            //                         {
                            //                             weight: 0,
                            //                             input: true,
                            //                             inputType: 'text',
                            //                             label: 'Action Name',
                            //                             key: 'name',
                            //                             validate: {
                            //                                 required: true,
                            //                             },
                            //                             type: 'textfield',
                            //                         },
                            //                         {
                            //                             weight: 10,
                            //                             input: true,
                            //                             label: 'Type',
                            //                             key: 'type',
                            //                             data: {
                            //                                 values: [
                            //                                     {
                            //                                         value: 'property',
                            //                                         label: 'Property',
                            //                                     },
                            //                                     {
                            //                                         value: 'value',
                            //                                         label: 'Value',
                            //                                     },
                            //                                     {
                            //                                         label: 'Merge Component Schema',
                            //                                         value: 'mergeComponentSchema',
                            //                                     },
                            //                                     {
                            //                                         label: 'Custom Action',
                            //                                         value: 'customAction',
                            //                                     },
                            //                                 ],
                            //                             },
                            //                             dataSrc: 'values',
                            //                             template: '<span>{{ item.label }}</span>',
                            //                             type: 'select',
                            //                         },
                            //                         {
                            //                             weight: 20,
                            //                             type: 'select',
                            //                             template: '<span>{{ item.label }}</span>',
                            //                             dataSrc: 'json',
                            //                             tableView: false,
                            //                             data: {
                            //                                 json: [
                            //                                     {
                            //                                         label: 'Hidden',
                            //                                         value: 'hidden',
                            //                                         type: 'boolean',
                            //                                     },
                            //                                     {
                            //                                         label: 'Required',
                            //                                         value: 'validate.required',
                            //                                         type: 'boolean',
                            //                                     },
                            //                                     {
                            //                                         label: 'Disabled',
                            //                                         value: 'disabled',
                            //                                         type: 'boolean',
                            //                                     },
                            //                                     {
                            //                                         label: 'Label',
                            //                                         value: 'label',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Title',
                            //                                         value: 'title',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Prefix',
                            //                                         value: 'prefix',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Suffix',
                            //                                         value: 'suffix',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Tooltip',
                            //                                         value: 'tooltip',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Description',
                            //                                         value: 'description',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Placeholder',
                            //                                         value: 'placeholder',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Input Mask',
                            //                                         value: 'inputMask',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'CSS Class',
                            //                                         value: 'className',
                            //                                         type: 'string',
                            //                                     },
                            //                                     {
                            //                                         label: 'Container Custom Class',
                            //                                         value: 'customClass',
                            //                                         type: 'string',
                            //                                     },
                            //                                 ],
                            //                             },
                            //                             key: 'property',
                            //                             label: 'Component Property',
                            //                             input: true,
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'property';
                            //                             },
                            //                         },
                            //                         {
                            //                             weight: 30,
                            //                             input: true,
                            //                             label: 'Set State',
                            //                             key: 'state',
                            //                             tableView: false,
                            //                             data: {
                            //                                 values: [
                            //                                     {
                            //                                         label: 'True',
                            //                                         value: 'true',
                            //                                     },
                            //                                     {
                            //                                         label: 'False',
                            //                                         value: 'false',
                            //                                     },
                            //                                 ],
                            //                             },
                            //                             dataSrc: 'values',
                            //                             template: '<span>{{ item.label }}</span>',
                            //                             type: 'select',
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'property' &&
                            //                                     row.hasOwnProperty('property') &&
                            //                                     row.property.type === 'boolean';
                            //                             },
                            //                         },
                            //                         {
                            //                             weight: 30,
                            //                             type: 'textfield',
                            //                             key: 'text',
                            //                             label: 'Text',
                            //                             inputType: 'text',
                            //                             input: true,
                            //                             tableView: false,
                            //                             description: 'Can use templating with {{ data.myfield }}. "data", "row", "component" and "result" variables are available.',
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'property' &&
                            //                                     row.hasOwnProperty('property') &&
                            //                                     row.property.type === 'string' &&
                            //                                     !row.property.component;
                            //                             },
                            //                         },
                            //                         {
                            //                             weight: 20,
                            //                             input: true,
                            //                             label: 'Value (Javascript)',
                            //                             key: 'value',
                            //                             editor: 'ace',
                            //                             as: 'javascript',
                            //                             rows: 5,
                            //                             placeholder: `value = data.myfield;`,
                            //                             type: 'textarea',
                            //                             tableView: false,
                            //                             description: '"row", "data", "component", and "result" variables are available. Return the value.',
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'value';
                            //                             },
                            //                         },
                            //                         {
                            //                             weight: 20,
                            //                             input: true,
                            //                             label: 'Schema Definition',
                            //                             key: 'schemaDefinition',
                            //                             editor: 'ace',
                            //                             as: 'javascript',
                            //                             rows: 5,
                            //                             placeholder: `schema = { label: 'Updated' };`,
                            //                             type: 'textarea',
                            //                             tableView: false,
                            //                             description: '"row", "data", "component", and "result" variables are available. Return the schema.',
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'mergeComponentSchema';
                            //                             },
                            //                         },
                            //                         Object.assign(EditFormUtils.logicVariablesTable('<tr><th>input</th><td>The value that was input into this component</td></tr>'),
                            //                             {
                            //                                 customConditional({ row }) {
                            //                                     return row.type === 'customAction';
                            //                                 }
                            //                             }
                            //                         ),
                            //                         {
                            //                             weight: 20,
                            //                             input: true,
                            //                             label: 'Custom Action (Javascript)',
                            //                             key: 'customAction',
                            //                             editor: 'ace',
                            //                             rows: 5,
                            //                             placeholder: `value = data.myfield;`,
                            //                             type: 'textarea',
                            //                             tableView: false,
                            //                             customConditional({ row }) {
                            //                                 return row.type === 'customAction';
                            //                             },
                            //                         },
                            //                     ],
                            //                 },
                            //             ],
                            //         },
                            //     ],
                            // },
                            {
                                weight: 10,
                                type: 'checkbox',
                                label: 'Required',
                                tooltip: 'A required field must be filled in before the form can be submitted.',
                                key: 'validate.required',
                                input: true
                            },
                            {
                                weight: 100,
                                type: 'checkbox',
                                label: 'Unique',
                                tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.',
                                key: 'unique',
                                input: true
                            },
                            {
                                weight: 100,
                                type: 'checkbox',
                                label: 'Validate When Hidden',
                                tooltip: 'Validates the component when it is hidden/conditionally hidden. Vaildation errors are displayed in the error alert on the form submission. Use caution when enabling this setting, as it can cause a hidden component to be invalid with no way for the form user to correct it.',
                                key: 'validateWhenHidden',
                                input: true
                            },
                            {
                                weight: 0,
                                type: 'select',
                                key: 'validateOn',
                                defaultValue: 'change',
                                input: true,
                                label: 'Validate On',
                                tooltip: 'Determines when this component should trigger front-end validation.',
                                dataSrc: 'values',
                                data: {
                                    values: [
                                        { label: 'Change', value: 'change' },
                                        { label: 'Blur', value: 'blur' }
                                    ]
                                }
                            },
                            {
                                weight: 190,
                                type: 'textfield',
                                input: true,
                                key: 'errorLabel',
                                label: 'Error Label',
                                placeholder: 'Error Label',
                                tooltip: 'The label for this field when an error occurs.'
                            },
                            {
                                weight: 200,
                                key: 'validate.customMessage',
                                label: 'Custom Error Message',
                                placeholder: 'Custom Error Message',
                                type: 'textfield',
                                tooltip: 'Error message displayed if any error occurred.',
                                input: true
                            },
                            // {
                            //     type: 'panel',
                            //     title: 'Custom Validation',
                            //     collapsible: true,
                            //     collapsed: true,
                            //     style: { 'margin-bottom': '10px' },
                            //     key: 'custom-validation-js',
                            //     weight: 300,
                            //     customConditional() {
                            //         return !Evaluator.noeval || Evaluator.protectedEval;
                            //     },
                            //     components: [
                            //         EditFormUtils.logicVariablesTable('<tr><th>input</th><td>The value that was input into this component</td></tr>'),
                            //         {
                            //             type: 'textarea',
                            //             key: 'validate.custom',
                            //             rows: 5,
                            //             editor: 'ace',
                            //             hideLabel: true,
                            //             as: 'javascript',
                            //             input: true
                            //         },
                            //         {
                            //             type: 'htmlelement',
                            //             tag: 'div',
                            //             content: `
                            //                       <small>
                            //                         <p>Enter custom validation code.</p>
                            //                         <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>
                            //                         <h5>Example:</h5>
                            //                         <pre>valid = (input === 'Joe') ? true : 'Your name must be "Joe"';</pre>
                            //                       </small>`
                            //         },
                            //         {
                            //             type: 'well',
                            //             components: [
                            //                 {
                            //                     weight: 100,
                            //                     type: 'checkbox',
                            //                     label: 'Secret Validation',
                            //                     tooltip: 'Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.',
                            //                     description: 'Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.',
                            //                     key: 'validate.customPrivate',
                            //                     input: true
                            //                 }
                            //             ]
                            //         }
                            //     ]
                            // },
                            {
                                type: 'panel',
                                title: 'JSONLogic Validation',
                                collapsible: true,
                                collapsed: true,
                                key: 'json-validation-json',
                                weight: 400,
                                components: [
                                    {
                                        type: 'htmlelement',
                                        tag: 'div',
                                        /* eslint-disable prefer-template */
                                        content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank" rel="noopener noreferrer">JSONLogic</a>.</p>' +
                                            '<h5>Example:</h5>' +
                                            '<pre>' + JSON.stringify({
                                                "if": [
                                                    { "===": [{ "var": "input" }, "Bob"] },
                                                    true,
                                                    "Your name must be 'Bob'!"
                                                ]
                                            }, null, 2) + '</pre>'
                                        /* eslint-enable prefer-template */
                                    },
                                    {
                                        type: 'textarea',
                                        key: 'validate.json',
                                        hideLabel: true,
                                        rows: 5,
                                        editor: 'ace',
                                        as: 'json',
                                        input: true
                                    }
                                ]
                            },
                            {
                                type: 'panel',
                                title: 'Custom Errors',
                                collapsible: true,
                                collapsed: true,
                                key: 'errors',
                                weight: 400,
                                components: [
                                    {
                                        type: 'textarea',
                                        key: 'errors',
                                        hideLabel: true,
                                        rows: 5,
                                        editor: 'ace',
                                        as: 'json',
                                        input: true
                                    },
                                    {
                                        type: 'htmlelement',
                                        tag: 'div',
                                        content: `
                                                  <p>This allows you to set different custom error messages for different errors
                                                  (in contrast to “Custom Error Message”, which only allows you to set one
                                                  error message for all errors). E.g.</p>
                                        
                                        <pre>{
                                          "required": "{<span/>{ field }} is required. Try again.",
                                          "maxLength": "{<span/>{ field }} is too long. Try again."
                                        }</pre>
                                        
                                                  <p>You can set the following keys (among others):</p>
                                                  <ul>
                                                    <li>r<span/>equired</li>
                                                    <li>m<span/>in</li>
                                                    <li>m<span/>ax</li>
                                                    <li>m<span/>inLength</li>
                                                    <li>m<span/>axLength</li>
                                                    <li>m<span/>inWords</li>
                                                    <li>m<span/>axWords</li>
                                                    <li>i<span/>nvalid_email</li>
                                                    <li>i<span/>nvalid_date</li>
                                                    <li>i<span/>nvalid_day</li>
                                                    <li>i<span/>nvalid_regex</li>
                                                    <li>m<span/>ask</li>
                                                    <li>p<span/>attern</li>
                                                    <li>c<span/>ustom</li>
                                                  </ul>
                                        
                                                  <p>Depending on the error message some of the following template variables can be used in the script:</p>
                                                  <ul>
                                                   <li><code>{<span/>{ f<span/>ield }}</code> is replaced with the label of the field.</li>
                                                   <li><code>{<span/>{ m<span/>in }}</code></li>
                                                   <li><code>{<span/>{ m<span/>ax }}</code></li>
                                                   <li><code>{<span/>{ l<span/>ength }}</code></li>
                                                   <li><code>{<span/>{ p<span/>attern }}</code></li>
                                                   <li><code>{<span/>{ m<span/>inDate }}</code></li>
                                                   <li><code>{<span/>{ m<span/>axDate }}</code></li>
                                                   <li><code>{<span/>{ m<span/>inYear }}</code></li>
                                                   <li><code>{<span/>{ m<span/>axYear }}</code></li>
                                                   <li><code>{<span/>{ r<span/>egex }}</code></li>
                                                  </ul>
                                                `
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
        ]
    },
    "language": "en",
    "i18n": {
        "en": {
            "Label": "Label",
            "Label Position": "Label Position",
            "Placeholder": "Placeholder",
            "Description": "Description",
            "Tooltip": "Tooltip",
            "Prefix": "Prefix",
            "Suffix": "Suffix",
            "Widget": "Widget",
            "Input Mask": "Input Mask",
            "Custom CSS Class": "Custom CSS Class",
            "Tab Index": "Tab Index",
            "Hidden": "Hidden",
            "Hide Label": "Hide Label",
            "Show Word Counter": "Show Word Counter",
            "Show Character Counter": "Show Character Counter",
            "Hide Input": "Hide Input",
            "Excellent": "Excellent",
            "Initial Focus": "Initial Focus",
            "Allow Spellcheck": "Allow Spellcheck",
            "Disabled": "Disabled",
            "Table View": "Table View",
            "Modal Edit": "Modal Edit",
            "Multiple Values": "Multiple Values",
            "Persistent": "Persistent",
            "Input Format": "Input Format",
            "Protected": "Protected",
            "Database Index": "Database Index",
            "Mixed (Allow upper and lower case)": "Mixed (Allow upper and lower case)",
            "Uppercase": "Uppercase",
            "Lowercase": "Lowercase",
            "Encrypted (Enterprise Only)": "Encrypted (Enterprise Only)",
            "Default Value": "Default Value",
            "Drag and Drop a form component": "Drag and Drop a form component",
            "Text Field": "Text Field",
            "Email": "Email",
            "Text Area": "Text Area",
            "Panel": "Panel",
            "Time": "Time",
            "Submit": "Submit",
            "Basic Components": "Basic Components",
            "Layout Components": "Layout Components",
            "Advanced": "Advanced",
            "Component": "Component",
            "Display": "Display",
            "Data": "Data",
            "Validation": "Validation",
            "API": "API",
            "Conditional": "Conditional",
            "Logic": "Logic",
            "Layout": "Layout",
            "Allow Multiple Masks": "Allow Multiple Masks",
            "Input Field": "Input Field",
            "Top": "Top",
            "Left (Left-aligned)": "Left (Left-aligned)",
            "Input Type": "Input Type",
            "Collapsible": "Collapsible",
            "Preview": "Preview",
            "Text Case": "Text Case",
            "Redraw On": "Redraw On",
            "Clear Value When Hidden": "Clear Value When Hidden",
            "Custom Default Value": "Custom Default Value",
            "Calculated Value": "Calculated Value",
            "Calculate Value on server": "Calculate Value on server",
            "Allow Manual Override of Calculated Value": "Allow Manual Override of Calculated Value",
            "Server": "Server",
            "Client": "Client",
            "None": "None",
            "Validate On": "Validate On",
            "Required": "Required",
            "Unique": "Unique",
            "Minimum Length": "Minimum Length",
            "Maximum Length": "Maximum Length",
            "Minimum Word Length": "Minimum Word Length",
            "Maximum Word Length": "Maximum Word Length",
            "Regular Expression Pattern": "Regular Expression Pattern",
            "Error Label": "Error Label",
            "Custom Error Message": "Custom Error Message",
            "Custom Validation": "Custom Validation",
            "JSONLogic Validation": "JSONLogic Validation",
            "Property Name": "Property Name",
            "Field Tags": "Field Tags",
            "Custom Properties": "Custom Properties",
            "Add Another": "Add Another",
            "Save": "Save",
            "Cancel": "Cancel",
            "Remove": "Remove",
            "Rows": "Rows",
            "Title": "Title",
            "Theme": "Theme",
            "Data Format": "Data Format",
            "Advanced Logic": "Advanced Logic",
            "Advanced Conditions": "Advanced Conditions",
            "Simple": "Simple",
            "HTML Attributes": "HTML Attributes",
            "PDF Overlay": "PDF Overlay",
            "Number": "Number",
            "Use Thousands Separator": "Use Thousands Separator",
            "Address": "Address",
            "Button": "Button",
            "Check Box": "Check Box",
            "Columns": "Columns",
            "Container": "Container",
            "Content": "Content",
            "Currency": "Currency",
            "Custom": "Custom",
            "Data Grid": "Data Grid",
            "Date / Time": "Date / Time",
            "Day": "Day",
            "Edit Grid": "Edit Grid",
            "Field Set": "Field Set",
            "File": "File",
            "Form": "Form",
            "HTML Element": "HTML Element",
            "Password": "Password",
            "Phone Number": "Phone Number",
            "Radio": "Radio",
            "Resource": "Resource",
            "Select": "Select",
            "Select Boxes": "Select Boxes",
            "Signature": "Signature",
            "Survey": "Survey",
            "Table": "Table",
            "textarea": "Textarea",
            "number": "Number",
            "password": "Password",
            "checkbox": "Checkbox",
            "select": "Select",
            "radio": "Radio",
            "button": "Button",
            "email": "Email",
            "url": "URL",
            "file": "File",
            "datetime": "Datetime",
            "currency": "Currency",
            "survey": "Survey",
            "signature": "Signature",
            "day": "Day",
            "time": "Time",
            "resource": "Resource",
            "custom": "Custom",
            "hidden": "Hidden",
            "htmlelement": "HTML Element",
            "content": "Content",
            "panel": "Panel",
            "fieldset": "Fieldset",
            "well": "Well",
            "columns": "Columns",
            "table": "Table",
            "tabs": "Tabs",
            "container": "Container",
            "datagrid": "Data Grid",
            "editgrid": "Edit Grid",
            "tree": "Tree",
            "selectboxes": "Select Boxes",
            "tags": "Tags",
            "address": "Address",
            "location": "Location",
            "repeater": "Repeater",
            "submit": "Submit",
            "reset": "Reset",
            "recaptcha": "ReCAPTCHA",
            "advancedselect": "Advanced Select",
            "fileGrid": "File Grid",
            "form": "Form",
            "slider": "Slider",
            "contact": "Contact",
            "enabledisable": "Enable/Disable",
            "starrating": "Star Rating",
            "webcam": "Webcam",
            "mycomponent": "My Component",
            "qrcode": "QR Code",
            "ageCalculator": "Age Calculator",
            "japaneseName": "Japanese Name",
            "geolocation": "Geolocation",
            "extendeddatepicker": "Extended Datepicker",
            "customtextfield": "Custom Text Field",
            "textfield": "Text Field",
            "columnsLayout": "Columns Layout",
            "dataGridFooter": "Data Grid Footer",
            "Contact": "Contact",
            "Age Calculator": "Age Calculator",
            "Custom Text Field": "Custom Text Field",
            "Data Grid Footer": "Data Grid Footer",
            "Date Range Picker": "Date Range Picker",
            "Enable/Disable": "Enable/Disable",
            "Extended Date Picker": "Extended Date Picker",
            "Geolocation": "Geolocation",
            "Geo Location": "Geo Location",
            "My Component": "My Component",
            "Japanese Name Translator": "Japanese Name Translator",
            "QR Code Generator": "QR Code Generator",
            "Schedule Table": "Schedule Table",
            "Slider Component": "Slider Component",
            "Star Rating": "Star Rating",
            "Transportation and Expense Table": "Transportation and Expense Table"
        },
        "jp": {
            "Label": "ラベル",
            "Label Position": "ラベル位置",
            "Placeholder": "プレースホルダー",
            "Description": "説明",
            "Tooltip": "ツールチップ",
            "Prefix": "プレフィックス",
            "Suffix": "サフィックス",
            "Widget": "ウィジェット",
            "Input Mask": "入力マスク",
            "Custom CSS Class": "カスタムCSSクラス",
            "Tab Index": "タブインデックス",
            "Hidden": "非表示",
            "Hide Label": "ラベルを隠す",
            "Show Word Counter": "単語数カウンターを表示",
            "Show Character Counter": "文字数カウンターを表示",
            "Hide Input": "入力を隠す",
            "Excellent": "優れた",
            "Initial Focus": "初期フォーカス",
            "Allow Spellcheck": "スペルチェックを許可",
            "Disabled": "無効",
            "Table View": "テーブルビュー",
            "Modal Edit": "モーダル編集",
            "Multiple Values": "複数の値",
            "Persistent": "永続的",
            "Input Format": "入力フォーマット",
            "Protected": "保護された",
            "Database Index": "データベースインデックス",
            "Mixed (Allow upper and lower case)": "混合（大文字と小文字を許可）",
            "Uppercase": "大文字",
            "Lowercase": "小文字",
            "Encrypted (Enterprise Only)": "暗号化（企業向けのみ）",
            "Default Value": "デフォルト値",
            "Drag and Drop a form component": "フォームコンポーネントをドラッグ＆ドロップ",
            "Text Field": "テキストフィールド",
            "Email": "メール",
            "Text Area": "テキストエリア",
            "Panel": "パネル",
            "Time": "時間",
            "Submit": "送信",
            "Basic Components": "基本コンポーネント",
            "Layout Components": "レイアウトコンポーネント",
            "Advanced": "高度な",
            "Component": "コンポーネント",
            "Display": "表示",
            "Data": "データ",
            "Validation": "検証",
            "API": "API",
            "Conditional": "条件付き",
            "Logic": "ロジック",
            "Layout": "レイアウト",
            "Allow Multiple Masks": "複数のマスクを許可",
            "Input Field": "入力フィールド",
            "Top": "トップ",
            "Left (Left-aligned)": "左（左揃え）",
            "Input Type": "入力タイプ",
            "Collapsible": "折りたたみ可能",
            "Preview": "プレビュー",
            "Text Case": "文字ケース",
            "Redraw On": "再描画時",
            "Clear Value When Hidden": "非表示時に値をクリア",
            "Custom Default Value": "カスタムデフォルト値",
            "Calculated Value": "計算された値",
            "Calculate Value on server": "サーバーで値を計算",
            "Allow Manual Override of Calculated Value": "計算値の手動上書きを許可",
            "Server": "サーバー",
            "Client": "クライアント",
            "None": "なし",
            "Validate On": "検証時",
            "Required": "必須",
            "Unique": "一意",
            "Minimum Length": "最小長",
            "Maximum Length": "最大長",
            "Minimum Word Length": "最小単語長",
            "Maximum Word Length": "最大単語長",
            "Regular Expression Pattern": "正規表現パターン",
            "Error Label": "エラーレーベル",
            "Custom Error Message": "カスタムエラーメッセージ",
            "Custom Validation": "カスタム検証",
            "JSONLogic Validation": "JSONLogic検証",
            "Property Name": "プロパティ名",
            "Field Tags": "フィールドタグ",
            "Custom Properties": "カスタムプロパティ",
            "Add Another": "もう一つ追加",
            "Save": "保存",
            "Cancel": "キャンセル",
            "Remove": "削除",
            "Rows": "行",
            "Title": "タイトル",
            "Theme": "テーマ",
            "Data Format": "データ形式",
            "Advanced Logic": "高度なロジック",
            "Advanced Conditions": "高度な条件",
            "Simple": "簡単",
            "HTML Attributes": "HTML属性",
            "PDF Overlay": "PDFオーバーレイ",
            "Number": "番号",
            "Use Thousands Separator": "千の区切り文字を使用",
            "Address": "住所",
            "Button": "ボタン",
            "Check Box": "チェックボックス",
            "Columns": "列",
            "Container": "コンテナ",
            "Content": "コンテンツ",
            "Currency": "通貨",
            "Custom": "カスタム",
            "Data Grid": "データグリッド",
            "Date / Time": "日付/時間",
            "Day": "日",
            "Edit Grid": "グリッド編集",
            "Field Set": "フィールドセット",
            "File": "ファイル",
            "Form": "フォーム",
            "HTML Element": "HTML要素",
            "Password": "パスワード",
            "Phone Number": "電話番号",
            "Radio": "ラジオ",
            "Resource": "リソース",
            "Select": "選択",
            "Select Boxes": "選択ボックス",
            "Signature": "署名",
            "Survey": "調査",
            "Table": "テーブル",
            "textarea": "テキストエリア",
            "number": "番号",
            "password": "パスワード",
            "checkbox": "チェックボックス",
            "select": "選択",
            "radio": "ラジオ",
            "button": "ボタン",
            "email": "メール",
            "url": "URL",
            "file": "ファイル",
            "datetime": "日付時間",
            "currency": "通貨",
            "survey": "調査",
            "signature": "署名",
            "day": "日",
            "time": "時間",
            "resource": "リソース",
            "custom": "カスタム",
            "hidden": "隠された",
            "htmlelement": "HTML要素",
            "content": "コンテンツ",
            "panel": "パネル",
            "fieldset": "フィールドセット",
            "well": "ウェル",
            "columns": "列",
            "table": "テーブル",
            "tabs": "タブ",
            "container": "コンテナ",
            "datagrid": "データグリッド",
            "editgrid": "編集グリッド",
            "tree": "ツリー",
            "selectboxes": "選択ボックス",
            "tags": "タグ",
            "address": "住所",
            "location": "位置",
            "repeater": "リピーター",
            "submit": "送信",
            "reset": "リセット",
            "recaptcha": "ReCAPTCHA",
            "advancedselect": "高度な選択",
            "fileGrid": "ファイルグリッド",
            "form": "フォーム",
            "slider": "スライダー",
            "contact": "連絡",
            "enabledisable": "有効/無効",
            "starrating": "星評価",
            "webcam": "ウェブカメラ",
            "mycomponent": "マイコンポーネント",
            "qrcode": "QRコード",
            "ageCalculator": "年齢計算",
            "japaneseName": "日本語の名前",
            "geolocation": "位置情報",
            "extendeddatepicker": "拡張日付ピッカー",
            "customtextfield": "カスタムテキストフィールド",
            "textfield": "テキストフィールド",
            "columnsLayout": "列レイアウト",
            "dataGridFooter": "データグリッドのフッター",
            "Contact": "連絡先",
            "Age Calculator": "年齢計算機",
            "Custom Text Field": "カスタムテキストフィールド",
            "Data Grid Footer": "データグリッドフッター",
            "Date Range Picker": "日付範囲ピッカー",
            "Enable/Disable": "有効/無効",
            "Extended Date Picker": "拡張日付ピッカー",
            "Geolocation": "位置情報",
            "Geo Location": "位置情報",
            "My Component": "私のコンポーネント",
            "Japanese Name Translator": "日本語名翻訳ツール",
            "QR Code Generator": "QRコードジェネレーター",
            "Schedule Table": "スケジュールテーブル",
            "Slider Component": "スライダーコンポーネント",
            "Star Rating": "星評価",
            "Transportation and Expense Table": "交通費および経費テーブル"
        }
    }

};