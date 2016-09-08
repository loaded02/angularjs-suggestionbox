angular.module('suggestionList')
    .controller('SuggestionListController', [
  '$scope',
  'Suggestions',
  'Authentication',
  function($scope, Suggestions, Authentication) {
    $scope.authentication = Authentication;
    $scope.posts = Suggestions.posts;

    $scope.addSuggestion = function() {
      //if input empty, don't submit
      if(!$scope.title || $scope.title === "") {
        return;
      }

      //push suggestion posts in suggestion-list.js
      $scope.posts.push({
        title: $scope.title,
        upvotes: 0,
        comments: []
      });

      //after submit, clear input
      $scope.title = '';
    }

    $scope.upVote = function(post) {
      post.upvotes += 1;
    }
}]);
