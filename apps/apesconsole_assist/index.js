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
var app = new alexa.app('apesconsole_assist','apesAssist');
app.launch(function(req, res) {
	res.say('Hello');
});

var processHer = function(param){
	var hours = new Date().getHours();
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

var processHis = function(param){
	var hours = new Date().getHours();
	if('greetIntent' == param.service){
		if(hours >= 01 && hours <= 03){
			return 'Hi Sam ! It\'s too late. Get some sleep.';
		} else if(hours >= 07 && hours <= 12){
			return 'Good Morning Sam !';
		} else if(hours >= 12 && hours <= 16){
			return 'Hello Sam ! How is your day going so far ?';
		} else if(hours >= 17 && hours <= 18){
			return 'Hello Sam ! How was your day ?';
		} else if(hours >= 18 && hours <= 21){
			return 'Hello Sam ! Do you want to set any alarm for tomorrow ?';
		}
	} else if('goodNightIntent' == param.service){
		if(hours <= 18 && hours >= 12){
			return 'Well, Its still afetrnoon. Have a good nap. Let me know if you need anything.';
		} else if(hours >= 20){
			return 'Good Night Sir!';
		}
	} else if('talkToMeIntent' == param.service){
		return 'Sure, Sam. Shall I call some one you would like to talk to ?';
	}

}
app.intent('greetIntent', {
    "slots": {
      "NAME": "LITERAL"
    },
    "utterances": [
      "{My name is|My name's} {Sam|Sai|NAME}",
	  "{This is|It's} {Sam|Sai|NAME}"
    ]
  }, function(req, res) {
	var message = '';
	switch(req.slot('NAME')){
		case 'Sai':
		message = processHer({service: 'greetIntent'}); 
		break;
		case 'Sam':
		message = processHis({service: 'greetIntent'}); 
		break;
	}
	res.say(message);
});

app.intent('goodNightIntent', {
    "slots": {
      "NAME": "LITERAL"
    },
    "utterances": [
	  "{This is|It's} {Sam|Sai|NAME} Good night.",
	  "Good Night"
    ]
  }, function(req, res) {
	var hours = new Date().getHours();
	var message = '';
	if(hours >= 18 && null == req.slot('NAME')){
		message = 'Good Night ! I am there, let me know anything you want.';
	} else if(hours <= 12){
		message = 'Good One! Have a Great Day!';
	} 
	if(req.slot('NAME') && hours > 12){
		switch(req.slot('NAME')){
			case 'Sai':
			message = processHer({service: 'goodNightIntent'}); 
			break;
			case 'Sam':
			message = processHis({service: 'goodNightIntent'}); 
			break;
		}
	}
	res.say(message);
});

app.intent('talkToMeIntent', {
    "slots": {
      "NAME": "LITERAL"
    },
    "utterances": [
	  "{This is|It's} {Sam|Sai|NAME} {Talk to me|Talk to me please|Please say something|Say something}"
    ]
  }, function(req, res) {
	var message = ''; 
	if(req.slot('NAME')){
		switch(req.slot('NAME')){
			case 'Sai':
			message = processHer({service: 'talkToMeIntent'}); 
			break;
			case 'Sam':
			message = processHis({service: 'talkToMeIntent'}); 
			break;
		}
	}
	res.say(message);
});


module.exports = app;

