app.controller('FormIOController', function (
    $scope,
    $rootScope,
    formioComponents,
    $timeout,
    $state,
    $log,
    $window,
    $route
) {
    // Initialize $rootScope variables
    $rootScope.title = "Form IO";
    $rootScope.formSchema = null;
    $rootScope.formRendered = false;
    $rootScope.formInstance = null;

    // Initialize $scope variables
    $scope.savedForms = [];
    $scope.selectedLanguage = 'en'; // Default language

    // --- Helper Functions ---

    // Load saved forms from local storage
    const loadSavedForms = () => {
        const forms = $window.localStorage.getItem('savedForms');
        if (forms) {
            try {
                $scope.savedForms = JSON.parse(forms);
                console.log("Loaded saved forms:", $scope.savedForms);
            } catch (error) {
                console.error("Error parsing saved forms:", error);
                $scope.savedForms = [];
            }
        }
    };

    // Align elements within boundaries for PDF export
    const alignToElementBoundaries = (currentY, canvasHeight) => {
        const elements = document.querySelectorAll("#preview-data > *");
        for (let element of elements) {
            const elementOffset = element.offsetTop * 2; // Scale-adjusted offset
            const elementHeight = element.offsetHeight * 2; // Scale-adjusted height
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

    // Initialize form builder
    const initializeFormBuilder = () => {
        Formio.builder(document.getElementById('builder'), $scope.initializeFormBuilderSchema, builderOptions)
            .then((builder) => {
                $rootScope.formBuilder = builder; // Store the builder instance
                $scope.form = builder; // Store builder in scope

                if ($scope?.selectedForm?.data) {
                    if (builder && builder.submission) {
                        builder.submission = { data: $scope.selectedForm.data };
                        console.log("Loaded data into the builder instance:", builder.instance.submission.data);
                    }
                }

                // Add event listeners for form builder actions
                builder.on('change', (event, schema) => {
                    $rootScope.formSchema = schema;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                    console.log('Change Detected...');
                    console.log($scope?.initializeFormBuilderSchema?.components);
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
                        console.log($scope?.initializeFormBuilderSchema?.components);
                        var filteredObjects = $scope?.initializeFormBuilderSchema?.components.filter(obj => obj.type === "panel");
                        console.log(filteredObjects);
                        console.log($scope?.initializeFormBuilderSchema?.components);
                    }
                });

                builder.on('addComponent', (component) => {
                    builder.emit('change', builder.schema);
                    $rootScope.formBuilderComponent = component;
                });

                builder.on('saveComponent', (schema) => {
                    $rootScope.formBuilderComponentSchema = schema;
                });

                builder.on('change', (schema) => {
                    $rootScope.formSchema = schema;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                });

                builder.on('removeComponent', (component) => {
                    console.log('Component removed:', component);
                });

                builder.on('editComponent', (component) => {
                    console.log('Editing component:', component);
                });

                builder.on('updateComponent', (component) => {
                    console.log('Component updated:', component);
                });

                builder.on('saveDraft', () => {
                    console.log('Draft saved');
                });

                builder.on('resetDraft', () => {
                    console.log('Draft reset');
                });

                builder.on('cancelComponent', () => {
                    console.log('Component editing canceled');
                });

                builder.on('submit', (submission) => {
                    console.log('Form submitted:', submission);
                });

                builder.on('error', (error) => {
                    console.log('Error occurred:', error);
                });
                // Handle dragging a component
                builder.on('dragComponent', function (component) {
                    console.log('Dragging Component:', component);
                });

                // Handle dropping a component
                builder.on('dropComponent', function (component) {
                    console.log('Component Dropped:', component);

                    // Update the form schema after the drop
                    builder.emit('change', builder.schema);
                    console.log('Schema Updated After Drop:', builder.schema);
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                });

            })
            .catch((error) => {
                console.error("Error initializing form builder: ", error);
            });
    };

    // Initialize form builder on load
    loadSavedForms();
    initializeFormBuilder();

    // --- Scope Functions ---

    // Change language and update builder
    $scope.changeLanguage = function (language) {
        builderOptions.language = language;
        $scope.selectedLanguage = language;
        initializeFormBuilder();
    };

    // Reset form builder to its initial state
    $rootScope.resetForm = function () {
        initializeFormBuilder();
    };

    // Reset the form preview
    $rootScope.resetPreview = function () {
        document.getElementById('preview').innerHTML = '';
        $rootScope.formRendered = false;
    };

    // Update an existing form
    $scope.updateForm = () => {
        const formData = $scope.form.schema;
        if (formData && Object.keys(formData).length > 0) {
            const formName = prompt('Enter the name of the form to update');
            if (formName) {
                const formObject = $scope.savedForms.find(form => form.name === formName);
                if (formObject) {
                    formObject.schema = formData;
                    formObject.data = $rootScope.formInstance ? $rootScope.formInstance.submission.data : {};
                    $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
                    console.log("Updated form:", formObject);
                    alert("Form updated successfully!");
                } else {
                    alert('Form not found!');
                }
            }
        }
    };

    // Export form preview to PDF
    $rootScope.exportPDF = function () {
        html2canvas(document.querySelector("#preview-data"), {
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const imgWidth = pageWidth - 2 * margin;
            const contentHeightPerPage = (canvas.width / imgWidth) * (pageHeight - 2 * margin);

            let currentY = 0;
            const canvasHeight = canvas.height;

            while (currentY < canvasHeight) {
                const nextY = Math.min(currentY + contentHeightPerPage, canvasHeight);
                const alignedY = alignToElementBoundaries(nextY, canvasHeight);

                const canvasSection = document.createElement('canvas');
                canvasSection.width = canvas.width;
                canvasSection.height = alignedY - currentY;
                const sectionCtx = canvasSection.getContext('2d');

                sectionCtx.drawImage(
                    canvas,
                    0, currentY,
                    canvas.width, alignedY - currentY,
                    0, 0,
                    canvas.width, alignedY - currentY
                );

                const dataURL = canvasSection.toDataURL("image/jpeg", 1.0);

                if (currentY > 0) {
                    pdf.addPage();
                }
                pdf.addImage(dataURL, 'JPEG', margin, margin, imgWidth, (imgWidth * canvasSection.height) / canvas.width);

                currentY = alignedY;
            }

            pdf.save('form.pdf');
        }).catch(err => {
            console.error("Error exporting to PDF: ", err);
        });
    };

    // Delete a saved form
    $scope.deleteForm = () => {
        if ($scope.selectedForm) {
            const index = $scope.savedForms.indexOf($scope.selectedForm);
            if (index > -1) {
                $scope.savedForms.splice(index, 1);
                $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
                console.log("Deleted form:", $scope.selectedForm);
                alert('Form deleted!');
                $scope.selectedForm = null;
                $state.reload()
            }
        }
    };

    // Get current form schema
    $scope.getFormData = () => {
        console.log("Current Form Schema:", $rootScope.formSchema);
    };

    // External form submission
    $scope.externalSubmit = () => {
        if ($rootScope.formInstance) {
            $rootScope.formInstance.submit()
                .then((submission) => console.log("Submission successful:", submission))
                .catch((error) => console.error("Submission error: ", error));
        }
    };

    // Save form to local storage
    $scope.saveFormLocalStorage = () => {
        const formData = $scope.form.schema;
        if (formData && Object.keys(formData).length > 0) {
            const formName = prompt('Enter a name for the form');
            if (formName) {
                const formObject = {
                    name: formName,
                    schema: formData,
                    data: $rootScope.formInstance ? $rootScope.formInstance.submission.data : {}
                };
                $scope.savedForms.push(formObject);
                $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
                console.log("Saved new form:", formObject);
                alert("Form saved successfully!");
            }
        }
    };

    // Load selected form for editing
    $scope.loadForm = () => {
        if ($scope.selectedForm) {
            Formio.builder(document.getElementById('builder'), $scope.selectedForm.schema)
                .then((builder) => {
                    console.log("Loaded selected form for editing:", builder);
                    $rootScope.formBuilder = builder;
                    $rootScope.formSchema = $scope.selectedForm.schema;
                    $scope.form = builder;
                    if ($scope?.selectedForm?.data) {
                        if (builder && builder.submission) {
                            builder.submission = { data: $scope.selectedForm.data };
                            console.log("Loaded data into the builder instance:", builder.submission);
                        }
                    }
                })
                .catch((error) => console.error("Error loading form: ", error));
        }
    };

    // Preview the current form schema
    const initializePreview = () => {
        if ($rootScope.formSchema) {
            const previewElement = document.getElementById('preview-data');
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
                            console.log("Loaded data into the builder instance:", form.submission);
                        }
                    }
                })
                .catch((error) => console.error("Error previewing form: ", error));
        }
    };

    $scope.previewForm = () => {
        if ($rootScope.formSchema) {
            initializePreview();
        }
    };

    // Generate pre-filled form preview
    $scope.preGeneratedFormWithFilledData = () => {
        const schema = {
            components: [
                { label: 'Email', key: 'email', type: 'textfield', input: true },
                { label: 'Password', key: 'password', type: 'password', input: true }
            ]
        };

        const data = { email: 'user@example.com', password: '12345678' };
        const previewElement = document.getElementById('preview-data');
        previewElement.innerHTML = '';

        Formio.createForm(previewElement, schema, { submission: { data } })
            .then((form) => {
                form.submission = { data };
                console.log("Pre-generated filled data for preview:", data);
            })
            .catch((error) => console.error("Error rendering pre-generated form: ", error));
    };

    $scope.GetListOfFormSchema = () => {
        console.log("Current Form Schema:", JSON.stringify($scope.form.schema));
    };

    $scope.exportPDFFromJson = () => {
        // Sample Form JSON from Form.io
        const formJson = {
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

        const pdf = new jsPDF(); // Create a new jsPDF instance
        let yPosition = 10; // Initial Y position for content

        // Add Form Title
        pdf.setFontSize(16);
        pdf.text("Form Export", 10, yPosition);
        yPosition += 10;

        // Iterate Over Components in JSON
        formJson.components.forEach((component) => {
            if (yPosition > 280) { // Assuming A4 page height is 297mm
                pdf.addPage();
                yPosition = 10; // Reset Y position for the new page
            }
            if (component.type !== 'button') {
                // Add Label
                pdf.setFontSize(12);
                pdf.text(component.label, 10, yPosition);
                yPosition += 2;

                // Add Placeholder for Field
                pdf.setDrawColor(0); // Black border
                pdf.setLineWidth(0.1);
                pdf.rect(10, yPosition, 100, 7); // Placeholder box
                yPosition += 15;
            }
        });

        // Save the PDF
        pdf.save('Form.pdf');
    }
    $scope.addSection = function ($event) {
        console.log($event);
        if ($scope?.initializeFormBuilderSchema?.components) {
            console.log($scope?.initializeFormBuilderSchema);
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
});
