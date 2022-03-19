const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    coursecode: {type: String, required: true, max: 50},
    grade: {type: Number, required: false, min: 0, max: 5},
});

module.exports = GradeSchema;