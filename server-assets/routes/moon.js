;(function(){

    const router = require('express').Router();
    const Moon = require('../models/moon-model');

    exports.router = router;

    router.route('/moons/:id?')
        .get(function(req, res){
            Moon.getAll(function(data){
                res.send(data);
            });
         })
         .post(function(req, res){
            Moon.createMoon(req.body.name, req.body.planetId, req.body.galaxyId, function(moon){
                res.send(moon);
            }); 
         })
         .put(function(req, res){
            res.send('Check back later.');
         })
         .delete(function(req, res){
            res.send('Check back later.');
         });


}());