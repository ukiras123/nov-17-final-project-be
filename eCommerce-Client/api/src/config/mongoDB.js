const mongoose = require("mongoose");

const mongoconnect = () => {
  const dbLink = process.env.DB_URL || "mongodb://mangoDB:27017/final_project";
  return mongoose.connect(dbLink);
};
module.exports = mongoconnect;
