/*
Kontrolleri on tehty siksi että saadaan erotettua reitit 
ja tietokantahakujen sovelluslogiikka toisistaan. 
Se on siis arkkitehtuuriratkaisu eli saamme aikaan järkevämmän
arkkitehtuurin kun teemme koodin jolla on tietty käyttötarkoitus 
omaan kansioonsa.
*/
const Student = require('../models/Student');
const studentcontroller = {

    // haetaan opiskelijat joilla on alle 100 opintopistettä
    findbypoints: (req, res) => {
        Student.find().where('studypoints').lt(100).then((students) => {
            res.json(students);
        }).catch((err) => {
            console.error(err);
        })
    },

    // haetaan kaikki opiskelijat
    findall: (req, res) => {
        Student.find().then((students) => {
            res.json(students);
        }).catch((err) => {
            console.error(err);
        });
    },

    // haetaan opiskelija opiskelijanumeron perusteella
    // req.params.scode hakee urlista opiskelijanumeron
    // dynaaminen parametri jossa on : edessä saadaan tällä tavalla
    findbyscode: (req, res) => {
        Student.findOne({ studentcode: req.params.scode }).then((student) => {
            res.json(student);
        }).catch((err) => {
            console.error(err);
        });
    },

    // haetaan opiskelija id:n perusteella
    findbyid: (req, res) => {
        Student.findOne({ _id: req.params.id }).then((student) => {
            res.json(student);
        }).catch((err) => {
            console.error(err);
        });
    },

    // deletoidaan opiskelija id:n perusteella
    delete: (req, res) => {
        Student.findOneAndDelete({ _id: req.params.id }).then((student) => {
            res.json(student);
        }).catch((err) => {
            console.error(err);
        });
    },

    // findOneAndUpdaten argumentit ovat kaksi oliota. Ensimmäinen valitsee
    // päivitettävän kohteen, toinen määrittää mitä päivitetään.
    // opintopisteiden päivitys
    updatespoints: (req, res) => {
        Student.findOneAndUpdate({ _id: req.params.id },
            { studypoints: req.params.spoints }).then(() => {
                res.send('Studypoints updated');
            }).catch((err) => {
                console.error(err);
            });
    },

    // päivitetään koko opiskelija-olio    
    update: (req, res) => {
        // findByIdAndUpdate käyttää aina id:tä päivitykseen
        // req.body on koko opiskelija JSON-muodossa
        Student.findByIdAndUpdate(req.params.id, req.body).then((student) => {
                res.json(student);
            }).catch((err) => {
                console.error(err);
            });
    },

    // data joka lisätään eli postataan kantaan tulee post metodin pyynnössä
    // eli requestissa clientilta eli asiakassovellukselta
    add: (req, res) => {

        // req.body sisältää opiskelija-olion joka tulee clientilta
        const NewStudent = Student(req.body);

        // metodin vastauksen käsittely callbackillä
        // save.metodin callback tuottaa err-virheen tai res-vastauksen
        NewStudent.save((err, student) => {
            if (err) {
                console.error(err);
            }
            console.log('Student object added to db' + student);
            res.json(student); // tämä menee frontendiin
        });
    },

    addcourse: (req, res) => {
        const newgrade = Student(req.body);
        Student.findOneAndUpdate({ _id: req.params.id },
            {$push: {grades: newgrade} }).then(() => {
                res.send('Student updated');
            }).catch((err) => {
                console.error(err);
            });
    },
}

module.exports = studentcontroller;