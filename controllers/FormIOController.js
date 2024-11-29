app.controller('FormIOController', function ($scope, $rootScope, formioComponents, $timeout, $state, $log) {
    $rootScope.title = "Form IO";
    $rootScope.formSchema = {};
    $rootScope.formRendered = false;
    $rootScope.formInstance = null;
    $rootScope.message = "Learn more About Us!";
    const TextFieldComponent = Formio.Components.components.textfield;

    // Initialize Formio Builder
    Formio.builder(document.getElementById('builder'), {}, builderOptions).then(function (builder) {
        builder.on('addComponent', (component) => {
            builder.emit('change', builder.schema);
        });

        builder.on('saveComponent', function(schema) {
            // Log the schema on component save (if needed)
            // $log.debug('Component saved:', schema);
        });

        builder.on('change', function (schema) {
            // Log schema changes
            // $log.debug('Form Schema Changed:', schema);
            $rootScope.formSchema = schema;
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        });
    }).catch(function (error) {
        // $log.error("Error initializing Formio builder:", error);
    });

    // Preview the form
    $rootScope.previewForm = function () {
        if (!$rootScope.formSchema || !$rootScope.formSchema.components || $rootScope.formSchema.components.length === 0) {
            // $log.warn('No components to preview.');
            return;
        }

        var previewElement = document.getElementById('preview');
        previewElement.innerHTML = '';

        Formio.createForm(previewElement, $rootScope.formSchema)
            .then(function (form) {
                $rootScope.formInstance = form;
                $rootScope.formRendered = true;
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            })
            .catch(function (error) {
                // $log.error('Error rendering form preview:', error);
            });
    };

    // Save the form schema
    $rootScope.saveForm = function () {
        // $log.debug('Form Schema Saved:', $rootScope.formSchema);
    };

    // Submit the form
    $rootScope.submitForm = function () {
        // $log.debug('Form submitted:', $rootScope.formSchema);
    };

    // External submission of the form
    $rootScope.externalSubmit = function () {
        if ($rootScope.formInstance) {
            $rootScope.formInstance.submit().then(function (submission) {
                // $log.debug('External Submission:', submission);
            }).catch(function (error) {
                // $log.error('Submission Error:', error);
            });
        } else {
            // $log.warn('Form instance not available for external submission.');
        }
    };

    // Handle form submission event
    $rootScope.$on('formSubmission', function (err, submission) {
        if (err) {
            // $log.error('Error in form submission event:', err);
        } else {
            jQuery('#jsonview').JSONView(submission);
        }
    });

    // Navigate to preview form page
    $rootScope.previewFormLink = function () {
        $state.go('form-preview');
    };

    // Reset the form builder
    $rootScope.resetForm = function () {
        Formio.builder(document.getElementById('builder'), {}, {})
            .then(function(builder) {
                // Reset logic if needed after re-initialization
                // $log.debug('Form Builder Reset.');
            })
            .catch(function(error) {
                // $log.error('Error resetting form builder:', error);
            });
    };

    // Reset the form preview
    $rootScope.resetPreview = function () {
        document.getElementById('preview').innerHTML = '';
        $rootScope.formRendered = false;
        // $log.debug('Preview Reset.');
    };

    // Export PDF functionality
    $rootScope.exportPDF = function () {
        html2canvas(document.querySelector("#preview"), {
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

            const alignToElementBoundaries = (currentY, canvasHeight) => {
                const elements = document.querySelectorAll("#preview > *");
                for (let element of elements) {
                    const elementOffset = element.offsetTop * 2;
                    const elementHeight = element.offsetHeight * 2;
                    if (elementOffset >= currentY && elementOffset + elementHeight <= canvasHeight) {
                        return elementOffset + elementHeight;
                    }
                }
                return currentY;
            };

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
            // $log.error('Error generating PDF:', err);
        });
    };

    // Preview Pre-Built form functionality
    $rootScope.previewFormPreBuiltForm = function () {
        var previewElement = document.getElementById('preview');
        previewElement.innerHTML = '';
        Formio.createForm(previewElement, formSchema)
            .then(function (form) {
                // $log.debug('Form Preview Rendered:', form);
            })
            .catch(function (error) {
                // $log.error('Error rendering pre-built form preview:', error);
            });
    };
});
