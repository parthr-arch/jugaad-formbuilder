var formSchema = {
    "label": "Table",
    "cellAlignment": "left",
    "customClass": "standardTable tableSpacing",
    "bordered": true,
    "hover": true,
    "key": "table22",
    "type": "table",
    "numRows": 6,
    "numCols": 4,
    "input": false,
    "tableView": false,
    "rows": [
      [
        {
          "components": []
        },
        {
          "components": [
            {
              "label": "HTML",
              "attrs": [
                {
                  "attr": "",
                  "value": ""
                }
              ],
              "content": "<div style=\"text-align:center ; background-color : #900000 ; height: 100%;\"><h3 style=\"color:white;font-weight: bold;\">No binari</h3></div>",
              "refreshOnChange": false,
              "key": "html154",
              "type": "htmlelement",
              "input": false,
              "tableView": false
            }
          ]
        }
      ],
      [
        {
          "components": [
            {
              "label": "HTML",
              "attrs": [
                {
                  "attr": "",
                  "value": ""
                }
              ],
              "content": "<div>Persones de menys de 16 anys</div>",
              "refreshOnChange": false,
              "key": "html155",
              "type": "htmlelement",
              "input": false,
              "tableView": false
            }
          ]
        },
        {
          "components": [
            {
              "label": "Number",
              "hideLabel": true,
              "mask": false,
              "tableView": false,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "key": "personesAtesesNoBinari17",
              "type": "number",
              "input": true
            }
          ]
        }
      ],
      [
        {
          "components": [
            {
              "label": "HTML",
              "attrs": [
                {
                  "attr": "",
                  "value": ""
                }
              ],
              "content": "<div>Persones entre 16 a 29 anys</div>",
              "refreshOnChange": false,
              "key": "html156",
              "type": "htmlelement",
              "input": false,
              "tableView": false
            }
          ]
        },
        {
          "components": [
            {
              "label": "Number",
              "hideLabel": true,
              "mask": false,
              "tableView": false,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "key": "personesAtesesNoBinari1631",
              "type": "number",
              "input": true
            }
          ]
        }
      ],
      [
        {
          "components": [
            {
              "label": "HTML",
              "attrs": [
                {
                  "attr": "",
                  "value": ""
                }
              ],
              "content": "<div>Persones entre 30 i 64 anys</div>",
              "refreshOnChange": false,
              "key": "html157",
              "type": "htmlelement",
              "input": false,
              "tableView": false
            }
          ]
        },
        {
          "components": [
            {
              "label": "Number",
              "hideLabel": true,
              "mask": false,
              "tableView": false,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "key": "personesAtesesNoBinari3066",
              "type": "number",
              "input": true
            }
          ]
        }
      ],
      [
        {
          "components": [
            {
              "label": "HTML",
              "attrs": [
                {
                  "attr": "",
                  "value": ""
                }
              ],
              "content": "<div>Persones de 65 anys o més</div>",
              "refreshOnChange": false,
              "key": "html158",
              "type": "htmlelement",
              "input": false,
              "tableView": false
            }
          ]
        },
        {
          "components": [
            {
              "label": "Number",
              "hideLabel": true,
              "mask": false,
              "tableView": false,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "key": "personesAtesesNoBinari67",
              "type": "number",
              "input": true
            }
          ]
        }
      ],
      [
        {
          "components": [
            {
              "label": "HTML",
              "attrs": [
                {
                  "attr": "",
                  "value": ""
                }
              ],
              "content": "<div>Total</div>",
              "refreshOnChange": false,
              "key": "html159",
              "type": "htmlelement",
              "input": false,
              "tableView": false
            }
          ]
        },
        {
          "components": [
            {
              "label": "Number",
              "hideLabel": true,
              "mask": false,
              "disabled": true,
              "tableView": false,
              "defaultValue": 0,
              "delimiter": false,
              "requireDecimal": false,
              "inputFormat": "plain",
              "truncateMultipleSpaces": false,
              "key": "personesAtesesNoBinariTotal2",
              "logic": [
                {
                  "name": "SumatoriPersonesAtesesNoBinariTotal",
                  "trigger": {
                    "type": "javascript",
                    "javascript": "if(data['personesAtesesNoBinari17'] >= 0 || data['personesAtesesNoBinari1631'] >= 0 || data['personesAtesesNoBinari3066'] >= 0 || data['personesAtesesNoBinari67'] >= 0){\n  if(data['personesAtesesNoBinari17'] === undefined){\n    data['personesAtesesNoBinari17'] = 0;\n  }\n  if(data['personesAtesesNoBinari1631'] === undefined){\n    data['personesAtesesNoBinari1631'] = 0;\n  }\n  if(data['personesAtesesNoBinari3066'] === undefined){\n    data['personesAtesesNoBinari3066'] = 0;\n  }\n  if(data['personesAtesesNoBinari67'] === undefined){\n    data['personesAtesesNoBinari67'] = 0;\n  }\n  data['personesAtesesNoBinariTotal2'] = data['personesAtesesNoBinari17'] + data['personesAtesesNoBinari1631'] + data['personesAtesesNoBinari3066'] + data['personesAtesesNoBinari67'];\n}else{\n  data['personesAtesesNoBinariTotal2'] = 0;\n}"
                  },
                  "actions": [
                    {
                      "name": "SumatoriPersonesAtesesNoBinariTotal",
                      "type": "value",
                      "value": "value = data['personesAtesesNoBinariTotal2'];"
                    }
                  ]
                }
              ],
              "type": "number",
              "personesAtesesNoBinariTotal2": 0,
              "personesAtesesNoBinariTotal": 0,
              "input": true
            }
          ]
        }
      ]
    ]
  }