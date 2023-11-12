const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const userExists = await isUserExists(email);
  if (userExists) {
    res.status(400);
    throw new Error("User already exist.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res
      .status(201)
      .json({ _id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid.");
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Username and password both are required.");
  }

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // login success
    // return access token
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    res.status(200).json({ accessToken: accessToken });
  } else {
    // login failed
    res.status(401);
    throw new Error("email or password is not valid.");
  }
});

const CurrentUser = asyncHandler(async (req, res) => {
  console.log(`Current User information`);
  res.status(200).json(req.user);
});

const getUsers = asyncHandler(async (req, res) => {
  res.json({ message: "Get all users" });
});

const getUserById = asyncHandler(async (req, res) => {
  res.json({ message: `Getting user by Id ${req.params.id}` });
});

const createUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register a user" });
});

const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: `Updateing user by Id ${req.params.id}` });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.json({ message: `Delete user by Id ${req.params.id}` });
});

const isUserExists = async (email) => {
  const userExists = await userModel.findOne({ email });
  return userExists;
};

module.exports = { registerUser, LoginUser, CurrentUser };
