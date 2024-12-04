app.controller('FormIOController', function($scope, $rootScope, formioComponents, $timeout, $state, $log, $route) {
    $rootScope.title = "Form IO";
    $rootScope.formSchema;
    $rootScope.formRendered = false;
    $rootScope.formInstance = null;
    $rootScope.message = "Learn more About Us!";
    $rootScope.formBuilder;
    $rootScope.formBuildercomponent;
    $rootScope.formBuildercomponentSchema;
    Formio.builder(document.getElementById('builder'), {}, builderOptions).then(function(builder) {
      
      $rootScope.formBuilder = builder;
      builder.on('addComponent', (component) => {
        builder.emit('change', builder.schema);
        $rootScope.formBuildercomponent = component;
      });
      builder.on('saveComponent', function(schema) {
        console.log('Component saved:', schema);
        $rootScope.formBuildercomponentSchema = schema;
      });
      builder.on('change', function(schema) {
        console.log('Form Schema Changed:', schema);
        $rootScope.formSchema = schema;
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }
      });
    }).catch(function(error) {
      console.log("Error initializing Formio builder:", error);
    });
    $rootScope.previewForm = function() {
      if (!$rootScope.formSchema || !$rootScope.formSchema.components || $rootScope.formSchema.components.length === 0) {
        console.log('No components to preview.');
        return;
      }
      var previewElement = document.getElementById('preview');
      previewElement.innerHTML = '';
      Formio.createForm(previewElement, $rootScope.formSchema)
        .then(function(form) {
          $rootScope.formInstance = form;
          $rootScope.formRendered = true;
          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
          window.setLanguage = function(lang) {
            form.language = lang;
          };
        })
        .catch(function(error) {
          console.log('Error rendering form preview:', error);
        });
    };
    $rootScope.saveForm = function() {
      console.log('Form Schema Saved:', $rootScope.formSchema);
    };
    $rootScope.submitForm = function() {
      console.log('Form submitted:', $rootScope.formSchema);
    };
    $rootScope.externalSubmit = function() {
      if ($rootScope.formInstance) {
        $rootScope.formInstance.submit().then(function(submission) {
          console.log('External Submission:', submission);
        }).catch(function(error) {
          console.log('Submission Error:', error);
        });
      } else {
        console.log('Form instance not available for external submission.');
      }
    };
    $rootScope.$on('formSubmission', function(err, submission) {
      if (err) {
        console.log('Error in form submission event:', err);
      } else {
        jQuery('#jsonview').JSONView(submission);
      }
    });
    $rootScope.previewFormLink = function() {
      $state.go('form-preview');
    };
    $rootScope.resetForm = function() {
      Formio.builder(document.getElementById('builder'), {}, builderOptions)
        .then(function(builder) {
          console.log('Form Builder Reset.');
        })
        .catch(function(error) {
          console.log('Error resetting form builder:', error);
        });
    };
    $rootScope.resetPreview = function() {
      document.getElementById('preview').innerHTML = '';
      $rootScope.formRendered = false;
    };
    $rootScope.exportPDF = function() {
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
        console.log('Error generating PDF:', err);
      });
    };
    $rootScope.previewFormPreBuiltForm = function() {
      var previewElement = document.getElementById('preview');
      previewElement.innerHTML = '';
      Formio.createForm(previewElement, formSchema)
        .then(function(form) {
          console.log('Form Preview Rendered:', form);
        })
        .catch(function(error) {
          console.log('Error rendering pre-built form preview:', error);
        });
    };
    $scope.initializeBuilder = function() {
      if ($scope.formBuilder) {
        $scope.formBuilder.destroy();
        $scope.formBuilder = null;
      }
      Formio.builder(document.getElementById('builder'), $scope.formDefinition, $scope.builderOptions).then(function(builder) {
        $scope.formBuilder = builder;
        $rootScope.resetForm();
      });
    };
    $scope.changeLanguage = function(language) {
      builderOptions.language = language;
      $rootScope.formBuilder.i18next.language = language;
     
      console.log("$rootScope.formBuilder", $rootScope.formBuilder);
      $scope.initializeBuilder();
    };
  });