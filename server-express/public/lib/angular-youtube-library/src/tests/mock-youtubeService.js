/* jshint node:true */
'use strict';

function mockYoutubeService($q) {
    return {
        getPlayer: function (elementId, width, height, onPlayerStateChange) {
            YT.events.subscribe('onStateChange', onPlayerStateChange);
            return $q.resolve(new YT.Player());
        }
    }
}
