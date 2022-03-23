const mongoose = require('mongoose');

// Mongoose skeema tarjoaa mongodb:n tiedoille mallin ja validoinnin sekä rajoittimia

const VibeSchema = new mongoose.Schema({
  comment: {type: String, required: false, max: 200},
  grade: {type: Number, required: true, min: 0, max: 5},
  username: {type: String, ref: 'User'},
},
//"timestamps: true" lisää skeemaan createdAt ja updatedAt propertyt
{ timestamps: true }
);

// skeemasta pitää tehdä model jonka kautta kantaoperaatioita tehdään
const Vibe = mongoose.model('Vibe', VibeSchema);
// exportataan model
module.exports = Vibe;