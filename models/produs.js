/**
 * Created by Florin.Alexandru on 7/7/2015.
 */
var mongoose     = require('mongoose');
var Schema      = mongoose.Schema;

var ProdSchema  = new Schema({
    denumire: String,
    amanunte: String,
    cumparat: Boolean,
    editare: Boolean
});

module.exports = mongoose.model('Prod', ProdSchema);