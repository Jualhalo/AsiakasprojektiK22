const mongoose = require('mongoose');

const VibeSchema = new mongoose.Schema({
    comment: {type: String, required: false, max: 200},
    grade: {type: Number, required: true, min: 0, max: 5},
});

module.exports = VibeSchema;