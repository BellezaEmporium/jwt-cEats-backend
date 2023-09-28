const BlacklistedTokens = require("../schema/BlacklistedToken");

const addBlacklistedToken = async (req, res) => {
    await BlacklistedTokens.create(req.body)
    .then(() => res.json({"response": true, "answer": "Token blacklisté ajouté à la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};


const findBlacklistedToken = async (req, res) => {
    await BlacklistedTokens.findOne({token: req.cookies['access_token']})
    .then(token => res.json({"response": true, "answer": token}))
    .catch(() => res.status(400).json({"response": false, "answer": "Aucun token n'existe avec cet identifiant."}));
};

module.exports = { addBlacklistedToken, findBlacklistedToken }