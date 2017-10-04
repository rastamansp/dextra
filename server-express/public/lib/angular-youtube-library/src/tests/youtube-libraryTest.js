/* jshint node:true */
/* global describe, it, before, beforeEach, after, afterEach */
/* global expect */
'use strict';

describe('YouTube Library module - ', function() {
    var scope, $compile, $controller, ytServiceMock, $q;

    beforeEach(module('nimbusYoutubeLibrary'));
    beforeEach(inject(function( _$rootScope_, _$compile_, _$controller_, _$q_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $controller = _$controller_;
        $q = _$q_;
        ytServiceMock = mockYoutubeService($q);
    }));

    describe('The Playlist controller constructor', function() {
        it('defines the API', function() {
            var playlist = $controller('PlaylistController');
            scope.$apply();
            expect(playlist).toBeTruthy();
            // Duck Typing
            expect(playlist.getPlaylistIDs).toBeTruthy();
            expect(playlist.getPlayer).toBeTruthy();
            expect(playlist.getCurrentlyPlayingInfo).toBeTruthy();
            expect(playlist.createPlaylist).toBeTruthy();
            expect(playlist.playVideo).toBeTruthy();
            expect(playlist.playNext).toBeTruthy();
            expect(playlist.playPrev).toBeTruthy();
            expect(playlist.getTitles).toBeTruthy();
            expect(playlist.getDescriptions).toBeTruthy();
            expect(playlist.getInfoFor).toBeTruthy();
        });
    });

    describe('A fresh playlist controller', function() {

        var playlist;
        beforeEach(function() {
            playlist = $controller('PlaylistController', {YoutubeService: ytServiceMock});
            scope.$apply();
        });

        afterEach(function() {
            playlist = null;
        });

        it('maintains a single player instance', function() {
            var p1, p2, p3;
            playlist.getPlayer().then( function(player1) {
                p1 = player1;
                return playlist.getPlayer();
            }).then(function(player2) {
                p2 = player2;
                return playlist.getPlayer();
            }).then(function(player3) {
                p3 = player3;
            });
            scope.$apply(); //Resolve promises
            expect(p1).toBe(p2);
            expect(p1).toBe(p3);
        });

        it('returns an empty list of ids', function() {
            var pl = null;
            playlist.getPlaylistIDs().then(function(playlist) {
                pl = playlist;
            });
            scope.$apply(); //Resolve promises
            expect(pl).toEqual([]);
        });

        it('returns default currently playing info', function() {
            var info = {a:1};
            playlist.getCurrentlyPlayingInfo().then(function(i) {
                info = i;
            });
            scope.$apply(); //Resolve promises
            expect(info.id).toEqual(null);
        });

        it('returns empty title list', function() {
            expect(playlist.getTitles()).toEqual({});
        });

        it('returns null for getInfoFor', function() {
            var info = {};
            playlist.getInfoFor(0).then(function(i) {
                info = i;
            });
            scope.$apply();  //Resolve promises
            expect(info).toEqual(null);
        });
    });

    describe('The playlist controller driving a Player instance', function() {
        var playlist;

        beforeEach(function() {
            playlist = $controller('PlaylistController', {YoutubeService: ytServiceMock});
            scope.$apply();
        });

        it('throws an error if playlist ids or titles aren\'t provided', function() {
            expect(function() {
                playlist.createPlaylist()
            }).toThrow();

            expect(function() {
                playlist.createPlaylist(['v1', 'v2'])
            }).toThrow();
        });

        it('can create a playlist', function() {
            var idList=null;
            playlist.createPlaylist(['video1', 'video2', 'video3'], ['Video 1', 'Video 2', 'Video 3']).then(function(val){
                expect(val).toBeTruthy();
                return playlist.getPlaylistIDs();
            }).then(function (ids) {
                idList = ids;
            });
            scope.$apply();  //Resolve promises
            expect(idList).toEqual(['video1', 'video2', 'video3']);
            expect(playlist.getTitles()).toEqual({video1: 'Video 1', video2: 'Video 2', video3:'Video 3'});
        });

    });

    describe('The playlist controls a playlist', function() {
        var playlist;

        beforeEach(function() {
            playlist = $controller('PlaylistController', {YoutubeService: ytServiceMock});
            scope.$apply();
            playlist.createPlaylist(['video1', 'video2', 'video3'], ['Video 1', 'Video 2', 'Video 3'],
                ['Describe V1', 'Describe V2', 'Describe V3']);
            scope.$apply();  //Resolve promises
        });

        it('can play the first video', function() {
            playlist.playVideo(0);
            scope.$apply();  //Resolve promises
            var info=playlist.current;
            expect(info.id).toEqual('video1');
            expect(info.title).toEqual('Video 1');
            expect(info.description).toEqual('Describe V1');
        });

        it('can play the next video', function() {
            playlist.playVideo(0);
            playlist.playNext();
            var info = null;
            playlist.getCurrentlyPlayingInfo().then(function(i) {
                info = i;
            });
            scope.$apply();  //Resolve promises
            expect(info.id).toEqual('video2');
            expect(info.title).toEqual('Video 2');
            expect(info.description).toEqual('Describe V2');
        });
    })
});