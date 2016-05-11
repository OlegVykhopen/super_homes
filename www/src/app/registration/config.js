(function() {
    'use strict';

    angular.module('app.registr')
        .config(function($stateProvider, $urlRouterProvider) {

            console.log("Registr config");

            $stateProvider
                .state('register', {
                    url: '/register',
                    templateUrl: 'app/registration/templates/register.html'
                })

        });
})();