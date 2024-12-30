var formSchema = {
  components: [
    {
      "title": "Basic",
      "collapsible": false,
      "key": "section",
      "type": "panel",
      "label": "Panel",
      "input": false,
      "tableView": false,
      "components": [
        {
          "label": "Name",
          "applyMaskOn": "change",
          "tableView": true,
          "validateWithKatakana": false,
          "validateWithHiragana": false,
          "validateWhenHidden": false,
          "key": "textField",
          "type": "textfield",
          "input": true
        },
        {
          "label": "Description",
          "applyMaskOn": "change",
          "autoExpand": false,
          "tableView": true,
          "validateWhenHidden": false,
          "key": "description",
          "type": "textarea",
          "input": true
        },
        {
          "label": "Date of Birth",
          "tableView": false,
          "datePicker": {
            "disableWeekends": false,
            "disableWeekdays": false
          },
          "enableMinDateInput": false,
          "enableMaxDateInput": false,
          "validateWhenHidden": false,
          "key": "dateOfBirth",
          "type": "datetime",
          "input": true,
          "widget": {
            "type": "calendar",
            "displayInTimezone": "viewer",
            "locale": "en",
            "useLocaleSettings": false,
            "allowInput": true,
            "mode": "single",
            "enableTime": true,
            "noCalendar": false,
            "format": "yyyy-MM-dd hh:mm a",
            "hourIncrement": 1,
            "minuteIncrement": 1,
            "time_24hr": false,
            "minDate": null,
            "disableWeekends": false,
            "disableWeekdays": false,
            "maxDate": null
          }
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
                  "label": "Hobbies",
                  "optionsLabelPosition": "right",
                  "tableView": false,
                  "values": [
                    {
                      "label": "Sports",
                      "value": "sports",
                      "shortcut": ""
                    },
                    {
                      "label": "Cooking",
                      "value": "cooking",
                      "shortcut": ""
                    },
                    {
                      "label": "Travelling",
                      "value": "travelling",
                      "shortcut": ""
                    }
                  ],
                  "validateWhenHidden": false,
                  "key": "hobbies",
                  "type": "selectboxes",
                  "input": true,
                  "inputType": "checkbox"
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
                  "label": "English",
                  "tableView": false,
                  "validateWhenHidden": false,
                  "key": "english",
                  "type": "starrating",
                  "input": true
                }
              ],
              "offset": 0,
              "push": 0,
              "pull": 0,
              "size": "md",
              "currentWidth": 4,
              "width": 4
            },
            {
              "components": [
                {
                  "label": "Hindi",
                  "tableView": false,
                  "validateWhenHidden": false,
                  "key": "hindi",
                  "type": "starrating",
                  "input": true
                }
              ],
              "offset": 0,
              "push": 0,
              "pull": 0,
              "size": "md",
              "currentWidth": 4,
              "width": 4
            },
            {
              "components": [
                {
                  "label": "Gujarati",
                  "tableView": false,
                  "validateWhenHidden": false,
                  "key": "gujarati",
                  "type": "starrating",
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
          "label": "NRI",
          "hideLabel": true,
          "tableView": false,
          "validateWhenHidden": false,
          "key": "nri",
          "type": "enabledisable",
          "input": true
        }
      ]
    },
    {
      "title": "Education",
      "collapsible": false,
      "key": "education",
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
          "hideLabel": true,
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
              "label": "Degree",
              "applyMaskOn": "change",
              "tableView": true,
              "validateWithKatakana": false,
              "validateWithHiragana": false,
              "validateWhenHidden": false,
              "key": "degree",
              "type": "textfield",
              "input": true
            },
            {
              "label": "University",
              "applyMaskOn": "change",
              "tableView": true,
              "validateWithKatakana": false,
              "validateWithHiragana": false,
              "validateWhenHidden": false,
              "key": "university",
              "type": "textfield",
              "input": true
            },
            {
              "label": "Percentage/CGPA",
              "applyMaskOn": "change",
              "tableView": true,
              "validateWithKatakana": false,
              "validateWithHiragana": false,
              "validateWhenHidden": false,
              "key": "percentageCgpa",
              "type": "textfield",
              "input": true
            }
          ]
        }
      ]
    },
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
}