angular.module('suggestionList')
    .controller('SuggestionListController', [
        '$scope',
        '$routeParams',
        '$location',
        'Suggestions',
        'Authentication',
        '$anchorScroll',
        function($scope, $routeparams, $location, Suggestions, Authentication, $anchorScroll) {
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

            $scope.scrollTo = function(id) {
                var old = $location.hash();
                $location.hash(id);
                $anchorScroll();
                //reset to old to keep any additional routing logic from kicking in
                $location.hash(old);
            };

            var mymap = L.map('mapid').setView([49.872, 8.65], 13);
            L.tileLayer.provider('OpenStreetMap.Mapnik', {}).addTo(mymap);
            var marker = L.marker([49.87, 8.65]).addTo(mymap);
            marker.bindPopup("<b>Come visit us!</b><br>We welcome you.").openPopup();
        }]);
