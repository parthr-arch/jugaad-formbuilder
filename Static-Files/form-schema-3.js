// var formSchema = {
//   "components": [
//     {
//       "label": "Employee Name",
//       "type": "textfield",
//       "key": "employeeName",
//       "input": true,
//       "placeholder": "Enter your name",
//       "validate": {
//         "required": true
//       }
//     },
//     {
//       "label": "Employee ID",
//       "type": "textfield",
//       "key": "employeeId",
//       "input": true,
//       "placeholder": "Enter Employee ID",
//       "validate": {
//         "required": true
//       }
//     },
//     {
//       "label": "Date of Attendance",
//       "type": "datetime",
//       "key": "attendanceDate",
//       "input": true,
//       "format": "yyyy-MM-dd",
//       "validate": {
//         "required": true
//       }
//     },
//     {
//       "label": "Attendance Status",
//       "type": "select",
//       "key": "attendanceStatus",
//       "data": {
//         "values": [
//           { "label": "Present", "value": "present" },
//           { "label": "Absent", "value": "absent" },
//           { "label": "On Leave", "value": "on_leave" },
//           { "label": "Late", "value": "late" }
//         ]
//       },
//       "input": true,
//       "validate": {
//         "required": true
//       }
//     },
//     {
//       "label": "Additional Notes",
//       "type": "textarea",
//       "key": "notes",
//       "input": true,
//       "placeholder": "Add any comments or notes about the attendance",
//       "validate": {
//         "maxLength": 500
//       }
//     }
//   ]
// }
// var languageSupport= {};


