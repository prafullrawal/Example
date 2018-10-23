// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();

	$scope.statusAction = false;
	
	$scope.queryAllRecord = function(){

		appFactory.queryAllRecord(function(data){

			var array = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}

			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_record = array;
		});
	}

	$scope.queryRecord = function(){

		var id = $scope.tuna_id;

		appFactory.queryRecord(id, function(data){

			$scope.query_record = data;

			if ($scope.query_record == "Could not locate tuna"){
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.addRecord = function(){

		appFactory.addRecord($scope.tuna, function(data){
			$scope.create_tuna = data;
			$("#success_create").show();
		});
	}

	$scope.changeStatus = function(record){

		var req = record.Key;
		
		appFactory.changeStatus(req, function(data){
			$scope.change_status = data;
			if ($scope.change_status == "Error: no tuna catch found"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
		});
	}

});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllRecord = function(callback){
	
    	$http.get('/get_all_record/').success(function(output){
			callback(output)
		});
	}

	factory.queryRecord = function(id, callback){
    	$http.get('/get_record/'+id).success(function(output){
			callback(output)
		});
	}

	factory.addRecord = function(data, callback){
        
		var tuna = data.id + "-" + data.holder + "-" + data.vessel;

    	$http.get('/add_record/'+tuna).success(function(output){
			callback(output)
		});
	}

	factory.changeStatus = function(data, callback){

		console.log("req for change status record id : "+data);

		var record_id = data;

      	 	$http.get('/change_status/'+record_id).success(function(output){
			callback(output)
		});
	}

	return factory;
});


