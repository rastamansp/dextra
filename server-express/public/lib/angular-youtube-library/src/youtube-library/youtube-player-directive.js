/* jshint node:true */
/* global angular */

'use strict';

(function () {
    angular.module('nimbusYoutubeLibrary')
        .directive('nimbusYoutubePlayer', function () {
            return {
                restrict: 'E',
                scope: false,
                transclude: true,
                controller: 'PlaylistController',
                controllerAs: 'vc',
                template: '<div class="youtube-player" ng-transclude></div>',
                link: linkPlayer
            };
        })
        .directive('nimbusPlaylist', function() {
            return {
                restrict: 'E',
                replace: true,
                require: '^nimbusYoutubePlayer',
                scope: {},
                controller: ['$scope', function($scope) {
                    $scope.videoIds = [];
                    $scope.titles = [];
                    $scope.descriptions = [];

                    this.addEntry = function(entry) {
                        $scope.videoIds.push(entry.id);
                        $scope.titles.push(entry.title);
                        $scope.descriptions.push(entry.description || '');
                        console.log('Added playlist entry: ' + entry.id);
                    };
                }],
                link: function(scope, element, attrs, vc) {
                    scope.$on('youtubePlayerReady', function() {
                        vc.createPlaylist(scope.videoIds, scope.titles, scope.descriptions);
                    });
                }
            };
        })
        .directive('entry', function() {
            return {
                restrict: 'E',
                replace: true,
                require: '^nimbusPlaylist',
                scope: {
                    id: "@",
                    title: "@",
                    description: "@"
                },
                link: function(scope, element, attrs, pc) {
                    pc.addEntry(scope);
                }
            };
        });

    function linkPlayer(scope, element, attrs, vc) {
        var width = attrs.width;
        var height = attrs.height;
        var targetId = attrs.target;
        scope.$on('youtubeServiceReady', function() {
            console.log('Attaching player on ' + targetId + ' with ' + width + 'x' + height);
            vc.getPlayer(targetId, width, height).then(function () {
                console.log('Player attached');
            }, function(err) {
                console.log('Error getting player:', err);
            });
        });
    }
})();