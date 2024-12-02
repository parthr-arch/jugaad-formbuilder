var formSchema = {
    "components": [
      {
        "type": "table",
        "label": "My Table",
        "key": "table",
        "input": true,
        "tableView": true,
        "columns": [
          {
            "label": "Column 1",
            "key": "column1",
            "input": true,
            "type": "number",
            "validate": {
              "required": true
            }
          },
          {
            "label": "Column 2",
            "key": "column2",
            "input": true,
            "type": "number",
            "validate": {
              "required": true
            }
          }
        ],
        "footer": [
          {
            "label": "Total Column 1",
            "key": "totalColumn1",
            "type": "number",
            "input": false,
            "defaultValue": 0
          },
          {
            "label": "Total Column 2",
            "key": "totalColumn2",
            "type": "number",
            "input": false,
            "defaultValue": 0
          }
        ]
      }
    ],
    "logic": [
      {
        "name": "Sum Columns",
        "trigger": {
          "type": "event",
          "event": "change",
          "component": "table"
        },
        "actions": [
          {
            "name": "Calculate Total Column 1",
            "action": "custom",
            "custom": "var totalColumn1 = 0; form.table.data.forEach(function(row) { if (row.column1) totalColumn1 += row.column1; }); form.totalColumn1 = totalColumn1;"
          },
          {
            "name": "Calculate Total Column 2",
            "action": "custom",
            "custom": "var totalColumn2 = 0; form.table.data.forEach(function(row) { if (row.column2) totalColumn2 += row.column2; }); form.totalColumn2 = totalColumn2;"
          }
        ]
      }
    ]
  }
  