(function() {
    'use strict';

    angular.module('app.main')
        .directive('appFooter', function(){
            return {
                restrict: "EA",
                templateUrl: "app/main/templates/footer.html"
            }
        });

}());