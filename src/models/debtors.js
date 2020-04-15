const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtorsSchema = new Schema({
    userId: String,
    people: {type: mongoose.Schema.Types.ObjectId, ref:'People'},
    isI: Boolean,
    amount: Number,
    dateStart: {type: Date, default: Date.now()},
    dateEnd: {type: Date, default: Date.now()},
    currency: {type: String, default: "BYN"},
    status: {type:Number, default: 1},
    history: [{
        date: {type: Date, default: Date.now()},
        total: Number,
        currency: {type: String, default: "BYN"},
        status: String
    }]
});

module.exports = mongoose.model("Debtors", debtorsSchema);


