require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const { addOrUpdate, remove, getAll, getOne} = require("./db.js");

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());

app.get("/glossary", (req, res) => {
  if (req.body.word === undefined) {
    getAll()
      .then(function(response) {
        res.status(200);
        return res.json(response);
      })
      .catch(function(err) {
        return (res.status(500).json({message: "SERVER BROKE @ GET ALL"}))
      });
  } else {
    getOne(req.body.word)
      .then(function (response) {
        return res.json(response);
      })
      .catch(function (err) {
        return (res.status(500).json({ message: "SERVER BROKE @ GET ADD ONE" }));
      });
  }
});

app.post("/glossary", (req, res) => {
  addOrUpdate(req.body)
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(err) {
      return (res.status(500).json({message: "SERVER BROKE @ POST"}));
    })
})


/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
