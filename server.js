//this server is using Rob Wu's CORS
//set all requirements

var express = require('express');
var app = express();
var router = express.Router();
var cors_proxy = require('cors-anywhere');

//setters
var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 8080;
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

//getters
router.get('/', function(req, res){
           res.render('home');
           })


//running off code
app.use('/', router);
app.listen(app.get('port'), function() {
           console.log('Node app is running on port', app.get('port'));
           });

console.log(app);

//running CORS anywhere code

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
    }).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
    });



