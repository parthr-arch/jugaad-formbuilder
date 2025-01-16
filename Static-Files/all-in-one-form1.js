var formSchema = {
    "name": "All-In-One-Form1",
    "components": [
        {
            "type": "panel",
            "label": "Section",
            "title": "Section",
            "key": "section",
            "components": [
                {
                    "label": "Columns",
                    "columns": [
                        {
                            "components": [
                                {
                                    "label": "First name",
                                    "placeholder": "First name",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWithKatakana": false,
                                    "validateWithHiragana": false,
                                    "validateWhenHidden": false,
                                    "key": "firstName",
                                    "type": "textfield",
                                    "input": true
                                }
                            ],
                            "width": 4,
                            "offset": 0,
                            "push": 0,
                            "pull": 0,
                            "size": "md",
                            "currentWidth": 4
                        },
                        {
                            "components": [
                                {
                                    "label": "Middle name",
                                    "placeholder": "Middle name",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWithKatakana": false,
                                    "validateWithHiragana": false,
                                    "validateWhenHidden": false,
                                    "key": "middleName",
                                    "type": "textfield",
                                    "input": true
                                }
                            ],
                            "width": 4,
                            "offset": 0,
                            "push": 0,
                            "pull": 0,
                            "size": "md",
                            "currentWidth": 4
                        },
                        {
                            "components": [
                                {
                                    "label": "Last name",
                                    "placeholder": "Last name",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWithKatakana": false,
                                    "validateWithHiragana": false,
                                    "validateWhenHidden": false,
                                    "key": "lastName",
                                    "type": "textfield",
                                    "input": true
                                }
                            ],
                            "size": "md",
                            "width": 4,
                            "currentWidth": 4
                        }
                    ],
                    "key": "columns",
                    "type": "columns",
                    "input": false,
                    "tableView": false
                },
                {
                    "label": "Columns",
                    "columns": [
                        {
                            "components": [
                                {
                                    "label": "Email",
                                    "placeholder": "Email",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "email",
                                    "type": "email",
                                    "input": true
                                }
                            ],
                            "width": 6,
                            "offset": 0,
                            "push": 0,
                            "pull": 0,
                            "size": "md",
                            "currentWidth": 6
                        },
                        {
                            "components": [
                                {
                                    "label": "Password",
                                    "placeholder": "Password",
                                    "applyMaskOn": "change",
                                    "tableView": false,
                                    "validateWhenHidden": false,
                                    "key": "password",
                                    "type": "password",
                                    "input": true,
                                    "protected": true
                                }
                            ],
                            "width": 6,
                            "offset": 0,
                            "push": 0,
                            "pull": 0,
                            "size": "md",
                            "currentWidth": 6
                        }
                    ],
                    "key": "columns1",
                    "type": "columns",
                    "input": false,
                    "tableView": false
                }
            ],
            "input": false,
            "tableView": false
        },
        {
            "label": "Data Grid",
            "reorder": false,
            "addAnotherPosition": "bottom",
            "layoutFixed": false,
            "enableRowGroups": false,
            "initEmpty": false,
            "tableView": false,
            "defaultValue": [
                {}
            ],
            "validateWhenHidden": false,
            "key": "datagrid-0.1380",
            "type": "datagrid",
            "input": true,
            "components": [
                {
                    "label": "Quantity",
                    "placeholder": "Quantity",
                    "applyMaskOn": "change",
                    "mask": false,
                    "tableView": false,
                    "delimiter": false,
                    "requireDecimal": false,
                    "inputFormat": "plain",
                    "truncateMultipleSpaces": false,
                    "validateWhenHidden": false,
                    "key": "quantity",
                    "type": "number",
                    "input": true
                },
                {
                    "label": "Price",
                    "placeholder": "Price",
                    "applyMaskOn": "change",
                    "mask": false,
                    "tableView": false,
                    "delimiter": false,
                    "requireDecimal": false,
                    "inputFormat": "plain",
                    "truncateMultipleSpaces": false,
                    "validateWhenHidden": false,
                    "key": "price",
                    "type": "number",
                    "input": true
                },
                {
                    "label": "Total",
                    "placeholder": "Number",
                    "applyMaskOn": "change",
                    "mask": false,
                    "tableView": false,
                    "delimiter": false,
                    "requireDecimal": false,
                    "inputFormat": "plain",
                    "truncateMultipleSpaces": false,
                    "calculateValue": "value = row.quantity + row.price;\n",
                    "validateWhenHidden": false,
                    "key": "total",
                    "type": "number",
                    "input": true
                }
            ]
        },
        {
            "type": "panel",
            "label": "Section",
            "title": "Section",
            "key": "section-0.2480",
            "components": [
                {
                    "label": "Slider Component",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "slider",
                    "type": "slider",
                    "input": true
                },
                {
                    "label": "Url",
                    "placeholder": "Url",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "validateWhenHidden": false,
                    "key": "url",
                    "type": "url",
                    "input": true
                },
                {
                    "label": "Star Rating",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "starrating",
                    "type": "starrating",
                    "input": true
                },
                {
                    "label": "Radio",
                    "optionsLabelPosition": "right",
                    "inline": false,
                    "tableView": false,
                    "values": [
                        {
                            "label": "1",
                            "value": "1",
                            "shortcut": ""
                        },
                        {
                            "label": "2",
                            "value": "2",
                            "shortcut": ""
                        },
                        {
                            "label": "3",
                            "value": "3",
                            "shortcut": ""
                        }
                    ],
                    "validateWhenHidden": false,
                    "key": "radio",
                    "type": "radio",
                    "input": true
                },
                {
                    "label": "Geolocation",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "geolocation",
                    "type": "geolocation",
                    "input": true
                },
                {
                    "label": "Extended Date Picker",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "extendeddatepicker",
                    "type": "extendeddatepicker",
                    "input": true
                },
                {
                    "label": "Extended Date Picker",
                    "pickerType": "daymonthpicker",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "extendeddatepicker2",
                    "type": "extendeddatepicker",
                    "input": true
                },
                {
                    "label": "Extended Date Picker",
                    "pickerType": "daymonthyearpicker",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "extendeddatepicker3",
                    "type": "extendeddatepicker",
                    "input": true
                },
                {
                    "label": "Extended Date Picker",
                    "pickerType": "singletimepicker",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "extendeddatepicker4",
                    "type": "extendeddatepicker",
                    "input": true
                },
                {
                    "label": "Extended Date Picker",
                    "pickerType": "daypicker",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "extendeddatepicker1",
                    "type": "extendeddatepicker",
                    "input": true
                },
                {
                    "label": "Signature",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "signature",
                    "type": "signature",
                    "input": true
                },
                {
                    "tabindex": "5",
                    "tags": [],
                    "clearOnHide": true,
                    "hidden": false,
                    "input": true,
                    "tableView": true,
                    "label": "Survey",
                    "key": "survey",
                    "questions": [
                        {
                            "value": "howWouldYouRateTheFormIoPlatform",
                            "label": "How would you rate the Form.io platform?"
                        },
                        {
                            "value": "howWasCustomerSupport",
                            "label": "How was Customer Support?"
                        },
                        {
                            "value": "overallExperience",
                            "label": "Overall Experience?"
                        }
                    ],
                    "values": [
                        {
                            "value": "excellent",
                            "label": "Excellent"
                        },
                        {
                            "value": "great",
                            "label": "Great"
                        },
                        {
                            "value": "good",
                            "label": "Good"
                        },
                        {
                            "value": "average",
                            "label": "Average"
                        },
                        {
                            "value": "poor",
                            "label": "Poor"
                        }
                    ],
                    "defaultValue": "",
                    "protected": false,
                    "persistent": true,
                    "validate": {
                        "required": false,
                        "custom": "",
                        "customPrivate": false,
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false
                    },
                    "type": "survey",
                    "conditional": {
                        "show": "",
                        "when": null,
                        "eq": ""
                    },
                    "placeholder": "",
                    "prefix": "",
                    "customClass": "",
                    "suffix": "",
                    "multiple": false,
                    "unique": false,
                    "refreshOn": "",
                    "redrawOn": "",
                    "modalEdit": false,
                    "dataGridLabel": false,
                    "labelPosition": "top",
                    "description": "",
                    "errorLabel": "",
                    "tooltip": "",
                    "hideLabel": false,
                    "disabled": false,
                    "autofocus": false,
                    "dbIndex": false,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "widget": null,
                    "attributes": {
        
                    },
                    "validateOn": "change",
                    "overlay": {
                        "style": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "allowCalculateOverride": false,
                    "encrypted": false,
                    "showCharCount": false,
                    "showWordCount": false,
                    "properties": {
        
                    },
                    "allowMultipleMasks": false,
                    "id": "ek3vrnp",
                    "addons": []
                },
                {
                    "label": "HTML",
                    "tag": "h4",
                    "className": "",
                    "attrs": [
                        {
                            "attr": "",
                            "value": ""
                        }
                    ],
                    "content": "Contact Us",
                    "refreshOnChange": false,
                    "customClass": "",
                    "hidden": false,
                    "modalEdit": false,
                    "key": "html",
                    "tags": [],
                    "properties": {},
                    "conditional": {
                        "show": null,
                        "when": null,
                        "eq": "",
                        "json": ""
                    },
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "overlay": {
                        "style": "",
                        "page": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "type": "htmlelement",
                    "dataGridLabel": false,
                    "input": false,
                    "placeholder": "",
                    "prefix": "",
                    "suffix": "",
                    "multiple": false,
                    "defaultValue": null,
                    "protected": false,
                    "unique": false,
                    "persistent": false,
                    "clearOnHide": true,
                    "refreshOn": "",
                    "redrawOn": "",
                    "tableView": false,
                    "labelPosition": "top",
                    "description": "",
                    "errorLabel": "",
                    "tooltip": "",
                    "hideLabel": false,
                    "tabindex": "",
                    "disabled": false,
                    "autofocus": false,
                    "dbIndex": false,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "widget": null,
                    "validateOn": "change",
                    "validate": {
                        "required": false,
                        "custom": "",
                        "customPrivate": false,
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false
                    },
                    "allowCalculateOverride": false,
                    "encrypted": false,
                    "showCharCount": false,
                    "showWordCount": false,
                    "allowMultipleMasks": false,
                    "addons": [],
                    "id": "e5bsl1"
                },
                {
                    "label": "Tabs",
                    "components": [
                        {
                            "label": "Tab 1",
                            "key": "tab1",
                            "components": []
                        },
                        {
                            "label": "Tab2",
                            "key": "tab2",
                            "components": []
                        }
                    ],
                    "customClass": "",
                    "hidden": false,
                    "verticalLayout": false,
                    "modalEdit": false,
                    "conditional": {
                        "show": null,
                        "when": null,
                        "eq": "",
                        "json": ""
                    },
                    "customConditional": "",
                    "type": "tabs",
                    "dataGridLabel": false,
                    "input": false,
                    "key": "tabs",
                    "placeholder": "",
                    "prefix": "",
                    "suffix": "",
                    "multiple": false,
                    "defaultValue": null,
                    "protected": false,
                    "unique": false,
                    "persistent": false,
                    "clearOnHide": true,
                    "refreshOn": "",
                    "redrawOn": "",
                    "tableView": false,
                    "labelPosition": "top",
                    "description": "",
                    "errorLabel": "",
                    "tooltip": "",
                    "hideLabel": false,
                    "tabindex": "",
                    "disabled": false,
                    "autofocus": false,
                    "dbIndex": false,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "widget": null,
                    "attributes": {},
                    "validateOn": "change",
                    "validate": {
                        "required": false,
                        "custom": "",
                        "customPrivate": false,
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false
                    },
                    "overlay": {
                        "style": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "allowCalculateOverride": false,
                    "encrypted": false,
                    "showCharCount": false,
                    "showWordCount": false,
                    "properties": {},
                    "allowMultipleMasks": false,
                    "addons": [],
                    "tree": false,
                    "lazyLoad": false,
                    "id": "e4i238"
                },
                {
                    "label": "Url",
                    "labelPosition": "top",
                    "placeholder": "Url",
                    "description": "",
                    "tooltip": "",
                    "prefix": "",
                    "suffix": "",
                    "widget": {
                        "type": "input"
                    },
                    "displayMask": "",
                    "applyMaskOn": "change",
                    "customClass": "",
                    "tabindex": "",
                    "autocomplete": "",
                    "hidden": false,
                    "hideLabel": false,
                    "mask": false,
                    "autofocus": false,
                    "spellcheck": true,
                    "disabled": false,
                    "tableView": true,
                    "modalEdit": false,
                    "multiple": false,
                    "persistent": true,
                    "inputFormat": "plain",
                    "protected": false,
                    "dbIndex": false,
                    "truncateMultipleSpaces": false,
                    "encrypted": false,
                    "redrawOn": "",
                    "clearOnHide": true,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "allowCalculateOverride": false,
                    "validateOn": "change",
                    "validate": {
                        "required": false,
                        "pattern": "",
                        "customMessage": "",
                        "custom": "",
                        "customPrivate": false,
                        "json": "",
                        "minLength": "",
                        "maxLength": "",
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false
                    },
                    "unique": false,
                    "validateWhenHidden": false,
                    "errorLabel": "",
                    "errors": "",
                    "conditional": {
                        "show": null,
                        "when": null,
                        "eq": "",
                        "json": ""
                    },
                    "customConditional": "",
                    "type": "url",
                    "dataGridLabel": false,
                    "input": true,
                    "key": "url",
                    "refreshOn": "",
                    "attributes": {},
                    "overlay": {
                        "style": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "showCharCount": false,
                    "showWordCount": false,
                    "properties": {},
                    "allowMultipleMasks": false,
                    "addons": [],
                    "inputType": "url",
                    "inputMask": "",
                    "id": "etk7tfr",
                    "defaultValue": ""
                },
                {
                    "label": "Currency",
                    "labelPosition": "top",
                    "placeholder": "Currency",
                    "description": "",
                    "tooltip": "",
                    "prefix": "",
                    "suffix": "INR",
                    "widget": {
                        "type": "input"
                    },
                    "displayMask": "",
                    "applyMaskOn": "change",
                    "customClass": "",
                    "tabindex": "",
                    "autocomplete": "",
                    "hidden": false,
                    "hideLabel": false,
                    "mask": false,
                    "autofocus": false,
                    "spellcheck": true,
                    "disabled": false,
                    "tableView": false,
                    "modalEdit": false,
                    "multiple": false,
                    "persistent": true,
                    "currency": "USD",
                    "inputFormat": "plain",
                    "protected": false,
                    "dbIndex": false,
                    "case": "",
                    "truncateMultipleSpaces": false,
                    "encrypted": false,
                    "redrawOn": "",
                    "clearOnHide": true,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "allowCalculateOverride": false,
                    "validateOn": "change",
                    "validate": {
                        "required": false,
                        "customMessage": "",
                        "custom": "",
                        "customPrivate": false,
                        "json": "",
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false,
                        "min": "",
                        "max": "",
                        "step": "any",
                        "integer": ""
                    },
                    "unique": false,
                    "validateWhenHidden": false,
                    "errorLabel": "",
                    "errors": "",
                    "conditional": {
                        "show": null,
                        "when": null,
                        "eq": "",
                        "json": ""
                    },
                    "customConditional": "",
                    "type": "currency",
                    "dataGridLabel": false,
                    "input": true,
                    "key": "currency",
                    "refreshOn": "",
                    "attributes": {},
                    "overlay": {
                        "style": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "showCharCount": false,
                    "showWordCount": false,
                    "properties": {},
                    "allowMultipleMasks": false,
                    "addons": [],
                    "delimiter": true,
                    "id": "emivmxa",
                    "defaultValue": null
                },
                {
                    "label": "Select Boxes",
                    "labelPosition": "top",
                    "optionsLabelPosition": "right",
                    "description": "",
                    "tooltip": "",
                    "customClass": "",
                    "tabindex": "",
                    "inline": false,
                    "hidden": false,
                    "hideLabel": false,
                    "autofocus": false,
                    "disabled": false,
                    "tableView": false,
                    "modalEdit": false,
                    "dataSrc": "values",
                    "values": [
                        {
                            "label": "value1",
                            "value": "value1",
                            "shortcut": ""
                        },
                        {
                            "label": "value2",
                            "value": "value2",
                            "shortcut": ""
                        },
                        {
                            "label": "value3",
                            "value": "value3",
                            "shortcut": ""
                        },
                        {
                            "label": "value4",
                            "value": "value4",
                            "shortcut": ""
                        }
                    ],
                    "valueProperty": "",
                    "persistent": true,
                    "protected": false,
                    "dbIndex": false,
                    "encrypted": false,
                    "clearOnHide": true,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "allowCalculateOverride": false,
                    "validate": {
                        "required": false,
                        "onlyAvailableItems": false,
                        "customMessage": "",
                        "custom": "",
                        "customPrivate": false,
                        "json": "",
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false
                    },
                    "validateWhenHidden": false,
                    "errorLabel": "",
                    "minSelectedCountMessage": "",
                    "maxSelectedCountMessage": "",
                    "errors": "",
                    "conditional": {
                        "show": null,
                        "when": null,
                        "eq": "",
                        "json": ""
                    },
                    "customConditional": "",
                    "type": "selectboxes",
                    "dataGridLabel": false,
                    "data": {
                        "url": ""
                    },
                    "template": "<span>{{ item.label }}</span>",
                    "authenticate": false,
                    "ignoreCache": false,
                    "redrawOn": "",
                    "input": true,
                    "key": "selectBoxes",
                    "placeholder": "",
                    "prefix": "",
                    "suffix": "",
                    "multiple": false,
                    "unique": false,
                    "refreshOn": "",
                    "widget": null,
                    "attributes": {},
                    "validateOn": "change",
                    "overlay": {
                        "style": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "showCharCount": false,
                    "showWordCount": false,
                    "properties": {},
                    "allowMultipleMasks": false,
                    "addons": [],
                    "inputType": "checkbox",
                    "fieldSet": false,
                    "id": "ekrt5xe",
                    "defaultValue": {}
                },
                {
                    "label": "Contacts",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "contactContainer",
                    "type": "container",
                    "input": true,
                    "components": [
                        {
                            "label": "Contact (Mobile)",
                            "key": "contactMobile",
                            "type": "textfield",
                            "input": true,
                            "tableView": true
                        },
                        {
                            "label": "Contact (landline)",
                            "key": "contactLandline",
                            "type": "textfield",
                            "input": true,
                            "tableView": true
                        }
                    ]
                }
            ],
            "input": false,
            "tableView": false
        }
    ]
}