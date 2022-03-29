/* UserController on Userin tietokantaoperaatiot
ja autentikaation sisältävä kontrolleri.
Se sisältää kaksi metodia: registerUser jolla
luodaan uusi käyttäjä kantaan ja authenticateUser
jolla suoritetaan autentikaatio.
*/

const bcrypt = require('bcryptjs');
const createToken = require('../createtoken.js');
const dbo = require('../conn/conn.js');

const UserController = {

  // uuden käyttäjän rekisteröinti eli lisääminen kantaan
  registerUser: function (req, res) {
    const dbConnect = dbo.getDb();
    // passu kryptataan ennen kantaan laittamista
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // oliosta tulevat tiedot kantaan
    const user = {
      username: req.body.username,
      password: hashedPassword,
      isadmin: req.body.isadmin,
    }

    dbConnect
      .collection('users')
      .insertOne(user, (err, user) => {
        if (err) {
          return res.status(500).send('Käyttäjän rekisteröinti epäonnistui.');
        } else {
          const token = createToken(user); // tokenin luontimetodi
          // palautetaan token JSON-muodossa
          res.json({
            success: true,
            message: 'Tässä on valmis Token!',
            token: token,
          });
        }
      });
  },

  // olemassa olevan käyttäjän autentikaatio
  // jos autentikaatio onnistuu, käyttäjälle luodaan token
  authenticateUser: function (req, res) {
    const dbConnect = dbo.getDb();
    // etsitään käyttäjä kannasta http-pyynnöstä saadun käyttäjätunnuksen perusteella
    dbConnect
      .collection('users')
      .findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          throw err;
        }
        if (!user) {
          res.json({
            success: false,
            message: 'Autentikaatio epäonnistui, käyttäjää ei ole.',
          });
        } else if (user) {
          if (bcrypt.compareSync(req.body.password, user.password) === false) {
            res.json({
              success: false,
              message: 'Autentikaatio epäonnistui, väärä salasana.',
            });
          } else { // jos salasanat ovat samat, luodaan token
            const token = createToken(user); // tokenin luontimetodi
            // palautetaan token JSON-muodossa
            res.json({
              success: true,
              message: 'Tässä on valmis Token!',
              token: token,
            });
          }
        }
      });
  }
};

module.exports = UserController;
