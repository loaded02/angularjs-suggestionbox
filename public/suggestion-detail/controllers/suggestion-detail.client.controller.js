angular.module('suggestionDetail')
    .controller('SuggestionDetailController', [
        '$scope',
        '$routeParams',
        '$location',
        'Suggestions',
        'Comments',
        'Authentication',
        function($scope, $routeParams, $location, Suggestions, Comments, Authentication) {
            $scope.authentication = Authentication;

            $scope.findOne = function () {
                $scope.suggestion = Suggestions.get({
                    suggestionId: $routeParams.id
                });
            };

            $scope.update = function() {
                //if input empty, don't submit
                if(!$scope.newComment || $scope.newComment === "") {
                    return;
                }

                $scope.suggestion.comments.push({
                    title: $scope.newComment,
                    upvotes: 0
                });
                Comments.putComment($scope.suggestion, function () {
                    $location.path('suggestions/' + $scope.suggestion._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });

                //after submit, clear input
                $scope.newComment = '';
            };

            $scope.upvoteComment = function(comment) {
                comment.upvotes += 1;
                Comments.putComment($scope.suggestion, function () {
                    $location.path('suggestions/' + $scope.suggestion._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }

            $scope.edit = function () {
                $scope.suggestion.$update(function () {
                    $location.path('suggestions/' + $scope.suggestion._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            $scope.delete = function (suggestion) {
                if (suggestion) {
                    suggestion.$remove(function () {
                        for (var i in $scope.suggestions) {
                            if ($scope.suggestions[i] === suggestion) {
                                $scope.suggestions.splice(i, 1);
                            }
                        }
                    });
                } else {
                    $scope.suggestion.$remove(function () {
                        $location.path('/');
                    })
                }
            };
        }]);
