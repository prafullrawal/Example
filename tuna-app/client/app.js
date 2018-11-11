// SPDX-License-Identifier: Apache-2.0

'use strict';

"scripts"; [
	"./bootstrap-notify.js",
	"./iot/script.js"
]


var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, $window,  appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	$("#success_holder_1").hide();
	//$("#error_holder_1").hide();
	$("#error_query_1").hide();

	// start first party //

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

				data.Key = id;
				$scope.query_record = data;
				$("#error_query").hide();
			}
		});
	}

	$scope.addRecord = function(){
		
		var id = $scope.tuna.id;
		var vessel = $scope.tuna.vessel;
		var holder = $scope.tuna.holder;
		if(id!=''&& typeof id!="undefined" && typeof vessel!="undefined" && typeof holder!="undefined" && vessel!='' && holder!=''){
			appFactory.addRecord($scope.tuna, function(data){
				$scope.create_tuna = data;
				$.notify({
					title: "<strong>Inserted in to the ledger with record Id : "+id+" and Tx.no.!!</strong> ",
					message: data
				});
			});
		}
		else
		{
			
		}	
	}

	$scope.sentItem = function(record){

		var req = record;

		console.log(req);

		appFactory.sentItem(req, function(data){
			
			$scope.sentItem_status = data;
			
			if ($scope.sentItem_status == "Error: no record found"){
				$.notify({
					title: "<strong>Error !!</strong> ",
					message: "No record found or some error occurred."
				},{
					type: 'danger'
				});
				return null;
			} else{
				$.notify({
					title: "<strong>Item sent successfully & updated record in ledger with Tx.no.!!</strong> ",
					message: data
				});
				
				// start sense temp 
				startIOT();
			}
			
		});
	}

	$scope.startReadingTempIOT=function(record){

		var req = record;
		
		appFactory.startReadingTempIOT(req,function(data){
		
			$.notify({
				title: "<strong>Error !! Item sent with record id : " + req +" is crossed the thresold temp Tx no :</strong> ",
				message: data	
			},{
				type: 'danger'
			});
		
		});

	}
	
	// End first party /


	// Start second party //

	$scope.queryRecord_1 = function(){

		var id = $scope.record_id;

		appFactory.queryRecord(id, function(data){

				$scope.query_record_1 = data;

				if ($scope.query_record_1 == "Could not locate tuna"){
						$("#error_query_1").show();
				} else{
					data.Key = id;
					$scope.query_record = data;
					$("#error_query_1").hide();
				}
		});
	}

	$scope.queryAllRecord_1 = function(){

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
						$scope.all_record_1 = array;
				});
	}

	$scope.receiveItem = function(record){

		var req = record.Key;

		console.log("inside receiveItem");
		
		appFactory.receiveItem(req, function(data){
			
			$scope.change_status = data;
			
			console.log();

			if ($scope.change_status == "Error: no record found"){
				$.notify({
					title: "<strong>Error !!</strong> ",
					message: "No record found or some error occurred."
				},{
					type: 'danger'
				});

			} else{
				$.notify({
					title: "<strong>updated successfully ledger as item received for id : "+req+" & Tx.no.!!</strong> ",
					message: data
				});
			}
		});
	}

	$scope.changeStatus = function(record){

		var req = record.Key;
		
		appFactory.changeStatus(req, function(data){
			$scope.change_status = data;
			if ($scope.change_status == "Error: no record found"){
				$.notify({
					title: "<strong>Error !!</strong> ",
					message: "No record found or some error occurred."
				},{
					type: 'danger'
				});

			} else{
				$.notify({
					title: "<strong>Updated record in ledger with Tx.no.!!</strong> ",
					message: data
				});
			}
		});
	}

	// End second party //
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

	factory.sentItem = function(id, callback){
		$http.get('/sent_item/'+id).success(function(output){
			callback(output)
		});
	}

	factory.startReadingTempIOT = function(id, callback){
		$http.get('/read_IOT_temp/'+id).success(function(output){
			callback(output)
		});
	},

	factory.receiveItem = function(id, callback){
    	$http.get('/receive_item/'+id).success(function(output){
			callback(output)
		});
	}

	
	
	return factory;

});


