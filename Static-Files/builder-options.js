var getData = [
    { 'label': 'test1', 'value': 'value1' }
];

var builderOptions = {
    "builder": {
          "api": false,
    "conditional": false,
    "logic": false,
    "layout": false,
        "allComponents": {
            "title": "Jugaad Components",
            "weight": 0,
            "default": true,
            "components": {
                "textarea": true,
                "number": true,
                "password": true,
                "checkbox": true,
                "select": true,
                "radio": true,
                "button": true,
                "email": true,
                "url": true,
                "file": true,
                "datetime": true,
                "currency": false,
                "survey": true,
                "signature": true,
                "day": true,
                "time": true,
                "resource": false,
                "custom": false,
                "hidden": false,
                "htmlelement": true,
                "content": false,
                "panel": true,
                "fieldset": true,
                "well": false,
                "columns": true,
                "table": true,
                "tabs": true,
                "container": false,
                "datagrid": true,
                "editgrid": false,
                "tree": false,
                "selectboxes": true,
                "tags": false,
                "address": true,
                "location": true,
                "repeater": true,
                "submit": false,
                "reset": false,
                "recaptcha": false,
                "advancedselect": false,
                "fileGrid": true,
                "form": true,
                "slider": true,
                "contact": true,
                "enabledisable": true,
                "starrating": true,
                "webcam": true,
                "mycomponent": true,
                "transportationAndExpenseTable": true,
                "qrcode": true,
                "ageCalculator": false,
                "japaneseName": true,
                "scheduleTable": true,
                "geolocation": true,
                // "daterangepicker": false,
                "extendeddatepicker": true,
                "customtextfield": true,
                "textfield": true,
                "dataGridFooter": true,
                
                // "geoLocation": true,
            }
        },
        // custom: {
        //     title: 'User Fields',
        //     weight: 10,
        //     components: {
        //         firstName: {
        //             title: 'First Name',
        //             key: 'firstName',
        //             icon: 'terminal',
        //             schema: {
        //                 label: 'First Name',
        //                 type: 'textfield',
        //                 key: 'firstName',
        //                 input: true
        //             }
        //         },
        //         lastName: {
        //             title: 'Last Name',
        //             key: 'lastName',
        //             icon: 'terminal',
        //             schema: {
        //                 label: 'Last Name',
        //                 type: 'textfield',
        //                 key: 'lastName',
        //                 input: true
        //             }
        //         },
        //         email: {
        //             title: 'Email',
        //             key: 'email',
        //             icon: 'at',
        //             schema: {
        //                 label: 'Email',
        //                 type: 'email',
        //                 key: 'email',
        //                 input: true
        //             }
        //         },
        //         phoneNumber: {
        //             title: 'Mobile Phone',
        //             key: 'mobilePhone',
        //             icon: 'phone-square',
        //             schema: {
        //                 label: 'Mobile Phone',
        //                 type: 'phoneNumber',
        //                 key: 'mobilePhone',
        //                 input: true
        //             }
        //         }
        //     }
        // },

        "basic": false,
        "advanced": false,
        "data": false,
        "premium": false
    },
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
                ignore: false
            },
            {
                key: 'display',
                ignore: false,
                components: [
                    {
                        // You can ignore existing fields.
                        key: 'placeholder',
                        ignore: false,
                    },
                    {
                        // Or add your own. The syntax is form.io component definitions.
                        type: 'textfield',
                        input: true,
                        label: 'My Custom Setting',
                        weight: 12,
                        key: 'myCustomSetting', // This will be available as component.myCustomSetting
                    },
                    {
                        type: 'select',
                        input: true,
                        key: 'customDropdown',
                        label: 'Custom Dropdown', // Label for the dropdown
                        placeholder: 'Select an option',
                        dataSrc: 'values',
                        data: {
                            values: getData
                        },
                        weight: 10, // Controls the position of the dropdown
                        tooltip: 'This is a custom dropdown for your settings.',
                    }
                ],
            },
            {
                // Or add your own. The syntax is form.io component definitions.
                type: 'textfield',
                input: true,
                label: 'My Custom Setting',
                weight: 12,
                key: 'myCustomSetting', // This will be available as component.myCustomSetting
                ignore: false,
                components: [
                    {
                        // You can ignore existing fields.
                        key: 'placeholder',
                        ignore: true,
                    },
                    {
                        // Or add your own. The syntax is form.io component definitions.
                        type: 'textfield',
                        input: true,
                        label: 'My Custom Setting',
                        weight: 12,
                        key: 'myCustomSetting', // This will be available as component.myCustomSetting
                    },
                    {
                        type: 'select',
                        input: true,
                        key: 'customDropdown',
                        label: 'Custom Dropdown', // Label for the dropdown
                        placeholder: 'Select an option',
                        dataSrc: 'values',
                        data: {
                            values: [
                                { label: 'Option 1', value: 'option1' },
                                { label: 'Option 2', value: 'option2' },
                                { label: 'Option 3', value: 'option3' }
                            ]
                        },
                        weight: 10, // Controls the position of the dropdown
                        tooltip: 'This is a custom dropdown for your settings.',
                    },
                ],
            },
        ]
    },
    //     "editForm": {
    //     "textfield": [
    //         {
    //             "key": "display",
    //             "ignore": false
    //         },
    //         {
    //             "key": "username",
    //             "ignore": false
    //         },
    //         {
    //             "key": "email",
    //             "ignore": false
    //         },
    //         {
    //             "key": "password",
    //             "ignore": false
    //         }
    //     ],
    //     "dropdown": [
    //         {
    //             "key": "role",
    //             "options": ["Admin", "User", "Guest"],
    //             "ignore": false
    //         },
    //         {
    //             "key": "status",
    //             "options": ["Active", "Inactive"],
    //             "ignore": false
    //         }
    //     ],
    //     "checkbox": [
    //         {
    //             "key": "subscribe",
    //             "ignore": false
    //         },
    //         {
    //             "key": "terms",
    //             "ignore": false
    //         }
    //     ],
    //     "radio": [
    //         {
    //             "key": "gender",
    //             "options": ["Male", "Female", "Other"],
    //             "ignore": false
    //         }
    //     ],
    //     "datepicker": [
    //         {
    //             "key": "dob",
    //             "ignore": false
    //         },
    //         {
    //             "key": "startDate",
    //             "ignore": false
    //         }
    //     ],
    //     "textarea": [
    //         {
    //             "key": "bio",
    //             "ignore": false
    //         }
    //     ],
    //     "fileUpload": [
    //         {
    //             "key": "profilePicture",
    //             "ignore": false
    //         }
    //     ],
    //     "hiddenFields": [
    //         {
    //             "key": "userId",
    //             "ignore": true
    //         }
    //     ]
    // },
    "language": "en",
    "i18n": {
        "es": {
            "Label": "Etiqueta",
            "Label Position": "Posición de la etiqueta",
            "Placeholder": "Marcador de posición",
            "Description": "Descripción",
            "Tooltip": "Tooltip",
            "Prefix": "Prefijo",
            "Suffix": "Sufijo",
            "Widget": "Widget",
            "Input Mask": "Máscara de entrada",
            "Custom CSS Class": "Clase CSS personalizada",
            "Tab Index": "Tab Index",
            "Hidden": "Oculto",
            "Hide Label": "Ocultar la etiqueta",
            "Show Word Counter": "Mostrar contador de palabras",
            "Show Character Counter": "Mostrar contador de caracteres",
            "Hide Input": "Ocultar Input",
            "Excellent": "Excelente",
            "Initial Focus": "Enfoque inicial",
            "Allow Spellcheck": "Permitir revisión ortográfica",
            "Disabled": "Deshabilitado",
            "Table View": "Vista de tabla",
            "Modal Edit": "Modal Edit",
            "Multiple Values": "Valores múltiples",
            "Persistent": "persistente",
            "Input Format": "Formato de entrada",
            "Protected": "Protegido",
            "Database Index": "Índice de la base de datos",
            "Mixed (Allow upper and lower case)": "Mezclado (Permitir mayúsculas y minúsculas)",
            "Uppercase": "Mayúsculas",
            "Lowercase": "Minúsculas",
            "Encrypted (Enterprise Only)": "Cifrado (Sólo Empresa)",
            "Default Value": "Valor por defecto",
            "Drag and Drop a form component": "Arrastrar y soltar un componente",
            "Text Field": "Campo de texto",
            "Email": "Correo electrónico",
            "Text Area": "Área de texto",
            "Panel": "Panel",
            "Time": "Tiempo",
            "Submit": "Enviar",
            "Basic Components": "Componentes básicos",
            "Layout Components": "Componentes del diseño",
            "Advanced": "Avanzado",
            "Hidden": "Oculto",
            "Component": "Componente",
            "Display": "Mostrar",
            "Data": "Datos",
            "Validation": "Validación",
            "API": "API",
            "Conditional": "Condicional",
            "Logic": "Lógica",
            "Layout": "Diseño",
            "Allow Multiple Masks": "Permitir varias máscaras",
            "Input Field": "Campo de entrada",
            "Top": "Arriba",
            "Left (Left-aligned)": "Izquierda (alineado a la izquierda)",
            "Input Type": "Tipo de entrada",
            "Collapsible": "Colapsable",
            "Preview": "Previsualización",
            "Text Case": "Caso de texto",
            "Redraw On": "Redraw On",
            "Clear Value When Hidden": "Limpiar cuando se oculta",
            "Custom Default Value": "Valor predeterminado",
            "Calculated Value": "Valor calculado",
            "Calculate Value on server": "Calcular el valor en el servidor",
            "Allow Manual Override of Calculated Value": "Permitir la anulación manual del valor calculado",
            "Server": "Servidor",
            "Client": "Cliente",
            "None": "Ninguno",
            "Validate On": "Validar en",
            "Required": "Requerido",
            "Unique": "Único",
            "Minimum Length": "Longitud mínima",
            "Maximum Length": "Longitud máxima",
            "Minimum Word Length": "Longitud mínima de la palabra",
            "Maximum Word Length": "Longitud máxima de la palabra",
            "Regular Expression Pattern": "Patrón de expresión regular",
            "Error Label": "Etiqueta de error",
            "Custom Error Message": "Mensaje de error personalizado",
            "Custom Validation": "Validación personalizada",
            "JSONLogic Validation": "Validación JSONLogic",
            "Property Name": "Nombre de la propiedad",
            "Field Tags": "Etiquetas Tags",
            "Custom Properties": "Propiedades personalizadas",
            "Add Another": "Agregar otro",
            "Save": "Guardar",
            "Cancel": "Cancelar",
            "Remove": "Remover",
            "Rows": "Filas",
            "Title": "Título",
            "Theme": "Tema",
            "Data Format": "Formato de datos",
            "Advanced Logic": "Lógica avanzada",
            "Advanced Conditions": "Condiciones Avanzadas",
            "Simple": "Simple",
            "HTML Attributes": "Atributos HTML",
            "PDF Overlay": "Overlay PDF",
            "Number": "Número",
            "Use Thousands Separator": "Usar el separador de miles"
        },
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
            "Hidden": "Hidden",
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
            "Use Thousands Separator": "Use Thousands Separator"
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
            "Hidden": "隠す",
            "Component": "コンポーネント",
            "Display": "表示",
            "Data": "データ",
            "Validation": "バリデーション",
            "API": "API",
            "Conditional": "条件付き",
            "Logic": "ロジック",
            "Layout": "レイアウト",
            "Allow Multiple Masks": "複数のマスクを許可",
            "Input Field": "入力フィールド",
            "Top": "上",
            "Left (Left-aligned)": "左（左揃え）",
            "Input Type": "入力タイプ",
            "Collapsible": "折りたたみ可能",
            "Preview": "プレビュー",
            "Text Case": "テキストケース",
            "Redraw On": "再描画する",
            "Clear Value When Hidden": "非表示時に値をクリア",
            "Custom Default Value": "カスタムデフォルト値",
            "Calculated Value": "計算された値",
            "Calculate Value on server": "サーバーで値を計算",
            "Allow Manual Override of Calculated Value": "計算された値を手動で上書きすることを許可",
            "Server": "サーバー",
            "Client": "クライアント",
            "None": "なし",
            "Validate On": "検証時",
            "Required": "必須",
            "Unique": "一意",
            "Minimum Length": "最小長さ",
            "Maximum Length": "最大長さ",
            "Minimum Word Length": "最小単語長",
            "Maximum Word Length": "最大単語長",
            "Regular Expression Pattern": "正規表現パターン",
            "Error Label": "エラーレーベル",
            "Custom Error Message": "カスタムエラーメッセージ",
            "Custom Validation": "カスタムバリデーション",
            "JSONLogic Validation": "JSONLogic バリデーション",
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
            "Data Format": "データフォーマット",
            "Advanced Logic": "高度なロジック",
            "Advanced Conditions": "高度な条件",
            "Simple": "シンプル",
            "HTML Attributes": "HTML属性",
            "PDF Overlay": "PDFオーバーレイ",
            "Number": "数字",
            "Use Thousands Separator": "千の区切り文字を使用"
        }
    }
};