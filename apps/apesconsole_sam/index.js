/*
	Apes's Console
*/
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
var alexa = require('alexa-app');

/*
app.dictionary = {
  "names": ["Sam", "Sai"]
};
*/

// Define an alexa-app
var app = new alexa.app('apesconsole_sam','samAssist');
app.launch(function(req, res) {
	res.say('Hello Mr. Sam');
});


var processHis = function(param){
	var hours = new Date().getHours();
	if('goodNightIntent' == param.service){
		if(hours <= 18 && hours >= 12){
			return 'Well, Its still afetrnoon. Have a good nap. Let me know if you need anything.';
		} else if(hours >= 20){
			return 'Good Night Sir!';
		}
	}

}

app.intent('goodNightIntent', {
    "utterances": [
	  "Good Night"
    ]
  }, function(req, res) {
	var hours = new Date().getHours();
	var message = '';
	if(hours >= 18){
		message = 'Good Night ! I am there, let me know anything you want.';
	} else if(hours <= 12){
		message = 'Good One! Have a Great Day!';
	} 
	if(hours > 12){
		message = processHis({service: 'goodNightIntent'}); 
	}
	res.say(message);
});

module.exports = app;

