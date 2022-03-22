# Github Actions

Github actions on jatkuvan integraation ja jatkuvan toimituksen alusta, jonka avulla ohjelmiston testaaminen, buildaaminen sekä julkaiseminen voidaan automatisoida. Github actionsin avulla voidaan luoda työnkulkuja (workflow), joita ajetaan erilaisten tapahtumien (events) yhteydessä. 

Tämä video käy hyvin läpi Github actionsin perusteet, sekä sisältää muutamia hyviä käytännön esimerkkejä:

https://www.youtube.com/watch?v=eB0nUzAI7M8

## Events

Tapahtumat ovat tietynlaisia toimintoja Github repositoriossa, jotka käynnistävät workflow:n. Yhdessä repositoriossa voi olla useita workfloweja, jotka kaikki suorittavat erilaisia asioita eri tapahtumien yhteydessä. Esimerkkinä tapahtumasta voi olla vaikka pull request, jonka yhteydessä voidaan suorittaa workflow, joka sisältää ohjelman yksikkötestien, sekä end-to-end testien ajamisen sekä lopulta buildaamisen. 

Toisena esimerkkinä pushauksen yhteydessä voidaan suorittaa workflow, joka automaattisesti julkaisee ohjelman jossain verkkopalvelussa kuten esimerkiksi Herokussa tai Firebasessa.

Kaikkien workflowien tapahtumien ei myöskään tarvitse liittyä DevOpsiin, vaan niitä voidaan liittää myös toisenlaisiin tapahtumiin. Yhtenä esimerkkinä pull requestin yhteydessä uudelle käyttäjälle voidaan antaa tervetuloa -viesti. Tai vaikka uuden issuen postaamisen yhteydessä devaajalle voidaan lähettää e-mail viesti tai discord tai slack -notifikaatio. 

Kaikkea ei tarvitse myöskään tehdä itse, vaan monia toimintoja varten on usein olemassa myös valmis ratkaisu, joka on saatavilla mm. Github Marketplacesta (usein ilmaiseksi). Nämä valmiit ratkaisut voivat olla workflown yhteydessä ajettavia toimenpiteitä (actions) tai asennettavia sovelluksia. Asennettavissa sovelluksissa on se etu, että niitä voidaan käyttää useamman repositorion kanssa yhtäaikaisesti.

Workfloweja voidaan myös ajaa ajoitettuina taustaprosesseina. Esimerkiksi voidaan luoda workflow, joka tekee automaattisesti tietokannasta varmuuskopioinnit tiettyyn kellonaikaan päivittäin. Tapahtuma tässä olisi siis tietyn kellon ajan saavuttaminen.

Täysi lista erilaisista mahdollisista tapahtumista löytyy linkistä:

https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows

## Workflow

Workflow on muunneltava automatisoitu prosessi, joka voi sisältää yhden tai useamman työn (jobs). Workflow:t määritellään repositoriossa olevissa YAML tiedostoissa. Workflown sisältämät työt ovat kokoelmia askelia (steps), joita ajetaan järjestyksessä. Jokainen työ suoritetaan omalla sille tarkoitetulla virtuaalikoneella, jota kutsutaan runneriksi. Töitä voidaan suorittaa rinnakkaisesti, jos niillä ei ole riippuvuuksia toisiinsa. Jokaisen työn askeleen yhteydessä ajetaan joko shell scripti tai toimenpide (action). Github repositoriossa workflow:ien toimintaa voidaan seurata Actions -välilehdeltä. Tällä välilehdellä työn askeleet merkataan joko onnistuneeksi tai epäonnistuneeksi

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
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - run: npm test
      - run: npm run build
```
`name:` tähän tulee workflown nimi<br/>
`on:` -osio koodista on triggeri, johon määritellään tapahtuma jonka yhteydessä workflow käynnistetään. Tässä esimerkissä workflow käynnistyy pull requestin yhteydessä.<br/>
`jobs:` on taulukko johon määritellään kaikki workflown sisältämät työt. Ensimmäisenä annetaan työn nimi, joka on tässä esimerkissä "test_pull_request".<br/>
  `runs-on:` määrittelee runnerin käyttöjärjestelmän<br/>
  `steps:` sisältää työn askeleet:<br/>
    `uses:` tähän määritellään työssä käytetyt actionit. Tässä esimerkissä on käytetty kahta actionia `checkout` ja `setup-node`. `with:` -osiossa Setup-nodelle on vielä annettu se node-versio jolle setup ajetaan.<br/>
    `run:` määrittellee ajettavat shell-komennot. Tässä esimerkissä ajetaan seuraavat kommenot: <br/>
      `npm ci` asentaa projektin tarvitsemat riippuvaisuudet.<br/>
      `npm test` käynnistää testit<br/>
      `npm run build` buildaa projektin<br/>

## Action

Actioneita voidaan käyttää suorittamaan monimutkaisempia, useasti toistettavia töitä. Nämä toimivat hieman kuin funktiot koodissa ja niitä hyödyntämällä voidaan vähentää tarvittavan koodin määrää workflow -tiedostoissa. Actionit tarvitsevat oman metadata -tiedoston, johon on määritelty inputit, outputit sekä entrypoint

Actioneita voidaan luoda itse, mutta myös valmiiksi luotuja actioneita eri tarpeisiin on saatavilla mm. Github Markeplacesta (usein ilmaiseksi). Valmiit ratkaisut voivat olla actioneita tai asennettavia sovelluksia. Asennettavissa sovelluksissa on se etu, että niitä voidaan käyttää useamman repositorion kanssa yhtäaikaisesti.

## Runner

Runner on palvelin jolla workflow:ita ajetaan. Runner voi ajaa yhtä työtä kerrallaan. Runnerina voi käyttää Githubin tarjoamia palvelimia tai vaihtoehtoisesti käyttäjä voi hostata myös oman runnerin, mikäli tarvitaan jotain tiettyä käyttöjärjestelmä & hardware kokoonpanoa. Github tarjoaa käytettäväksi runnereita Ubuntu Linux, Microsoft Windows sekä macOS käyttöjärjestelmillä varustettuna.



