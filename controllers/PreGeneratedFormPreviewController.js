// Pre Generated Form Preview Controller
app.controller('PreGeneratedFormPreviewController', function ($scope, $rootScope, formioComponents, $timeout, $window, $document) {
    $rootScope.message = "Jugaad Pre generated Forms!";
    // Preview Pre-Builded form functionality
    $rootScope.previewFormPreBuildedForm = function () {
        var previewElement = document.getElementById('preview');
        previewElement.innerHTML = '';
        Formio.createForm(previewElement, formSchema)
            .then(function (form) {
                $rootScope.formSchema = form
                $rootScope.formInstance = form;
                $rootScope.formRendered = true;
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
                // console.log('Form Preview Rendered:', form);
            })
            .catch(function (error) {
                // console.error('Error rendering form preview:', error);
                // console.log('Error rendering form preview. Please check the console for details.');
            });
    }

    // Export PDF functionality
    $rootScope.exportPDF = function () {
        // Select all tfoot elements in all tables within the form
        const allTfootElements = document.querySelectorAll("table.table.datagrid-table tfoot");

        // Hide all tfoot elements
        allTfootElements.forEach((tfoot) => {
            tfoot.style.display = "none"; // Hide the tfoot
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

            // Restore the visibility of tfoot elements
            allTfootElements.forEach((tfoot) => {
                tfoot.style.display = ""; // Make the tfoot visible again
            });
        }).catch(err => {
            console.error('Error generating PDF:', err);
            // Restore the visibility of tfoot elements
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
        // { "template": "Static-Files/calculate-grid.js", "displayName": "Grid Calculate Form" },
        
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
                // console.log(`${script.id} removed.`);
            }
        });
    };


});