/*
	Apes's Console
*/
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
var alexa = require('alexa-app');

// Define an alexa-app
var app = new alexa.app('helloapp','myEndpointName');
app.launch(function(req,res) {
	res.say("Hello World!!");
});
app.intent('sampleIntent', function(request,response) {
    response.say("Hi There!");
});

module.exports = app;

