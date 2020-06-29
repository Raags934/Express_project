const mongoose = require('mongoose'),
    Schema = mongoose.Schema
const save = new Schema
    ({
        name: { type: String, required: true },
        password: { type: String, required: true },

    })
module.exports = mongoose.model('save', save);