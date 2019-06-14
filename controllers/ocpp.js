'use strict';

const BootNotification = require('../controllers/BootNotification.js');

function handleCall(cp,id,action,payload) {
    console.log(`CP ${cp.cp_id}: ${action}`);
    var resp = null;
    switch(action) {
        case 'BootNotification':
            resp = BootNotification.handleCall(cp,id,payload);
            break;
        default:
            resp = `[4,"${id}","NotImplemented",""]`;
    }
    return resp
}


function handleCallResult(cp,id,payload) {
    return null;
}

function handleCallError(cp,id,errCode,errDesc,errDetails) {
    console.log(`CP ${cp.cp_id}: ${errCode}. ${errDesc}`);
    // mark message has handled
    return null;
}

exports.handleIncomingMessage = function (cp,msg) {
    const msgType   = msg[0];
    const msgId     = msg[1];
    var   msgPayload  = null;
    var   msgAction   = null; 
    var   msgErrCode  = null;
    var   msgErrDesc  = null;
    var   msgErrDetails = null;
    var   resp        = null;
    
    switch (msgType) {
        case 2: // CALL
            msgAction = msg[2]; 
            console.log(msg);
            if (msg.length > 2) {
                msgPayload = msg[3];
            }
            resp=handleCall(cp,msgId,msgAction,msgPayload);
            break;
            
        case 3: // CALLRESULT
            if (msg.length > 1) {
                msgPayload = msg[2];
            }
            resp=handleCallResult(cp,msgId,msgPayload);
            break;
            
        case 4: // CALLERROR
            msgErrCode = msg[2];
            msgErrDesc = msg[3];
            msgErrDetails = null;
            if (msg.length > 3) {
                msgErrDetails = msg[4];  
            }
            resp=handleCallError(cp,
                                 msgId,
                                 msgErrCode,
                                 msgErrDesc,
                                 msgErrDetails);
            break;
            
        default:
            console.log('Message discarded. unknown type: '+msgType);
    }
    return resp;
};