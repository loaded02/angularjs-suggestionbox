/**
 * Created by moritz on 08.09.16.
 */
angular.module('suggestionDetail')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/suggestions/:id', {
                templateUrl: '/suggestion-detail/views/suggestion-detail.client.view.html'
            })
            .when('/suggestions/:id/edit', {
                templateUrl: '/suggestion-detail/views/suggestion-detail-edit.client.view.html'
            });
    }]);
