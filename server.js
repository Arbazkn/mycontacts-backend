const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHanlder");
const connect = require("./configs/DbConnection");

// Connect to DB
connect();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
