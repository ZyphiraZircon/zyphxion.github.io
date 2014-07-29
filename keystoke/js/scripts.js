var keystokePageApp = angular.module('keystokePageApp', ['ui.bootstrap']);

keystokePageApp.config(function ($routeProvider) {
	$routeProvider
		.when ('/start',
		{
			controller: 'DataController',
			templateUrl:'partials/Start.html'
		})
		.when ('/platform',
		{
			controller: 'DataController',
			templateUrl:'partials/Platform.html'
		})
		.when ('/customization',
		{
			controller: 'DataController',
			templateUrl:'partials/Customization.html'
		})
		.when ('/login',
		{
			controller: 'DataController',
			templateUrl:'partials/Login.html'
		})
		.when ('/payments',
		{
			controller: 'DataController',
			templateUrl:'partials/Payments.html'
		})
		.when ('/datasync',
		{
			controller: 'DataController',
			templateUrl:'partials/Datasync.html'
		})
		.when ('/reviews',
		{
			controller: 'DataController',
			templateUrl:'partials/Reviews.html'
		})
		.when ('/profiles',
		{
			controller: 'DataController',
			templateUrl:'partials/Profiles.html'
		})
		.when ('/webinteg',
		{
			controller: 'DataController',
			templateUrl:'partials/Webinteg.html'
		})
		.when ('/location',
		{
			controller: 'DataController',
			templateUrl:'partials/Location.html'
		})
		.when ('/3rdparty',
		{
			controller: 'DataController',
			templateUrl:'partials/3rdparty.html'
		})
		.when ('/icon',
		{
			controller: 'DataController',
			templateUrl:'partials/Icon.html'
		})
		.when ('/stage',
		{
			controller: 'DataController',
			templateUrl:'partials/Stage.html'
		})
		.when ('/total',
		{
			controller: 'DataController',
			templateUrl:'partials/Total.html'
		})
		.otherwise({redirectTo: '/start' });
});

keystokePageApp.factory('Data', function () {
	return {message:"I'm data from a service/factory"}
})


keystokePageApp.controller('DataController', function($scope, Data) {
	$scope.data = Data;
	$scope.addTotal = function(value) {
		$scope.data.total += value;
	}
});