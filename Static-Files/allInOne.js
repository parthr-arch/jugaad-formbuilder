var formSchema = {
    "formName": "All Data Form",
    "components": [
        {
            "type": "panel",
            "label": "Section",
            "title": "Section",
            "key": "section-0.2388",
            "components": [
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
                                    "label": "Firstname",
                                    "placeholder": "Firstname",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWithKatakana": false,
                                    "validateWithHiragana": false,
                                    "validateWhenHidden": false,
                                    "key": "firstname",
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
                                    "label": "Middlename",
                                    "placeholder": "Middlename",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWithKatakana": false,
                                    "validateWithHiragana": false,
                                    "validateWhenHidden": false,
                                    "key": "middlename",
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
                                    "label": "Lastname",
                                    "placeholder": "Lastname",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWithKatakana": false,
                                    "validateWithHiragana": false,
                                    "validateWhenHidden": false,
                                    "key": "lastname",
                                    "type": "textfield",
                                    "input": true
                                }
                            ],
                            "size": "md",
                            "width": 4,
                            "currentWidth": 4
                        }
                    ],
                    "key": "columns1",
                    "type": "columns",
                    "input": false,
                    "tableView": false
                },
                {
                    "label": "Address",
                    "placeholder": "Address",
                    "applyMaskOn": "change",
                    "autoExpand": false,
                    "tableView": true,
                    "validateWhenHidden": false,
                    "key": "address",
                    "type": "textarea",
                    "input": true
                }
            ],
            "input": false,
            "tableView": false
        },
        {
            "type": "panel",
            "label": "Section",
            "title": "Section",
            "key": "section-0.1073",
            "components": [
                {
                    "label": "Extended Date Picker",
                    "tableView": false,
                    "validateWhenHidden": false,
                    "key": "extendeddatepicker",
                    "type": "extendeddatepicker",
                    "input": true
                },
                {
                    "label": "Columns",
                    "columns": [
                        {
                            "components": [
                                {
                                    "label": "Slider Component",
                                    "tableView": false,
                                    "validateWhenHidden": false,
                                    "key": "slider",
                                    "type": "slider",
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
                                    "label": "Url",
                                    "placeholder": "Url",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "url",
                                    "type": "url",
                                    "input": true
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
                    "key": "columns3",
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
                                    "label": "Day",
                                    "hideInputLabels": false,
                                    "inputsLabelPosition": "top",
                                    "useLocaleSettings": false,
                                    "tableView": false,
                                    "fields": {
                                        "day": {
                                            "hide": false
                                        },
                                        "month": {
                                            "hide": false
                                        },
                                        "year": {
                                            "hide": false
                                        }
                                    },
                                    "validateWhenHidden": false,
                                    "key": "day",
                                    "type": "day",
                                    "input": true,
                                    "defaultValue": "00/00/0000"
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
                                    "label": "Enable/Disable",
                                    "tableView": false,
                                    "validateWhenHidden": false,
                                    "key": "enabledisable",
                                    "type": "enabledisable",
                                    "input": true
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
                    "key": "columns2",
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
                                    "label": "Star Rating",
                                    "tableView": false,
                                    "validateWhenHidden": false,
                                    "key": "starrating",
                                    "type": "starrating",
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
                    "key": "columns4",
                    "type": "columns",
                    "input": false,
                    "tableView": false
                }
            ],
            "input": false,
            "tableView": false
        }
    ]
  }