module.exports = function (grunt) {
    "use strict";

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Default task.
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'karma', 'build']);

    var testConfig = function (configFile, customOptions) {
        var options = {configFile: configFile, keepalive: true};
        var travisOptions = process.env.TRAVIS && {browsers: ['Firefox'], reporters: 'dots'};
        return grunt.util._.extend(options, customOptions, travisOptions);
    };

    // Project configuration.
    grunt.initConfig({
        src: {
            html: ['demo/index.html'],
        },
        pkg: grunt.file.readJSON('package.json'),
        dist: 'dist',
        filename: 'nimbusYoutubeLibrary',
        banner: '/* <%= pkg.name %> -v<%= pkg.version %>\n<%= pkg.description %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n*/\n',
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        concat: {
            dist: {
                options: {
                    banner: '<%= banner %>',
                    stripBanners: true
                },
                src: ['src/youtube-library/youtube-library-module.js','src/youtube-library/*'],
                dest: 'dist/<%= filename %>-<%= pkg.version %>.js'
            }
        },
        uglify: {
            all: {
                src: ['dist/<%= filename %>-<%= pkg.version %>.js'],
                dest: 'dist/<%= filename %>-<%= pkg.version %>.min.js',
                preserveComments: false,
                banner: '<%= banner %>'
            }
        },
        jshint: {
            files: ['src/youtube-library/*.js']
        },
        // Configuration to be run (and then tested).
        protractor: {
            options: {
                keepAlive: false
            },
            testTargetConfigFile: {
                configFile: "tests/e2e.conf.js"
            }
        }
    });
};