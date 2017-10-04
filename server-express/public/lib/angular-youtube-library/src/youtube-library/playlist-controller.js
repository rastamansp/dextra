/* jshint node:true */
/* global angular */

'use strict';

/**
 * The Playlist Controller maintains a list of Youtube video IDs as well as some Metadata for display purposes,
 * like titles and descriptions
 */
(function () {
    angular.module('nimbusYoutubeLibrary')
        .controller('PlaylistController', ['YoutubeService', '$q', PlaylistController]);

    function PlaylistController(YoutubeService, $q) {
        var self = this;
        self.titles = {};
        self.descriptions = {};
        self.titleDescriptions = {};
        self.current = {
            title: 'Nothing playing',
            duration: 0.0,
            description: 'No description',
            id: null
        };
        self.state = {value: -1};
        self.getPlayer = getPlayer;
        self.getPlaylistIDs = getPlaylistIDs;
        self.getCurrentlyPlayingInfo = getCurrentlyPlayingInfo;
        self.createPlaylist = createPlaylist;
        self.playNext = playNext;
        self.playPrev = playPrev;
        self.playVideo = playVideo;
        self.getTitles = getTitles;
        self.getDescriptions = getDescriptions;
        self.getInfoFor = getInfoFor;
        self.getTitleAndDescriptions = getTitleAndDescriptions;
        self._playerPromise = null;

        function onStateChange(event) {
            self.state.value = event.data;
            getCurrentlyPlayingInfo().then(setCurrent);
        }

        /**
         * Returns a promise for a YouTube player instance. Each controller maintains a single instance of YT.Player,
         * so multiple calls to this method will resolve to the same object.
         * @return {Promise|{player}}
         */
        function getPlayer(id, width, height) {
            if (!self._playerPromise) {
                console.log('Requesting new player instance');
                self._playerPromise = YoutubeService.getPlayer(id, width, height, onStateChange);
            }
            return self._playerPromise;
        }

        /**
         * Like it says, it takes the YT.Player method call and wraps it inside a promise that is resolved when that
         * function returns
         * @param functionName
         * @return {Function}
         */
        function wrapPlayerCallInPromise(functionName) {
            var q = $q.defer();
            self.getPlayer().then(function (player) {
                q.resolve(player[functionName]());
            });
            return q.promise;
        }

        /**
         * Returns a promise that resolves to the video ID list of the current playlist
         * @return {Promise}
         */
        function getPlaylistIDs() {
            return wrapPlayerCallInPromise('getPlaylist');
        }

        /**
         * Returns a promise that resolves to the current video information, or null, if no video is playing.
         * @return {Promise}
         */
        function getCurrentlyPlayingInfo() {
            var q = $q.defer();
            self.getPlayer().then(function (player) {
                if (self.state.value > 0) {
                    var duration = player.getDuration();
                    var ids = player.getPlaylist();
                    var index = player.getPlaylistIndex();
                    var id = ids[index];
                    q.resolve({
                        id: id,
                        title: self.titles[id],
                        description: self.descriptions[id],
                        duration: duration
                    });
                } else {
                    q.resolve({
                        id: null,
                        title: 'Nothing playing',
                        description: '',
                        duration: 0.0
                    });
                }
            });
            return q.promise;
        }

        /**
         * Creates a new playlist for the YT.Player instance. Also additional metadata for the titles and descriptions
         * are stored locally for display purposes
         * @param {Array} ids - a list of video ID strings
         * @param {Array} titles - Custom titles for the video IDs. Must be same length and order as ids
         * @param {Array} descriptions - optional. Description HTML strings. Must be same length and order as ids
         */
        function createPlaylist(ids, titles, descriptions) {
            if (!ids) {
                throw new Error('ids must be provided when adding a playlist entry');
            }
            if (!titles) {
                throw new Error('Titles must be provided when adding a playlist entry');
            }
            angular.copy({}, self.titles);
            angular.copy({}, self.descriptions);
            angular.copy({}, self.titleDescriptions);
            var i;
            for (i = 0; i < ids.length; i++) {
                self.titles[ids[i]] = titles[i];
                if (descriptions) {
                    self.descriptions[ids[i]] = descriptions[i];
                } else {
                    self.descriptions[ids[i]] = '';
                }
                self.titleDescriptions[ids[i]] = {
                    title: titles[i],
                    description: self.descriptions[ids[i]]
                }
            }
            var q = $q.defer();
            self.getPlayer().then(function (player) {
                player.cuePlaylist({
                    playlist: ids
                });
                q.resolve(true);
            });
            return q.promise;
        }

        function setCurrent(info) {
            self.current.id = info.id;
            self.current.title = info.title;
            self.current.description = info.description;
            self.current.duration = info.duration;
        }

        function playNext() {
            wrapPlayerCallInPromise('nextVideo');
        }

        function playPrev() {
            wrapPlayerCallInPromise('previousVideo');
        }

        function playVideo(index) {
            var q = $q.defer();
            self.getPlayer().then(function (player) {
                player.playVideoAt(index);
                getCurrentlyPlayingInfo().then(function (info) {
                    setCurrent(info);
                    q.resolve();
                });
            });
            return q.promise;
        }

        function getTitles() {
            return self.titles;
        }

        function getDescriptions() {
            return self.descriptions;
        }

        function getTitleAndDescriptions() {
            return self.titleDescriptions;
        }

        function getInfoFor(index) {
            var q = $q.defer();
            self.getPlayer().then(function (player) {
                var ids = player.getPlaylist();
                if (!ids) {
                    q.resolve(null);
                } else {
                    var id = index < ids.length ? ids[index] : null;
                    if (id) {
                        q.resolve({
                            id: id,
                            title: self.titles[id],
                            description: self.descriptions[id]
                        });
                    } else {
                        q.resolve(null);
                    }
                }
            });
            return q.promise;
        }
    }
})();

/*
 Notes:
 Wrap module in an IIFE to remove it from the global scope. This helps prevent variables and function declarations from
 living longer than expected in the global scope, which helps avoid variable collisions.
 */