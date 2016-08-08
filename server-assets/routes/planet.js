;(function(){

    const router = require('express').Router();
    const Planet = require('../models/planet-model');

    // exports.mountPath = '/planets';
    exports.router = router;

    router.route('/planets/:id?')
        .get(function(req, res){
            if (req.params.id){
                Planet.getById(req.params.id, function(planet){
                    res.send(planet);
                });                
            } else {
                Planet.getAll(function(planets){
                    res.send(planets);
                });
            }
         })
         .post(function(req, res){
            Planet.createPlanet(req.body.name, req.body.galaxyId, function(planet){
                res.send(planet);
            }); 
         })
         .put(function(req, res){
            res.send('Check back later.');
         })
         .delete(function(req, res){
            res.send('Check back later.');
         });


}());