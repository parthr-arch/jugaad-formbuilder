// Pre Generated Form Preview Controller
app.controller('PreGeneratedFormPreviewController', function ($scope, $rootScope, formioComponents, $timeout, $window, $document, $state) {
    $rootScope.formRendered = false;
    $rootScope.SelectedLanguage;
    // $rootScope.previewFormPreBuildedForm = function () {
    //     var previewElement = document.getElementById('preview');
    //     previewElement.innerHTML = '';
    //     formSchema = {
    //         components: [
    //           {
    //             type: 'textfield',
    //             key: 'firstName',
    //             label: 'First Name',
    //             placeholder: 'Enter your first name',
    //             input: true
    //           },
    //           {
    //             type: 'textfield',
    //             key: 'lastName',
    //             label: 'Last Name',
    //             placeholder: 'Enter your last name',
    //             input: true
    //           },
    //           {
    //             type: 'survey',
    //             key: 'questions',
    //             label: 'Survey',
    //             values: [
    //               {
    //                 label: 'Great',
    //                 value: 'great'
    //               },
    //               {
    //                 label: 'Good',
    //                 value: 'good'
    //               },
    //               {
    //                 label: 'Poor',
    //                 value: 'poor'
    //               }
    //             ],
    //             questions: [
    //               {
    //                 label: 'How would you rate the Form.io platform?',
    //                 value: 'howWouldYouRateTheFormIoPlatform'
    //               },
    //               {
    //                 label: 'How was Customer Support?',
    //                 value: 'howWasCustomerSupport'
    //               },
    //               {
    //                 label: 'Overall Experience?',
    //                 value: 'overallExperience'
    //               }
    //             ]
    //           },
    //           {
    //             type: 'button',
    //             action: 'submit',
    //             label: 'Submit',
    //             theme: 'primary'
    //           }
    //         ]
    //       }, {
    //         language: 'jp',
    //         i18n: {
    //           sp: {
    //             'First Name': 'Nombre de pila',
    //             'Last Name': 'Apellido',
    //             'Enter your first name': 'Ponga su primer nombre',
    //             'Enter your last name': 'Introduce tu apellido',
    //             'How would you rate the Form.io platform?': '¿Cómo calificaría la plataforma Form.io?',
    //             'How was Customer Support?': '¿Cómo fue el servicio de atención al cliente?',
    //             'Overall Experience?': '¿Experiencia general?',
    //             Survey: 'Encuesta',
    //             Excellent: 'Excelente',
    //             Great: 'Estupendo',
    //             Good: 'Bueno',
    //             Average: 'Promedio',
    //             Poor: 'Pobre',
    //             'Submit': 'Enviar',
    //             complete: 'Presentación Completa',
    //           },
    //           ch: {
    //             'First Name': '名字',
    //             'Last Name': '姓',
    //             'Enter your first name': '输入你的名字',
    //             'Enter your last name': '输入你的姓氏',
    //             'How would you rate the Form.io platform?': '你如何评价Form.io平台？',
    //             'How was Customer Support?': '客户支持如何？',
    //             'Overall Experience?': '总体体验？',
    //              Survey: '调查',
    //             Excellent: '优秀',
    //             Great: '大',
    //             Good: '好',
    //             Average: '平均',
    //             Poor: '错',
    //             'Submit': '提交',
    //             complete: '提交完成',
    //           }
    //         }
    //     };
    // }

    // Export PDF functionality
    $rootScope.exportPDF = function () {
        const allTfootElements = document.querySelectorAll("table.table.datagrid-table tfoot");
        allTfootElements.forEach((tfoot) => {
            tfoot.style.display = "none"; 
        });
        html2canvas(document.querySelector("#preview"), {
            scale: 2,
            useCORS: true,
            onclone: (clonedDoc) => {
                const formElements = clonedDoc.querySelectorAll("input, select, textarea");
                formElements.forEach((element) => {
                    element.style.border = "1px solid #ccc";
                    element.style.backgroundColor = "#fff";
                    element.style.boxShadow = "none";
                });

            },
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

                const canvasSection = document.createElement('canvas');
                canvasSection.width = canvas.width;
                canvasSection.height = nextY - currentY;
                const sectionCtx = canvasSection.getContext('2d');

                sectionCtx.drawImage(
                    canvas,
                    0, currentY,
                    canvas.width, nextY - currentY,
                    0, 0,
                    canvas.width, nextY - currentY
                );

                const dataURL = canvasSection.toDataURL("image/jpeg", 1.0);

                if (currentY > 0) {
                    pdf.addPage();
                }
                pdf.addImage(dataURL, 'JPEG', margin, margin, imgWidth, (imgWidth * canvasSection.height) / canvas.width);

                currentY = nextY;
            }

            pdf.save('form.pdf');
            allTfootElements.forEach((tfoot) => {
                tfoot.style.display = ""; // Make the tfoot visible again
            });
        }).catch(err => {
            console.error('Error generating PDF:', err);
            allTfootElements.forEach((tfoot) => {
                tfoot.style.display = ""; // Make the tfoot visible again
            });
        });
    };

    // $scope.scripts = ['script1.js', 'script2.js', 'script3.js'];
    $scope.scripts = [
        // { "template": "Static-Files/form-schema-1.js", "displayName": "Form 1" },
        // { "template": "Static-Files/form-schema-2.js", "displayName": "Form 2" },
        // { "template": "Static-Files/form-schema-3.js", "displayName": "Form 3" },
        { "template": "Static-Files/form-schema-4.js", "displayName": "Simple Calulation" },
        { "template": "Static-Files/form-shutcho-shinsei.js", "displayName": "shutcho shinsei" },
        { "template": "Static-Files/simple-form.js", "displayName": "Simple Form" },
        { "template": "Static-Files/complex-calc.js", "displayName": "Complex Form" },
        { "template": "Static-Files/wizard-form.js", "displayName": "Wizard Form" },
        { "template": "Static-Files/attandance.js", "displayName": "Attandance Form" },
        { "template": "Static-Files/calculate-grid.js", "displayName": "Grid Calculate Form" },
        { "template": "Static-Files/translation-form.js", "displayName": "Multi-Language Form" },
       
        
    ];

    // Currently selected script
    $scope.selectedScript = '';

    // Function to dynamically load a script
    $scope.loadScript = function () {
        const selectedTemplate = $scope.selectedScript;

        if (selectedTemplate) {
            // Remove any previously loaded scripts
            $scope.removeOtherScripts(selectedTemplate);

            // Check if the script is already loaded
            if (!$document[0].getElementById(selectedTemplate)) {
                const script = $document[0].createElement('script');
                script.src = selectedTemplate;
                script.id = selectedTemplate; // Assign the script's name as its ID
                $document[0].body.appendChild(script);
                // console.log(`${selectedTemplate} loaded.`);
            }
        }
    };

    // Function to remove previously loaded scripts
    $scope.removeOtherScripts = function (currentTemplate) {
        const scripts = $document[0].querySelectorAll('script[id]');
        angular.forEach(scripts, function (script) {
            if (script.id !== currentTemplate) {
                script.parentNode.removeChild(script);
                console.log(`${script.id} removed.`);
            }
        });
    };

    $rootScope.saveForm = function() {
        console.debug('Form Schema Saved:', $rootScope.formSchema);
      };
      $rootScope.submitForm = function() {
        // console.debug('Form submitted:', $rootScope.formSchema);
        console.debug('Form data:', $rootScope.formSchema._data);
      };
      $rootScope.resetPreview = function() {
        document.getElementById('preview').innerHTML = '';
        $rootScope.formRendered = false;
        console.debug('Preview Reset.');
      };
      $rootScope.externalSubmit = function() {
        if ($rootScope.formInstance) {
          $rootScope.formInstance.submit().then(function(submission) {
            console.debug('External Submission:', submission);
            return;
          }).catch(function(error) {
            console.error('Submission Error:', error);
            return;
          });
        } else {
          console.warn('Form instance not available for external submission.');
          return;
        }
      };
      

      $rootScope.formRendered = false;
      $rootScope.SelectedLanguage = 'en'; // Default language
  
      $rootScope.previewFormPreBuildedForm = function () {
          var previewElement = document.getElementById('preview');
          previewElement.innerHTML = '';
        
        console.log(formSchema);
        
        debugger;
          Formio.createForm(previewElement, formSchema, languageSupport).then(function (form) {
            console.log($rootScope);
            console.log($scope);
              form.language = $rootScope.SelectedLanguage; // Set the selected language
              $rootScope.formInstance = form; // Save the form instance
              $rootScope.formRendered = true;
              form.redraw(); // Ensure the form re-renders with the new language
              $rootScope.formSchema = form
              $rootScope.formInstance = form;
              $rootScope.formRendered = true;
              if (!$rootScope.$$phase) {
                  $rootScope.$apply();
              }

              $scope.setLanguage = function(lang) {
                form.language = lang;
              };
              console.log('Form Preview Rendered:', form);
          }).catch(function (error) {
            console.error('Error rendering form preview:', error);
            console.log('Error rendering form preview. Please check the console for details.');
      });
      };
  
      $scope.changeLanguage = function (language) {
          $rootScope.SelectedLanguage = language;
          builderOptions.language = language;
          $rootScope.formRendered = false;
          $scope.SelectedLanguage = language;
          debugger;
        //   if ($rootScope.formInstance) {
        //     $rootScope.formInstance.language = language; // Change language dynamically
        //     $rootScope.formInstance.redraw(); // Re-render the form
        // } else {
        //     $rootScope.previewFormPreBuildedForm(); // Render form if not already initialized
        // }
          $rootScope.previewFormPreBuildedForm(); // Re-render the form
      };

});