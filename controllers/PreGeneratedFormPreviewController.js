app.controller('PreGeneratedFormPreviewController', function($scope, $rootScope, formioComponents, $timeout, $window, $document, $state) {
  $rootScope.formRendered = false;
  $rootScope.SelectedLanguage;
  $scope.selectedScript = '';
  $rootScope.formRendered = false;
  $rootScope.SelectedLanguage = 'en';

  $rootScope.exportPDF = async function() {
    const pdf = new jsPDF();
      // IDs to include in the PDF  
      const elementIds = $rootScope.formSchema.components.map(record => record.component.id); // Modify this array to include the IDs you want
      
      let yPosition = 10; // Initial Y offset

      elementIds.forEach((id, index) => {
        const element = document.getElementById(id);

        if (element) {
            // Convert the element to a canvas
            html2canvas(element, {
              scale:2,
              useCORS: true, // Allow cross-origin content
              logging: true, // Enable logging to debug
              width: element.scrollWidth, // Ensure full width is captured
              height: element.scrollHeight,
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 190; // Width of the image in the PDF
                const pageHeight = 290; // Height of a page in the PDF
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Check if we need a new page
                if (yPosition + imgHeight > pageHeight) {
                    pdf.addPage();
                    yPosition = 10; // Reset the position for new page
                }

                // Add the image to the PDF
                pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
                yPosition += imgHeight + 2; // Update Y position for next content

                // Save the PDF after the last element
                if (index === elementIds.length - 1) {
                    pdf.save("form-export.pdf");
                }
            });
        } else {
            console.warn(`Element with ID '${id}' not found.`);
        }
    });
          
  }
  // $rootScope.exportPDF = function() {
  //   const allTfootElements = document.querySelectorAll("table.table.datagrid-table tfoot");
  //   allTfootElements.forEach((tfoot) => {
  //     tfoot.style.display = "none";
  //   });
  //   html2canvas(document.querySelector("#preview"), {
  //     scale: 2,
  //     useCORS: true,
  //     onclone: (clonedDoc) => {
  //       const formElements = clonedDoc.querySelectorAll("input, select, textarea");
  //       formElements.forEach((element) => {
  //         element.style.border = "1px solid #ccc";
  //         element.style.backgroundColor = "#fff";
  //         element.style.boxShadow = "none";
  //       });
  //     },
  //   }).then(canvas => {
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();
  //     const margin = 10;
  //     const imgWidth = pageWidth - 2 * margin;
  //     const contentHeightPerPage = (canvas.width / imgWidth) * (pageHeight - 2 * margin);
  //     let currentY = 0;
  //     const canvasHeight = canvas.height;
  //     while (currentY < canvasHeight) {
  //       const nextY = Math.min(currentY + contentHeightPerPage, canvasHeight);
  //       const canvasSection = document.createElement('canvas');
  //       canvasSection.width = canvas.width;
  //       canvasSection.height = nextY - currentY;
  //       const sectionCtx = canvasSection.getContext('2d');
  //       sectionCtx.drawImage(
  //         canvas,
  //         0, currentY,
  //         canvas.width, nextY - currentY,
  //         0, 0,
  //         canvas.width, nextY - currentY
  //       );
  //       const dataURL = canvasSection.toDataURL("image/jpeg", 1.0);
  //       if (currentY > 0) {
  //         pdf.addPage();
  //       }
  //       pdf.addImage(dataURL, 'JPEG', margin, margin, imgWidth, (imgWidth * canvasSection.height) / canvas.width);
  //       currentY = nextY;
  //     }
  //     pdf.save('form.pdf');
  //     allTfootElements.forEach((tfoot) => {
  //       tfoot.style.display = "";
  //     });
  //   }).catch(err => {
  //     allTfootElements.forEach((tfoot) => {
  //       tfoot.style.display = "";
  //     });
  //   });
  // };
  $scope.scripts = [{
      "template": "Static-Files/form-schema-4.js",
      "displayName": "Simple Calulation"
    },
    {
      "template": "Static-Files/form-shutcho-shinsei.js",
      "displayName": "shutcho shinsei"
    },
    {
      "template": "Static-Files/simple-form.js",
      "displayName": "Simple Form"
    },
    {
      "template": "Static-Files/complex-calc.js",
      "displayName": "Complex Form"
    },
    {
      "template": "Static-Files/wizard-form.js",
      "displayName": "Wizard Form"
    },
    {
      "template": "Static-Files/attandance.js",
      "displayName": "Attandance Form"
    },
    {
      "template": "Static-Files/translation-form.js",
      "displayName": "Multi-Language Form"
    },
    {
      "template": "Static-Files/all-data.js",
      "displayName": "All Form"
    },
    {
      "template": "Static-Files/form-schema-3.js",
      "displayName": "form-schema-3"
    },
    {
      "template": "Static-Files/form-schema-7.js",
      "displayName": "Multi page form for pdf"
    }
  ];
  $scope.loadScript = function() {
    const selectedTemplate = $scope.selectedScript;
    if (selectedTemplate) {
      $scope.removeOtherScripts(selectedTemplate);
      if (!$document[0].getElementById(selectedTemplate)) {
        const script = $document[0].createElement('script');
        script.src = selectedTemplate;
        script.id = selectedTemplate; // Assign the script's name as its ID
        $document[0].body.appendChild(script);
        setTimeout(() => {
          $rootScope.previewFormPreBuildedForm()
        }, 100)
      }
    }
  };
  $scope.removeOtherScripts = function(currentTemplate) {
    const scripts = $document[0].querySelectorAll('script[id]');
    angular.forEach(scripts, function(script) {
      if (script.id !== currentTemplate) {
        script.parentNode.removeChild(script);
      }
    });
  };
  $rootScope.saveForm = function() {};
  $rootScope.submitForm = function() {};
  $rootScope.resetPreview = function() {
    document.getElementById('preview').innerHTML = '';
    $rootScope.formRendered = false;
  };
  $rootScope.externalSubmit = function() {
    console.log("List of Form Schema component", $rootScope?.formSchema?.components);
    console.log("List of Form Schema component", $rootScope?.formSchema?.changed?.instance?.parent?.root?.component?.components);
    if ($rootScope.formInstance) {
      // If form instance exists, submit it
      $rootScope.formInstance
        .submit()
        .then((submission) => {
          console.log(submission);
          // Handle successful submission
        })
        .catch((error) => {
          // Handle submission error
        });
    } else {
      // Handle case when form instance is not present
    }
  };
  $rootScope.previewFormPreBuildedForm = function() {
    var previewElement = document.getElementById('preview');
    previewElement.innerHTML = '';
    Formio.createForm(previewElement, formSchema, languageSupport).then(function(form) {
      // console.log(form);
      
      form.language = $rootScope.SelectedLanguage;
      $rootScope.formInstance = form;
      $rootScope.formRendered = true;
      form.redraw();
      $rootScope.formSchema = form
      $rootScope.formInstance = form;
      $rootScope.formRendered = true;
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
      $scope.setLanguage = function(lang) {
        form.language = lang;
      };
    }).catch(function(error) {});
  };
});