# Github Actions

Github actions on jatkuvan integraation ja jatkuvan toimituksen alusta, jonka avulla ohjelmiston testaaminen, buildaaminen sekä julkaiseminen voidaan automatisoida. Github actionsin avulla voidaan luoda työnkulkuja (workflow), joita ajetaan erilaisten tapahtumien (events) yhteydessä. Tapahtumat ovat tietynlaisia toimintoja Github repositoriossa, jotka laukaisevat workflow:n. Yhdessä repositoriossa voi olla useita työnkulkuja, jotka kaikki suorittavat erilaisia asioita. Esimerkkinä tapahtumasta voi olla vaikka pull request, jonka yhteydessä voidaan suorittaa työnkulku, joka sisältää ohjelman yksikkötestien, sekä end-to-end testien ajamisen sekä lopulta buildaamisen. Toisena esimerkkinä pushin yhteydessä voidaan suorittaa työnkulku, joka automaattisesti julkaisee ohjelman jossain verkkopalvelussa kuten esimerkiksi Herokussa tai Firebasessa.

Kaikkien työnkulkujen ei myöskään tarvitse liittyä DevOpsiin, vaan niitä voidaan liittää myös toisenlaisiin tapahtumiin. Yhtenä esimerkkinä pull requestin yhteydessä uudelle käyttäjälle voidaan antaa tervetuloa -viesti. Tai vaikka uuden issuen postaamisen yhteydessä devaajalle voidaan lähettää e-mail viesti tai discord tai slack -notifikaatio. Kaikkea ei tarvitse myöskään tehdä itse, vaan näitä toimintoja varten on usein olemassa myös valmis ratkaisu, joka on saatavilla Github Marketplacesta (usein ilmaiseksi). Nämä valmiit ratkaisut voivat olla työnkulun yhteydessä ajettavia toimenpiteitä (actions) tai asennettavia sovelluksia. Asennettavissa sovelluksissa on se etu, että niitä voidaan käyttää useamman repositorion kanssa yhtäaikaisesti.

Työnkulkuja voidaan myös ajaa ajoitettuina taustaprosesseina. Esimerkiksi voidaan luoda työnkulku, joka tekee automaattisesti tietokannasta varmuuskopioinnit tiettyyn kellonaikaan päivittäin.

Tämä video käy hyvin läpi Github actionsin perusteet, sekä sisältää hyviä käytännön esimerkkejä:

https://www.youtube.com/watch?v=eB0nUzAI7M8


## Workflow

Workflow on muunneltava automatisoitu prosessi, joka voi sisältää yhden tai useamman työn (jobs). Workflow:t määritellään repositoriossa olevissa YAML tiedostoissa. Workflow:n sisältämä työ on kokoelma askelia (steps), joita ajetaan järjestyksessä. Jokainen työ suoritetaan omalla sille tarkoitetulla virtuaalikoneella, jota kutsutaan runneriksi. Töitä voidaan suorittaa rinnakkaisesti eri runnereilla, jos niillä ei ole riippuvuuksia toisiinsa. Jokaisen työn askeleen yhteydessä ajetaan joko shell scripti tai toimenpide (action). Github repositoriossa workflow:ien toimintaa voidaan seurata Actions -välilehdeltä. Tällä välilehdellä työn askeleet merkataan joko onnistuneeksi tai epäonnistuneeksi

## Action

Actioneita voidaan käyttää suorittamaan monimutkaisempia, useasti toistettavia töitä. Nämä toimivat hieman kuin funktiot koodissa ja niitä hyödyntämällä voidaan vähentää tarvittavan koodin määrää workflow -tiedostoissa. Actioneita voidaan luoda itse, mutta myös valmiiksi luotuja actioneita eri tarpeisiin on saatavilla mm. Github Markeplacesta. Actionit tarvitsevat oman metadata -tiedoston, johon on määritelty inputit, outputit sekä entrypoint

## Runner

Runner on palvelin jolla workflow:ita ajetaan. Runner voi ajaa yhtä työtä kerrallaan. Runnerina voi käyttää Githubin tarjoamia palvelimia tai vaihtoehtoisesti käyttäjä voi hostata myös oman runnerin, mikäli tarvitaan jotain tiettyä käyttöjärjestelmä & hardware kokoonpanoa. Github tarjoaa käytettäväksi runnereita Ubuntu Linux, Microsoft Windows sekä macOS käyttöjärjestelmillä varustettuna.


## Esimerkki Workflow -tiedosto

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
Tässä kyseisessä workflow:ssa ajetaan pull requestin yhteydessä yksi työ, joka sisältää askeleet, joissa ajetaan testit sekä buildataan.