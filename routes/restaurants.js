var express = require('express');
var router = express.Router();
const { findRestaurant, findRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, filterRestaurants } = require('../controllers/restaurant');

/* Restaurants CRUD */
router.get('/:city', findRestaurants)
.post('/add', createRestaurant)
.get('/:id', findRestaurant)
.put('/update/:id', updateRestaurant)
.delete('/delete/:id', deleteRestaurant)
.post('/filter', filterRestaurants);

module.exports = router;
