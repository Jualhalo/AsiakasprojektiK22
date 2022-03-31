# Github Actions

Github actions on jatkuvan integraation sekä jatkuvan toimituksen alusta, jonka avulla ohjelmiston testaaminen, buildaaminen sekä julkaiseminen voidaan automatisoida. Github actionsin avulla voidaan luoda työnkulkuja (workflow), joita ajetaan erilaisten tapahtumien (events) yhteydessä. 

Githubin omat Github Actions -materiaalit löytyvät linkistä:<br/>
https://docs.github.com/en/actions

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
    `uses:` -avainsanan perään määritellään työssä käytetyt actionit. Tässä esimerkissä on käytetty kahta actionia: `checkout` ja `setup-node`. Checkout on Github Actionsin tarvitsema action, joka täytyy olla mukana workflowssa. Setup-node ajaa noden setupin. `with:` -osiossa Setup-nodelle on annettu node-versio joka asennetaan.<br/>
    `run:` -avainsana määrittellee ajettavat shell-komennot. Tässä esimerkissä ajetaan seuraavat kommenot: <br/>
      `npm install` asentaa projektin tarvitsemat riippuvaisuudet.<br/>
      `npm test` käynnistää testit<br/>
      `npm run build` buildaa projektin<br/>

Workflowien YAML syntaxista voi lukea lisää linkistä:<br/>
https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

## Action

Actioneita voidaan käyttää suorittamaan monimutkaisempia, useasti toistettavia töitä. Niitä hyödyntämällä voidaan vähentää tarvittavan koodin määrää workflow -tiedostoissa. 
Actioneita voidaan luoda itse, mutta myös valmiiksi luotuja actioneita eri tarpeisiin on saatavilla mm. Github Markeplacesta. 

Actioneita on mahdollista tehdä docker -konteissa ajettaviksi, tai runnerilla suoraan ajettaviksi javascript actioneiksi. On myös mahdollista tehdä actioneita, jotka yhdistävät useamman workflown askeleen yhdeksi askeleeksi. Näitä kutsutaan composite actioneiksi.
Action tarvitsee metadata tiedoston, jossa sen inputit, outputit sekä konfiguraatio on määritelty. Tämä tiedosto nimetään joko `action.yaml` tai `action.yml`.

Lisätietoa actioneiden luomisesta löytyy linkistä:<br/>
https://docs.github.com/en/actions/creating-actions

## Runner

Runner on palvelin jolla workflow:ita ajetaan. Runner voi ajaa yhtä työtä kerrallaan. Runnerina voi käyttää Githubin tarjoamia palvelimia tai vaihtoehtoisesti käyttäjä voi hostata myös oman runnerin, mikäli tarvitaan jotain tiettyä käyttöjärjestelmä & hardware kokoonpanoa. Github tarjoaa käytettäväksi runnereita Ubuntu Linux, Microsoft Windows sekä macOS käyttöjärjestelmillä varustettuna.

# Github actions demo

Github actions workflowia voidaan kokeilla valmiilla ohjelmalla. Tätä tehtävää varten tarvitset tyhjän Github repositorion, johon voit pushata ohjelman. Git täytyy myös olla asennettuna koneella.
Demo-ohjelman repositorio löytyy osoitteesta:<br/>
https://github.com/Jualhalo/todoLista

Tämän repositorion sisällön voi ladata painamalla repositorion tiedostoselaimen yläkulmassa olevaa vihreää `code` appia ja valitsemalla sen alta `Download ZIP`.
Pura zippi haluamaasi hakemistoon. Projektissa oleva workflow tiedosto löytyy `.github/workflows` -polun takaa. 

Voit pushata projektin omaan repositorioosi navigoimalla Git Bashissa `todoLista-main` -hakemistoon ja antamalla hakemistossa seuraavat komennot:<br/>

`git init`<br/>
`git add .`<br/>
`git commit -m "viesti"` voit kirjoittaa tähän haluamasi commit viestin<br/>
`git branch -M main`<br/>
`git remote add origin https://github.com/Käyttäjätunnus/repositorio.git` URL:iin tulee käyttäjätunnuksesi sekä repositoriosi nimi<br/>
`git push -u origin main`<br/>

