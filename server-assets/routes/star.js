;(function(){

    const router = require('express').Router();
    const Star = require('../models/star-model');

    exports.router = router;

    router.route('/stars/:id?')
        .get(function(req, res){
            Star.getAll(function(data){
                res.send(data);
            });
         })
         .post(function(req, res){
            Star.createStar(req.body.name, req.body.galaxyId, req.body.color, function(star){
                res.send(star);
            }); 
         })
         .put(function(req, res){
            res.send('Check back later.');
         })
         .delete(function(req, res){
            res.send('Check back later.');
         });


}());