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
                    "label": "Signature",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "signature",
                    "type": "signature",
                    "input": true
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