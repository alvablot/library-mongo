const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Du har inte en giltig token");
  }

  const [prefix, jwtToken] = token.split(" ");

  try {
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
    req.user = decoded;
    // res.json({ id: decoded.id });
  } catch (err) {
    return res.status(400).send("Inte en giltig token");
  }

  next();
}

module.exports = verifyToken;
