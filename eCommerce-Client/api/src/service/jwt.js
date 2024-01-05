const jwt = require('jsonwebtoken');
const { createSession } = require('../model/session/SessionModel');
const { updateClient } = require('../model/client/ClientModel');

const JWT_ACCESS_SECRET = '1234erfsafd425sfdass';
const JWT_REFRESH_SECRET = 'ds3443erfgr[po';


const createAccessJWT = async(clientInfo) =>{
    const token = jwt.sign(clientInfo, JWT_ACCESS_SECRET, {expiresIn: '15m'});
    await createSession({accessToken: token, associate: clientInfo.email});
    return token
}

const verifyAccessJWT = (token) => jwt.verify(token, JWT_ACCESS_SECRET);
const verifyRefreshJWT = (token) => jwt.verify(token, JWT_REFRESH_SECRET);


const createRefreshJWT = async (clientInfo)=> {
    const token = jwt.sign(clientInfo, JWT_REFRESH_SECRET, {expiresIn: '30d'})
    await updateClient({email: clientInfo.email}, {refreshJWT: token})
    return token;
}

module.exports = {
    createAccessJWT,
    createRefreshJWT,
    verifyAccessJWT,
    verifyRefreshJWT,
};