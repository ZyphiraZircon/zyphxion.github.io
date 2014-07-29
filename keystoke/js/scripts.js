var markPageApp = angular.module('keystokePageApp', []);

keystokePageApp.config(function ($routeProvider) {
	$routeProvider
		.when ('/start',
			{
				controller: 'LoadingController',
				templateUrl:'partials/Start.html'
			})
		.when ('/platform',
			{
				controller: 'LoadingController',
				templateUrl:'partials/Platform.html'
			})
		.otherwise({redirectTo: '/start' });
});

keystokePageApp.controller('LoadingController', function($scope) {
	$scope.stuff = "Things?";
});