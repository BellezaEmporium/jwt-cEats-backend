const jwt = require('jsonwebtoken');
// permet de simplifier les opérations de vérification

// vérification administrateur (pour sécuriser les entrypoints /users, /restaurants, /orders, /dishes)
async function verifyifAdmin(req, res) {
    if(req.cookies['access_token'] !== undefined) {
        const token = jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET)
        if (token) {
            if (token.role === 'admin') return true
            return false;
        }
    } else {
        return false;
    }
};

// vérification utilisateur (ou admin) (pour sécuriser les entrypoints utilisateurs lambda)
async function verifyUser(req,res) {
    if(req.cookies['access_token'] !== undefined) {
        const token = jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET)
        if (token) {
            return true;
        }
    } else {
        return false;
    }
}

// vérification restaurant (ou admin) (pour sécuriser les entrypoints restaurants)
async function verifyRestaurant(req,res) {
    if(req.cookies['access_token'] !== undefined) {
        const token = jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET)
        if (token) {
            if (token.role === 'restaurant' || token.role === 'admin') return true
            return false;
        }
    } else {
        return false;
    }
}

// vérification livreur (ou admin) (pour sécuriser les entrypoints livreurs)
async function verifyDeliverer(req,res) {
    if(req.cookies['access_token'] !== undefined) {
        const token = jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET)
        if (token) {
            if (token.role === 'deliverer' || token.role === 'admin') return true
            return false;
        }
    } else {
        return false;
    }
}

async function verifyifConnected(req, res) {
    if(req.cookies['access_token'] !== undefined) {
        const token = jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET)
        if (token) return true
        else return false
    } else {
        return false;
    }
}


module.exports = { verifyUser, verifyifAdmin, verifyRestaurant, verifyDeliverer, verifyifConnected }