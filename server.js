/*
	Ape's Console | Alexa 
*/
var AlexaAppServer = require('alexa-app-server');

AlexaAppServer.start( {
    httpsPort:443,
    httpsEnabled:true,
    privateKey:'private-key.pem',
    certificate:'cert.cer',
    server_root:__dirname,
    public_html: 'public', 
    app_dir: 'apps',      
    app_root: '/',  
	port: 3001
	// Use preRequest to load user data on each request and add it to the request json.
	// In reality, this data would come from a db or files, etc.
	,preRequest: function(json,req,res) {
		console.log('preRequest fired');
		json.userDetails = { 'name':'Ape\'s Console' };
	}
	// Add a dummy attribute to the response
	,postRequest: function(json,req,res) {
		console.log('postRequest fired');
		json.dummy = 'text';
	}
} );