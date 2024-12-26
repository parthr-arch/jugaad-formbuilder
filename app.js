var app = angular.module('myApp', ["ngRoute", "ui.router", "ui.bootstrap", "ui.select", "formio", "ngFormBuilder", "ngJsonExplorer"]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/form-builder');
    $stateProvider
        .state('form-builder', {
            url: '/form-builder',
            templateUrl: 'views/formBuilder.html',
            controller: 'FormIOController'
        })
        .state('pre-generated-form-preview', {
            url: '/pre-generated-form-preview',
            templateUrl: 'views/preGeneratedFormPreview.html',
            controller: 'PreGeneratedFormPreviewController'
        })
});