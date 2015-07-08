/**
 * Created by Florin.Alexandru on 7/7/2015.
 */
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Prod       = require('./models/produs');

mongoose.connect('mongodb://localhost:27017/listaprod'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/prods')

    // create a bear (accessed at POST http://localhost:8080/api/prods)
    .post(function(req, res) {

        var prod = new Prod();              // creaza instanta noua de produs
        prod.denumire = req.body.denumire;  // seteaza denumirea produsului
        prod.amanunte = req.body.amanunte;  // seteaza amanuntele pentru produs
        prod.cumparat = req.body.cumparat;  // seteaza starea produsului ca necumparat
        prod.editare  = req.body.editare;   // seteaza starea produsului ca needitabil

        // save the bear and check for errors
        prod.save(function(err, prods) {
            if (err)
                res.send(err);

            //res.json({ message: 'Produs creat!' });
            res.json(prods);
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Prod.find(function(err, prods) {
            if (err)
                res.send(err);

            res.json(prods);
        });
    });


// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/prods/:prod_id')

    // get the prod with that id (accessed at GET http://localhost:8080/api/prods/:prod_id)
    .get(function(req, res) {
        Prod.findById(req.params.prod_id, function(err, prod) {
            if (err)
                res.send(err);
            res.json(prod);
        });
    })

    // update the prod with this id (accessed at PUT http://localhost:8080/api/prods/:prod_id)
    .put(function(req, res) {

        // foloseste modelul prod pentru a gasi produsul dorit
        Prod.findById(req.params.prod_id, function(err, prod) {

            if (err)
                res.send(err);

            prod.denumire = req.body.denumire;  // update denumire produs
            prod.amanunte = req.body.amanunte;  // update amanunte produs
            prod.cumparat = req.body.cumparat;  // update starea produs
            prod.editare  = req.body.editare;

            // salvare produs
            prod.save(function(err, prods) {
                if (err)
                    res.send(err);

                //res.json({ message: 'Produs updatat!' });
                res.json(prods);
            });

        });
    })

    // delete the prod with this id (accessed at DELETE http://localhost:8080/api/prods/:prod_id)
    .delete(function(req, res) {
        Prod.remove({
            _id: req.params.prod_id
        }, function(err, prods) {
            if (err)
                res.send(err);

            //res.json({ message: 'Sters cu succes' });
            res.json(prods);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);