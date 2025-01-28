app.controller('FormIOController', function ($scope, $rootScope, formioComponents, $timeout, $state, $log, $window, $route) {
  $rootScope.title = "Form IO";
  $rootScope.formSchema = null;
  $rootScope.formRendered = false;
  $rootScope.formInstance = null;
  $scope.savedForms = [];
  $scope.selectedLanguage = 'en';
  $scope.builderOptions = builderOptions;
  var loadSavedForms = () => {
    var forms = $window.localStorage.getItem('savedForms');
    if (forms) {
      try {
        $scope.savedForms = JSON.parse(forms);
      } catch (error) { }
    }
  };

  var alignToElementBoundaries = (currentY, canvasHeight) => {
    var elements = document.querySelectorAll("#preview-data > *");
    for (var element of elements) {
      var elementOffset = element.offsetTop * 2;
      var elementHeight = element.offsetHeight * 2;
      if (elementOffset >= currentY && elementOffset + elementHeight <= canvasHeight) {
        return elementOffset + elementHeight;
      }
    }
    return currentY;
  };
  $scope.initializeFormBuilderSchema = {
    components: [
      {
        type: 'panel',
        label: 'Section',
        title: 'Section',
        key: 'section',
        components: []
      }
    ]
  };
  var initializeFormBuilder = () => {
    // Formio.Components.components.textfield.editForm = function() {
    //   const form = editForm();
    //   const tabs = Formio.Utils.getComponent(form.components, 'tabs', true);
    //   tabs.components.push({
    //     key: 'custom',
    //     label: 'Custom Tab',
    //     components: [
    //       // Add your custom components here
    //     ]
    //   });
    //   return form;
    // };
    
    Formio.builder(document.getElementById('builder'), $scope.initializeFormBuilderSchema, $scope.builderOptions)
      .then((builder) => {
        $rootScope.formBuilder = builder;
        $scope.form = builder;
        if ($scope?.selectedForm?.data) {
          if (builder && builder.submission) {
            builder.submission = { data: $scope.selectedForm.data };
          }
        }
        $scope.onReady();
        builder.on('change', (component) => {
          $rootScope.formSchema = component;
          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
          if (!$scope?.initializeFormBuilderSchema?.components || $scope.initializeFormBuilderSchema.components.length < 1 && $scope?.initializeFormBuilderSchema?.components.filter(obj => obj.type !== "panel")) {
            $scope.initializeFormBuilderSchema = {
              components: [{
                type: 'panel',
                label: 'Section',
                title: 'Section',
                key: `section-${Math.random().toFixed(4)}`,
                components: [],
                hasRemove: false,
                hasEdit: false
              }]
            };
            initializeFormBuilder();
          }
          if (!$scope?.initializeFormBuilderSchema?.components || $scope.initializeFormBuilderSchema.components.length > 1) {
            var filteredObjects = $scope?.initializeFormBuilderSchema?.components.filter(obj => obj.type === "panel");
          }
        });

        builder.on('addComponent', function (component, parent, element, path) {
          if (component.type === 'columns' && parent.component && parent.component.type === 'columns'
            || component.type === 'panel' && parent.component && parent.component.type === 'panel'
            || component.type === 'columns' && parent.component && parent.component.type === 'datagrid'
          ) {
            var cancelButton = angular.element(document.querySelector('[ref="cancelButton"]'));
            if (cancelButton) {
              cancelButton.click();
            }
            return false;
          }
        });
        // builder.on('saveComponent', function() {
        //   console.log(builder.schema);
        // });
        builder.on('saveComponent', (schema) => { console.log("Form Schema", builder.schema);$rootScope.formBuilderComponentSchema = schema; 
          // console.log($rootScope.formBuilderComponentSchema);console.log($scope.form)
         });
        builder.on('onDrop', function (event, component) { });
        builder.on('removeComponent', function (event, component) { });
        builder.on('editComponent', function (event, component) { });
        builder.on('updateComponent', function (event, component) { });
        builder.on('saveDraft', function (event, component) { });
        builder.on('resetDraft', function (event, component) { });
        builder.on('cancelComponent', function (event, component) { });
        builder.on('submit', function (event, component) { });
        builder.on('error', function (event, component) { });
        builder.on('dragComponent', function (event, component) { });
        builder.on('dropComponent', function (event, component) { });
        // console.log('Builder instance:', builder);
        // console.log('Available keys in builder:', Object.keys(builder));
        // console.log('Formio instance:', Formio);
        // console.log('$Scope', $scope);
        // console.log('$rootScope', $rootScope);
        let keys = Object.entries($scope.form.schemas)
        .filter(([_, value]) => value.hasOwnProperty('key'))
        .map(([key, value]) => value.key);

        let listOfComponents = keys
        .filter(component => component !== "")
        .map(component => component.toLowerCase())
        .sort();

      // Iterate through components to configure the form
      let v = 1;
      listOfComponents.forEach(component => {
        console.log(v+1);
        // Initialize the component's form properties if not already done
        if (!$scope.builderOptions.editForm[component]) {
          $scope.builderOptions.editForm[component] = [
            { key: 'api', ignore: true },
            { key: 'layout', ignore: true },
            { key: 'logic', ignore: true },
            { key: 'display', ignore: true },
            { key: 'data', ignore: true },
            { key: 'validation', ignore: true },
            { key: 'conditional', ignore: true }
          ];
        }
        // Add a new panel for description
        $scope.builderOptions.editForm[component].push({
          type: 'panel',
          key: `${component}-description`, // Ensure the key is unique
          label: 'Description',
          weight: 10,
          components: [
            {
              type: 'content',
              key: 'description',
              label: 'Description',
              html: `<p style="font-size: 14px; line-height: 1.5; color: #333;">
                        This is a description for the custom tab. Use this section to provide users with helpful information about the panel's purpose and how to configure it.
                    </p>`
            }
          ]
        });
        // Add a visibility panel
        $scope.builderOptions.editForm[component].push({
          type: 'panel',
          key: `${component}-visibility`, // Ensure the key is unique
          label: 'Visibility',
          weight: 10,
          components: [
            {
              type: 'content',
              key: 'visibility-description',
              label: 'Description',
              html: `<custom-message></custom-message>`
            }
          ]
        });
      });

        // console.log($scope.builderOptions);
      })
      .catch((error) => { });
  };
  loadSavedForms();
  initializeFormBuilder();
  $scope.changeLanguage = function (language) {
    $scope.builderOptions.language = language;
    $scope.selectedLanguage = language;
    initializeFormBuilder();
  };

  $rootScope.resetForm = function () {
    initializeFormBuilder();
  };

  $rootScope.resetPreview = function () {
    document.getElementById('preview').innerHTML = '';
    $rootScope.formRendered = false;
  };

  $scope.updateForm = () => {
    var formData = $scope.form.schema;
    if (formData && Object.keys(formData).length > 0) {
      var formName = prompt('Enter the name of the form to update');
      if (formName) {
        var formObject = $scope.savedForms.find(form => form.name === formName);
        if (formObject) {
          formObject.schema = formData;
          formObject.data = $rootScope.formInstance ? $rootScope.formInstance.submission.data : {};
          $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
        } else { }
      }
    }
  };

  $rootScope.exportPDF = function () {
    html2canvas(document.querySelector("#preview-data"), {
      scale: 2,
      useCORS: true
    }).then(canvas => {
      var pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      var pageWidth = pdf.internal.pageSize.getWidth();
      var pageHeight = pdf.internal.pageSize.getHeight();
      var margin = 10;
      var imgWidth = pageWidth - 2 * margin;
      var contentHeightPerPage = (canvas.width / imgWidth) * (pageHeight - 2 * margin);
      var currentY = 0;
      var canvasHeight = canvas.height;
      while (currentY < canvasHeight) {
        var nextY = Math.min(currentY + contentHeightPerPage, canvasHeight);
        var alignedY = alignToElementBoundaries(nextY, canvasHeight);
        var canvasSection = document.createElement('canvas');
        canvasSection.width = canvas.width;
        canvasSection.height = alignedY - currentY;
        var sectionCtx = canvasSection.getContext('2d');
        sectionCtx.drawImage(
          canvas,
          0, currentY,
          canvas.width, alignedY - currentY,
          0, 0,
          canvas.width, alignedY - currentY
        );
        var dataURL = canvasSection.toDataURL("image/jpeg", 1.0);
        if (currentY > 0) {
          pdf.addPage();
        }
        pdf.addImage(dataURL, 'JPEG', margin, margin, imgWidth, (imgWidth * canvasSection.height) / canvas.width);
        currentY = alignedY;
      }

      pdf.save('form.pdf');
    }).catch(err => { });
  };

  $scope.deleteForm = () => {
    if ($scope.selectedForm) {
      var index = $scope.savedForms.indexOf($scope.selectedForm);
      if (index > -1) {
        $scope.savedForms.splice(index, 1);
        $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
        $scope.selectedForm = null;
        $state.reload()
      }
    }
  };

  $scope.getFormData = () => { };

  $scope.externalSubmit = () => {
    if ($rootScope.formInstance) {
      $rootScope.formInstance.submit()
        .then((submission) => { })
        .catch((error) => { });
    }
  };

  $scope.saveFormLocalStorage = () => {
    var formData = $scope.form.schema;
    if (formData && Object.keys(formData).length > 0) {
      var formName = prompt('Enter a name for the form');
      if (formName) {
        var formObject = {
          name: formName,
          schema: formData,
          data: $rootScope.formInstance ? $rootScope.formInstance.submission.data : {}
        };
        $scope.savedForms.push(formObject);
        $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
      }
    }
  };

  $scope.loadForm = () => {
    if ($scope.selectedForm) {
      Formio.builder(document.getElementById('builder'), $scope.selectedForm.schema)
        .then((builder) => {
          $rootScope.formBuilder = builder;
          $rootScope.formSchema = $scope.selectedForm.schema;
          $scope.form = builder;
          if ($scope?.selectedForm?.data) {
            if (builder && builder.submission) {
              builder.submission = { data: $scope.selectedForm.data };
            }
          }
        })
        .catch((error) => { });
    }
  };

  var initializePreview = () => {
    if ($rootScope.formSchema) {
      var previewElement = document.getElementById('preview-data');
      previewElement.innerHTML = '';
      Formio.createForm(previewElement, $rootScope.formSchema)
        .then((form) => {
          $rootScope.formInstance = form;
          $rootScope.formRendered = true;
          if ($scope?.selectedForm?.data) {
            form.submission.data = angular.copy($scope.selectedForm.data);
            console.log('Form Data', form.submission.data);
          }
          if ($scope?.selectedForm?.data) {
            if (form && form.submission) {
              form.submission = { data: $scope.selectedForm.data };
            }
          }
        }).catch((error) => { });
    }
  };

  $scope.previewForm = () => {
    if ($rootScope.formSchema) {
      initializePreview();
    }
  };

  $scope.preGeneratedFormWithFilledData = () => {
    var schema = {
      components: [
        { label: 'Email', key: 'email', type: 'textfield', input: true },
        { label: 'Password', key: 'password', type: 'password', input: true }
      ]
    };
    var data = { email: 'user@example.com', password: '12345678' };
    var previewElement = document.getElementById('preview-data');
    previewElement.innerHTML = '';
    Formio.createForm(previewElement, schema, { submission: { data } })
      .then((form) => { form.submission = { data }; }).catch((error) => { });
  };

  $scope.GetListOfFormSchema = () => { };

  $scope.exportPDFFromJson = () => {
    var formJson = {
      "display": "form",
      "components": [
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
    };
    var pdf = new jsPDF();
    var yPosition = 10;
    [formJson.components[0]].forEach((component) => {
      if (yPosition > 280) {
        pdf.addPage();
        yPosition = 10;
      }
      var position;
      if (component.type !== 'button') {
        if (component.type === 'panel') {
          position = yPosition;
          component.components.forEach(element => {
            if (element.type !== 'columns') {
              position += 10;
              pdf.setFontSize(12);
              pdf.text(element.label, 7, position + 6);
              position += 10;
              pdf.setDrawColor(0);
              pdf.setLineWidth(0.1);
              pdf.rect(7, position, 190, 10)
            }
            if (element.type === 'columns') {
              var columnWidth = Math.round(200 / element.columns.length)

              var xIndex = 7;
              position += 10;
              element.columns.forEach((column, index) => {
                if (index > 0) {
                  xIndex += columnWidth
                }
                column.components.forEach((item) => {
                  if (item.type === 'starrating') {
                    pdf.setFontSize(12);
                    pdf.text(`${item.label}: 4/5`, xIndex, position);
                  }
                })
              })
            }
          })
        }

        pdf.setDrawColor(0);
        pdf.setLineWidth(0.1);
        pdf.setFillColor(211, 211, 211);
        pdf.rect(5, yPosition, 200, 10, 'F')
        pdf.setFontSize(12);
        pdf.text(component.title, 7, yPosition + 6);
        pdf.setDrawColor(0);
        pdf.setLineWidth(0.1);
        pdf.rect(5, yPosition, 200, position + 15)
        // yPosition += 105;
      }
    });
    pdf.save('Form.pdf');
  };

  $scope.addSection = function ($event) {
    if ($scope?.initializeFormBuilderSchema?.components) {
      $scope?.initializeFormBuilderSchema?.components.push({
        type: 'panel',
        label: 'Section',
        title: 'Section',
        key: `section-${Math.random().toFixed(4)}`,
        components: []
      })
    };
    initializeFormBuilder();
  };
  $scope.addDataGrid = function ($event) {
    if ($scope?.initializeFormBuilderSchema?.components) {
      $scope?.initializeFormBuilderSchema?.components.push({
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
        "key": `datagrid-${Math.random().toFixed(4)}`,
        "type": "datagrid",
        "input": true,
        "components": []
      })
    };
    initializeFormBuilder();
  };

  $scope.onReady = function () {
    var builderInstance = $rootScope.formBuilder;

    builderInstance.on('addComponent', function (component) {
      var element = document.getElementById(component.id)

      if (component.type === 'panel' && (element.closest('.formio-component-panel') || element.closest('.formio-component-datagrid'))) {
        var findComponent = $scope.initializeFormBuilderSchema.components.find(formElement => formElement.id === component.id)
        if (!findComponent) {
          $scope?.initializeFormBuilderSchema?.components.forEach(component => {
            if (component.type == 'panel' || component.type == 'datagrid') {
              component.components = component.components.filter(item => item.type !== 'panel' && item.type !== 'datagrid')
              component.components.forEach(element => {
                if (['columns', 'dataGrid'].includes(element.type)) {

                }

              })
            }
          })
          $scope.initializeFormBuilderSchema.components.push(component);
          initializeFormBuilder();
        }
        return;
      }
      if (['datagrid', 'panel'].includes(component.type) && element.closest('.formio-component-datagrid')) {
        var findComponent = $scope.initializeFormBuilderSchema.components.find(formElement => formElement.id === component.id)
        if (!findComponent) {
          $scope?.initializeFormBuilderSchema?.components.forEach(component => {
            if (component.type == 'panel' || component.type == 'datagrid') {
              component.components = component.components.filter(item => item.type !== 'panel' && item.type !== 'datagrid')
              component.components.forEach(element => {
                if (['columns', 'dataGrid'].includes(element.type)) {

                }

              })
            }
          })
          $scope.initializeFormBuilderSchema.components.push(component);
          initializeFormBuilder();
        }

        return;
      }
      var isValidZone = element && (element.closest('.formio-component-panel') || element.closest('.formio-component-datagrid'));
      if (!isValidZone && component.type !== 'datagrid') {
        var cancelButton = angular.element(document.querySelector('[ref="cancelButton"]'));
        if (cancelButton) {
          cancelButton.click();
        }
        $scope.initializeFormBuilderSchema.components = $scope?.initializeFormBuilderSchema?.components.filter(component => component.type == 'panel' || component.type == 'datagrid')
        initializeFormBuilder();
      }
    });
  };
});
