const express = require("express");
const inquirer = require("inquirer");
const cTable = require('console.table');
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const PORT = process.env.PORT || 5003;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use api routes
app.use("/api", apiRoutes);

// Not Found response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});