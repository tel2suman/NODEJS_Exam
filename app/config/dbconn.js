require("dotenv").config();

const mongoose = require("mongoose");

require("node:dns/promises").setServers(["1.1.1.1"]);

const MONGO_URL = process.env.MONGODB_URL;

const DatabaseConnection = async () => {

  try {

    const conn = await mongoose.connect(MONGO_URL);

    if (conn) {

      console.log("Database Connected Succefully!!");
    } else {

      console.log("Database Not Connected");
    }
  } catch (error) {

    console.log(error);
  }

};

module.exports = DatabaseConnection;