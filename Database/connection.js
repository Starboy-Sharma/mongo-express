const mongoose = require("mongoose");

// Create database connection
const db = require("../config/keys").MongoURI;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    // Connect to mongo db
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log(`Mongo DB connected wuuhuuu...`))
      .catch((error) => console.error(`Error in DB connection: ${error}`));
  }
}

module.exports = new Database();
