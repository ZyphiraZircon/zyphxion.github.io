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
	$scope.data = {
		mudras: [],
		displayMudras: [],
		effect: ''
	};
	//$scope.data.mudras = [];
	//$scope.data.displayMudras = [];
	//$scope.data.effect = '';

	  if ($scope.event.keyCode == 49 ){
	  	console.log($scope.event.keyCode);
	  	if ($scope.data.mudras.length < 3){
		    $scope.data.mudras.push('ten');
		    $scope.data.displayMudras.push('天');
		  }
	  }
	  else if ($scope.event.keyCode == 50 ){
	  	if ($scope.data.mudras.length < 3){
		    $scope.data.mudras.push('chi');
		    $scope.data.displayMudras.push('地');
		  }
	  }
	  else if ($scope.event.keyCode == 51 ){
	  	if ($scope.data.mudras.length < 3){
		    $scope.data.mudras.push('jin');
		    $scope.data.displayMudras.push('人');
		  }
	  }
	  else if ($scope.event.keyCode == 52 ){
	    $scope.checkNinjutsu();
	  }
	  //document.getElementById("mudra1").innerHTML = $scope.data.displayMudras[0];
	  //document.getElementById("mudra2").innerHTML = $scope.data.displayMudras[1];
	  //document.getElementById("mudra3").innerHTML = $scope.data.displayMudras[2];

	$scope.checkNinjutsu = function(){
		if ($scope.data.mudras.length == 1){
			$scope.data.effect = 'Fuma Shuriken';
		}
		else if ($scope.data.mudras.length == 2){
			if (($scope.data.mudras[0] === 'chi' && $scope.data.mudras[1] === 'ten') ||
				  ($scope.data.mudras[0] === 'jin' && $scope.data.mudras[1] === 'ten')){
				$scope.data.effect = 'Katon';
			}
			else if (($scope.data.mudras[0] === 'ten' && $scope.data.mudras[1] === 'chi') ||
				       ($scope.data.mudras[0] === 'jin' && $scope.data.mudras[1] === 'chi')){
				$scope.data.effect = 'Raiton';
			}
			else if (($scope.data.mudras[0] === 'ten' && $scope.data.mudras[1] === 'jin') ||
				       ($scope.data.mudras[0] === 'chi' && $scope.data.mudras[1] === 'jin')){
				$scope.data.effect = 'Hyoton';
			}
			else{
				$scope.data.effect = 'Rabbit Medium';
			}
		}
		else if ($scope.data.mudras.length == 3){
			if (($scope.data.mudras[0] === 'jin' && $scope.data.mudras[1] === 'chi' && $scope.data.mudras[2] === 'ten') ||
				  ($scope.data.mudras[0] === 'chi' && $scope.data.mudras[1] === 'jin' && $scope.data.mudras[2] === 'ten')){
				$scope.data.effect = 'Huton';
			}
			else if (($scope.data.mudras[0] === 'ten' && $scope.data.mudras[1] === 'jin' && $scope.data.mudras[2] === 'chi') ||
				       ($scope.data.mudras[0] === 'jin' && $scope.data.mudras[1] === 'ten' && $scope.data.mudras[2] === 'chi')){
				$scope.data.effect = 'Doton';
			}
			else if (($scope.data.mudras[0] === 'ten' && $scope.data.mudras[1] === 'chi' && $scope.data.mudras[2] === 'jin') ||
				       ($scope.data.mudras[0] === 'chi' && $scope.data.mudras[1] === 'ten' && $scope.data.mudras[2] === 'jin')){
				$scope.data.effect = 'Suiton';
			}
			else{
				$scope.data.effect = 'Rabbit Medium';
			}
		}
		document.getElementById("effect").innerHTML = $scope.data.effect;
		console.log(JSON.stringify($scope.data.mudras));
		console.log($scope.data.effect);
		$scope.data.mudras = [];
		$scope.data.displayMudras = [];
	};

});






