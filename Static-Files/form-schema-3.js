var formSchema = {
  "components": [
    {
      "label": "Employee Name",
      "type": "textfield",
      "key": "employeeName",
      "input": true,
      "placeholder": "Enter your name",
      "validate": {
        "required": true
      }
    },
    {
      "label": "Employee ID",
      "type": "textfield",
      "key": "employeeId",
      "input": true,
      "placeholder": "Enter Employee ID",
      "validate": {
        "required": true
      }
    },
    {
      "label": "Date of Attendance",
      "type": "datetime",
      "key": "attendanceDate",
      "input": true,
      "format": "yyyy-MM-dd",
      "validate": {
        "required": true
      }
    },
    {
      "label": "Attendance Status",
      "type": "select",
      "key": "attendanceStatus",
      "data": {
        "values": [
          { "label": "Present", "value": "present" },
          { "label": "Absent", "value": "absent" },
          { "label": "On Leave", "value": "on_leave" },
          { "label": "Late", "value": "late" }
        ]
      },
      "input": true,
      "validate": {
        "required": true
      }
    },
    {
      "label": "Additional Notes",
      "type": "textarea",
      "key": "notes",
      "input": true,
      "placeholder": "Add any comments or notes about the attendance",
      "validate": {
        "maxLength": 500
      }
    }
  ]
}
