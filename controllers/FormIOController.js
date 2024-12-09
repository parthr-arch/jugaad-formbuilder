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
  // --- Global Variables ---
  $rootScope.title = "Form IO"; // Set the title of the application
  $rootScope.formSchema = null; // Stores the schema of the current form
  $rootScope.formRendered = false; // Flag to indicate if the form is rendered
  $rootScope.formInstance = null; // Stores the form instance after creation
  $rootScope.message = "Learn more About Us!"; // A sample message
  $rootScope.formBuilder = null; // Stores the form builder instance
  $rootScope.formBuildercomponent = null; // Stores the most recently added form builder component
  $rootScope.formBuildercomponentSchema = null; // Stores the schema of the most recently saved component
  
  // Array to hold saved forms
  $scope.savedForms = []; // List of forms stored in localStorage

  // --- Load saved forms from localStorage ---
  const loadSavedForms = function () {
    const forms = $window.localStorage.getItem('savedForms');
    if (forms) {
      $scope.savedForms = JSON.parse(forms); // Parse saved forms from JSON
    }
  };

  loadSavedForms(); // Call function to load saved forms on controller initialization

  // --- Form Builder Initialization ---
  const initializeFormBuilder = () => {
    // Create a new form builder and attach to the 'builder' element
    Formio.builder(document.getElementById('builder'), {}, builderOptions)
      .then((builder) => {
        $rootScope.formBuilder = builder; // Store the builder instance
        $scope.form = builder; // Store builder in scope
        // Add event listeners for form builder actions
        builder.on('addComponent', (component) => {
          builder.emit('change', builder.schema); // Emit 'change' event on component addition
          $rootScope.formBuildercomponent = component; // Store the added component
        });

        builder.on('saveComponent', (schema) => {
          $rootScope.formBuildercomponentSchema = schema; // Store the schema of saved component
        });

        builder.on('change', (schema) => {
           // Store form schema on change
          $rootScope.formSchema = schema;
            
          // Ensure AngularJS updates the view
          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
        });
      })
      .catch((error) => {
        console.error("Error initializing form builder: ", error); // Log any initialization error
      });
  };

  initializeFormBuilder(); // Call to initialize the form builder

  // --- Preview Functions ---
  // Preview the form based on schema
  $rootScope.previewForm = function () {
    // Check if the form schema is valid
    if (
      !$rootScope.formSchema ||
      !$rootScope.formSchema.components ||
      $rootScope.formSchema.components.length === 0
    ) {
      return; // Exit if no components are available
    }

    const previewElement = document.getElementById('preview-container');
    previewElement.innerHTML = ''; // Clear previous content

    // Create form based on schema and render it in the preview container
    Formio.createForm(previewElement, $rootScope.formSchema)
      .then((form) => {
        $rootScope.formInstance = form; // Store the form instance
        $rootScope.formRendered = true; // Set form rendered flag to true

        // Ensure AngularJS updates the view
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }
      })
      .catch((error) => {
        console.error("Error previewing form: ", error); // Log any errors during form creation
      });
  };

  // Preview a pre-built form
  $rootScope.previewFormPreBuiltForm = function () {
    const previewElement = document.getElementById('preview');
    previewElement.innerHTML = ''; // Clear the preview container

    Formio.createForm(previewElement, formSchema) // Use predefined form schema
      .then((form) => {
        // Handle form preview (currently no additional logic here)
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  // --- Form Submission ---
  $rootScope.submitForm = function () {
    // Submit form logic will go here (currently empty)
  };

  // External form submission handling
  $rootScope.externalSubmit = function () {
    if ($rootScope.formInstance) {
      // If form instance exists, submit it
      $rootScope.formInstance
        .submit()
        .then((submission) => {
          // Handle successful submission
        })
        .catch((error) => {
          // Handle submission error
        });
    } else {
      // Handle case when form instance is not present
    }
  };

  // --- Form Management ---
  $rootScope.saveForm = function () {
    // Save form logic (currently empty)
  };

  // Reset form builder to its initial state
  $rootScope.resetForm = function () {
    initializeFormBuilder();
  };

  // Reset the form preview
  $rootScope.resetPreview = function () {
    document.getElementById('preview').innerHTML = ''; // Clear preview container
    $rootScope.formRendered = false; // Reset form rendered flag
  };

  // --- Language Management ---
  $scope.changeLanguage = function (language) {
    builderOptions.language = language; // Change the language of the builder
    $scope.initializeBuilder(); // Reinitialize the builder with new language
    initializeFormBuilder(); // Reinitialize form builder
  };

  // --- PDF Export ---
  $rootScope.exportPDF = function () {
    const previewElement = document.querySelector("#preview");
    if (!previewElement) {
      return; // Exit if preview element is not found
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
        // Split the canvas into multiple pages if necessary
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
            pdf.addPage(); // Add a new page if necessary
          }
          pdf.addImage(imageData, 'JPEG', margin, margin, imgWidth, (imgWidth * sectionCanvas.height) / canvas.width);

          currentY += contentHeightPerPage; // Increment Y position for next section
        }

        pdf.save('form.pdf'); // Save the generated PDF
      })
      .catch((err) => {
        // Handle errors during PDF generation
      });
  };

  // --- Event Handling ---
  $rootScope.$on('formSubmission', (err, submission) => {
    if (err) {
      // Handle error
    } else {
      jQuery('#jsonview').JSONView(submission); // Display submission data in JSON format
    }
  });

  // --- Navigation ---
  $rootScope.previewFormLink = function () {
    $state.go('form-preview'); // Navigate to form preview state
  };

  // --- Builder Initialization ---
  $scope.initializeBuilder = function () {
    if ($scope.formBuilder) {
      $scope.formBuilder.destroy(); // Destroy existing builder if present
      $scope.formBuilder = null; // Nullify the builder reference
    }

    Formio.builder(document.getElementById('builder'), $scope.formDefinition, $scope.builderOptions)
      .then((builder) => {
        $scope.formBuilder = builder; // Store the new builder instance
        $rootScope.resetForm(); // Reset the form
      })
      .catch((error) => {
        // Handle errors during builder initialization
      });
  };

  // Save the form to localStorage
  $scope.saveFormLocalStorage = function () {
    const formData = $scope.form.schema; // Get form schema data

    // Check if the form has been modified and is not empty
    if (formData && Object.keys(formData).length > 0) {
      const formName = prompt('Enter a name for the form');

      if (formName) {
        const savedForm = {
          name: formName,
          data: formData
        };

        // Save the form to localStorage
        $scope.savedForms.push(savedForm);
        $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
        alert("Form saved successfully!");
      }
    }
  };

  // --- Load Selected Form into the Builder ---
  $scope.loadForm = function () {
    if ($scope.selectedForm) {
      const selectedForm = $scope.selectedForm.data; // Get the selected form's data

      // Destroy current builder if any and initialize with the selected form schema
      if ($rootScope.formBuilder) {
        $rootScope.formBuilder.destroy();
      }

      Formio.builder(document.getElementById('builder'), selectedForm)
        .then((builder) => {
          $rootScope.formBuilder = builder; // Store the builder instance
          $scope.form = builder; // Store the builder in scope
        })
        .catch((error) => {
          console.error("Error loading selected form into builder: ", error); // Log any errors
        });
    } else {
      $scope.relaodPage(); // Reload the page if no form is selected
    }
  };

  // Delete the selected form from localStorage
  $scope.deleteForm = function () {
    if ($scope.selectedForm) {
      // Remove the selected form from the savedForms array
      const index = $scope.savedForms.indexOf($scope.selectedForm);
      if (index > -1) {
        $scope.savedForms.splice(index, 1);
        $window.localStorage.setItem('savedForms', JSON.stringify($scope.savedForms));
        $scope.selectedForm = null;
        alert('Form deleted!');
        $scope.relaodPage(); // Reload the page after deletion
      }
    }
  };

  // Reload the page to reflect changes
  $scope.relaodPage = function () {
    $state.reload();
    initializeFormBuilder(); // Reinitialize the form builder
  };
});
