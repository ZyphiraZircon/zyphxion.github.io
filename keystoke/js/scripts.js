var keystokePageApp = angular.module('keystokePageApp', []);

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
		.when ('/customization',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Customization.html'
		})
		.when ('/login',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Login.html'
		})
		.when ('/payments',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Payments.html'
		})
		.when ('/datasync',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Datasync.html'
		})
		.when ('/reviews',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Reviews.html'
		})
		.when ('/profiles',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Profiles.html'
		})
		.when ('/webinteg',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Webinteg.html'
		})
		.when ('/location',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Location.html'
		})
		.when ('/3rdparty',
		{
			controller: 'LoadingController',
			templateUrl:'partials/3rdparty.html'
		})
		.when ('/icon',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Icon.html'
		})
		.when ('/stage',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Stage.html'
		})
		.when ('/total',
		{
			controller: 'LoadingController',
			templateUrl:'partials/Total.html'
		})
		.otherwise({redirectTo: '/start' });
});

keystokePageApp.controller('LoadingController', function($scope) {
	$scope.stuff = "Things?";
});