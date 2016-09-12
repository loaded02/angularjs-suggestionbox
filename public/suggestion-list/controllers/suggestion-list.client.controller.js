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
                    title: this.title,
                    body: this.body
                });
                suggestion.$save(function (response) {
                    $location.path('suggestions/' + response._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
                //after submit, clear input
                $scope.title = '';
                $scope.body = '';
            };

            $scope.find = function () {
                $scope.suggestions = Suggestions.query();
            };

            $scope.upVote = function(suggestion) {
                if (suggestion) {
                    suggestion.upvotes += 1;
                    suggestion.$update(function () {
                        $location.path('/');
                    }, function (errorResponse) {
                        $scope.error = errorResponse.data.message;
                    })
                }
            };
        }]);
