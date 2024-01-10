const {
  verifyAccessJWT,
  verifyRefreshJWT,
  createAccessJWT,
} = require("../service/jwt");
const { getClient } = require("../model/client/ClientModel");
const { message } = require("../utils/const");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decoded = verifyAccessJWT(authorization);
    if (decoded?.email) {
      const client = await getClient({ email: decoded?.email });
      if (!client?.refreshJWT) {
        return res.status(401).json({
          status: message.ERROR,
          message: "Unauthorized",
        });
      }
      if (client?._id && client?.status == "active") {
        const { refreshJWT, password, ...rest } = client.toJSON();
        // user.refreshJWT = undefined;
        // user.password = undefined;
        req.clientInfo = rest;
        return next();
      }
    }

    res.status(401).json({
      status: message.ERROR,
      message: "Unauthorized",
    });
  } catch (error) {
    next(error);
  }
};

const refreshAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  decoded = verifyRefreshJWT(authorization);
  if (decoded?.email) {
    const client = await getClient({ email: decoded?.email });
  }
  if (client?._id && client?.status == "active") {
    const accessJWT = await createAccessJWT({ email: decode?.email });
    return res.json({
      status: message.SUCCESS,
      accessJWT,
    });
  }

  res.status(401).json({
    status: message.ERROR,
    message: "authorization not valid or unauthorized",
  });
};

module.exports = {
  auth,
  refreshAuth,
};
