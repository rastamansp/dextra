/* jshint node:true */
/* global describe, it, before, beforeEach, after, afterEach */
/* global expect */
'use strict';

describe('The Period filter', function () {
    var $filter;

    beforeEach(function () {
        module('nimbusYoutubeLibrary');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should convert a short period', function () {
        var result = $filter('period')(23.12);
        expect(result).toEqual('00:00:23.1');
    });

    it('should convert zero', function () {
        var result = $filter('period')(0);
        expect(result).toEqual('00:00:00.0');
    });

    it('should handle a string', function () {
        var result = $filter('period')('15');
        expect(result).toEqual('00:00:15.0');
    });

    it('pads where necessary', function () {
        var result = $filter('period')('3601');
        expect(result).toEqual('01:00:01.0');
    });

    it('should handle invalid input', function () {
        var result = $filter('period')('Seven');
        expect(result).toEqual('--');
    });
});