const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  associate: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Session = mongoose.model('session', sessionSchema);

const createSession = (sessionObj) => Session.create(sessionObj);

module.exports = {
  createSession,
};
