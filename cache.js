'use strict';

var Redis = require('redis');

class Cache{
    
    constructor(){
        this.rd = Redis.createClient();
        this.rd.on('error', function (err) {
            console.log('Cache connection error: ' + err);
        });
        this.rd.on('connect', function () {
            console.log('Connection with cache succeeded.');
        });
    }
    
    test(){
        console.log('I am a cache test');
    }
    
    saveCall(cpid,c){
        console.log('I am a cache test');
    }
}
    
    
module.exports = Cache
