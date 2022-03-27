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