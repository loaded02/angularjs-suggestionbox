angular.module('suggestionDetail')
    .controller('SuggestionDetailController', [
  '$scope',
  '$routeParams',
  'Suggestions',
  'Authentication',
  function($scope, $routeParams, Suggestions, Authentication) {
    $scope.authentication = Authentication;
    $scope.post = Suggestions.posts[$routeParams.id];

    $scope.addComment = function() {
      //if input empty, don't submit
      if(!$scope.newComment || $scope.newComment === "") {
        return;
      }

      //push comment posts in suggestion-list.js
      $scope.post.comments.push({
        body: $scope.newComment,
        upvotes: 0
      });

      //after submit, clear input
      $scope.newComment = '';
    }

    $scope.upvoteComment = function(comment) {
      comment.upvotes += 1;
    }
}])
