// grab necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const { Order, User, Product } = require("./models");

// create an express app
const app = express();

// set the port for the server
const port = 3000;

// set up sequelize for postgresql db connection
const sequelize = new Sequelize("SenecaDB", "cchand3", "4WsMO5BvjoVC", {
  host: "ep-round-leaf-68528432-pooler.us-east-2.aws.neon.tech",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
  logging: false, // turn off logging for db queries
});

// authenticate and log connection status
sequelize
  .authenticate()
  .then(() => {
    console.log("connected to the database successfully.");
  })
  .catch((err) => {
    console.error("unable to connect to database:", err);
  });

// sync sequelize models with the database
sequelize.sync();

// set the view engine to EJS
app.set("view engine", "ejs");

// use bodyparser middleware for parsing JSON requests
app.use(bodyParser.json());

// import route handlers for pages and API
const pageRoutes = require("./routes/page.routes");
const apiRoutes = require("./routes/api.routes");

// define models for the application
const models = { Order, User, Product };

// use the page and API routes
app.use("/", pageRoutes);
app.use("/api", apiRoutes(models));

// start the server and log the port
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});