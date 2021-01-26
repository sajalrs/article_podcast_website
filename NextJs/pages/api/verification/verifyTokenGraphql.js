const jwt = require("jsonwebtoken");

const verify = (handler) => async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    req.authData = null;
    return handler(req, res);
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.authData = verified;
  } catch (err) {
    req.authData = null;
  }
  return handler(req, res);
};

export default verify;
