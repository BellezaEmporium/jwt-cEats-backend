var mongoose = require('mongoose');

const BlacklistedTokens = mongoose.model('BlacklistedTokens', new mongoose.Schema({
    token: String
}));

module.exports = BlacklistedTokens;