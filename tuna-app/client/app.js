// SPDX-License-Identifier: Apache-2.0

'use strict';

"scripts"; [
	"./bootstrap-notify.js"
]



var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	$("#success_holder_1").hide();
	//$("#error_holder_1").hide();
	$("#error_query_1").hide();
	
	

	// login function

	$scope.loginUser=function(){
		 $('#cover-spin').show(0);	
		appFactory.loginUser($scope.login,function(data){
		$('#cover-spin').hide(0);
		if (data.status == "200") {
			if(data.role == "supplier"){
	               		 window.location.href = '/HTML/supplierLanding.html';
			}else{
				window.location.href = '/HTML/receiverLanding.html';
			}
            } else {
			 $.notify({
                                icon: "fas fa-exclamation-triangle",
                                title: "<strong>"+data.message+"</strong>",
				message:".",
                        },{
                                type: 'danger',
				placement: {
					from: "top",
					align: "center"
				},
				offset: {
					x: 180,
					y: 170
				}
			//	z_index: 100
                        });

           	 }

		});
	}
	

	// start first party //

	$scope.queryAllRecord = function(){
		var array = [];	
		$('#cover-spin').show(0);	
		for(var i=0;i<2;i++){
		if(i=='0')
		var channelUserPort = 'firstchannel+user1+7051';	
		else
		var channelUserPort = 'secondchannel+user1+7051';
	
		appFactory.queryAllRecord(channelUserPort,function(data){

		$('#cover-spin').hide(0);
			
			console.log(data);	
		
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}

			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
		});
		}
		$scope.all_record = array;
	}

	$scope.queryRecord = function(){
	
	$('#cover-spin').show(0);

		var id = $scope.tuna_id;
		
		appFactory.queryRecord(id, function(data){
			
			 $('#cover-spin').hide(0);
				
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
		var id = $scope.tuna.price;
		var vessel = $scope.tuna.vessel;
		var holder = $scope.tuna.holder;
		if(id!=''&& typeof id!="undefined" && typeof vessel!="undefined" && typeof holder!="undefined" && vessel!='' && holder!=''){
			 $('#cover-spin').show(0);
			appFactory.addRecord($scope.tuna, function(data){
				$scope.create_tuna = data;
				 $('#cover-spin').hide(0);
				$.notify({
					icon: "far fa-handshake", 
					title: "<strong>success !! Inserted in to the ledger with record Id : "+id+" and Tx.no:</strong> ",
					message: data
					},{
						 offset: {
                                       				x: 0,
                			                        y: 233
		                               		 }
	
					
				});
			});
		}
		else
		{
		}	
	}

	$scope.sentItem = function(data){
	
	$scope.shipment = {};        
	$scope.shipment.id = Date.now();
	var dateUTC = new Date(); var dateUTC = dateUTC.getTime(); var dateIST = new Date(dateUTC); dateIST.setHours(dateIST.getHours() + 5);  dateIST.setMinutes(dateIST.getMinutes() + 30); 		
	var timestamp1 = dateIST.toLocaleString();
	var timestamp1 = timestamp1.replace(',','');
	$scope.shipment.senttime = timestamp1;
	$scope.shipment.channeluserport = $('#sentToDist').val();		

	var arr = [];	
	data.forEach(function(element){
		if(element.selected=='Y'){
			arr.push(element.Key);
		}
	});
	 
		
	for(var i=0 ; i < arr.length ; i++)
	{	
		$scope.shipment.key = arr[i];
					
		$('#cover-spin').show(0);
		appFactory.sentItem($scope.shipment, function(data){
			$scope.sentItem_status = data;
		
			 $('#cover-spin').hide(0);
			if ($scope.sentItem_status == "Error: no record found"){
				$.notify({
					icon: "fas fa-exclamation-triangle",
					title: "<strong>Error !!</strong> ",
					message: "No record found or some error occurred."
				},{
					type: 'danger',
					offset: {
                                                      x: 0,
                                                      y: 233
                                                }
				});
				return null;
			} else{
				$.notify({
					icon: "far fa-handshake",
					title: "<strong>success !! udpated ledger as item sent for shipment id : "+$scope.shipment.id+" & Tx.no:</strong> ",
					message: data
				},{
                                        offset: {
                                                      x: 0,
                                                      y: 233
						}
			
			    		});
		        	}
	        	});
        	}	
	}

	$scope.startReadingTempIOT=function(record){

		var req = $scope.tuna_id;
		appFactory.startReadingTempIOT(req,function(data){
			
			if(data=="Item isReceived : true"){
				$.notify({
					icon: "fas fa-check-double",
					title: "<strong>info !! Item sent with record id : " + req +" is reached successfully</strong> ",
					message: "."	
				},{
					type: 'success',
					offset: {
					  		x: 0,
							y: 233
					}
				});
			}
			else{
				$.notify({
					icon: "fas fa-exclamation-triangle",
					title: "<strong>Alert !! Item sent with record id : " + req +" is crossed the threshold temp Tx no:</strong> ",
					message: data	
				},{
					type: 'danger',
					offset: {
							x: 0,
							y: 233
					}
				});
			}
		});
	}
	
	// End first party //


	// Start second party //

	$scope.queryRecord_1 = function(reqData){
		
		$('#cover-spin').show(0);
		
		appFactory.queryRecord(reqData, function(data){

				$scope.query_record_1 = data;
				 $('#cover-spin').hide(0);
				if ($scope.query_record_1 == "Could not locate tuna"){
						$("#error_query_1").show();
				} else{
					data.Key = id;
					$scope.query_record = data;
					$("#error_query_1").hide();
				}
		});
	}

	$scope.queryAllRecord_1 = function(channelUserPort){
		$('#cover-spin').show(0);
				appFactory.queryAllRecord(channelUserPort,function(data){
						$('#cover-spin').hide(0);	
						var array = [];
						for (var i = 0; i < data.length; i++){
								parseInt(data[i].Key);
								data[i].Record.Key = parseInt(data[i].Key);
								array.push(data[i].Record);
						}

						array.sort(function(a, b) {
							return parseFloat(a.Key) - parseFloat(b.Key);
						});
						if(channelUserPort == 'firstchannel+user2+8051')
						{
							$scope.all_record_Miriam = array ;
							
						}
						if(channelUserPort == 'secondchannel+user3+9051')
						{
							$scope.all_record_Bob = array ;
						}	
						else
						{
							$scope.all_record_Alice = array ;
						}
				});
	}

	 $scope.queryShipment = function(channelUserPort){
                $('#cover-spin').show(0);
                                appFactory.queryAllRecord(channelUserPort,function(data){
                                                $('#cover-spin').hide(0);
                                                var array = [];
						var arraytuna = [];	
						var arr = [];
                                                for (var i = 0; i < data.length; i++){
							if(arr.includes(data[i].Record.shipmentid) && data[i].Record.shipmentstatus == 'Sent'){
								console.log('skipped shipment id adding tunaKeys');
								parseInt(data[i].Key);
                                                                data[i].Record.Key = parseInt(data[i].Key);
                                                                arraytuna.push(data[i].Record);
							}	
							else if(data[i].Record.shipmentstatus == 'Sent'){
								arr[i] = data[i].Record.shipmentid;
                                                                parseInt(data[i].Key);
                                                                data[i].Record.Key = parseInt(data[i].Key);
                                                                array.push(data[i].Record);
								arraytuna.push(data[i].Record);	
									
							}
							else {
								console.log('No shipment found !!');
							}

                                                }

                                                array.sort(function(a, b) {
                                                        return parseFloat(a.Key) - parseFloat(b.Key);
                                                });
											
						console.log(array);
                                                if(channelUserPort == 'firstchannel+user2+8051')
                                                {
                                                        $scope.sent_shipment_Miriam = array ;
							$scope.shipment_tuna_Miriam = arraytuna ;

                                                }
                                                if(channelUserPort == 'secondchannel+user3+9051')
                                                {
                                                        $scope.sent_shipment_Bob = array ;
							$scope.shipment_tuna_Bob = arraytuna ;
                                                }
                                });

	}

	$scope.receiveShipmentMiriam = function(receiveshipment){
	
	$scope.receiveshipment = {};
	var dateUTC = new Date(); var dateUTC = dateUTC.getTime(); var dateIST = new Date(dateUTC); dateIST.setHours(dateIST.getHours() + 5);  dateIST.setMinutes(dateIST.getMinutes() + 30);
        var timestamp1 = dateIST.toLocaleString();
        var timestamp1 = timestamp1.replace(',','');
	
        $scope.receiveshipment.receivetimestamp = timestamp1;
        $scope.receiveshipment.channeluserport = $('#receiveShipmentMiriam').val();
	console.log($scope.receiveshipment.channeluserport)
        var arr = [];
	var arrshipid = [];
        receiveshipment.forEach(function(element){
                        arr.push(element.Key);
			arrshipid.push(element.shipmentid);
        });


        for(var i=0 ; i < arr.length ; i++)
        {
                $scope.receiveshipment.key = arr[i];
		$scope.receiveshipment.shipmentid = arrshipid[i];
 
		$('#cover-spin').show(0);	
		appFactory.receiveItem($scope.receiveshipment, function(data){
		$scope.change_status = data;

	    	 $('#cover-spin').hide(0);

			if ($scope.change_status == "Error: no record found"){
				$.notify({
					icon: "fas fa-exclamation-triangle",
					title: "<strong>Error !!</strong> ",
					message: "No record found or some error occurred."
				},{
					type: 'danger',
					 offset: {
                                            x: 0,
                                            y: 233
                                        }
				});

			} else{
				$.notify({
					 icon: "far fa-handshake",
					title: "<strong>success !! udpated ledger as item received for id : "+req+" & Tx.no:</strong> ",
					message: data
				},{
					 offset: {
                                            x: 0,
                                            y: 233
                                        }
				});
			}
		});
 	 }
	}	

	$scope.receiveShipmentBob = function(record){
		
		console.log(record);
	
                $('#cover-spin').show(0);
                appFactory.receiveItem(record, function(data){
                $scope.change_status = data;

                 $('#cover-spin').hide(0);

                        if ($scope.change_status == "Error: no record found"){
                                $.notify({
                                        icon: "fas fa-exclamation-triangle",
                                        title: "<strong>Error !!</strong> ",
                                        message: "No record found or some error occurred."
                                },{
                                        type: 'danger',
                                         offset: {
                                            x: 0,
                                            y: 233
                                        }
                                });

                        } else{
                                $.notify({
                                         icon: "far fa-handshake",
                                        title: "<strong>success !! udpated ledger as item received for id : "+req+" & Tx.no:</strong> ",
                                        message: data
                                },{
                                         offset: {
                                            x: 0,
                                            y: 233
                                        }
                                });
                        }
                });
        }


	$scope.changeStatus = function(record){
		$('#cover-spin').show(0);		
		var req = record.Key;
		appFactory.changeStatus(req, function(data){
			$scope.change_status = data;
			 $('#cover-spin').hide(0);
			if ($scope.change_status == "Error: no record found"){
				$.notify({
					icon: "fas fa-exclamation-triangle",
					title: "<strong>Error !!</strong> ",
					message: "No record found or some error occurred."
				},{
					type: 'danger',
					 offset: {
                                            x: 0,
                                            y: 233
                                        }
				});

			} else{
				$.notify({
					icon: "far fa-handshake",
					title: "<strong>success !!  udpated ledger as item comfirmed for id : "+req+" & Tx.no:</strong> ",
					message: data
				},{
					 offset: {
                                            x: 0,
                                            y: 233
                                        }
				});
			}
		});
	}

	// End second party //
});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

	factory.loginUser = function(data ,callback){
		var data = data.username + "-" + data.passwd;
		$http.get('/login_user/'+data).success(function(output)
		{
			 callback(output)
		});
	}

   	factory.queryAllRecord = function(channelUserPort,callback){
    	$http.get('/get_all_record/'+channelUserPort+'?').success(function(output){
			callback(output)
		});
	}

	factory.queryRecord = function(reqData, callback){
    	$http.get('/get_record/'+reqData+'?').success(function(output){
			callback(output)
		});
	}

	factory.addRecord = function(data, callback){
        	
		//data.location = data.longitude + ", "+ data.latitude;	
		
		data.location = "13.052313,77.624934";
	
		var tuna = data.price + "-" + data.holder + "-" + data.vessel + "-" +  data.location;

    	$http.get('/add_record/'+tuna+'?').success(function(output){
			callback(output)
		});
	}

	factory.changeStatus = function(data, callback){

		console.log("req for change status record id : "+data);

		var record_id = data;

      	 	$http.get('/change_status/'+record_id+'?').success(function(output){
			callback(output)
		});
	}

	factory.sentItem = function(arr, callback){
		
		var senttime = arr.senttime.replace('/', '_');
		senttime = senttime.replace('/', '_');
		
		console.log(arr.channeluserport);		

	
		var shipment = arr.key + "-" + senttime + "-" + arr.id + "-"+arr.channeluserport;	
		
	
		$http.get('/sent_item/'+shipment+'?').success(function(output){
			callback(output)
		});
	}

	factory.startReadingTempIOT = function(id, callback){
		$http.get('/read_IOT_temp/'+id+'?').success(function(output){
			callback(output)
		});
	},

	factory.receiveItem = function(record, callback){

	var receivetime = record.receivetimestamp.replace('/', '_');
        receivetime = receivetime.replace('/', '_');
        console.log(record.channeluserport);
        var record = record.key + "-" + receivetime + "-" + record.shipmentid + "-"+record.channeluserport;

    	$http.get('/receive_item/'+record+'?').success(function(output){
			callback(output)
		});
	}
	return factory;
});
