var express = require('express');
var router = express.Router();
const { findOrder, findOrders, createOrder, updateOrder, deleteOrder, findOrdersByRestaurant, findOrdersByUser } = require('../controllers/order');

/* Orders CRUD */
router.get('/', findOrders)
.post('/add', createOrder)
.get('/restspec', findOrdersByRestaurant)
.get('/userspec', findOrdersByUser)
.put('/update/:id', updateOrder)
.delete('/delete/:id', deleteOrder)
.get('/:id', findOrder)

module.exports = router;
