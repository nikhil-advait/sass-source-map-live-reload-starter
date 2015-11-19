var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var runnersFuncs = require('./server/controllers/runners.js');
var bodyParser = require('body-parser');
var browserSync = require('browser-sync');

var urlEncodedMiddelware = bodyParser.urlencoded({extended: true});

app.use(function(req, res, next){
    console.log('path of incoming request',req.path);
    next();
});

var commonPath = path.resolve('server/views');

var staticMiddleware = express.static('static_files');
app.use(staticMiddleware);
app.use(express.static('node_modules'));
app.use(urlEncodedMiddelware);

app.set('views', './server/views2');
app.set('view engine', 'ejs');

function custRender(res, obj){//obj should be in format {template: String, data: anything}
    res.render('layout', obj);
}

// handling Pages With Templeting Method
app.get('/', function(req, res){
    custRender( res, {template: 'home', data: ''});
});

app.get('/runners', function(req, res){
    runnersFuncs.getRunners(function(runners){
        custRender( res, {template: 'runners', data: runners});
    });
});

app.get('/addRunner', function(req, res){
    custRender( res, {template: 'addRunner', data: ''} );
});

app.get('/runners/:id', function(req, res){
    runnersFuncs.getRunnerView(req.params.id,function(runner){
        custRender( res, {template: 'view', data: runner});
    });
});

app.get('/runners/:id/update', function(req, res){
    runnersFuncs.getRunnerUpdate(req.params.id,function(runner){
        custRender( res, {template: 'update', data: runner});
    });
});

app.post('/api/runners/:id', function(req, res){
    runnersFuncs.updateRunnerInfo(req.params.id,req.body, function(msg){
        custRender( res, {template: 'Msg', data: msg});
    });
});

app.post('/api/runners', function (req,res) {
    runnersFuncs.createRunner(req.body, function(msg){
        custRender( res, {template: 'Msg', data: msg});
    });
});

app.get('/runners/:id/deleteTemplate', function (req,res) {
        custRender( res, {template: 'deleteMsg', data: req.params.id});
});

app.get('/api/runners/:id/delete', function (req,res) {
    runnersFuncs.deleteRunner(req.params.id, function(msg){
        custRender( res, {template: 'Msg', data: msg});
    });
});

app.listen(8000, function(){
    console.log('Server is listening on port 8000');
    
    //browserSync({
    //    proxy: 'localhost:' + 3000,
    //    files: ['static_files/**/*.css', 'server/views2/**/*.ejs']
    //});
    
});

/*app.get('/1', function(req, res){
    var data = {name: 'Parimal', surname: 'yeole'};
    res.render('home' );
});
*/


/*app.get('/', function(req, res){
    res.sendFile(commonPath+'/home.html');
    //res.sendFile(path.resolve('server/views/home.html'));
});

app.get('/runners',function (req, res) {
    runnersFuncs.getRunners(function(finalStr){
        res.send(finalStr);
    });
    //res.sendFile(path.resolve('server/views/runners.html'));
});

app.get('/addRunner', function (req, res) {
    res.sendFile(path.resolve('server/views/addRunner.html'));
});

app.get('/runners/:id', function (req, res) {
    runnersFuncs.getRunnerView(req.params.id,function(finalStr){
        res.send(finalStr);
    });
    //res.sendFile(path.resolve('Server/views/view.html'));
});

app.get('/runners/:id/update/', function (req,res) {
    runnersFuncs.getRunnerUpdate(req.params.id,function(finalStr){
        //console.log(finalStr);
        res.send(finalStr);
    });
    //res.sendFile(path.resolve('Server/views/update.html'));
});

app.post('/api/runners/:id', function(req, res){

    runnersFuncs.updateRunnerInfo(req.params.id,req.body, function(finalStr){
        res.send(finalStr);
    });
    //console.log('query: ', req.query);
    //console.log('body: ', req.body);
    //console.log(req.body.id);
});

app.post('/api/runners', function (req,res) {
    runnersFuncs.createRunner(req.body, function(finalStr){
        res.send(finalStr);
    });
    //console.log('body: ', req.body);

});

app.get('/runners/:id/deleteTemplate', function (req,res) {
    fs.readFile( path.resolve('server/views/deleteMsg.html'), 'utf8', function(err,finalStr){
        finalStr = finalStr.replace('{{runnerId}}',req.params.id);
        res.send(finalStr);
    });
});

app.get('/api/runners/:id/delete', function (req,res) {
    runnersFuncs.deleteRunner(req.params.id, function(finalStr){
        res.send(finalStr);
    });
    //res.sendFile(path.resolve('server/views/addRunnerMsg.html'));
});*/


/*app.get('/index.php', function(req, res){
res.send("hello from index!!");
});
*/

