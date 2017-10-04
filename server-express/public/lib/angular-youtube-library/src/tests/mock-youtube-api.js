/* jshint node:true */
'use strict';

var events = (function () {
    var topics = {};
    var hOP = topics.hasOwnProperty;

    return {
        subscribe: function (topic, listener) {
            // Create the topic's object if not yet created
            if (!hOP.call(topics, topic)) topics[topic] = [];

            // Add the listener to queue
            var index = topics[topic].push(listener) - 1;

            // Provide handle back for removal of topic
            return {
                remove: function () {
                    delete topics[topic][index];
                }
            };
        },
        publish: function (topic, info) {
            // If the topic doesn't exist, or there's no listeners in queue, just leave
            if (!hOP.call(topics, topic)) return;

            // Cycle through topics queue, fire!
            topics[topic].forEach(function (item) {
                item(info != undefined ? info : {});
            });
        }
    };
})();

var PlayerState = {
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
};

var MockPlayer = function (id, options) {
    this.options = options;
    this.id = id;
    this.playedFraction = 0.0;
    this.state = -1;
    this.duration = 60;
    this.playlist = [];
    this.current = null;
    this.cued = null;
    this.playlistPos = 0;
    events.publish('onReady', {target: this});
};

MockPlayer.prototype.loadVideoById = function (options) {
    events.publish('onStateChange', {target: this, data: -1});
    this.current = options;
    this.state = PlayerState.PLAYING;
    events.publish('onStateChange', {target: this, data: PlayerState.PLAYING});
};

MockPlayer.prototype.cueVideoById = function (options) {
    this.cued = options;
    this.state = PlayerState.CUED;
    events.publish('onStateChange', {target: this, data: PlayerState.CUED})
};

MockPlayer.prototype.loadPlaylist = function (options) {
    this.playlist = options.playlist;
    this.playlistPos = 0;
    this.playVideoAt(0);
};

MockPlayer.prototype.cuePlaylist = function (options) {
    this.playlist = options.playlist;
    this.playlistPos = 0;
    this.state = PlayerState.CUED;
    events.publish('onStateChange', {target: this, data: PlayerState.CUED});
};

MockPlayer.prototype.playVideo = function () {
    if (!this.current && this.cued) {
        events.publish('onError', {data: 2});
        return
    }
    this.current = this.current || this.cued;
    this.state = PlayerState.PLAYING;
    events.publish('onStateChange', {target: this, data: PlayerState.PLAYING});
};

MockPlayer.prototype.pauseVideo = function () {
    this.state = 2;
    events.publish('onStateChange', {target: this, data: PlayerState.PAUSED});
};

MockPlayer.prototype.stopVideo = function () {
    this.state = 0;
    this.current = null;
    events.publish('onStateChange', {target: this, data: PlayerState.ENDED});

};

MockPlayer.prototype.seekTo = function (seconds, allowSeekAhead) {};
MockPlayer.prototype.clearVideo = function () {
    this.stopVideo();
};

MockPlayer.prototype.nextVideo = function () {
    if (!this.playlist) {
        this.stopVideo();
    }
    this.playlistPos++;
    if (this.playlistPos >= this.playlist.length) {
        this.stopVideo();
    } else {
        this.current = this.playlist[this.playlistPos];
        this.playVideoAt(this.playlistPos);
    }
};

MockPlayer.prototype.previousVideo = function () {
    if (!this.playlist) {
        this.stopVideo();
    }
    this.playlistPos = this.playlistPos == 0 ? 0 : this.playlistPos - 1;
    if (this.playlistPos >= this.playlist.length) {
        this.stopVideo();
    } else {
        this.current = this.playlist[this.playlistPos];
        this.playVideoAt(this.playlistPos);
    }
};

MockPlayer.prototype.playVideoAt = function (i) {
    this.current = this.playlist[i];
    this.playVideo();
};

MockPlayer.prototype.getVideoLoadedFraction = function () {
    return this.playedFraction;
};

MockPlayer.prototype.getPlayerState = function () {
    return this.state;
};

MockPlayer.prototype.getDuration = function () {
    return this.duration;
};

MockPlayer.prototype.getPlaylist = function () {
    return this.playlist;
};

MockPlayer.prototype.getPlaylistIndex = function () {
    return this.playlistPos;
};

var YT = {
    Player: MockPlayer,
    PlayerState: PlayerState,
    ready: function() {},
    events: events
};




