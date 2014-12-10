'use strict';

/**
 * @ngdoc object
 * @name core.config
 * @requires ng.$stateProvider
 * @requires ng.$urlRouterProvider
 * @description Defines the routes and other config within the core module
 */
angular
    .module(ApplicationConfiguration.applicationModuleName)
    .config(['$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise('/');

            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the path is `'/'`, route to home
             * */
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'modules/core/views/home.html',
                    controller: 'HomeController',
                    resolve: {
                        data: function() {
                            console.log("reload home");
                        }
                    }
                })
                .state('start', {
                    url: '/start',
                    templateUrl: 'modules/core/views/start.html',
                    controller: 'OwnerStartPageController',
                    resolve: {
                        data: ['$state', 'AuthFactory', function($state, AuthFactory) {
                            console.log("PELLE LOAD");
                            if (!AuthFactory.hasToken()) {
                                console.log("PELLE LOAD fail not auth");
                                $state.go('home');
                            }
                        }]
                    }
                })

        }
    ]);
