const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express up

const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/btc');
mongoose.Promise = global.Promise;

// put up static page

app.use(express.static('public'));

// parse the body

app.use(bodyParser.json());

// initialize routes

app.use('/api', routes);

// error handling middleware

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(422).send({error: err.message});
});

// listen for requests on port 4000

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests");
});
