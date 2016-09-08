/**
 * Created by moritz on 08.09.16.
 */
angular.module('suggestionList')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/suggestion-list/views/suggestion-list.client.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);