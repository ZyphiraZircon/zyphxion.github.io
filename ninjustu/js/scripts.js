var ninjutsuApp = angular.module('ninjutsuApp', ['ngRoute']);

ninjutsuApp.config(function ($routeProvider) {
	$routeProvider
		.when ('/start',
		{
			controller: 'DataController',
			templateUrl:'partials/Start.html'
		})
		.otherwise({redirectTo: '/start' })
		;
});

ninjutsuApp.factory('Data', function () {
	return {message:"I'm data from a service/factory"}
});


ninjutsuApp.controller('DataController', function($scope, Data) {
	$scope.data = Data;
	$scope.mudras = [];

	document.onkeyup = function(e) {
	  if (e.keyCode == 49 ){
	    $scope.mudras.push('ten');
	    $scope.checkNinjutsu();
	  }
	  else if (e.keyCode == 50 ){
	    $scope.mudras.push('chi');
	    $scope.checkNinjutsu();
	  }
	  else if (e.keyCode == 51 ){
	    $scope.mudras.push('jin');
	    $scope.checkNinjutsu();
	  }
	};

	$scope.checkNinjutsu = function(){
		if ($scope.mudras.length <= 1){
			//do nothing
		}
		$scope.stringMudras = JSON.stringify($scope.mudras);
	};

});






