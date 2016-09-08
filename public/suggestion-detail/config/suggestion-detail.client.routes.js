/**
 * Created by moritz on 08.09.16.
 */
angular.module('suggestionDetail')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/suggestion/:id', {
                templateUrl: '/suggestion-detail/views/suggestion-detail.client.view.html'
            });
    }]);
