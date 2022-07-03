require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");
const Promise = require("bluebird");

// Establishes connection to the database on server start
const db = require("./db");



const app = express();
app.use(express.json());

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));


// SELECT data from db


app.get("/checkout/:name", (req, res) => {
  db.get(req.params)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send(err)
  });
});


// INSERT INTO db
app.post("/checkout", (req, res) => {
  console.log(req.body);
  db.create(req.body, req.session_id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
     res.status(500).send(err)
  });
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
