(function() {
    'use strict';

    angular.module('app.registr')
        .directive('loginForm', function(){

            return {
                restrict: "EA",
                controller: loginFormController,
                controllerAs: 'vm',
                scope: {},
                link: loginFormLink,
                templateUrl: "app/registration/templates/loginForm.html"
            };

            function loginFormController(){
                var vm = this;

            }

            function loginFormLink(scope, el, attr, ctrl){
            }

        });


}());