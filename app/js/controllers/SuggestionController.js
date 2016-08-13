app.controller('SuggestionController', [
  '$scope',
  '$routeParams',
  'suggestions',

  function($scope, $routeParams, suggestions) {
    $scope.post = suggestions.posts[$routeParams.id];

    $scope.addComment = function() {
      //if input empty, don't submit
      if(!$scope.newComment || $scope.newComment === "") {
        return;
      }

      //push comment posts in suggestions.js
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
