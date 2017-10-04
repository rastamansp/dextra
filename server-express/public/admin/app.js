angular.module('gwan', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'ngStorage', 'ngLodash', 'ui.bootstrap', 'angularMoment'])
    .config(function($stateProvider, $urlRouterProvider, $authProvider) {
        $stateProvider
        ///// HEADER E FOOTER ESTATICOS
            .state('root', {
            url: '',
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'pages/partials/header.html',
                    controller: 'MenuController',
                    controllerAs: 'nav'
                }
            }
        })

        .state('root.home', {
            url: '/',
            views: {
                'container@': {
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    templateUrl: 'pages/partials/dashboard.html'
                }
            }
        })

        .state('root.eventPeople', {
            url: '/eventPeople',
            views: {
                'container@': {
                    controller: 'PeopleEventsController',
                    controllerAs: 'vm',
                    templateUrl: 'pages/partials/peopleEvents.html'
                }
            }
        })


        .state('root.userProfile', {
            url: '/userProfile/:userID',
            views: {
                'container@': {
                    controller: 'UserProfileController',
                    controllerAs: 'vm',
                    templateUrl: 'pages/partials/userProfile.html'
                }
            }
        })

        .state('root.reports', {
            url: '/reports',
            views: {
                'container@': {
                    controller: 'ReportController',
                    controllerAs: 'vm',
                    templateUrl: 'pages/partials/reports.html'
                }
            }
        })

        .state('root.settings', {
            url: '/settings',
            views: {
                'container@': {
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    templateUrl: 'pages/partials/settings.html'
                }
            }
        })

        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            views: {
                'container@': {
                    controller: 'LoginCtrl',
                    controllerAs: 'vm',
                    templateUrl: 'login.html'
                }
            },
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        });

        $urlRouterProvider.otherwise('/');

        function skipIfLoggedIn($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }

            return deferred.promise;
        }

        $authProvider.loginUrl = 'http://localhost.gwan.io:32000/usuarios/v1/login';

        $authProvider.facebook({
            clientId: '615579828490738',
            redirectUri: window.location.origin + '/',
            url: "/auth/facebook",
            name: 'facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            requiredUrlParams: ['display', 'scope'],
            scope: ['public_profile', 'email', 'user_friends', 'user_birthday', 'user_events', 'user_location', 'user_likes', 'rsvp_event'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 580, height: 400 }
        });

        $authProvider.instagram({
            clientId: '132fdbe133e347a3a83d7d901dd73ff3',
            redirectUri: window.location.origin + "/auth/instagram",
            //url:          		window.location.origin + "/auth/instagram",
            name: 'instagram',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
            requiredUrlParams: ['scope'],
            scope: ['basic', 'public_content', 'follower_list', 'comments', 'relationships', 'likes'],
            scopeDelimiter: '+',
            type: '2.0'

            /*
            basic - to read a user’s profile info and media
            public_content - to read any public profile info and media on a user’s behalf
            follower_list - to read the list of followers and followed-by users
            comments - to post and delete comments on a user’s behalf
            relationships - to follow and unfollow accounts on a user’s behalf
            likes - to like and unlike media on a user’s behalf
            */
        });
    })
    ///// add moment constante
    .constant("moment", moment)
    .config(function($authProvider) {
        var commonConfig = {
            popupOptions: {
                location: 'no',
                toolbar: 'yes',
                width: 580,
                height: 400
            }
        };

        // Facebook
        $authProvider.facebook({
            clientId: '615579828490738',
            name: 'facebook',
            url: 'http://gwan.io/api/facebook/getToken',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email', 'user_about_me'],
            scopeDelimiter: ',',
            display: 'popup',
            oauthType: '2.0',
        });

    });