const express = require ('express');
const router = express.Router();
const User = require('../models/user');

// get a list of ninjas from the db
router.get('/users', function(req, res, next){
    /* Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    }); */
    User.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 1000000, spherical: true}
    ).then(function(users){
        res.send(users);
    }).catch(next);
});

// add a new ninja to the db
router.post('/users', function(req, res, next){
    User.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
});

// update a ninja in the db
router.put('/users/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    }).catch(next);
});

// delete a ninja from the db
router.delete('/users/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    }).catch(next);
});

module.exports = router;
