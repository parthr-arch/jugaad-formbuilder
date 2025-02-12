var formSchema = {
    "formName": "New Component Form",
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
                },
                {
                    type: 'survey',
                    key: 'questions',
                    label: 'Survey',
                    values: [
                        { label: 'Great', value: 'great' },
                        { label: 'Good', value: 'good' },
                        { label: 'Poor', value: 'poor' }
                    ],
                    questions: [
                        { label: 'How would you rate the platform?', value: 'howWouldYouRateTheFormIoPlatform' },
                        // { label: 'How was Customer Support?', value: 'howWasCustomerSupport' },
                        // { label: 'Overall Experience?', value: 'overallExperience' }
                    ]
                },
                {
                    "label": "Columns",
                    "columns": [
                        {
                            "components": [
                                {
                                    "label": "Slider Component",
                                    "tableView": false,
                                    "type": "slider",
                                    "input": true,
                                    "key": "slider"
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
                                    "type": "enabledisable",
                                    "input": true,
                                    "key": "enabledisable",
                                    "defaultValue": false
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
                },

                {
                    "label": "Columns",
                    "columns": [
                        {
                            "components": [
                                {
                                    "label": "Extended Date Picker",
                                    "pickerType": "singletimepicker",
                                    "tableView": false,
                                    "validateWhenHidden": false,
                                    "key": "extendeddatepicker4",
                                    "type": "extendeddatepicker",
                                    "input": true
                                },
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
                                    "label": "Extended Date Picker",
                                    "pickerType": "daypicker",
                                    "tableView": false,
                                    "validateWhenHidden": false,
                                    "key": "extendeddatepicker1",
                                    "type": "extendeddatepicker",
                                    "input": true
                                },
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
                },
                {
                    "label": "Columns",
                    "columns": [
                        {
                            "components": [
                                {
                                    "label": "Star Rating",
                                    "tableView": false,
                                    "type": "starrating",
                                    "input": true,
                                    "key": "starrating"
                                }
                            ],
                            "width": 6,
                            "offset": 0,
                            "push": 0,
                            "pull": 0,
                            "size": "md",
                            "currentWidth": 6
                        },
                       
                    ],
                    "key": "columns2",
                    "type": "columns",
                    "input": false,
                    "tableView": false
                },
        
            ],
            "input": false,
            "tableView": false
        },
      
        // {
        //     "label": " Status",
        //     "labelPosition": "top",
        //     "widget": "choicesjs",
        //     "placeholder": "Status",
        //     "description": "",
        //     "tooltip": "",
        //     "customClass": "",
        //     "tabindex": "",
        //     "hidden": false,
        //     "hideLabel": false,
        //     "uniqueOptions": false,
        //     "autofocus": false,
        //     "disabled": false,
        //     "tableView": true,
        //     "modalEdit": false,
        //     "multiple": false,
        //     "dataSrc": "values",
        //     "data": {
        //         "values": [
        //             {
        //                 "label": "Available",
        //                 "value": "available"
        //             },
        //             {
        //                 "label": "Not Available",
        //                 "value": "notAvailable"
        //             }
        //         ],
        //         "resource": "",
        //         "url": "",
        //         "json": "",
        //         "custom": ""
        //     },
        //     "dataType": "",
        //     "idPath": "id",
        //     "valueProperty": "",
        //     "template": "<span>{{ item.label }}</span>",
        //     "refreshOn": "",
        //     "refreshOnBlur": "",
        //     "clearOnRefresh": false,
        //     "searchEnabled": true,
        //     "selectThreshold": 0.3,
        //     "readOnlyValue": false,
        //     "customOptions": {},
        //     "useExactSearch": false,
        //     "persistent": true,
        //     "protected": false,
        //     "dbIndex": false,
        //     "encrypted": false,
        //     "clearOnHide": true,
        //     "customDefaultValue": "",
        //     "calculateValue": "",
        //     "calculateServer": false,
        //     "allowCalculateOverride": false,
        //     "validateOn": "change",
        //     "validate": {
        //         "required": false,
        //         "onlyAvailableItems": false,
        //         "customMessage": "",
        //         "custom": "",
        //         "customPrivate": false,
        //         "json": "",
        //         "strictDateValidation": false,
        //         "multiple": false,
        //         "unique": false
        //     },
        //     "unique": false,
        //     "validateWhenHidden": false,
        //     "errorLabel": "",
        //     "errors": "",
        //     "key": "attendanceStatus",
        //     "tags": [],
        //     "properties": {},
        //     "conditional": {
        //         "show": null,
        //         "when": null,
        //         "eq": "",
        //         "json": ""
        //     },
        //     "customConditional": "",
        //     "logic": [],
        //     "attributes": {},
        //     "overlay": {
        //         "style": "",
        //         "page": "",
        //         "left": "",
        //         "top": "",
        //         "width": "",
        //         "height": ""
        //     },
        //     "type": "select",
        //     "indexeddb": {
        //         "filter": {}
        //     },
        //     "dataGridLabel": false,
        //     "lazyLoad": true,
        //     "selectFields": "",
        //     "searchField": "",
        //     "searchDebounce": 0.3,
        //     "minSearch": 0,
        //     "filter": "",
        //     "limit": 100,
        //     "authenticate": false,
        //     "ignoreCache": false,
        //     "redrawOn": "",
        //     "input": true,
        //     "prefix": "",
        //     "suffix": "",
        //     "showCharCount": false,
        //     "showWordCount": false,
        //     "allowMultipleMasks": false,
        //     "addons": [],
        //     "fuseOptions": {
        //         "include": "score",
        //         "threshold": 0.3
        //     },
        //     "id": "eco1d4e",
        //     "defaultValue": ""
        // },
       
        // {
        //     "label": "Columns",
        //     "columns": [
        //         {
        //             "components": [
        //                 {
        //                     "label": "Slider Component",
        //                     "tableView": false,
        //                     "type": "slider",
        //                     "input": true,
        //                     "key": "slider"
        //                 }
        //             ],
        //             "width": 6,
        //             "offset": 0,
        //             "push": 0,
        //             "pull": 0,
        //             "size": "md",
        //             "currentWidth": 6
        //         },
        //         {
        //             "components": [
        //                 {
        //                     "label": "Enable/Disable",
        //                     "tableView": false,
        //                     "type": "enabledisable",
        //                     "input": true,
        //                     "key": "enabledisable",
        //                     "defaultValue": false
        //                 }
        //             ],
        //             "width": 6,
        //             "offset": 0,
        //             "push": 0,
        //             "pull": 0,
        //             "size": "md",
        //             "currentWidth": 6
        //         }
        //     ],
        //     "key": "columns1",
        //     "type": "columns",
        //     "input": false,
        //     "tableView": false
        // },
        // {
        //     "label": "Data Grid",
        //     "reorder": false,
        //     "addAnotherPosition": "bottom",
        //     "layoutFixed": false,
        //     "enableRowGroups": false,
        //     "initEmpty": false,
        //     "tableView": false,
        //     "defaultValue": [
        //         {}
        //     ],
        //     "validateWhenHidden": false,
        //     "key": "datagrid-0.1380",
        //     "type": "datagrid",
        //     "input": true,
        //     "components": [
        //         {
        //             "label": "Quantity",
        //             "placeholder": "Quantity",
        //             "applyMaskOn": "change",
        //             "mask": false,
        //             "tableView": false,
        //             "delimiter": false,
        //             "requireDecimal": false,
        //             "inputFormat": "plain",
        //             "truncateMultipleSpaces": false,
        //             "validateWhenHidden": false,
        //             "key": "quantity",
        //             "type": "number",
        //             "input": true
        //         },
        //         {
        //             "label": "Price",
        //             "placeholder": "Price",
        //             "applyMaskOn": "change",
        //             "mask": false,
        //             "tableView": false,
        //             "delimiter": false,
        //             "requireDecimal": false,
        //             "inputFormat": "plain",
        //             "truncateMultipleSpaces": false,
        //             "validateWhenHidden": false,
        //             "key": "price",
        //             "type": "number",
        //             "input": true
        //         },
        //         {
        //             "label": "Total",
        //             "placeholder": "Number",
        //             "applyMaskOn": "change",
        //             "mask": false,
        //             "tableView": false,
        //             "delimiter": false,
        //             "requireDecimal": false,
        //             "inputFormat": "plain",
        //             "truncateMultipleSpaces": false,
        //             "calculateValue": "value = row.quantity + row.price;\n",
        //             "validateWhenHidden": false,
        //             "key": "total",
        //             "type": "number",
        //             "input": true
        //         }
        //     ]
        // },
        {
            "title": "Resume Upload",
            "collapsible": false,
            "key": "resumeUpload",
            "type": "panel",
            "label": "Panel",
            "input": false,
            "tableView": false,
            "components": [
              {
                "label": "Upload",
                "tableView": false,
                "storage": "base64",
                "image": true,
                "webcam": false,
                "fileTypes": [
                  {
                    "label": "",
                    "value": ""
                  }
                ],
                "validateWhenHidden": false,
                "key": "file",
                "type": "file",
                "input": true
              }
            ]
          },
          {
            "title": "Signature",
            "collapsible": false,
            "key": "signature",
            "type": "panel",
            "label": "Panel",
            "input": false,
            "tableView": false,
            "components": [
              {
                "label": "Signature",
                "tableView": false,
                "validateWhenHidden": false,
                "key": "signature1",
                "type": "signature",
                "input": true
              }
            ]
          }
    ]
};

var languageSupport = {
    "language": "en",
    i18n: {
        en: {
            'Section': 'Section',
            'Columns': 'Columns',
            'Email': 'Email',
            'Password': 'Password',
            'Firstname': 'Firstname',
            'Middlename': 'Middlename',
            'Lastname': 'Lastname',
            'Address': 'Address',
            'Survey': 'Survey',
            'Slider Component': 'Slider Component',
            'Enable/Disable': 'Enable/Disable',
            'Extended Date Picker': 'Extended Date Picker',
            'Star Rating': 'Star Rating',
            'Status': 'Status',
            'Available': 'Available',
            'Not Available': 'Not Available',
            'Data Grid': 'Data Grid',
            'Quantity': 'Quantity',
            'Price': 'Price',
            'Total': 'Total',
            'Panel': 'Panel',
            'Upload': 'Upload',
            'Signature': 'Signature',
            'Great': 'Great',
            'Good': 'Good',
            'Poor': 'Poor',
            'How would you rate the platform?': 'How would you rate the platform?',
            'How was Customer Support?': 'How was Customer Support?',
            'Overall Experience?': 'Overall Experience?'
        },
        jp: {
            'Select Date': '日付を選択',
            'Section': 'セクション',
            'Columns': '列',
            'Email': 'メール',
            'Password': 'パスワード',
            'Firstname': '名',
            'Middlename': 'ミドルネーム',
            'Lastname': '姓',
            'Address': '住所',
            'Survey': '調査',
            'Slider Component': 'スライダーコンポーネント',
            'Enable/Disable': '有効/無効',
            'Extended Date Picker': '拡張日付ピッカー',
            'Star Rating': '星評価',
            'Status': 'ステータス',
            'Available': '利用可能',
            'Not Available': '利用不可',
            'Data Grid': 'データグリッド',
            'Quantity': '数量',
            'Price': '価格',
            'Total': '合計',
            'Panel': 'パネル',
            'Upload': 'アップロード',
            'Signature': '署名',
            'Great': '素晴らしい',
            'Good': '良い',
            'Poor': '悪い',
            'How would you rate the platform?': 'プラットフォームをどう評価しますか？',
            'How was Customer Support?': 'カスタマーサポートはいかがでしたか？',
            'Overall Experience?': '全体的な体験はどうでしたか？'
        }
    }
}
