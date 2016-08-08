;(function(){

    const router = require('express').Router();
    const Species = require('../models/species-model');

    exports.router = router;

    router.route('/species/:id?')
        .get(function(req, res){
            if (req.params.id){
                Species.getById(req.params.id, req.query.include, function(species){
                    return res.send(species);
                });                
            } else {
                Species.getAll(req.query.include, function(species){
                    return res.send(species);
                });
            }
        })
         .post(function(req, res){
            Species.createSpecies(req.body.name, function(species){
                return res.send(species);
            }); 
         })
         .put(function(req, res){
            res.send('Check back later.');
         })
         .delete(function(req, res){
            res.send('Check back later.');
         });

    router.route('/:speciesId/inhabit/:planetId')
         .post(function(req, res){
            Species.inhabitPlanet(req.params.speciesId, req.params.planetId, function(species){
                return res.send(species);
            }); 
         })
         .put(function(req, res){
            res.send('Check back later.');
         })
         .delete(function(req, res){
            res.send('Check back later.');
         });         


}());