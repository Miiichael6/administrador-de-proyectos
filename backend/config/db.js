require("dotenv").config();
const mongoose = require("mongoose");
const db = process.env.DATABASE;

const connectarDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(db);
    const url = `${connection.connection.host}:${connection.connection.port}`;

    console.log(`connected in server ${url}`);
  } catch (error) {
    console.error(`error ${error.message}`);
    // process.exit(1);
  }
};

module.exports = connectarDB;
