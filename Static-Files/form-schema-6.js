var formSchema =  {
  "components": [
    {
      "collapsible": false,
      "key": "panel",
      "type": "panel",
      "label": "Panel",
      "input": false,
      "tableView": false,
      "components": [
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
          "key": "dataGrid",
          "type": "datagrid",
          "input": true,
          "components": [
            {
              "label": "Price",
              "applyMaskOn": "change",
              "mask": false,
              "tableView": false,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "validate": {
                "required": true
              },
              "validateWhenHidden": false,
              "key": "price",
              "type": "number",
              "input": true
            },
            {
              "label": "Qantity",
              "applyMaskOn": "change",
              "mask": false,
              "tableView": false,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "validate": {
                "required": true,
                "customMessage": "Quantity must be minimum 1 and maximum 10",
                "min": 1,
                "max": 10
              },
              "validateWhenHidden": false,
              "key": "qantity",
              "type": "number",
              "input": true
            },
            {
              "label": "Amount",
              "applyMaskOn": "change",
              "mask": false,
              "tableView": false,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "calculateValue": "value = row.price * row.qantity;",
              "validateWhenHidden": false,
              "key": "amount",
              "type": "number",
              "input": true
            }
          ]
        },
        {
          "label": "Total",
          "applyMaskOn": "change",
          "mask": false,
          "tableView": false,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "calculateValue": "value = data.dataGrid.reduce(function(total, row) {  return total + row.amount; }, 0);",
          "validateWhenHidden": false,
          "key": "total",
          "type": "number",
          "input": true
        },
        {
          "label": "Is File Upload",
          "tableView": false,
          "validateWhenHidden": false,
          "key": "isFileUpload",
          "type": "checkbox",
          "input": true,
          "defaultValue": false
        }
      ]
    },
    {
      "collapsible": false,
      "key": "panel1",
      "conditional": {
        "show": false,
        "when": "isFileUpload",
        "eq": "false"
      },
      "type": "panel",
      "label": "Panel",
      "input": false,
      "tableView": false,
      "components": [
        {
          "label": "Upload",
          "tableView": false,
          "storage": "base64",
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
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": false
    }
  ]
      }
      