var formSchema = [
    {
      "label": "Country",
      "widget": "choicesjs",
      "tableView": true,
      "data": {
        "values": [
          {
            "label": "India",
            "value": "india"
          },
          {
            "label": "China",
            "value": "china"
          },
          {
            "label": "Russia",
            "value": "russia"
          }
        ]
      },
      "validateWhenHidden": false,
      "key": "country",
      "type": "select",
      "input": true
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