var AlexaAppServer = require('alexa-app-server');

AlexaAppServer.start( {
    server_root:__dirname,     // Path to root 
    public_html:"public",      // Static content 
    app_dir:"apps",       // Where alexa-app modules are stored 
    app_root:"/",  
	port:3001
	// Use preRequest to load user data on each request and add it to the request json.
	// In reality, this data would come from a db or files, etc.
	,preRequest: function(json,req,res) {
		console.log("preRequest fired");
		json.userDetails = { "name":"Bob Smith" };
	}
	// Add a dummy attribute to the response
	,postRequest: function(json,req,res) {
		json.dummy = "text";
	}
} );