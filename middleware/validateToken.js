const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User not authorized");
      }
      req.user = decode.user;
      next();
    });
    if (!accessToken) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;
