const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    _id: Number,
    name: String,
    reports: {
        attributes: Object,
        financials: Object
    }
})

module.exports = mongoose.model('Company', schema, 'companies');