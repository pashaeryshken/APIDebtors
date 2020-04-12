const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    iTotalAmount: {type: Number, default: 0},
    debtorsTotal: {type: Number, default: 0}
});

module.exports = mongoose.model("User", userSchema);
