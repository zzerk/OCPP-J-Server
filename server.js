'use strict';

const Hapi = require('@hapi/hapi');
const HAPIWebSocket = require('hapi-plugin-websocket');
const Blipp = require('blipp');

async function start() {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    
    const db = require('./database').db();

    await server.register(HAPIWebSocket);
    await server.register({ plugin: Blipp });
        
    // define routes
    server.route(require('./routes/home.js'));
    server.route(require('./routes/ocpp.js'));

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
