'use strict';

exports.handleCall = function (cp,id,payload) {
    var resp = `[3,"${id}",{ "status":"Accepted","interval":300}]`;
    return resp;
};
