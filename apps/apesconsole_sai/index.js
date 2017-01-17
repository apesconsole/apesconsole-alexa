/*
	Apes's Console
*/
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
var alexa = require('alexa-app');
var moment = require('moment-timezone');
var http = require('http');
var options = {
  host: '192.168.1.82',
  port: 8080,
  path: ''
};
/*
app.dictionary = {
  "names": ["Sam", "Sai"]
};
*/

// Define an alexa-app
var app = new alexa.app('apesconsole_sai','saiAssist');

var processHer = function(param){
	var date = new Date();
	var hours = moment(date).tz("America/Chicago").format("HH");
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
	} else if('switchLightOffIntent' == param.service){
		return 'Sure';
	} else if('switchLightOnIntent' == param.service){
		return 'Sure';
	}
}
app.launch(function(req, res) {
	res.say(processHer({service: 'greetIntent'}));
});

app.intent('suggestClothesIntent', {
    "utterances": [
	  "{What shall I Wear ? | What shall I wear to office today ? | What to wear ?}"
    ]
  }, function(req, res) {
	var date = new Date();
	var hours = moment(date).tz("America/Chicago").format("HH");
	var dd = moment(date).tz("America/Chicago");
	var day = dd.day();
	var message = '';
	if(hours > 07 && hours <= 11) {
		if(day <5) {
			message = 'You look great in trousers and of course a sleeveless top will just do great for office';
		} else if(day == 5) {
			message = 'It\'s Friday ! Get the blue pair of jeans and a cool T';
		}
	} else if(hours > 11 && hours <= 17) {
		if(day < 5) {
			message = 'Since you are heading for lunch, I would suggest wear something casual and light';
		} else if(day > 5 && hours <= 13) {
			message = 'It\'s weekend Sweety. Since you are heading for lunch, I would suggest wear something casual and light';
		} else if(day > 5 && hours > 13 && hours < 17) {
			message = 'It\'s weekend Sweety. I would suggest wear something casual and light';
		}
	}
	res.say(message);
});

app.intent('goodNightIntent', {
    "utterances": [
	  "Good Night"
    ]
  }, function(req, res) {
	var date = new Date();
	var hours = moment(date).tz("America/Chicago").format("HH");
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

app.intent('switchLightOffIntent', {
    "utterances": [
	  "{Switch Off lights|Turn off lights|Turn lights off}"
    ]
  }, function(req, res) {
	var message = ''; 
	message = processHer({service: 'switchLightOffIntent'}); 
	options.path = '/apesconsole/click.json?deviceId=mstrm-light1&requestState=false';
	http.get(options, function(response){
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
		});
		response.on('end', function () {
			console.log(str);
			res.say(message);
		});
	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	});	
	res.say(message);
});

app.intent('switchLightOnIntent', {
    "utterances": [
	  "{Switch On lights|Turn on lights|Turn lights on}"
    ]
  }, function(req, res) {
	var message = ''; 
	message = processHer({service: 'switchLightOnIntent'}); 
	options.path = '/apesconsole/click.json?deviceId=mstrm-light1&requestState=true';
	http.get(options, function(response){
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
		});
		response.on('end', function () {
			console.log(str);
			res.say(message);
		});
	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	});
});

module.exports = app;

