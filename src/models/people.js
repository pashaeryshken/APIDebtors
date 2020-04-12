const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    avatar: {type: String, default: ''},
    email: String,
    userId: String,
    name: String,
    address: String,
    tNumber: String,
});

module.exports = mongoose.model("People", peopleSchema);
