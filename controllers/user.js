var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Users = require("../schema/User");
var helpers = require('../helpers/helpers');
const BlacklistedToken = require('../schema/BlacklistedToken');

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

// CUD (Create Update Delete) sans retour requis
const createUser = async (req, res) => {
    var newUser = new Users(req.body)
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.sponsorCode = "cesiEats-" + makeid(6).toUpperCase();
    if (req.body.hasbeenSponsored === true) {
      if (req.body.usedSponsorCode && req.body.usedSponsorCode !== "") {
        var userSponsor = await Users.findOne({sponsorCode: req.body.usedSponsorCode})
        if(userSponsor) {
          newUser.sponsor = userSponsor._id;
        }
      } else {
        return res.status(400).json({"response": false, "answer": "Si vous êtes sponsorisé, vous devez renseigner un code sponsor."});
      }
    }
    newUser.save()
    .then(() => res.status(200).json({"response": true, "answer": "Utilisateur ajouté dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}))
};

const updateUser = async (req, res) => {
  const verification = await helpers.verifyUser(req, res);
  if (verification) {
    // applicable seulement dans le cas où le mot de passe venait à être changé.
    if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);
    await Users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({"response": true, "answer": "Utilisateur mis à jour dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à effectuer cette action." })
  }
};

const deleteUser = async (req, res) => {
  const verification = await helpers.verifyUser(req, res);
  if(verification) {
    Users.findByIdAndDelete(req.params.customerId)
    .then(() => res.json({"response": true, "answer": "Utilisateur supprimé dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à effectuer cette action." })
  }
}

// R (Read) avec retour requis
const findUser = async (req, res) => {
  const verification = await helpers.verifyUser(req, res).catch(err => {throw err});
  if(verification) {
        Users.findById(req.params.id)
        .then(user => {if(user !== null) res.json({"response": true, "answer": user}); else res.status(400).json({"response": false, "answer": "Aucun utilisateur n'existe avec cet identifiant."})})
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Une erreur est survenue lors de la vérification utilisateur." })
  }; 
};

const findUsers = async(req, res) => {
  const verification = await helpers.verifyifAdmin(req, res)
  if(verification) {
    Users.find({})
    .then(users => res.json({"response": true, "answer": users}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à effectuer cette action." })
  }
}

const sign_in = function(req, res) {
    Users.findOne({email: req.body.email}, function(err, user) {
      if (err) throw err.message;
      else if (user) {
        if (user.isLocked) return res.status(401).json({"response":false, "answer":'Vous avez été bloqué, veuillez contacter le service client pour de plus amples informations.' });
        if (!user.comparePassword(req.body.password)) return res.status(401).json({"response":false, "answer":'Une des valeurs renseignées est invalide. Veuillez réessayer.' });
        else {
          var connection = Date.now();
          user.connections.push(connection)
          user.lastConnectedAt = connection;
          user.save()
          res.cookie('access_token', jwt.sign({ email: user.email, name: user.name, surname: user.surname, role: user.role, address: user.address, _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3600s" }))
          res.cookie('customerId', user._id.valueOf(), { expiresIn: "3600s" })
        }
        return res.json({"response": true, "answer": "Connecté !"});
      } else {
        return res.status(401).json({"response": false, "answer":"Cet utilisateur n'existe pas dans notre base de données." });
      }
    });
  };

const sign_out = function(req, res) {
  BlacklistedToken.create({token: req.cookies['access_token']})
  res.clearCookie('access_token');
  return res.status(200).json({'response': true, 'answer': "Déconnecté."})
}

module.exports = { createUser, updateUser, deleteUser, findUser, findUsers, sign_in, sign_out }