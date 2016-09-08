angular.module('suggestionDetail')
    .controller('SuggestionDetailController', [
  '$scope',
  '$routeParams',
  '$location',
  'Suggestions',
  'Authentication',
  function($scope, $routeParams, $location, Suggestions, Authentication) {
    $scope.authentication = Authentication;

    $scope.findOne = function () {
      $scope.suggestion = Suggestions.get({
        suggestionId: $routeParams.id
      });
    };

    $scope.addComment = function() {
      //if input empty, don't submit
      if(!$scope.newComment || $scope.newComment === "") {
        return;
      }

      $scope.suggestion.comments.push({
        title: $scope.newComment,
        upvotes: 0
      });
      $scope.suggestion.$update(function () {
        $location.path('suggestions/' + $scope.suggestion._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      //after submit, clear input
      $scope.newComment = '';
    };

    $scope.upvoteComment = function(comment) {
      comment.upvotes += 1;
    }
}]);
