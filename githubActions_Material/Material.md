# Github Actions

Github actions on jatkuvan integraation sekä jatkuvan toimituksen alusta, jonka avulla ohjelmiston testaaminen, buildaaminen sekä julkaiseminen voidaan automatisoida. Github actionsin avulla voidaan luoda työnkulkuja (workflow), joita ajetaan erilaisten tapahtumien (events) yhteydessä. 

Tämä video käy hyvin läpi Github actionsin perusteet, sekä sisältää muutamia hyviä käytännön esimerkkejä:<br/>
https://www.youtube.com/watch?v=eB0nUzAI7M8

## Events

Tapahtumat ovat tietynlaisia toimintoja Github repositoriossa, jotka käynnistävät workflow:n. Yhdessä repositoriossa voi olla useita workfloweja, jotka kaikki suorittavat erilaisia asioita eri tapahtumien yhteydessä. Esimerkkinä tapahtumasta voi olla vaikka pull request, jonka yhteydessä voidaan suorittaa workflow, joka sisältää ohjelman yksikkötestien, sekä end-to-end testien ajamisen sekä lopulta buildaamisen. 

Toisena esimerkkinä pushauksen yhteydessä voidaan suorittaa workflow, joka automaattisesti julkaisee ohjelman jossain verkkopalvelussa kuten esimerkiksi Herokussa tai Firebasessa.

Kaikkien workflowien tapahtumien ei myöskään tarvitse liittyä DevOpsiin, vaan niitä voidaan liittää myös toisenlaisiin tapahtumiin. Yhtenä esimerkkinä pull requestin yhteydessä uudelle käyttäjälle voidaan antaa tervetuloa -viesti. Tai vaikka uuden issuen postaamisen yhteydessä devaajalle voidaan lähettää e-mail viesti tai discord tai slack -notifikaatio. 

Workfloweja voidaan myös ajaa ajoitettuina taustaprosesseina. Esimerkiksi voidaan luoda workflow, joka tekee automaattisesti tietokannasta varmuuskopioinnit tiettyyn kellonaikaan päivittäin. Tapahtuma tässä olisi siis tietyn kellon ajan saavuttaminen.

Täysi lista erilaisista mahdollisista tapahtumista löytyy linkistä:<br/>
https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows

## Workflow

Workflow on muunneltava automatisoitu prosessi, joka voi sisältää yhden tai useamman työn (jobs). Workflown sisältämät työt ovat kokoelmia askelia (steps), joita ajetaan järjestyksessä. Jokainen työ suoritetaan omalla sille tarkoitetulla virtuaalikoneella, jota kutsutaan runneriksi. Töitä voidaan suorittaa rinnakkaisesti, jos niillä ei ole riippuvuuksia toisiinsa. Työn suorittamiselle voidaan myös asettaa jokin ehto, joka pitää täyttyä. Jokaisen työn askeleen yhteydessä ajetaan joko shell scripti tai toimenpide (action). 

Github repositoriossa workflow:ien toimintaa voidaan seurata Actions -välilehdeltä, missä workflowt on visualisoitu käyttäjälle. Kun workflowta ajetaan, käyttäjä näkee välilehdeltä jokaisen työn askeleen tuloksen.

Workflow:t määritellään repositoriossa olevissa YAML tiedostoissa, jotka tallennetaan `.github/workflows` -hakemistoon repositorioissa. Tiedostot voi nimetä haluamillaan nimillä.

### Esimerkki Workflow -tiedosto

```
name: Node Continuous Integration

on:
  pull_request:
    branches: [ main ]


jobs:
  test_pull_request:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v2
        with:
          node-version: 16
      - run: npm install
      - run: npm test
      - run: npm run build
```
`name:` määrittelee workflown nimen<br/>
`on:` -osiossa määritellään triggeri, jonka yhteydessä workflow käynnistetään. Tässä esimerkissä workflow käynnistyy pull requestin yhteydessä.<br/>
`jobs:` alle määritellään kaikki workflown sisältämät työt. Ensimmäisenä annetaan työn nimi, joka on tässä esimerkissä "test_pull_request".<br/>
  `runs-on:` määrittelee runnerin käyttöjärjestelmän<br/>
  `steps:` sisältää työn askeleet:<br/>
    `uses:` -avainsanan perään määritellään työssä käytetyt actionit. Tässä esimerkissä on käytetty kahta actionia: `checkout` ja `setup-node`. `with:` -osiossa Setup-nodelle on annettu node-versio joka asennetaan.<br/>
    `run:` -avainsana määrittellee ajettavat shell-komennot. Tässä esimerkissä ajetaan seuraavat kommenot: <br/>
      `npm install` asentaa projektin tarvitsemat riippuvaisuudet.<br/>
      `npm test` käynnistää testit<br/>
      `npm run build` buildaa projektin<br/>

## Action

Actioneita voidaan käyttää suorittamaan monimutkaisempia, useasti toistettavia töitä. Niitä hyödyntämällä voidaan vähentää tarvittavan koodin määrää workflow -tiedostoissa. 
Actioneita voidaan luoda itse, mutta myös valmiiksi luotuja actioneita eri tarpeisiin on saatavilla mm. Github Markeplacesta. 

Actioneita on mahdollista tehdä docker -konteissa ajettaviksi, tai runnerilla suoraan ajettaviksi javascript actioneiksi. On myös mahdollista tehdä actioneita, jotka yhdistävät useamman workflown askeleen yhdeksi askeleeksi. Näitä kutsutaan composite actioneiksi.
Action tarvitsee metadata tiedoston, jossa sen inputit, outputit sekä konfiguraatio on määritelty. Tämä tiedosto nimetään joko `action.yaml` tai `action.yml`.

Lisätietoa actioneiden luomisesta löytyy linkistä:<br/>
https://docs.github.com/en/actions/creating-actions

## Runner

Runner on palvelin jolla workflow:ita ajetaan. Runner voi ajaa yhtä työtä kerrallaan. Runnerina voi käyttää Githubin tarjoamia palvelimia tai vaihtoehtoisesti käyttäjä voi hostata myös oman runnerin, mikäli tarvitaan jotain tiettyä käyttöjärjestelmä & hardware kokoonpanoa. Github tarjoaa käytettäväksi runnereita Ubuntu Linux, Microsoft Windows sekä macOS käyttöjärjestelmillä varustettuna.



