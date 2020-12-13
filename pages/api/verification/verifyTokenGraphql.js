const jwt = require("jsonwebtoken");

const verify = (handler) => async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    req.isAuth = false;
    return handler(req, res);
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.isAuth = true;
    req.user = verified;
  } catch (err) {
    throw Error("Invalid token");
  }
  return handler(req, res);
};

export default verify;
