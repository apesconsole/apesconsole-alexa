var AlexaAppServer = require('alexa-app-server');
AlexaAppServer.start({
    server_root:__dirname,     // Path to root 
    public_html:"public",      // Static content 
    app_dir:"hello-app",            // Where alexa-app modules are stored 
    app_root:"/",              // Service root 
    port:3001                    // What port to use, duh 
});