var mongoose = require('mongoose');
var { Schema } = mongoose; 

const Orders = mongoose.model('Orders', new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurants' },
    boughtDishes: [{ type: Schema.Types.ObjectId, ref: 'Dishes' }],
    date: {
        type: Date,
        default: Date.now()
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: { 
        type: String,
        default: "draft"
    },
    hasRestaurantValidated: {
        type: Boolean,
        default: false
    },
    hasDeliverymanValidated: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    }
}));

module.exports = Orders;