app.controller('FormIOController', function ($scope, $rootScope, formioComponents, $timeout, $state, $log, $window, $route) {
    $rootScope.title = "Form IO";
    $rootScope.formSchema = null;
    $rootScope.formRendered = false;
    $rootScope.formInstance = null;
    $scope.savedForms = [];
    $scope.selectedLanguage = 'en';

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
        Formio.builder(document.getElementById('builder'), $scope.initializeFormBuilderSchema, builderOptions)
            .then((builder) => {
                $rootScope.formBuilder = builder;
                $scope.form = builder;
                if ($scope?.selectedForm?.data) {
                    if (builder && builder.submission) {
                        builder.submission = { data: $scope.selectedForm.data };
                    }
                }
                $scope.onReady()
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
                                key: 'section',
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
                    if (component.type === 'columns' && parent.component && parent.component.type === 'columns') {
                        var cancelButton = angular.element(document.querySelector('[ref="cancelButton"]'));
                        if (cancelButton) {
                            cancelButton.click();
                        }
                        return false;
                    }
                    if (component.type === 'panel' && parent.component && parent.component.type === 'panel') {
                        var cancelButton = angular.element(document.querySelector('[ref="cancelButton"]'));
                        if (cancelButton) {
                            cancelButton.click();
                        }
                        return false;
                    }
                });
                builder.on('saveComponent', (schema) => { $rootScope.formBuilderComponentSchema = schema; });
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
            })
            .catch((error) => { });
    };

    loadSavedForms();
    initializeFormBuilder();

    $scope.changeLanguage = function (language) {
        builderOptions.language = language;
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
                    "label": "Text Field",
                    "key": "textField",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Email",
                    "key": "email",
                    "type": "email",
                    "input": true
                },
                {
                    "label": "Date",
                    "key": "date",
                    "type": "datetime",
                    "input": true
                },
                {
                    "label": "Submit",
                    "key": "submit",
                    "type": "button",
                    "input": true
                }
            ]
        };
        var pdf = new jsPDF();
        var yPosition = 10;
        pdf.setFontSize(16);
        pdf.text("Form Export", 10, yPosition);
        yPosition += 10;
        formJson.components.forEach((component) => {
            if (yPosition > 280) {
                pdf.addPage();
                yPosition = 10;
            }
            if (component.type !== 'button') {
                pdf.setFontSize(12);
                pdf.text(component.label, 10, yPosition);
                yPosition += 2;
                pdf.setDrawColor(0);
                pdf.setLineWidth(0.1);
                pdf.rect(10, yPosition, 100, 7);
                yPosition += 15;
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
                key: 'section',
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
                "key": "dataGrid",
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
            var isValidZone = element && element.closest('.formio-component-panel');
            if (!isValidZone) {
                var cancelButton = angular.element(document.querySelector('[ref="cancelButton"]'));
                if (cancelButton) {
                    cancelButton.click();
                }
                $scope.initializeFormBuilderSchema.components = $scope?.initializeFormBuilderSchema?.components.filter(component => component.type == 'panel')

                initializeFormBuilder();
            }
        });
    };

});
