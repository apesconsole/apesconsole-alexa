/*
	Apes's Console
*/
var logger = require("logging_component");
var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('helloworld');
app.launch(function(req,res) {
	res.say("Hello World!!");
});
app.intent('sampleIntent', function(request,response) {
    response.say("Hi There!");
});
module.exports = app;

