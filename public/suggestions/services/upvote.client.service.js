/**
 * Created by moritz on 17.09.16.
 */
angular.module('suggestions')
    .factory('Upvotes', ['$resource',
        function($resource){
            return $resource('api/suggestions/:suggestionId/upvote', {
                suggestionId: '@_id'
            }, {
                putUpvote: {
                    method: 'PUT'
                }
            });
        }]);