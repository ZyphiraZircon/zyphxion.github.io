var keystokePageApp = angular.module('keystokePageApp', []);

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
		.when ('/thanks',
		{
			controller: 'DataController',
			templateUrl:'partials/Thanks.html'
		})
		.otherwise({redirectTo: '/start' })
		;
});

keystokePageApp.factory('Data', function () {
	return {message:"I'm data from a service/factory"}
})


keystokePageApp.controller('DataController', function($scope, Data) {
	$scope.data = Data;
	$scope.addTotal = function(value) {
		$scope.data.total += value;
	}
	
	$scope.sendEmail = function(){
		var path = 'http://immense-coast-1818.herokuapp.com/sendmail';
		var params = {
			"email" : $scope.data.email,
		    "total": $scope.data.total
		};
		// var http = new XMLHttpRequest();
		// http.open("POST", path, true);
		// http.setRequestHeader("Content-type", "application/json");
		// http.setRequestHeader("Content-length", params.length);
		// http.setRequestHeader("Connection", "close");
		// http.send(params);
		
		var form = document.createElement("form");
		form.setAttribute("method", 'POST');
		form.setAttribute("action", path);

		for(var key in params) {
			if(params.hasOwnProperty(key)) {
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);

				form.appendChild(hiddenField);
			 }
		}

		document.body.appendChild(form);
		form.submit();
		
	}
	
});






