const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    _id: String,
    name: String,
    announcements: Object,
    fraud: Number
})

module.exports = mongoose.model('Announcements', schema, 'companies');