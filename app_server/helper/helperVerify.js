const jwt = require("jsonwebtoken");

function verifyPost(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userToken) => {
      if (err) {
        return res.status(401).json([]);
      }
      next();
    });
  } else {
    return res.status(400).json([]);
  }
}

module.exports = verifyPost;
