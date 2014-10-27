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
	$scope.displayMudras = [];
	$scope.effect = '';

	document.onkeyup = function(e) {
	  if (e.keyCode == 49 ){
	  	if ($scope.mudras.length < 3){
		    $scope.mudras.push('ten');
		    $scope.displayMudras.push('天');
		  }
	  }
	  else if (e.keyCode == 50 ){
	  	if ($scope.mudras.length < 3){
		    $scope.mudras.push('chi');
		    $scope.displayMudras.push('地');
		  }
	  }
	  else if (e.keyCode == 51 ){
	  	if ($scope.mudras.length < 3){
		    $scope.mudras.push('jin');
		    $scope.displayMudras.push('人');
		  }
	  }
	  else if (e.keyCode == 52 ){
	    $scope.checkNinjutsu();
	  }
	};

	$scope.checkNinjutsu = function(){
		if ($scope.mudras.length == 1){
			$scope.effect = 'Fuma Shuriken';
		}
		else if ($scope.mudras.length == 2){
			if (($scope.mudras[0] === 'chi' && $scope.mudras[1] === 'ten') ||
				  ($scope.mudras[0] === 'jin' && $scope.mudras[1] === 'ten')){
				$scope.effect = 'Katon';
			}
			else if (($scope.mudras[0] === 'ten' && $scope.mudras[1] === 'chi') ||
				       ($scope.mudras[0] === 'jin' && $scope.mudras[1] === 'chi')){
				$scope.effect = 'Raiton';
			}
			else if (($scope.mudras[0] === 'ten' && $scope.mudras[1] === 'jin') ||
				       ($scope.mudras[0] === 'chi' && $scope.mudras[1] === 'jin')){
				$scope.effect = 'Hyoton';
			}
			else{
				$scope.effect = 'Rabbit Medium';
			}
		}
		else if ($scope.mudras.length == 3){
			if (($scope.mudras[0] === 'jin' && $scope.mudras[1] === 'chi' && $scope.mudras[2] === 'ten') ||
				  ($scope.mudras[0] === 'chi' && $scope.mudras[1] === 'jin' && $scope.mudras[2] === 'ten')){
				$scope.effect = 'Huton';
			}
			else if (($scope.mudras[0] === 'ten' && $scope.mudras[1] === 'jin' && $scope.mudras[2] === 'chi') ||
				       ($scope.mudras[0] === 'jin' && $scope.mudras[1] === 'ten' && $scope.mudras[2] === 'chi')){
				$scope.effect = 'Doton';
			}
			else if (($scope.mudras[0] === 'ten' && $scope.mudras[1] === 'chi' && $scope.mudras[2] === 'jin') ||
				       ($scope.mudras[0] === 'chi' && $scope.mudras[1] === 'ten' && $scope.mudras[2] === 'jin')){
				$scope.effect = 'Suiton';
			}
			else{
				$scope.effect = 'Rabbit Medium';
			}
		}
		console.log(JSON.stringify($scope.mudras));
		console.log($scope.effect);
		$scope.mudras = [];
	};

});






