/*
students.js on reititystiedosto (router), joka tarjoaa REST-apin
Tietokantaoperaatiot ovat kontrollerin metodeissa

Student-datan muokkauksen mahdollistavat reitit on suojattu authorize -metodilla
joten muokkaamaan pääsy vaatii kirjautumisen
*/
const express = require('express');
const router = express.Router();
const studentc = require('../controllers/studentcontroller');
const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

// http://localhost:3000/students/
router.get('/', studentc.findall);

// http://localhost:3000/students/below100
router.get('/below100', studentc.findbypoints)

// http://localhost:3000/students/scode/a1234
// : on aina dynaamisen (muuttuvan) reittiparametrin edessä
router.get('/scode/:scode', studentc.findbyscode)

// http://localhost:3000/students/5ff35a144ebe0c2a942198c2
router.get('/:id', studentc.findbyid)

// seuraavat reitit ovat käytössä vain authorisoiduille käyttäjille
// authorize -funktio suoritetaan ennen kuin päästään kontrollerin metodiin

// http://localhost:3000/students/
router.post('/', authorize, studentc.add);

// http://localhost:3000/students/5ff35a144ebe0c2a942198c2/
router.post('/:id', authorize, studentc.addcourse);

// http://localhost:3000/students/5ff35a144ebe0c2a942198c2
router.delete('/:id', authorize, studentc.delete);

// http://localhost:3000/students/5ff35a144ebe0c2a942198c2/210
router.put('/:id/:spoints', authorize, studentc.updatespoints);

router.put('/:id', authorize, studentc.update);

module.exports = router;
