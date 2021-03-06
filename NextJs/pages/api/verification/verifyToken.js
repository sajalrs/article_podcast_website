const jwt = require("jsonwebtoken");

const verify = (handler) => async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ error: "Please Login to Proceed" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send({ error: "Invalid Token" });
  }
  return handler(req, res);
};

export default verify;

