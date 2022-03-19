const mongoose = require('mongoose');
const GradeSchema = require('./Grade');

// Mongoose skeema tarjoaa mongodb:n tiedoille mallin ja validoinnin sekä rajoittimia

const StudentSchema = new mongoose.Schema({
    //regexin aloitusmerkki on ^ ja lopetusmerkki on $, niitä ennen tai jälkeen ei saa olla merkkejä
    studentcode: {type: String, unique: true, required: true, match: /^[a-z]{1}[0-9]{4}$/},
    name: {type: String, required: true, max: 80},
    email: {type: String, required: true, match: /^[a-z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-z0-9.-]+$/},
    studypoints: {type: Number, required: false, min: 0, max: 300},
    grades: {type: [GradeSchema], required: true },
});

// skeemasta pitää tehdä model jonka kautta kantaoperaatioita tehdään
const Student = mongoose.model('Student', StudentSchema)
// exportataan model
module.exports = Student;