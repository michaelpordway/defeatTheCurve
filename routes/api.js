const express = require('express');
const router = express.Router();
const Btc = require('../models/btc');

// get a list of all btc objects

router.get('/btc', function(req, res, next) {
    Btc.find({}).then(function(btcs) {
        res.send(btcs);
    });
});

// add a new btc object to the database

router.post('/btc', function(req, res, next) {
//    console.log(req.body);
    Btc.create(req.body).then(function(btc) {
        res.send(btc);  
    }).catch(next);
    
//    res.send({
//        type: 'POST',
//        name: req.body.name,
//        rank: req.body.rank
//    });

});

// update a btc object in the database

router.put('/btc/:id', function(req, res, next) {
    Btc.findByIdAndUpdate({_id:req.params.id}, req.body).then(function() {
        Btc.findOne({_id: req.params.id}).then(function(btc){
            res.send(btc);
        });
    });
//    res.send({type: 'PUT'});

});

// remove an existing btc

router.delete('/btc/:id', function(req, res, next) {
    console.log(req.params.id + " has been removed.");
    Btc.findByIdAndRemove({_id:req.params.id}).then(function(btc) {
        res.send(btc);
    }).catch(next);
//    res.send({type: 'DELETE'});

});

module.exports = router;
