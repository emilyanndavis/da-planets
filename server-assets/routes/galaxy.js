;(function(){

     const router = require('express').Router();
     const Galaxy = require('../models/galaxy-model');

    //  exports.mountPath = '/galaxies';
     exports.router = router;

     router.route('/galaxies/:id?')
        .get(function(req, res){
            if (req.params.id){
                Galaxy.getById(req.params.id, req.query.include, function(galaxy){
                    res.send(galaxy);
                });                
            } else {
                Galaxy.getAll(req.query.include, function(galaxies){
                    res.send(galaxies);
                });
            }
        })
        .post(function(req, res){
            Galaxy.createGalaxy(req.body.name, function(galaxy){
                res.send(galaxy);
            }); 
        })
        .put(function(req, res){
            return {error: 'Galaxies cannot be updated at this time. Please stand by.'}
        })
        .delete(function(req, res){
            return {error: 'Galaxies cannot be deleted at this time. Do you even know what the repercussions of such an action would be?'}            
        });



}());