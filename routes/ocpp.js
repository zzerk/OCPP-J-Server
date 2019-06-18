'use strict';

const Ocpp = require('../controllers/ocpp');
const Db   = require('../database');    


module.exports = [{
    path: '/ocpp/{cpid}',
    method: 'POST', 
    config: {
        plugins: { 
            websocket: { 
                only: true,
                initially: true,
                subprotocol: 'ocpp1.6'
            }
        },
        payload: {
            output: 'data',
            parse: true,
            defaultContentType: 'application/json'
        }
    },
    handler: async function(request, h) {
        var cpid = encodeURIComponent(request.params.cpid);
        var resp = null;
        var cp   = null;
        if(request.payload) {
            console.log(`Message received from ${cpid}: ${request.payload}`);
            try {
                cp = await Db.findCP(cpid);
                if (cp) {
                    if (request.payload) {
                        resp=await Ocpp.handleIncomingMessage(cp,request.payload);
                        console.log('OCPP Handler response: '+resp);
                        return resp
                    }
                }
                else {
                    console.log('Unknown ChargePoint: '+cpid);
                }
            }
            catch (err) {
                console.log('Error: '+err);
            }
        }
        return null;
    }
}];
