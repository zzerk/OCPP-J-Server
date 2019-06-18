'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cpSchema = new Schema({
    cp_id: String,
    description: String,
    active: Boolean,

    // Data from Boot Notification
    chargePointVendor : String,
    chargePointModel  : String,
    chargePointSerialNumber : String,
    chargeBoxSerialNumber   : String,
    firmwareVersion         : String,
    iccid             : String,
    imsi              : String,
    meterType         : String,
    meterSerialNumber : String
});

module.exports = mongoose.model('ChargePoint', cpSchema);

