app.controller('FormIOController', function (
  $scope,
  $rootScope,
  formioComponents,
  $timeout,
  $state,
  $log,
  $route
) {
  // --- Global Variables ---
  $rootScope.title = "Form IO";
  $rootScope.formSchema = null;
  $rootScope.formRendered = false;
  $rootScope.formInstance = null;
  $rootScope.message = "Learn more About Us!";
  $rootScope.formBuilder = null;
  $rootScope.formBuildercomponent = null;
  $rootScope.formBuildercomponentSchema = null;

  // --- Form Builder Initialization ---
  const initializeFormBuilder = () => {
    Formio.builder(document.getElementById('builder'), {}, builderOptions)
      .then((builder) => {
        $rootScope.formBuilder = builder;
        debugger;

        // Events for Form Builder
        builder.on('addComponent', (component) => {
          builder.emit('change', builder.schema);
          $rootScope.formBuildercomponent = component;
        });

        builder.on('saveComponent', (schema) => {
          console.log('Component saved:', schema);
          $rootScope.formBuildercomponentSchema = schema;
        });

        builder.on('change', (schema) => {
          console.log('Form Schema Changed:', schema);
          $rootScope.formSchema = schema;

          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
        });
      })
      .catch((error) => {
        console.error("Error initializing Formio builder:", error);
      });
  };

  initializeFormBuilder();

  // --- Preview Functions ---
  $rootScope.previewForm = function () {
    if (
      !$rootScope.formSchema ||
      !$rootScope.formSchema.components ||
      $rootScope.formSchema.components.length === 0
    ) {
      console.warn('No components to preview.');
      return;
    }

    const previewElement = document.getElementById('preview');
    previewElement.innerHTML = '';

    Formio.createForm(previewElement, $rootScope.formSchema)
      .then((form) => {
        $rootScope.formInstance = form;
        $rootScope.formRendered = true;

        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }

        // Add language switcher
        window.setLanguage = function (lang) {
          form.language = lang;
        };
      })
      .catch((error) => {
        console.error('Error rendering form preview:', error);
      });
  };

  $rootScope.previewFormPreBuiltForm = function () {
    const previewElement = document.getElementById('preview');
    previewElement.innerHTML = '';

    Formio.createForm(previewElement, formSchema)
      .then((form) => {
        console.log('Pre-built Form Preview Rendered:', form);
      })
      .catch((error) => {
        console.error('Error rendering pre-built form preview:', error);
      });
  };

  // --- Form Submission ---
  $rootScope.submitForm = function () {
    console.log('Form submitted:', $rootScope.formSchema);
  };

  $rootScope.externalSubmit = function () {
    if ($rootScope.formInstance) {
      $rootScope.formInstance
        .submit()
        .then((submission) => {
          console.log('External Submission:', submission);
        })
        .catch((error) => {
          console.error('Submission Error:', error);
        });
    } else {
      console.warn('Form instance not available for external submission.');
    }
  };

  // --- Form Management ---
  $rootScope.saveForm = function () {
    console.log('Form Schema Saved:', $rootScope.formSchema);
  };

  $rootScope.resetForm = function () {
    initializeFormBuilder();
    console.log('Form Builder Reset.');
  };

  $rootScope.resetPreview = function () {
    document.getElementById('preview').innerHTML = '';
    $rootScope.formRendered = false;
  };

  // --- Language Management ---
  $scope.changeLanguage = function (language) {
    builderOptions.language = language;
    // if ($rootScope.formBuilder && $rootScope.formBuilder.i18next) {
    //   $rootScope.formBuilder.i18next.language = language;
    // }
    // console.log("Language changed to:", language);
    $scope.initializeBuilder();
    initializeFormBuilder();
  };

  // --- PDF Export ---
  $rootScope.exportPDF = function () {
    const previewElement = document.querySelector("#preview");
    if (!previewElement) {
      console.warn("Preview element not found.");
      return;
    }

    html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
    })
      .then((canvas) => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        const imgWidth = pageWidth - 2 * margin;
        const contentHeightPerPage =
          (canvas.width / imgWidth) * (pdf.internal.pageSize.getHeight() - 2 * margin);

        let currentY = 0;
        while (currentY < canvas.height) {
          const sectionCanvas = document.createElement('canvas');
          sectionCanvas.width = canvas.width;
          sectionCanvas.height = Math.min(contentHeightPerPage, canvas.height - currentY);

          const context = sectionCanvas.getContext('2d');
          context.drawImage(
            canvas,
            0,
            currentY,
            canvas.width,
            sectionCanvas.height,
            0,
            0,
            sectionCanvas.width,
            sectionCanvas.height
          );

          const imageData = sectionCanvas.toDataURL('image/jpeg', 1.0);
          if (currentY > 0) {
            pdf.addPage();
          }
          pdf.addImage(imageData, 'JPEG', margin, margin, imgWidth, (imgWidth * sectionCanvas.height) / canvas.width);

          currentY += contentHeightPerPage;
        }

        pdf.save('form.pdf');
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
      });
  };

  // --- Event Handling ---
  $rootScope.$on('formSubmission', (err, submission) => {
    if (err) {
      console.error('Error in form submission event:', err);
    } else {
      jQuery('#jsonview').JSONView(submission);
    }
  });

  // --- Navigation ---
  $rootScope.previewFormLink = function () {
    $state.go('form-preview');
  };

  // --- Builder Initialization ---
  $scope.initializeBuilder = function () {
    if ($scope.formBuilder) {
      $scope.formBuilder.destroy();
      $scope.formBuilder = null;
    }

    Formio.builder(document.getElementById('builder'), $scope.formDefinition, $scope.builderOptions)
      .then((builder) => {
        $scope.formBuilder = builder;
        $rootScope.resetForm();
      })
      .catch((error) => {
        console.error('Error initializing builder:', error);
      });
  };
});
