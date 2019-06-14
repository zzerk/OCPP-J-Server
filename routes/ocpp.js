'use strict';

const ChargePoint = require('../models/chargepoint.js');
const Ocpp        = require('../controllers/ocpp.js');


async function findCP(cpid) {
    var cp = await ChargePoint.findOne({cp_id:cpid}).exec();
    return cp;
}

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
        }
    },
    handler: function(request, h) {
        var cpid = encodeURIComponent(request.params.cpid);
        var resp = { };
        
        try {
            var cp = findCP(cpid);
            if (cp) {
                if (request.payload) {
                    resp=Ocpp.handleIncomingMessage(cp,request.payload);
                }
            }
            else {
                console.log('Unknown ChargePoint: '+cpid);
            }
        }
        catch (err) {
            console.log('Error: '+err);
        }
        console.log(resp);
        return resp
    }
}];
