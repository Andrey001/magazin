/**
 * Created by Florin.Alexandru on 7/7/2015.
 */
var mongoos     = require('mongoose');
var Schema      = mongoos.Schema;

var ProdSchema  = new Schema({
    denumire: String,
    amanunte: String,
    cumparat: bool,
    editare: bool
});

module.exports = mongoose.model('Prod', ProdSchema);