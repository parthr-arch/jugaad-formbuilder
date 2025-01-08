app.controller('PreGeneratedFormPreviewController', function ($scope, $rootScope, formioComponents, $timeout, $window, $document, $state) {
  $rootScope.formRendered = false;
  $rootScope.SelectedLanguage;
  $scope.selectedScript = '';
  $rootScope.formRendered = false;
  $rootScope.SelectedLanguage = 'en';
  $rootScope.exportPDF = async function () {
    var pdf = new jsPDF();
    var elementIds = $rootScope.formSchema.components.map(record => record.component.id);
    var yPosition = 10;
    elementIds.forEach((id, index) => {
      var element = document.getElementById(id);
      if (element) {
        html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: true,
          width: element.scrollWidth,
          height: element.scrollHeight,
        }).then((canvas) => {
          var imgData = canvas.toDataURL('image/png');
          var imgWidth = 190;
          var pageHeight = 290;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          if (yPosition + imgHeight > pageHeight) {
            pdf.addPage();
            yPosition = 10;
          }
          pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 2;
          if (index === elementIds.length - 1) {
            pdf.save("form-export.pdf");
          }
        });
      } else {
        console.warn(`Element with ID '${id}' not found.`);
      }
    });

  }
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
  },
  {
    "template": "Static-Files/allInOne.js",
    "displayName": "All In One"
  }
  ];
  $scope.loadScript = function () {
    var selectedTemplate = $scope.selectedScript;
    if (selectedTemplate) {
      $scope.removeOtherScripts(selectedTemplate);
      if (!$document[0].getElementById(selectedTemplate)) {
        var script = $document[0].createElement('script');
        script.src = selectedTemplate;
        script.id = selectedTemplate;
        $document[0].body.appendChild(script);
        setTimeout(() => {
          $rootScope.previewFormPreBuildedForm()
        }, 100)
      }
    }
  };
  $scope.removeOtherScripts = function (currentTemplate) {
    var scripts = $document[0].querySelectorAll('script[id]');
    angular.forEach(scripts, function (script) {
      if (script.id !== currentTemplate) {
        script.parentNode.removeChild(script);
      }
    });
  };
  $rootScope.saveForm = function () { };
  $rootScope.submitForm = function () { };
  $rootScope.resetPreview = function () {
    document.getElementById('preview').innerHTML = '';
    $rootScope.formRendered = false;
  };
  $rootScope.externalSubmit = function () {
    console.log("List of Form Schema component", $rootScope?.formSchema?.components);
    console.log("List of Form Schema component", $rootScope?.formSchema?.changed?.instance?.parent?.root?.component?.components);
    if ($rootScope.formInstance) {
      $rootScope.formInstance
        .submit()
        .then((submission) => {
          console.log(submission);
        })
        .catch((error) => {
          console.log(error);
        });
    } else { }
  };
  $rootScope.previewFormPreBuildedForm = function () {
    var previewElement = document.getElementById('preview');
    previewElement.innerHTML = '';
    if (formSchema && languageSupport) {
      Formio.createForm(previewElement, formSchema, languageSupport).then(function (form) {
        console.log(form);
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
        $scope.setLanguage = function (lang) {
          form.language = lang;
        };
      }).catch(function (error) { });
    };
  }
});