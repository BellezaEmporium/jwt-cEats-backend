var mongoose = require('mongoose');

const Restaurants = mongoose.model('Restaurants', new mongoose.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    streetNo: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true, trim: true },
    password: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: false, default: null },
    // pas le choix, les codes postaux qui commencent par 0 
    // seront considérés comme invalides si de type Number
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    imageUrl: { type: String },
    // pas le choix, sinon le 0 du 0X disparaît
    phone: { type: String, maximum: 10 },
    category: { type: String, required: true },
    schedule: {
        monday: {
            opensAt: { type: String, required: true },
            closesAt: { type: String, required: true }
        },
        tuesday: {
            opensAt: { type: String, required: true },
            closesAt: { type: String, required: true }
        },
        wednesday: {
            opensAt: { type: String, required: true },
            closesAt: { type: String, required: true }
        },
        thursday:{
            opensAt: { type: String, required: true },
            closesAt: { type: String, required: true }
        },
        friday: {
            opensAt: { type: String, required: true },
            closesAt: { type: String, required: true }
        },
        saturday: {
            opensAt: { type: String, required: true },
            closesAt: { type: String, required: true }
        },
        sunday: {
            opensAt: { type: String, required: true },
            closesAt: { type: String, required: true }
        }
    },
    dishes: [{ type: {
        name: String,
        price: Number,
        description: String,
        imageLink: String,
        toppings: [{ type: {
            name: String,
            quantity: Number,
            needsPrice: Boolean,
            price: Number | null
        } }],
        drinks: [{ type: {
            name: String
        } }],
        pastry: [{ type: {
            name: String,
            quantity: Number,
            needsPrice: Boolean,
            price: Number | null
        } }],
    }}]
}));

module.exports = Restaurants;
