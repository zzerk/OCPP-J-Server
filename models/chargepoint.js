'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cpSchema = new Schema({
    cp_id: String,
    description: String,
    active: Boolean
});

module.exports = mongoose.model('ChargePoint', cpSchema);

