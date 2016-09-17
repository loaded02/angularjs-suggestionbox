/**
 * Created by moritz on 17.09.16.
 */
angular.module('suggestions')
    .factory('Comments', ['$resource',
        function($resource){
            return $resource('api/suggestions/:suggestionId/comments', {
                suggestionId: '@_id'
            }, {
                putComment: {
                    method: 'PUT'
                }
            });
        }]);