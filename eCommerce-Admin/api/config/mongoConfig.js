const mongoose = require('mongoose');

const mongoConnect = () => {
  const DB_URL = process.env.DB_URL
        || 'mongodb://127.0.0.1:27017/final_project';

  return mongoose.connect(DB_URL);
};
module.exports = mongoConnect();
