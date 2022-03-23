const Vibe = require('../models/Vibe.js');
const vibesController = {

  // haetaan kaikki vibet
  findall: (req, res) => {
    Vibe.find().then((vibes) => {
      res.json(vibes);
    }).catch((err) => {
      console.error(err);
    });
  },

  // haetaan vibe id:n perusteella
  findbyid: (req, res) => {
    Vibe.findOne({ _id: req.params.id }).then((vibe) => {
      res.json(vibe);
    }).catch((err) => {
      console.error(err);
    });
  },

  // data joka lisätään eli postataan kantaan tulee post metodin pyynnössä
  // eli requestissa clientilta eli asiakassovellukselta
  add: (req, res) => {

    // req.body sisältää vibe-olion joka tulee clientilta, username tulee jwt tokenin payloadista
    const NewVibe = new Vibe({
      comment: req.body.comment,
      grade: req.body.grade,
      username: req.decoded.username,
    });

    // metodin vastauksen käsittely callbackillä
    // save.metodin callback tuottaa err-virheen tai res-vastauksen
    NewVibe.save((err, vibe) => {
      if (err) {
        console.error(err);
      }
      console.log('New vibe object added to db' + vibe);
      res.json(vibe); // tämä menee frontendiin
    });
  },
  // deletoidaan vibe id:n perusteella
  delete: (req, res) => {
    Vibe.findOneAndDelete({ _id: req.params.id }).then((vibe) => {
      res.json(vibe);
    }).catch((err) => {
      console.error(err);
    });
  },
};

module.exports = vibesController;