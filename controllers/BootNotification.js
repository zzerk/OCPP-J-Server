'use strict';

const Db   = require('../database'); 
const ChargePoint = require('../models/chargepoint.js');

// Handle a BootNotification call
// @param cp the charge point object
// @param id the transaction id
// @param payload the BootNotification message payload as defined by OCPP
// @return a response for the charge point
exports.handleCall = async function (cp,id,payload) {
    console.log('BootNotification: ' + payload);
    var res=await Db.updateChargePoint(cp.cp_id,payload);
    var resp = `[3,"${id}",{ "status":"Accepted","interval":300}]`;
    if (res == null) {
        // error
        console.log('Error');
    } 
    return resp;
};
