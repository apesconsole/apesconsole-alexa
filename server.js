/*
	Apes's Console
*/

var express = require("express");
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var logger = require("logging_component");


var path = __dirname + '/public/';

app.use('/resources', express.static(path + 'resources'));

app.use("/", router);

router.use(function (req, res, next) {
	var headers = req.headers;
	var userAgent = headers['user-agent'];
	logger.log('User Agent - ' + userAgent + ', Request - ' + req.method);
	next();
});

router.get("/", function(req,res){
	res.redirect('/index');
});

router.get("/index", function(req,res){
	res.sendFile(path + "index.html");
});	

http.listen(process.env.PORT || 3001, () => {				
	logger.log('##################################################');
	logger.log('        Ape\'s Console - Alexa');
	logger.log('        Process Port :' + process.env.PORT);
	logger.log('        Local Port   :' + 3001);
	logger.log('##################################################');
});	



