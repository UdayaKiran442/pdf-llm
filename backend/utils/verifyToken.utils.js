const jwt = require("jsonwebtoken");


exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({
        error: "Login to perform action"
    })
  }
  const decoded = jwt.verify(token, "secret");
  return decoded;
};