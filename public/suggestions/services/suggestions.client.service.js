angular.module('suggestions')
	.factory('Suggestions', ['$resource',
		function($resource){
			return $resource('api/suggestions/:suggestionId', {
				suggestionId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
}]);
