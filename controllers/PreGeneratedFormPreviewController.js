app.controller('PreGeneratedFormPreviewController', function($scope, $rootScope, formioComponents, $timeout, $window, $document, $state) {
    $rootScope.formRendered = false;
    $rootScope.SelectedLanguage;
    $scope.selectedScript = '';
    $rootScope.formRendered = false;
    $rootScope.SelectedLanguage = 'en';
    $rootScope.exportPDF = function() {
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
          tfoot.style.display = "";
        });
      }).catch(err => {
        allTfootElements.forEach((tfoot) => {
          tfoot.style.display = "";
        });
      });
    };
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
        "template": "Static-Files/calculate-grid.js",
        "displayName": "Grid Calculate Form"
      },
      {
        "template": "Static-Files/translation-form.js",
        "displayName": "Multi-Language Form"
      },
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
      if ($rootScope.formInstance) {
        $rootScope.formInstance.submit().then(function(submission) {
          return;
        }).catch(function(error) {
          return;
        });
      } else {
        return;
      }
    };
    $rootScope.previewFormPreBuildedForm = function() {
      var previewElement = document.getElementById('preview');
      previewElement.innerHTML = '';
      Formio.createForm(previewElement, formSchema, languageSupport).then(function(form) {
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