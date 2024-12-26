var builderOptions = {
    "builderOptions": {
        "builder": {
            "basic": {
                "title": "Basic Components",
                "weight": 0,
                "components": {
                    "textfield": true,
                    "textarea": true,
                    "addressContainer": {
                        "title": "Address",
                        "key": "addressContainer",
                        "schema": {
                          "label": "Addresses",
                          "type": "container",
                          "key": "addressContainer",
                          "input": true,
                          "components": [
                            {
                              "label": "Postal Code",
                              "key": "postalCode",
                              "type": "textfield",
                              "input": true
                            },
                            {
                              "label": "Prefecture",
                              "key": "prefecture",
                              "type": "textfield",
                              "input": true
                            },
                            {
                              "label": "City",
                              "key": "city",
                              "type": "textfield",
                              "input": true
                            },
                            {
                              "label": "Address 1",
                              "key": "addressone",
                              "type": "textfield",
                              "input": true
                            },
                            {
                              "label": "Address 2",
                              "key": "addresstwo",
                              "type": "textfield",
                              "input": true
                            }, 
                            {
                              "label":"Full Address",
                              "key":"fullAddress",
                              "type":"textarea",
                              "input":true
                            }
          
                          ]
                        }
                      },
                      "contactContainer": {
                        "title": "Contact",
                        "key": "contactContainer",
                        "schema": {
                          "label": "Contacts",
                          "type": "container",
                          "key": "contactContainer",
                          "input": true,
                          "components": [
                            {
                              "label": "Contact (Mobile)",
                              "key": "contactMobile",
                              "type": "textfield",
                              "input": true
                            },
                            {
                             "label": "Contact (landline)",
                              "key": "contactLandline",
                              "type": "textfield",
                              "input": true
                            }
                          ]
                        }
                      },
                    // "number": true,
                    // "checkbox": true,
                    // "select": true,
                    // "button": true
                }
            },
            // "advanced": {
            //     "title": "Advanced Components",
            //     "weight": 10,
            //     "components": {
            //         "password": true,
            //         "email": true,
            //         "url": true,
            //         "currency": true,
            //         "phoneNumber": true,
            //         "signature": true,
            //         "file": true
            //     }
            // },
            // "layout": {
            //     "title": "Layout Components",
            //     "weight": 20,
            //     "components": {
            //         "columns": true,
            //         "fieldset": true,
            //         "panel": true,
            //         "tabs": true,
            //         "table": true,
            //         "well": true
            //     }
            // },
            // "data": {
            //     "title": "Data Components",
            //     "weight": 30,
            //     "components": {
            //         "datagrid": true,
            //         "editgrid": true,
            //         "dataMap": true,
            //         "tree": true,
            //         "hidden": true,
            //         "resource": true
            //     }
            // },
            // "custom": {
            //     "title": "Custom Components",
            //     "weight": 40,
            //     "components": {}
            // }
        },
        "placeholder": "Drag and drop components here",
        "editForm": {
            "textfield": [
                {
                    "key": "api",
                    "ignore": true
                },
                {
                    "key": "logic",
                    "ignore": true
                },
                {
                    "key": "conditional",
                    "label": "Conditional Logic",
                    "type": "panel",
                    "components": []
                },
                {
                    "key": "validation",
                    "label": "Validation Settings",
                    "type": "panel",
                    "components": []
                },
                {
                    "key": "appearance",
                    "label": "Appearance Settings",
                    "type": "panel",
                    "components": []
                }
            ],
            "textarea": [
                {
                    "key": "api",
                    "ignore": true
                },
                {
                    "key": "logic",
                    "ignore": true
                },
                {
                    "key": "conditional",
                    "label": "Conditional Logic",
                    "type": "panel",
                    "components": []
                },
                {
                    "key": "validation",
                    "label": "Validation Settings",
                    "type": "panel",
                    "components": []
                }
            ],
            "number": [
                {
                    "key": "api",
                    "ignore": true
                },
                {
                    "key": "logic",
                    "ignore": true
                },
                {
                    "key": "validation",
                    "label": "Validation Settings",
                    "type": "panel",
                    "components": []
                }
            ],
            "checkbox": [
                {
                    "key": "api",
                    "ignore": true
                },
                {
                    "key": "logic",
                    "ignore": true
                }
            ],
            "select": [
                {
                    "key": "api",
                    "ignore": true
                },
                {
                    "key": "logic",
                    "ignore": true
                },
                {
                    "key": "data",
                    "label": "Data Source",
                    "type": "panel",
                    "components": []
                }
            ],
            "button": [
                {
                    "key": "api",
                    "ignore": true
                },
                {
                    "key": "logic",
                    "ignore": true
                },
                {
                    "key": "display",
                    "label": "Display Settings",
                    "type": "panel",
                    "components": [
                        {
                            "key": "label",
                            "type": "textfield",
                            "label": "Label",
                            "placeholder": "Enter button label",
                            "tooltip": "Text displayed on the button"
                        },
                        {
                            "key": "theme",
                            "type": "select",
                            "label": "Theme",
                            "data": {
                                "values": [
                                    { "label": "Primary", "value": "primary" },
                                    { "label": "Secondary", "value": "secondary" },
                                    { "label": "Danger", "value": "danger" }
                                ]
                            },
                            "tooltip": "Choose the button theme"
                        },
                        {
                            "key": "size",
                            "type": "select",
                            "label": "Size",
                            "data": {
                                "values": [
                                    { "label": "Small", "value": "small" },
                                    { "label": "Medium", "value": "medium" },
                                    { "label": "Large", "value": "large" }
                                ]
                            },
                            "tooltip": "Set the button size"
                        }
                    ]
                }
            ]
        },
        "defaultConfig": {
            "display": "form",
            "components": []
        },
        "iconset": "fa",
        "language": "en",
        "i18n": {
            "en": {
                "Drag and drop components here": "Drag and drop components here",
                "Basic Components": "Basic Components",
                "Advanced Components": "Advanced Components",
                "Layout Components": "Layout Components",
                "Data Components": "Data Components",
                "Custom Components": "Custom Components"
            },
            "es": {
                "Drag and drop components here": "Arrastra y suelta los componentes aquí",
                "Basic Components": "Componentes Básicos",
                "Advanced Components": "Componentes Avanzados",
                "Layout Components": "Componentes de Diseño",
                "Data Components": "Componentes de Datos",
                "Custom Components": "Componentes Personalizados"
            }
        },
        "customAttributes": {
            "textfield": {
                "maxlength": 255,
                "minlength": 1,
                "customClass": "custom-textfield",
                "placeholder": "Enter text",
                "tooltip": "This is a text field",
                "defaultValue": "Default Text"
            },
            "textarea": {
                "rows": 5,
                "customClass": "custom-textarea",
                "placeholder": "Enter long text",
                "tooltip": "This is a text area",
                "defaultValue": "Default Long Text"
            },
            "number": {
                "min": 0,
                "max": 100,
                "step": 1,
                "customClass": "custom-number",
                "tooltip": "Enter a number between 0 and 100",
                "defaultValue": 50
            },
            "checkbox": {
                "customClass": "custom-checkbox",
                "tooltip": "Check this box",
                "defaultValue": false
            },
            "select": {
                "customClass": "custom-select",
                "tooltip": "Select an option",
                "defaultValue": "",
                "options": [
                    { "label": "Option 1", "value": "option1" },
                    { "label": "Option 2", "value": "option2" },
                    { "label": "Option 3", "value": "option3" }
                ]
            },
            "button": {
                "customClass": "custom-button",
                "tooltip": "Click this button",
                "label": "Submit"
            }
        },
        "additionalSettings": {
            "theme": "bootstrap",
            "validateOnInit": true,
            "allowCalculateOverride": true,
            "allowMultipleMasks": true,
            "highlightErrors": true,
            "saveDraft": true,
            "autoFocus": true,
            "buttonSettings": {
                "showCancel": true,
                "showNext": true,
                "showPrevious": true
            },
            "disableAlerts": false,
            "lazyLoad": true,
            "readOnly": false,
            "skipValidation": false
        }
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
}
