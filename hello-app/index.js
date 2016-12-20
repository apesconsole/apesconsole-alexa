/*
	Apes's Console
*/
var logger = require("logging_component");
var Alexa = require('alexa-sdk');

/* Alexa Configurations*/
var handlers = {
    'LaunchRequest': function () {
        this.emit('HelloWorldIntent');
    },
    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello World!');
    }

};
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
    alexa.execute();
};

