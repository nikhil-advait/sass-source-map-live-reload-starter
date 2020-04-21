var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var urlEncodedMiddelware = bodyParser.urlencoded({extended: true});

app.use(function(req, res, next){
    console.log('path of incoming request',req.path);
    next();
});

//var commonPath = path.resolve('server/views');

var staticMiddleware = express.static('src/static_files');
app.use(staticMiddleware);
//app.use(express.static('node_modules'));
app.use(urlEncodedMiddelware);

app.set('views', './src/views/views2');
app.set('view engine', 'ejs');


// handling Pages With Templeting Method
app.get('/', function(req, res){
    res.render( 'layout', {template: 'home', data: ''});
});

app.get('/runners', function(req, res){
        res.render( 'layout', {template: 'runners'});
});

app.get('/addRunner', function(req, res){
    res.render( 'layout', {template: 'addRunner'} );
});

app.get('/runners/1', function(req, res){
    res.render( 'layout', {template: 'view'});
});

app.get('/runners/1/update', function(req, res){
    res.render( 'layout', {template: 'update'});
});


app.get('/runners/1/deleteTemplate', function (req,res) {
        res.render( 'layout', {template: 'deleteMsg'});
});

app.get('/learn-css', function (req,res) {
    res.render( 'layout', {template: 'learn-css'});
});


app.listen(8000, function(){
    console.log('Server is listening on port 8000');
    //browserSync({
    //    proxy: 'localhost:' + 3000,
    //    files: ['static_files/**/*.css', 'server/views2/**/*.ejs']
    //});

});
