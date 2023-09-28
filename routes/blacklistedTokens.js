var express = require('express');
var router = express.Router();
const { findBlacklistedToken, addBlacklistedToken } = require('../controllers/blacklistedToken');

/* Blacklisted tokens CRUD */
router.post('/add', addBlacklistedToken)
.get('/:id', findBlacklistedToken)

module.exports = router;

