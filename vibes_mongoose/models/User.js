const mongoose = require('mongoose');

// Mongoose skeema tarjoaa mongodb:n tiedoille mallin ja validoinnin sekä rajoittimia

const UserSchema = new mongoose.Schema({
    //regexin aloitusmerkki on ^ ja lopetusmerkki on $, niitä ennen tai jälkeen ei saa olla merkkejä
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isadmin: {type: Boolean, required: true},
});

// skeemasta pitää tehdä model jonka kautta kantaoperaatioita tehdään
const User = mongoose.model('User', UserSchema)
// exportataan model
module.exports = User;