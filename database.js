'use strict';

var Mongoose = require('mongoose');
const ChargePoint = require('./models/chargepoint.js');


//load database   
Mongoose.connect('mongodb://localhost/ocpp',
                 { useNewUrlParser: true, useFindAndModify: false });

var _db = Mongoose.connection;

_db.on('error', console.error.bind(console, 'Database connection error'));
_db.once('connect', function callback() {
    console.log('Connection with database succeeded.');
});

module.exports = {
    
    // Return the Mongoose connection object
    // @return the Mongoose connection object
    db: function () {
        return _db;
    },

    // Find a charge point using its charge poind id (which is not the Mongo _id)
    // @param cpid: charge point id
    // @return: null or charge point object
    findCP: async function (cpid) {
        var cp = await ChargePoint.findOne({cp_id:cpid});
        return cp;
    },
    
    updateChargePoint: async function(cpid,newCpData) {
         console.log('updateChargePoint: cpid='+ cpid + ', newData='+newCpData);
        var query = {'cp_id':cpid};
        var res = await ChargePoint.findOneAndUpdate(query, newCpData);
        console.log('updateChargePoint: '+ res);
        return res
    }
}
