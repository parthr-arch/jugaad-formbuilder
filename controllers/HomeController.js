// Home Controller
app.controller('HomeController', function ($scope, $rootScope, formioComponents, $timeout, $log) {
    // Initialize a welcome message
    $rootScope.message = "Welcome to the Home Page!";

    // Function to handle potential errors
    function handleError(error) {
        // Log the error for debugging purposes
        // $log.error('An error occurred:', error);
        // Optionally, you can show an alert or update the UI to inform the user
        $scope.errorMessage = "An unexpected error occurred. Please try again later.";
    }

    // Example function that might use formioComponents and handle errors
    $scope.loadFormComponents = function() {
        try {
            // Assuming formioComponents has a method to load components
            formioComponents.load().then(function(components) {
                $scope.components = components;
            }).catch(handleError);  // Catch any errors during loading
        } catch (error) {
            handleError(error);  // Catch synchronous errors
        }
    };

    // Call the function to load form components when the controller is initialized
    $timeout($scope.loadFormComponents, 0);
});