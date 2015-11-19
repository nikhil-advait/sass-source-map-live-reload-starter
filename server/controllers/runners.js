var fs = require('fs');
var db = require('./../database/db.js');
var dbconn = db.dbconn;
var path = require('path');

function getRunners(callback) {
    dbconn.readAll(function(runners) {
        callback(runners);
    });
}

function getRunnerView(id,callback) {
    dbconn.read(id,function (runner) {
             callback(runner);
    });
}
function getRunnerUpdate(id,callback) {
    dbconn.read(id,function (runner) {
             callback(runner);
    });
}
function updateRunnerInfo(rNo,objRow, callback){
    var updatedObj = objRow;
    dbconn.update(rNo,updatedObj,function (msg) {
        callback(msg);
    });
}
function createRunner(newRow, callback) {
    dbconn.create(newRow,function (msg) {
        callback(msg);
    });
}
function deleteRunner(id,callback) {
    dbconn.delete(id,function (msg) {
            callback(msg);
    });
}

/*function commonFileUpdate(msg, cb){
    fs.readFile( path.resolve('server/views/Msg.html'), 'utf8', function(err,fileString){
        if(err) return cb(err);
        fileString = fileString.replace('{{dbMessage}}', msg);
        cb(fileString);
    });
}*/

module.exports = {
    getRunners: getRunners,
    getRunnerView : getRunnerView,
    getRunnerUpdate:getRunnerUpdate,
    updateRunnerInfo : updateRunnerInfo,
    createRunner : createRunner,
    deleteRunner: deleteRunner
};
