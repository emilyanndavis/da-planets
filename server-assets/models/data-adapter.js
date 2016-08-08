;(function(){

    let uuid = require('node-uuid'), 
        JSData = require('js-data'),
        Schemator = require('js-data-schema'),
        schemator = new Schemator(),
        DSNedbAdapter = require('js-data-nedb'),
        FirebaseAdapter = require('js-data-firebase'),
        fbAdapter = new FirebaseAdapter({
            basePath: process.env.DBCONNECTION || 'https://da-planets.firebaseio.com/',
        }),
        adapter = new DSNedbAdapter(),
        DS = new JSData.DS();

    DS.registerAdapter('firebase', fbAdapter, {default: true});

    // schemator.defineDataType('enum', function(arr){

    // });

    module.exports = {
        DS,
        uuid,
        schemator
    };         

}());