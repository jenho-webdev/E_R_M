// Imported required packages
const express = require("express");
const db = require("./config/dbConfig");
require("dotenv").config();
const apiRouters = require("./apiRouters");


//Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api", apiRouters);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});
