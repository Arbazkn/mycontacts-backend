const asyncHandler = require("express-async-handler");
const contactsModel = require("../models/contactsModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactsModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await contactsModel.find({
    id: req.params.id,
    user_id: req.user.id,
  });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
  const { email, name, phone } = req.body;

  if (!email || !name || !phone) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const contact = await contactsModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await contactsModel.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have persmission to update the contact!");
  }

  const updatedContact = await contactsModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await contactsModel.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  console.log(contact.user_id);
  console.log(req.user.id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have persmission to delete the contact!");
  }

  await contactsModel.findByIdAndDelete(id);
  res.status(200).json({ message: `Contact sucessfully deleted.` });
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
