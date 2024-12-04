var formSchema = {
  "label": "Dynamic Table with Multiple Calculations",
  "key": "dynamicTable",
  "type": "datagrid",
  "input": true,
  "components": [
    {
      "label": "Row Data",
      "key": "rows",
      "type": "datagrid",
      "input": true,
      "components": [
        {
          "label": "Quantity",
          "key": "quantity",
          "type": "number",
          "input": true,
          "validate": {
            "required": true,
            "min": 0
          },
          "calculateValue": "value = row.quantity * row.price; // Subtotal for row"
        },
        {
          "label": "Price",
          "key": "price",
          "type": "number",
          "input": true,
          "validate": {
            "required": true,
            "min": 0
          }
        },
        {
          "label": "Subtotal",
          "key": "subtotal",
          "type": "number",
          "input": true,
          "disabled": true,
          "calculateValue": "value = row.quantity * row.price;"
        },
        {
          "label": "Tax (10%)",
          "key": "tax",
          "type": "number",
          "input": true,
          "disabled": true,
          "calculateValue": "value = (row.subtotal || 0) * 0.10;"
        },
        {
          "label": "Grand Total",
          "key": "grandTotal",
          "type": "number",
          "input": true,
          "disabled": true,
          "calculateValue": "value = (row.subtotal || 0) + (row.tax || 0);"
        }
      ],
      "validate": {
        "required": false
      },
      "persistent": true,
      "hidden": false,
      "clearOnHide": true,
      "tableView": true
    }
  ]
}
var languageSupport= {};
