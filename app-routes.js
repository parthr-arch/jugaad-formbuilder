app.config(function ($stateProvider, $urlRouterProvider) {
    // Default route redirection
    $urlRouterProvider.otherwise('/form-builder');

    // State configurations
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
        .state('form-builder', {
            url: '/form-builder',
            templateUrl: 'views/form-builder.html',
            controller: 'FormIOController'
        })
        .state('form-preview', {
            url: '/form-preview',
            templateUrl: 'views/form-preview.html',
            controller: 'FormPreviewController'
        })
        .state('pre-generated-form-preview', {
            url: '/pre-generated-form-preview',
            templateUrl: 'views/pre-generated-form-preview.html',
            controller: 'PreGeneratedFormPreviewController'
        })
        .state('error', {
            url: '/error',
            templateUrl: 'views/error.html',
            controller: 'ErrorController'
        });
});

// Intercepting state changes to handle user types and unknown routes
// app.run(function ($rootScope, $state, AuthService) {
//     $rootScope.$on('$stateChangeStart', function (event, toState) {
//         // Check user authentication and roles
//         const user = AuthService.getCurrentUser();

//         // Redirect based on user type or role
//         if (!user) {
//             event.preventDefault();
//             $state.go('form-builder'); // Redirect unauthenticated users to form-builder
//         } else if (user.role === 'admin' && toState.name === 'form-preview') {
//             event.preventDefault();
//             $state.go('home'); // Redirect admin users from form-preview to home
//         } else if (user.role !== 'admin' && toState.name === 'admin-only') {
//             event.preventDefault();
//             $state.go('error'); // Redirect non-admin users trying to access admin-only pages
//         }
//     });

//     // Handle unknown routes by redirecting to the error state
//     $rootScope.$on('$stateNotFound', function (event, unfoundState) {
//         event.preventDefault();
//         $state.go('error'); // Redirect to error page for unknown states
//     });
// });