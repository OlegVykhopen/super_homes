(function(document) {
    'use strict';

    angular.module('app.registr')
        .directive('registerForm', function(fileReader){

            return {
                restrict: "EA",
                controller: registerFormController,
                controllerAs: 'vm',
                scope: {},
                link: registerFormLink,
                templateUrl: "app/registration/templates/registerForm.html"
            };

            function registerFormController(){
                var vm = this;
                vm.avatarSrc = "";
                vm.defAvatarScr = "img/reg_form_avatar.jpg";

                vm.triggerFile = function(){
                    document.getElementById('avatarFile').click();
                };

                vm.getFile = function () {
                    if (!vm.file) return;
                    fileReader.readAsDataUrl(vm.file, vm.scope)
                        .then(function(result) {
                            vm.avatarSrc = result;
                        });
                };

                vm.register = function(){
                    console.log(1);
                }

            }

            function registerFormLink(scope, el, attr, ctrl){
                var inpF = angular.element(document.getElementById('avatarFile'));
                ctrl.scope = scope;
                inpF.bind("change", function(e){
                    ctrl.file = (e.srcElement || e.target).files[0];
                    ctrl.getFile();
                })
            }

        });


}(document));