var iotf = require("../");
var express = require('express');
var session = require('express-session');
var app = express();


module.exports = (function() {
return{

  start_reading_temp:function(req){
	
	app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
       	
        var appClientConfig = {
        org: 'xstg32',
        id: 'xstg32',
        "auth-key": 'a-xstg32-gx3ai4h2hz',
        "auth-token": 'fxszaa)h+wlzJWOkYV',
        "type" : "shared"	// make this connection as shared subscription
        };

        var appClient = new iotf.IotfApplication(appClientConfig);

        //setting the log level to trace. By default its 'warn'
        appClient.log.setLevel('info');
		
	session.app_Client = appClient;	

        appClient.connect();

        appClient.on("connect", function () {
          appClient.subscribeToDeviceEvents();
        });

        appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

        //  console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);

          var json = JSON.parse(payload);

        //  console.log(json.temperature);

          if(json.temperature > 29){
            	session.status = "Waste";
		console.log("Rejected : temp =" + json.temperature+":"+ session.status );
		//appClient.disconnect();
          }
          else{
            if(session.status!="Waste"){
		session.status = "Fresh";
		console.log("Accepted : temp =" + json.temperature+":"+ session.status );
	    }	
          }

        });

  },

  get_final_status:function(req, res){
     
	if(session.status==''){
		var respose = "Waste";
		return respose;
	}
	else{
      		res = session.status;
    		// console.log(session.app_Client);     
   		// session.app_Client.log.setLevel('info');
     	 	session.app_Client.disconnect();
		session.status = '';	
      		return res;
	}
}
}
})();


