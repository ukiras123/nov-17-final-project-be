const { verifyAccessJWT, verifyRefreshJWT, createAccessJWT } = require('../service/jwt');
const { getUser } = require('../model/user/UserModel');
const { message } = require('../utils/const');

const auth = async (req, res, next) => {
  try {
    // 1. Get the authorization from header
    // Decode / verify the jwt token
    // there is email in auth token, extract it
    // Make DB call, get user info, attach it on req

    const { authorization } = req.headers;
    const decoded = verifyAccessJWT(authorization);
    if (decoded?.email) {
      const user = await getUser({ email: decoded?.email });
      // check if a user has logged out
      if (!user?.refreshJWT) {
        return res.status(401).json({
          status: message.ERROR,
          message: 'Unauthorized',
        });
      }
      if (user?._id && user?.status == 'active') {
        const { refreshJWT, password, ...rest } = user.toJSON();
        // user.refreshJWT = undefined;
        // user.password = undefined;
        req.userInfo = rest;
        return next();
      }
    }

    res.status(401).json({
      status: message.ERROR,
      message: 'Unauthorized',
    });
  } catch (e) {
    next(e);
  }
};

const refreshAuth = async (req, res, next) => {
  try {
    // 1. Get the authorization from header
    // Decode / verify the jwt token
    // there is email in auth token, extract it
    // Make DB call, get user info, attach it on req
    // refresh Token
    const { authorization } = req.headers;
    const decoded = verifyRefreshJWT(authorization);
    if (decoded?.email) {
      const user = await getUser({ email: decoded?.email, refreshJWT: authorization });
      if (user?._id && user?.status == 'active') {
        // create a new accessJWT and send em back
        const accessJWT = await createAccessJWT({ email: decoded?.email });
        return res.json({
          status: message.SUCCESS,
          accessJWT,
        });
      }
    }

    res.status(401).json({
      status: message.ERROR,
      message: 'Unauthorized',
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  auth,
  refreshAuth,
};
