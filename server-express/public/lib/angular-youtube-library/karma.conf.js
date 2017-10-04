module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'demo/bower_components/angular/angular.js',
            'demo/bower_components/angular-route/angular-route.js',
            'demo/bower_components/angular-mocks/angular-mocks.js',
            'src/youtube-library/youtube-library-module.js',
            'src/tests/mock-youtube-api.js',
            'src/tests/mock-youtubeService.js',
            'src/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
