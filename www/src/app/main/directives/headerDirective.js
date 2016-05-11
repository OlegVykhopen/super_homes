(function(document) {
    'use strict';

    angular.module('app.main')
        .directive('appHeader', function($compile){
            return {
                restrict: "EA",
                controller: headerController,
                controllerAs: 'vm',
                scope: {
                    logo: "=logo"
                },
                link: headerLink,
                templateUrl: "app/main/templates/header.html"
            };

            function headerController(){
                var vm = this;
                vm.isLoginShown = false;

                vm.showLogin = function(bool){
                    vm.isLoginShown = bool != undefined ? bool : !vm.isLoginShown;
                }

            }

            function headerLink(scope, el, attr){
                    var h = el.find('header');
                    el = angular.element(el);
                if (scope.logo){
                    h.addClass('with_logo');
                    var lists = el.find('ul'),
                        leftList = angular.element(lists[0]),
                        lP = leftList.parent();
                    angular.element(lists[1]).parent().append(leftList);
                        var logo = document.createElement('img');
                        logo.setAttribute('ng-src', 'img/logo.png');
                        logo.setAttribute('ui-sref', 'main');
                        lP.append(logo);
                    $compile(logo)(scope);
                }
            }

        });


}(document));