Projekti sisältää jo valmiin workflow tiedoston. Workflowssa on työ, joka käynnistyy main haaran push  -eventin yhteydessä. Eli kun pushasit projektin repositorioosi, workflown pitäisi käynnistyä automaattisesti. Pääset seuraamaan workflown toimintaa ja tuloksia repositoriostasi Actions -välilehdeltä. Näkymässä on listattu kaikki workflowt. Jos jokin niistä on käynnissä, sen vierellä on keltainen merkki. Klikkaamalla workflow:ta se laajentuu ja pääset näkemään kaikki sen sisältämät työt. Työtä klikattaessa sekin laajentuu ja näet listan kaikista työn askeleista. Tässä näkymässä näet myös kaikki onnistuneet/epäonnistuneet vaiheet, sekä sen vaiheen jossa workflow on kyseisellä hetkellä menossa, edelleen keltaisella merkillä merkattuna.

Menikö kaikki työt workflowssa läpi onnistuneesti? Jos ei mennyt niin näet työnäkymässä punaisella merkillä merkattuna vaiheen, jossa workflow epäonnistui. Esimerkiksi jos projektissa olevista yksikkötesteistä yksi tai useampi epäonnistui, se näkyisi työnäkymässä kohdassa `Run npm test`. Epäonnistuneen vaiheen voi laajentaa, jolloin siinä näkyy mitkä testit onnistuivat ja mitkä epäonnistuivat. Jos jokin epäonnistui, mukana on myös error viesti, joka viittaa epäonnistumisen syyhyn. Tällöin koodiin tulisi tehdä korjauksia, jotta kaikki testit menevät läpi. Kun korjaukset on tehty koodiin, voidaan korjaukset pushata uudelleen antamalla seuraavat komennot Git Bashissa:

`git add .`<br/>
`git commit -m "korjaus"`<br/>
`git push`<br/>

Uudelleen pushattaessa workflowin pitäisi jälleen käynnistyä automaattisesti. Mikäli kaikki vaiheet onnistuivat, workflowin viereen tulee vihreä ok -merkki.

### Automaattinen julkaiseminen Herokuun

Workflowiin voidaan lisätä uusi työ joka julkaisee projektin Herokussa, olettaen että edellinen työ suoriutui onnistuneesti. Tätä osiota varten tarvitset heroku -tunnukset.

Ensimmäisenä tulee luoda uusi heroku-projekti. Tarvitset Github Actionsia julkaisuputken workflowia varten seuraavat tiedot: luomasi projektin nimi, email osoite joka on liitetty heroku -tunnukseesi sekä API avain, jonka löydät herokusta `Account Settings` alta.

**Varoitus: Älä koskaan pasteta tietojasi workflow -tiedostoon sellaisenaan, varsinkaan jos repositoriosi on julkinen. Voit sen sijaan tallentaa tiedot turvallisesti kryptattuna github repositorioosi seuraavan ohjeen mukaisesti:** 

Repositoriossa polun `Settings -> Security -> Secrets -> New Repository Secret` takaa löydät lomakkeen, johon voi syöttää tietosi esimerkin mukaan: 

name: `HEROKU_APP_NAME` value: heroku projektisi nimi <br/>
name: `HEROKU_EMAIL` value: email osoite joka on liitetty heroku -tunnukseesi<br/>
name: `HEROKU_API_KEY`. value: API avain, jonka löydät herokusta `Account Settings` alta<br/>

Kun tietosi on tallennettu `secrets`:iin, voit käyttää niitä github actionsin workflowissa viittaamalla secretin nimeen aidon tiedon sijasta.

Seuraavaksi voit lisätä workflowiin uuden työn, joka hoitaa automaattisen julkaisemisen, lisäämällä seuraavan koodin `workflow.yml` -tiedoston perään:
```
deploy:
    name: Automaattinen julkaisu Herokuun
    needs: test
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - uses: akhileshns/heroku-deploy@v3.12.12
      with: 
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
```
Huomaa että töiden (jobs) sisennysten tulee olla samalla tasolla, tai workflow ei muuten käynnisty yml syntax errorin takia.
Voit jälleen käynnistää workflowit pushaamalla tekemäsi muutokset repositorioosi. Mikäli kaikki työt onnistuivat, sovelluksen pitäisi olla julkaistuna herokuun. Huom. heroku-deploy -actionin ajossa voi mennä muutama minuutti.





