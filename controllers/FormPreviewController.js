// Form Preview Controller
app.controller('FormPreviewController', function ($scope, $rootScope, formioComponents, $timeout) {
    // Initialize message for the preview
    $rootScope.message = "Jugaad Form Preview";

    // Function to preview the form
    $rootScope.previewForm = function () {
        // Check if form schema is valid
        if (!$rootScope.formSchema || !$rootScope.formSchema.components || $rootScope.formSchema.components.length === 0) {
            console.error('Please add components to the form before previewing.');
            return;
        }

        var previewElement = document.getElementById('preview');
        previewElement.innerHTML = ''; // Clear previous content

        // Create the form using Formio
        Formio.createForm(previewElement, $rootScope.formSchema)
            .then(function (form) {
                $rootScope.formInstance = form;
                $rootScope.formRendered = true;
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            })
            .catch(function (error) {
                console.error('Error rendering form preview:', error);
                alert('Error rendering form preview. Please check the console for details.');
            });
    };

    // Function to export PDF
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
            const margin = 10; // Margin around the content in mm
            const imgWidth = pageWidth - 2 * margin;
            const contentHeightPerPage = (canvas.width / imgWidth) * (pageHeight - 2 * margin);

            // Helper function to align elements within boundaries
            const alignToElementBoundaries = (currentY, canvasHeight) => {
                const elements = document.querySelectorAll("#preview > *");
                for (let element of elements) {
                    const elementOffset = element.offsetTop * 2; // Scale-adjusted offset
                    const elementHeight = element.offsetHeight * 2; // Scale-adjusted height
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

                // Draw the current section from the full canvas
                sectionCtx.drawImage(
                    canvas,
                    0, currentY, // Source x, y
                    canvas.width, alignedY - currentY, // Source width, height
                    0, 0, // Destination x, y
                    canvas.width, alignedY - currentY // Destination width, height
                );

                const dataURL = canvasSection.toDataURL("image/jpeg", 1.0);

                // Add the image to the PDF
                if (currentY > 0) {
                    pdf.addPage();
                }
                pdf.addImage(dataURL, 'JPEG', margin, margin, imgWidth, (imgWidth * canvasSection.height) / canvas.width);

                currentY = alignedY;
            }

            pdf.save('form.pdf');
        }).catch(err => {
            console.error('Error generating PDF:', err);
            alert('Error generating PDF. Please check the console for details.');
        });
    };
});