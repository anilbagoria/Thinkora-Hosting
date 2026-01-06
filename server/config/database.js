const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,   // ✅ Fixed typo
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection Success")) // ✅ Fixed
    .catch((err) => {
      console.log("DB Connection Failed");
      console.log(err.message); // Show only message for clarity
      process.exit(1);
    });
};
