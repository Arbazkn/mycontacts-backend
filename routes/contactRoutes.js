const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");

const express = require("express");
const router = express.Router();

router.use(validateToken);

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", createContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

module.exports = router;
