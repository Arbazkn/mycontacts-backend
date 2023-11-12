const express = require("express");
const {
  registerUser,
  LoginUser,
  CurrentUser,
} = require("../controllers/userController");

const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", LoginUser);

router.get("/current", validateToken, CurrentUser);

module.exports = router;
