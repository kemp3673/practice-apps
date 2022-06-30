/* === External ===*/
const express = require("express");

/* === Middleware === */
const path = require("path");
const app = express();
const { addOrUpdate, remove, getAll, getOne, updateEntry} = require("./db.js");

/* === System Variables === */
require("dotenv").config();

// Serves up all static and generated assets in ../client/dist.
app.use(express.json());  // THIS IS BODY PARSER
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/glossary/:word", (req, res) => {
  if (req.params.word === 'undefined') {
    getAll()
      .then(function(response) {
        res.json;
        return res.json(response);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  } else {
    getOne(req.params.word)
      .then(function (response) {
        res.json;
        return res.json(response);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  }
});

app.post("/glossary", (req, res) => {
  addOrUpdate(req.body)
    .then(function() {
      res.json;
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
})

app.put("/glossary", (req, res) => {
  updateEntry(req.body)
    .then(function() {
      res.json;
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
})

app.delete("/glossary", (req, res) => {
  remove(req.body.word)
    .then(() => {
      res.json;
    })
    .catch(err => {
      res.status(500).send(err);
    });
})


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
