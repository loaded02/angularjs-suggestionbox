/**
 * Created by moritz on 12.09.16.
 */
angular.module('photos').controller('photoController', [
    '$scope',
    '$http',
    '$location',
    'Comments',
    function($scope, $http, $location, Comments) {
        $http.get('/api/photos')
            .success(function(data, status, headers, config) {
                $scope.photos = data;
                $scope.photo = $scope.photos[0];
                $scope.loadComments();
            })
            .error(function(data, status, headers, config) {
                $scope.photos = [];
            });

        $scope.loadComments = function(){
            $scope.commentThread = Comments.get({
                commentThreadId: $scope.photo.commentId
            });
        };

        $scope.update = function(parentCommentId, subject, body){
            var newComment = new Comments({
                subject:subject,
                body:body
            });

            $scope.commentThread.$update({
                commentThreadId: $scope.photo.commentId,
                newComment: newComment,
                parentCommentId: parentCommentId
            }, function () {
                $location.path('/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            $scope.loadComments();
        };

        $scope.setPhoto = function(photoId){
            $http.get('/api/photo', {params: {photoId: photoId}})
                .success(function(data, status, headers, config) {
                    $scope.photo = data;
                    $scope.loadComments();
                })
                .error(function(data, status, headers, config) {
                    $scope.photo = {};
                });
        };
    }]);