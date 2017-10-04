/* jshint node:true */
/* global angular */
'use strict';

/**
 * The YouTube playlist module is defined here. This file must be called before the dependent files (controllers etc.)
 */
(function() {
    angular.module('nimbusYoutubeLibrary', []);
})();

/*
Notes:

 Wrap module in an IIFE to remove it from the global scope. This helps prevent variables and function declarations from
 living longer than expected in the global scope, which helps avoid variable collisions.
 */