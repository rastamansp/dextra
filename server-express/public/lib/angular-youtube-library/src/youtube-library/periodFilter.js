/* jshint node:true */
/* global angular */
'use strict';
(function () {
    angular.module('nimbusYoutubeLibrary')
        .filter('period', function() {
            return function(seconds) {
                if (typeof seconds === 'string') {
                    seconds = parseFloat(seconds);
                }
                if (isNaN(seconds)) {
                    return '--';
                }
                var hours = Math.floor(seconds/3600.0);
                var rem = seconds - hours*3600;
                var minutes = Math.floor(rem/60.0);
                rem = rem - minutes*60;
                return pad(hours,2) + ":" + pad(minutes,2) + ":" + pad(rem.toFixed(1),4);
            };

            function pad(s,n) {
                var result = s + '';
                if (result.length < n) {
                    var i;
                    for (i=0; i< n - result.length; i++) {
                        result = '0' + result;
                    }
                }
                return result;
            }
        });
})();