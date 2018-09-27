const express = require('express');
const router = express.Router();
const Btc = require('../models/btc');

// get a list of all btc objects

router.get('/btc', function(req, res, next) {
    Btc.find({}).then(function(btcs) {
        res.send(btcs);
    }).catch(next);
});

// get a specific btc object by id.

router.get('/btc/id/:id', function(req, res, next) {
    Btc.find({_id:req.params.id}).then(function(btcs) {
        res.send(btcs);
    }).catch(next);
});

// get all btc objects with a nextTime older than now

router.get('/btc/ready', function(req, res, next) {
    Btc.find({"nextTime": {$lt: (new Date()).getTime()}}).then(function(btcs) {
        res.send(btcs);
    });
});

// get one btc object with a nextTime older than now

router.get('/btc/ready1', function(req, res, next) {
    Btc.find({"nextTime": {$lt: (new Date()).getTime()}}).limit(1).then(function(btcs) {
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
    }).catch(next);
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
