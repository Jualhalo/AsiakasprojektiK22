const express = require('express');
const router = express.Router();
const vibesc = require('../controllers/vibesController.js');
const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

// http://localhost:3000/vibes/
router.get('/', vibesc.findall);

// http://localhost:3000/vibes/5ff35a144ebe0c2a942198c2
router.get('/:id', vibesc.findbyid)

// seuraavat reitit ovat käytössä vain authorisoiduille käyttäjille
// authorize -funktio suoritetaan ennen kuin päästään kontrollerin metodiin

// http://localhost:3000/vibes/
router.post('/', authorize, vibesc.add);

// http://localhost:3000/vibes/5ff35a144ebe0c2a942198c2
router.delete('/:id', authorize, vibesc.delete);

module.exports = router;