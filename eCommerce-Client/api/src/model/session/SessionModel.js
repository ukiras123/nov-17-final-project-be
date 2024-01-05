const { timeStamp } = require("console");
const mongoose = require("mongoose");

const sessionModel = new mongoose.Schema({
     associate:{
        type: String,
        required: true
     }, 
     accessToken: {
        type: String, 
        required: true
     },
},
{timestamps: true},
)

const Session = mongoose.model('session', sessionModel )
const createSession = (sessionObj) => Session.create(sessionObj);
const deleteSession = async({accessToken}) => {
    const dt = await Session.findByIdAndDelete({accessToken})
    return dt;
}
const deleteSessionByFilter = (filter) => Session.findOneAndDelete(filter)

module.exports = {
    createSession, deleteSession, deleteSessionByFilter,
}