/* === External ===*/
const express = require("express");

/* === Middleware === */
const path = require("path");
const app = express();
const { addOrUpdate, remove, getAll, getOne} = require("./db.js");

/* === System Variables === */
require("dotenv").config();

// Serves up all static and generated assets in ../client/dist.
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));



app.get("/glossary", (req, res) => {   // GO AND CHANGE ONE AND ALL TO BE TOGETHER
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
        res.status(200);
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

app.put("/glossary", (req, res) => {
  addOrUpdate(req.body)
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(err) {
      return (res.status(500).json({message: "SERVER BROKE @ POST"}));
    })
})

app.delete("/glossary", (req, res) => {
  console.log('here', req.body);
  remove(req.body.word)
    .then(function() {
      res.sendStatus(200);
    })
})


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
