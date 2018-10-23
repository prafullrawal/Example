var iotf = require("../");

module.exports = (function() {
return{

  start_reading_temp:function(req){
	
	var status = "Fresh";	

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

        appClient.connect();

        appClient.on("connect", function () {
          appClient.subscribeToDeviceEvents();
        });

        appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

        //  console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);

          var json = JSON.parse(payload);

        //  console.log(json.temperature);

          if(json.temperature > 28){
            console.log("Rejected : temp =" + json.temperature);
            	var status = "Waste";
          }
          else{
            console.log("Accepted : temp =" + json.temperature);
            if(status!="Waste"){
		var status = "Fresh";
	    }	
          }

        });

  },

  get_final_status:function(req, res){
      return status; 
}
}
})();


