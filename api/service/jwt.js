/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const { createSession } = require('../model/session/SessionModel');
const { updateAdmin } = require('../model/user/UserModel');

const JWT_ACCESS_SECRET = '1234erfsafd425sfdass';
const JWT_REFRESH_SECRET = 'ds3443erfgr[po';

const createAccessJWT = async (userInfo) => {
  const token = jwt.sign(userInfo, JWT_ACCESS_SECRET, { expiresIn: '15m' });
  //   Save this token in db before returning it
  //   Save it in session collection
  await createSession({ accessToken: token, associate: userInfo.email });
  return token;
};

const verifyAccessJWT = (token) => jwt.verify(token, JWT_ACCESS_SECRET);
const verifyRefreshJWT = (token) => jwt.verify(token, JWT_REFRESH_SECRET);

const createRefreshJWT = async (userInfo) => {
  const token = jwt.sign(userInfo, JWT_REFRESH_SECRET, { expiresIn: '30d' });
  //   Save this token in db before returning it
  //    save it in user collection
  await updateAdmin({ email: userInfo.email }, { refreshJWT: token });
  return token;
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
};
