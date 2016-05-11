(function() {
    'use strict';

    angular.module('app.main')
        .config(function($stateProvider, $urlRouterProvider) {

            console.log("Main config");

            $urlRouterProvider.otherwise('main');

            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'app/main/templates/main.html'
                })

        });
})();