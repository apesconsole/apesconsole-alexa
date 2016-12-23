/*
	Apes's Console
*/
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
var alexa = require('alexa-app');
var moment = require('moment-timezone');

/*
app.dictionary = {
  "names": ["Sam", "Sai"]
};
*/

// Define an alexa-app
var app = new alexa.app('apesconsole_sai','saiAssist');

var processHer = function(param){
	var date = new Date();
	var hours = moment(date).tz("America/Chicago").format("hh");
	console.log('This is the Hour- >' + hours);
	if('greetIntent' == param.service){
		if(hours >= 01 && hours <= 03){
			return 'Hey Sai ! Is everything Okey ?';
		} else if(hours >= 07 && hours <= 12){
			return 'Good Morning Sai !';
		} else if(hours >= 12 && hours <= 16){
			return 'Hello Sai ! How is your day going so far ?';
		} else if(hours >= 17 && hours <= 18){
			return 'Hello Sai ! How was your day ?';
		} else if(hours >= 18 && hours <= 21){
			return 'Hello Sai ! Its almost bed time. Do you want to set any alarm for tomorrow ?';
		} else if(hours > 21){
			return 'Hello Sai ! Can\'t get sleep ? Do you want me to play some good music ?';
		}
	} else if('goodNightIntent' == param.service){
		if(hours <= 18 && hours >= 12){
			return 'Well, Its still afetrnoon. Have a good nap. Let me know if you need anything.';
		} else if(hours >= 20){
			return 'Good Night Sai! I am here, let me know anything you want.';
		}	
	} else if('talkToMeIntent' == param.service){
		return 'Honey. You look amazing and just you wait till Sam sees you.';
	}
}
app.launch(function(req, res) {
	res.say(processHer({service: 'greetIntent'}));
});

app.intent('goodNightIntent', {
    "utterances": [
	  "Good Night"
    ]
  }, function(req, res) {
	var date = new Date();
	var hours = moment(date).tz("America/Chicago").format("hh");
	var message = '';
	if(hours >= 18){
		message = 'Good Night ! I am there, let me know anything you want.';
	} else if(hours <= 12){
		message = 'Good One! Have a Great Day!';
	} 
	if(hours > 12){
		message = processHer({service: 'goodNightIntent'}); 
	}
	res.say(message);
});

app.intent('talkToMeIntent', {
    "utterances": [
	  "{Talk to me|Talk to me please|Please say something|Say something}"
    ]
  }, function(req, res) {
	var message = ''; 
	message = processHer({service: 'talkToMeIntent'}); 
	res.say(message);
});


module.exports = app;

