const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToServer: async (callback) => {
        const uri = process.env.DB_CONN;
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect((err, db) => {
            if (err || !db) {
              return callback(err);
            }
            dbConnection = db.db('vibes');
            return callback();
        });
  },

  getDb: function () {
    return dbConnection;
  },
};
/*
const connect = async () => {
    const client = new MongoClient(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect();
      const db = client.db();
      console.log('Yhteys kantaan toimii');
  
      const users = db.collection('users');
      const vibes = db.collection('vibes');
  
      const collections = await db.collections();
    } catch (err) {
      console.log('Yhteys ei toimi, tuli virhe' + err);
    } finally {
      await client.close();
    }
  };*/