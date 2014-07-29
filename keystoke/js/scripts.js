var markPageApp = angular.module('markPageApp', []);

markPageApp.config(function ($routeProvider) {
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

markPageApp.controller('LoadingController', function($scope) {
	$scope.stuff = "Things?";
});