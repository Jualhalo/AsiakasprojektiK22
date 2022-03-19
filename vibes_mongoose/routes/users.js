/*
userin reitit. Käyttäjä pystyy rekisteröitymään
eli lisäämään tunnuksensa kantaan ja kirjautumaan antamalla tunnarinsa.
*/
const express = require('express');
const router = express.Router();
const userCon = require('../controllers/UserController'); // user-reittien kontrolleri

/*
// GET users listing. 
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
*/

// rekisteröityminen eli luodaan uudelle käyttäjän tunnarit
router.post('/register', userCon.registerUser);
// kirjautuminen eli autentikaatio tunnareilla
router.post('/login', userCon.authenticateUser);

module.exports = router;
