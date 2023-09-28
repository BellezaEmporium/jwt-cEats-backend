var mongoose = require('mongoose'); 
var bcrypt = require('bcryptjs');
var { Schema } = mongoose;

var UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    street: { type: String, required: true },
    streetNo: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: false, default: null },
    // pas le choix, les codes postaux qui commencent par 0 seront considérés comme invalides si de type Number
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    isLocked: { type: Boolean, default: false },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Orders', default: null}],
    connections: [{ type: Date }],
    lastConnectedAt: { type: Date },
    sponsorCode: { type: String, required: true },
    hasbeenSponsored: { type: Boolean, default: false },
    sponsor: { type: Schema.Types.ObjectId, ref: 'Users', default: null }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', UserSchema);