    var genStore = angular.module('genStore', ['ngRoute', 'ngResource']);


    genStore.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/shop',{
                    templateUrl:'index.html',
                    controller: 'shopController'
                })
                .otherwise({
                    redirectTo : '/shop'
                })

        }]);


