// About Controller
app.controller('AboutController', function ($scope, $rootScope, formioComponents, $timeout) {

    // Set a global message for the about page
    $rootScope.message = "Learn more About Us!";

    // Example: Initialize form components (if formioComponents is a valid service)
    $scope.formComponents = [];
    formioComponents.getComponents().then(function (components) {
        $scope.formComponents = components;
    }).catch(function (error) {
        console.error("Error fetching components:", error);
    });

    // Example of using $timeout for delayed execution, like animations or dynamic data changes
    $timeout(function () {
        $scope.dynamicMessage = "This message appears after 2 seconds!";
    }, 2000);

    // Example of watching a property for changes
    $scope.$watch('formComponents', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            // console.log("Form components have changed!", newValue);
        }
    });

});
