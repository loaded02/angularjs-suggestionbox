angular.module('suggestionList')
    .controller('SuggestionListController', [
        '$scope',
        '$routeParams',
        '$location',
        'Suggestions',
        'Authentication',
        function($scope, $routeparams, $location, Suggestions, Authentication) {
            $scope.authentication = Authentication;

            $scope.create = function() {
                //if input empty, don't submit
                if(!$scope.title || $scope.title === "") {
                    return;
                }
                var suggestion = new Suggestions({
                    title: this.title
                });
                suggestion.$save(function (response) {
                    $location.path('suggestions/' + response._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
                //after submit, clear input
                $scope.title = '';
            };

            $scope.find = function () {
                $scope.suggestions = Suggestions.query();
            };

            $scope.findOne = function () {
                $scope.suggestion = Suggestions.get({
                    suggestionId: $routeParams.suggestionId
                });
            };

            $scope.update = function() {
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
                        $location.path('suggestions');
                    });
                }
            };

            $scope.upVote = function(suggestion) {
                suggestion.upvotes += 1;
            };
        }]);
