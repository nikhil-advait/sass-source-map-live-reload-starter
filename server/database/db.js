// version 2.0
var fs = require('fs');
var path = require('path');
var app = {};
var filePath = path.resolve('server/database/dbBackup.json');

(function(){
  var id_counter;
  var runnersData = fs.readFileSync(filePath, 'utf-8');
  var data = JSON.parse(runnersData);
  id_counter = data.counter;
  runners = data.runners;
  /*var runners = {
    1: {id : 1, firstName : 'John', lastName : 'Smith', gender : 'm', race1 : 'Sudney', race2 : 'Tokiyo', race3 : 'Paris'},
    2: {id : 2, firstName : 'Nikhil', lastName : 'Yeole', gender : 'm', race1 : 'Toronto', race2 : 'Shanghai',race3 : 'Berlin'},
    3: {id : 3, firstName : 'Parimal', lastName : 'Yeole', gender : 'm', race1 : 'Delhi', race2 : 'Berlin',race3 : 'Munich'},
    4: {id : 4,firstName : 'Rasika',lastName : 'Patil',gender : 'f', race1 : 'Mumbai', race2 : 'Athens',race3 : 'Londan'},
    5: {id : 5,firstName : 'Prajakta',lastName : 'Lande',gender : 'f',race1 : 'Vienna',race2 : 'Jerusalem',race3 : 'Agra'}
  };
  */

  // READ

  process.on('SIGINT', function(code) {
    onExit(code);
  });

  process.on('uncaughtException', function(e) {
    onExit(e);
  });

  function onExit(e){
      console.log('About to exit Program ======== /\n:', e.stack);
      var data = {
          counter: id_counter,
          runners: runners
      };
      var dataStr = JSON.stringify(data, null, '\t');
      fs.writeFileSync(filePath, dataStr, 'utf-8');
      process.exit();
  }

  function read (id, callback){
    setTimeout(function(){
      callback(runners[id]);
    },1000);
  }

  // Read All
  function readAll(callback){
    setTimeout(function(){
      callback(runners);
    },1000);
  }
  // CREAT
  function create(obj,callback){
    id_counter++;
    obj.id = id_counter;
    runners[id_counter]=obj;
    setTimeout(function(){
      callback('Runner object create success with id :' +id_counter);
    },1000);
  }
  // UPDATE
  function update(id, newObj, callback){
    var matchedRunner= runners[id];
    for(var key in newObj){
      matchedRunner[key] = newObj[key];
    }
    setTimeout(function(){
      callback('Record updated successyfully for id: '+ id);
    },1000);

  }
  // DELETE
  function del (id,callback){
    delete runners[id];
    setTimeout(function(){
      callback('Runner Data Deleted Success of id:'+ id);
    },1000);
  }
  app.dbconn = {
    delete: del,
    read: read,
    update: update,
    create: create,
    readAll: readAll
  };
})();

module.exports = app;
