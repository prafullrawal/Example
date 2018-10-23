//SPDX-License-Identifier: Apache-2.0

var tuna = require('./controller.js');

module.exports = function(app){

  app.get('/get_record/:id', function(req, res){
    tuna.get_record(req, res);
  });
  app.get('/add_record/:tuna', function(req, res){
    tuna.add_record(req, res);
  });
  app.get('/get_all_record', function(req, res){
     tuna.get_all_record(req, res);
  });
  app.get('/change_status/:record_id', function(req, res){
    tuna.change_status(req, res);
  });
}
