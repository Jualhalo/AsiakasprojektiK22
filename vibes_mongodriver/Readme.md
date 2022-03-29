# Vibes Mongodriver

Backend Vibes -appia varten. Toteutettu hyödyntäen mongoDB node.js driveria.

## Asennus ja käynnistys

Backendin tarvitsemat riippuvaisuudet asennetaan ajamalla komento `npm install` projektin hakemiston juuressa. Backend käynnistetään hakemiston juuressa komennolla `npm start`. Oletuksena palvelin käyttää porttia 3000, mutta mikäli ympäristömuuttujaan on asetettu eri portti niin sitä käytetetään sen sijaan. Tietokannan osoite määritellään hakemiston juuressa olevassa `.env` tiedostossa.

## Tietokannan käyttö

Kantaa voi käyttää hyödyntämällä seuraavia reittejä:

POST `http://localhost:3000/users/register` Uuden käyttäjän luonti</br>
POST `http://localhost:3000/users/login` Sisäänkirjautuminen</br>
POST `http://localhost:3000/vibes/` Uuden viben luonti, tämä reitti on suojattu jwt-token autentikaatiolla</br>
GET `http://localhost:3000/vibes/` Kaikkien vibien haku</br>
GET `http://localhost:3000/vibes/:id` Tietyn viben haku id:n perusteella</br>
DELETE `http://localhost:3000/vibes/:id` Tietyn viben poisto id:n perusteella, tämä reitti on suojattu jwt-token autentikaatiolla</br>

Reitit on määritelty hakemistossa `\routes\` sijaitsevissa tiedostoissa `users.js` ja `vibes.js`.
Reittien takana oleva toiminnallisuus on määritelty controller tiedostoissa `UserController.js` ja `vibesController`, jotka sijaitsevat `\controllers\` hakemistossa.
Mongo driver versiossa tietueiden rakenne määritellään controller tiedostoissa, kantaan tietoa postaavien reittien toiminnallisuuden yhteydessä.

### Request sisältö

User POST request rakenne:

`"username":`,</br>
`"password":`,</br>
`"isadmin":` tämä annetaan rekisteröinnin yhteydessä</br>

Vibe POST request rakenne:

`"comment":`,</br>
`"grade":`</br>
`"token":` optional, voidaan lisätä tähän tai headeriin `x-access-token` avaimen arvoksi

Vibe postaukseen lisätään myös automaattisesti postaavan käyttäjän nimi `req.decoded.username` sekä aikaleimat `createdAt` ja `updatedAt`.
Lisäksi request bodyyn voidaan lisätä jwt-token autentikaatiota varten.

## Käyttäjänhallinta

Tietyt reitit on suojattu jwt-token autentikaation taakse. Reittejä pääsee käyttämään jos requestin headeriin lisää `x-access-token` avaimen arvoksi tokenin joka ei ole virheellinen tai expiroitunut. Token voidaan vaihtoehtoisesti myös sisällyttää requestin bodyyn. Uusi token luodaan aina käyttäjän rekisteröinnin tai sisäänkirjautumisen yhteydessä `createtoken.js` -tiedostossa. Tokenit on laitettu expiroitumaan 24 tunnissa. Token tarkistetaan suojattujen reittien yhteydessä ajettavalla authorize -funktiolla, joka viittaa `verifytoken.js` -tiedostoon.