var formSchema = {
  "title": "Default",
  "name": "default",
  "version": "2.0.0",
  "description": "Provides a simple User authentication system.",
  "roles": {
    "administrator": {
      "title": "Administrator",
      "description": "A role for Administrative Users.",
      "admin": true,
      "default": false
    },
    "authenticated": {
      "title": "Authenticated",
      "description": "A role for Authenticated Users.",
      "admin": false,
      "default": false
    },
    "anonymous": {
      "title": "Anonymous",
      "description": "A role for Anonymous Users.",
      "admin": false,
      "default": true
    }
  },
  "resources": {
    "user": {
      "title": "User",
      "type": "resource",
      "name": "user",
      "path": "user",
      "pdfComponents": [],
      "tags": [],
      "submissionAccess": [
        {
          "type": "create_all",
          "roles": ["administrator"]
        },
        {
          "type": "read_all",
          "roles": ["administrator"]
        },
        {
          "type": "update_all",
          "roles": ["administrator"]
        },
        {
          "type": "delete_all",
          "roles": ["administrator"]
        },
        {
          "type": "create_own",
          "roles": []
        },
        {
          "type": "read_own",
          "roles": []
        },
        {
          "type": "update_own",
          "roles": []
        },
        {
          "type": "delete_own",
          "roles": []
        }
      ],
      "access": [
        {
          "type": "read_all",
          "roles": [
            "anonymous",
            "authenticated",
            "administrator"
          ]
        }
      ],
      "components": [
        {
          "type": "email",
          "persistent": true,
          "unique": true,
          "required": true,
          "protected": false,
          "defaultValue": "",
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your email address",
          "key": "email",
          "label": "Email",
          "inputType": "email",
          "tableView": true,
          "input": true
        },
        {
          "type": "password",
          "persistent": true,
          "protected": true,
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your password.",
          "key": "password",
          "label": "Password",
          "inputType": "password",
          "tableView": false,
          "input": true
        },
        {
          "type": "button",
          "theme": "primary",
          "disableOnInvalid": true,
          "action": "submit",
          "block": false,
          "rightIcon": "",
          "leftIcon": "",
          "size": "md",
          "key": "submit",
          "tableView": false,
          "label": "Submit",
          "input": true
        }
      ]
    },
    "admin": {
      "title": "Admin",
      "type": "resource",
      "name": "admin",
      "path": "admin",
      "pdfComponents": [],
      "tags": [],
      "submissionAccess": [
        {
          "type": "create_all",
          "roles": ["administrator"]
        },
        {
          "type": "read_all",
          "roles": ["administrator"]
        },
        {
          "type": "update_all",
          "roles": ["administrator"]
        },
        {
          "type": "delete_all",
          "roles": ["administrator"]
        },
        {
          "type": "create_own",
          "roles": []
        },
        {
          "type": "read_own",
          "roles": []
        },
        {
          "type": "update_own",
          "roles": []
        },
        {
          "type": "delete_own",
          "roles": []
        }
      ],
      "access": [
        {
          "type": "read_all",
          "roles": [
            "anonymous",
            "authenticated",
            "administrator"
          ]
        }
      ],
      "components": [
        {
          "type": "email",
          "persistent": true,
          "unique": true,
          "required": true,
          "protected": false,
          "defaultValue": "",
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your email address",
          "key": "email",
          "label": "Email",
          "inputType": "email",
          "tableView": true,
          "input": true
        },
        {
          "type": "password",
          "persistent": true,
          "protected": true,
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your password.",
          "key": "password",
          "label": "Password",
          "inputType": "password",
          "tableView": false,
          "input": true
        },
        {
          "type": "button",
          "theme": "primary",
          "disableOnInvalid": true,
          "action": "submit",
          "block": false,
          "rightIcon": "",
          "leftIcon": "",
          "size": "md",
          "key": "submit",
          "tableView": false,
          "label": "Submit",
          "input": true
        }
      ]
    }
  },
  "forms": {
    "userLogin": {
      "title": "User Login",
      "type": "form",
      "name": "userLogin",
      "path": "user/login",
      "pdfComponents": [],
      "tags": [],
      "access": [
        {
          "type": "read_all",
          "roles": ["anonymous"]
        }
      ],
      "submissionAccess": [
        {
          "type" : "create_own",
          "roles" : ["anonymous"]
        }
      ],
      "components": [
        {
          "type": "email",
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your email address",
          "key": "email",
          "lockKey": true,
          "label": "Email",
          "labelPosition": "left-left",
          "inputType": "email",
          "tableView": true,
          "input": true
        },
        {
          "type": "password",
          "persistent": true,
          "protected": true,
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your password.",
          "key": "password",
          "lockKey": true,
          "label": "Password",
          "labelPosition": "left-left",
          "inputType": "password",
          "tableView": false,
          "input": true
        },
        {
          "type": "button",
          "theme": "primary",
          "disableOnInvalid": true,
          "action": "submit",
          "block": true,
          "rightIcon": "",
          "leftIcon": "",
          "size": "md",
          "key": "submit",
          "tableView": false,
          "label": "Submit",
          "input": true
        }
      ]
    },
    "userRegister": {
      "title": "User Register",
      "name": "userRegister",
      "path": "user/register",
      "pdfComponents": [],
      "type": "form",
      "tags": [],
      "access": [
        {
          "type": "read_all",
          "roles": ["anonymous"]
        }
      ],
      "submissionAccess": [
        {
          "type": "create_own",
          "roles": ["anonymous"]
        }
      ],
      "components": [
        {
          "type": "email",
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your email address",
          "key": "email",
          "lockKey": true,
          "label": "Email",
          "inputType": "email",
          "tableView": true,
          "input": true
        },
        {
          "type": "password",
          "persistent": true,
          "protected": true,
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your password.",
          "key": "password",
          "lockKey": true,
          "label": "Password",
          "inputType": "password",
          "tableView": false,
          "input": true
        },
        {
          "theme": "primary",
          "disableOnInvalid": true,
          "action": "submit",
          "block": false,
          "rightIcon": "",
          "leftIcon": "",
          "size": "md",
          "key": "submit",
          "label": "Submit",
          "input": true,
          "type": "button"
        }
      ]
    },
    "adminLogin": {
      "title": "Admin Login",
      "type": "form",
      "name": "adminLogin",
      "path": "admin/login",
      "pdfComponents": [],
      "tags": [],
      "access": [
        {
          "type": "read_all",
          "roles": ["anonymous"]
        }
      ],
      "submissionAccess": [
        {
          "type" : "create_own",
          "roles" : ["anonymous"]
        }
      ],
      "components": [
        {
          "type": "email",
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your email address",
          "key": "email",
          "lockKey": true,
          "label": "Email",
          "labelPosition": "left-left",
          "inputType": "email",
          "tableView": true,
          "input": true
        },
        {
          "type": "password",
          "persistent": true,
          "protected": true,
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your password.",
          "key": "password",
          "lockKey": true,
          "label": "Password",
          "labelPosition": "left-left",
          "inputType": "password",
          "tableView": false,
          "input": true
        },
        {
          "type": "button",
          "theme": "primary",
          "disableOnInvalid": true,
          "action": "submit",
          "block": true,
          "rightIcon": "",
          "leftIcon": "",
          "size": "md",
          "key": "submit",
          "tableView": false,
          "label": "Submit",
          "saveOnEnter": true,
          "input": true
        }
      ]
    }
  },
  "actions": {
    "user:role": {
      "title": "Role Assignment",
      "name": "role",
      "priority": 1,
      "handler": ["after"],
      "method": ["create"],
      "form": "user",
      "settings": {
        "association": "new",
        "type": "add",
        "role": "authenticated"
      }
    },
    "user:save": {
      "title": "Save Submission",
      "name": "save",
      "form": "user",
      "handler": ["before"],
      "method": ["create", "update"],
      "priority": 10
    },
    "userLogin:login": {
      "name": "login",
      "title": "Login",
      "form": "userLogin",
      "priority": 2,
      "method": ["create"],
      "handler": ["before"],
      "settings": {
        "resources": ["user"],
        "username": "email",
        "password": "password",
        "allowedAttempts": 5,
        "attemptWindow": 30,
        "lockWait": 1800
      }
    },
    "userRegister:save": {
      "title": "Save Submission",
      "name": "save",
      "form": "userRegister",
      "handler": ["before"],
      "method": ["create", "update"],
      "priority": 11,
      "settings": {
        "resource": "user",
        "fields": {
          "email": "email",
          "password": "password"
        }
      }
    },
    "userRegister:login": {
      "name": "login",
      "title": "Login",
      "form": "userRegister",
      "priority": 2,
      "method": ["create"],
      "handler": ["before"],
      "settings": {
        "resources": ["user"],
        "username": "email",
        "password": "password"
      }
    },
    "admin:role": {
      "title": "Role Assignment",
      "name": "role",
      "priority": 1,
      "handler": ["after"],
      "method": ["create"],
      "form": "admin",
      "settings": {
        "association": "new",
        "type": "add",
        "role": "administrator"
      }
    },
    "admin:save": {
      "title": "Save Submission",
      "name": "save",
      "form": "admin",
      "handler": ["before"],
      "method": ["create", "update"],
      "priority": 10
    },
    "adminLogin:login": {
      "name": "login",
      "title": "Login",
      "form": "adminLogin",
      "priority": 2,
      "method": ["create"],
      "handler": ["before"],
      "settings": {
        "resources": ["admin"],
        "username": "email",
        "password": "password",
        "allowedAttempts": 5,
        "attemptWindow": 30,
        "lockWait": 1800
      }
    }
  },
  "access": [
    {
      "type": "create_all",
      "roles": [
        "administrator"
      ]
    },
    {
      "type": "read_all",
      "roles": [
        "administrator"
      ]
    },
    {
      "type": "update_all",
      "roles": [
        "administrator"
      ]
    },
    {
      "type": "delete_all",
      "roles": [
        "administrator"
      ]
    }
  ]
}