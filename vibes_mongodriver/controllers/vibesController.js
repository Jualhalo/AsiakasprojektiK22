const ObjectId = require('mongodb').ObjectID;
const dbo = require('../conn/conn.js');

const vibesController = {
  // haetaan kaikki vibet
  findall: (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection('vibes')
      .find({})
      .toArray((err, result) => {
        if (err) {
          res.status(400).send('Error fetching data! ' + err);
        } else {
          res.json(result);
        }
      });
  },

  // haetaan vibe id:n perusteella
  findbyid: (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection('vibes')
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, result) => {
        if (err) {
          res.status(400).send('Error fetching data! ' + err);
        } else {
          res.json(result);
        }
      });
  },

  // data joka lisätään eli postataan kantaan tulee post metodin pyynnössä
  // eli requestissa clientilta eli asiakassovellukselta
  add: (req, res) => {
    const dbConnect = dbo.getDb();
    const vibeDocument = {
      comment: req.body.comment,
      grade: req.body.grade,
      //username: req.decoded.username,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    dbConnect
      .collection('vibes')
      .insertOne(vibeDocument, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting data!' + err);
        } else {
          console.log(`Added a new vibe with id ${result.insertedId}`);
          res.json(result);
        }
      });
  },

  // deletoidaan vibe id:n perusteella
  delete: (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection('vibes')
      .deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
        if (err) {
          res.status(400).send('Error deleting data!: ' + err);
        } else {
          console.log("Vibe deleted");
          res.json(result);
        }
      });
  },
};

module.exports = vibesController;