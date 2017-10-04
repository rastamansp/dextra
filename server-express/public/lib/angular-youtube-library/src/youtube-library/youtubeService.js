/* jshint node:true */
/* global angular */

(function () {
    angular.module('nimbusYoutubeLibrary').factory('YoutubeService', ['$rootScope', '$q', '$window', YoutubeService]);

    function YoutubeService($rootScope, $q, $window) {
        var document = $window.document;
        $window.onYouTubeIframeAPIReady = applyServiceIsReady;
        var script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
        var service = {ready: false};

        function applyServiceIsReady() {
            console.log('YT library is ready');
            service.ready = true;
            $rootScope.$broadcast('youtubeServiceReady');
        }

        function getPlayer(elementId, width, height, onPlayerStateChange) {
            console.log(service);
            if (!service.ready) {
                return $q.reject('YouTube service is not ready. Cannot create player');
            }
            var q = $q.defer();
            var options = {
                height: height,
                width: width,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            };
            new YT.Player(elementId, options);
            function onPlayerReady(event) {
                $rootScope.$broadcast('youtubePlayerReady');
                q.resolve(event.target);
            }

            function onPlayerError(error) {
                var msg;
                switch (error.data) {
                    case 2:
                        msg = "The request contains an invalid parameter value.";
                        break;
                    case 5:
                        msg = "The requested content cannot be played in an HTML5 player";
                        break;
                    case 100:
                    case 150:
                        msg = "The video requested was not found.";
                        break;
                }
                q.reject(new Error('Could not create new YouTube player because ' + msg));
            }

            return q.promise;
        }

        service.getPlayer = getPlayer;
        return service;
    }
})();