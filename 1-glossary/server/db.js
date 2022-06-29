const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/glossary')
  .then(() => {console.log('\x1b[33m%s\x1b[0m', 'MONGO CONNECTED')})
  .catch(err => console.log(err));


// Schema
const glossarySchema = mongoose.Schema({
  word: String,
  definition: String
});

// Models
const Glossary = mongoose.model('Glossary', glossarySchema);

// Functions

let addOrUpdate = (data) => {
    return Glossary.findOneAndUpdate(
      {word: data.word},
      {...data},
      {upsert: true}
      )
    .then(() => {console.log('\x1b[33m%s\x1b[0m', 'ENTRY CREATED')});
}

let remove = (query) => {
  return Glossary.deleteOne({word: query.word})
    .then(() => {console.log('\x1b[33m%s\x1b[0m', 'DELETED')});
}
let getOne = (word) => {
  return Glossary.find({word: word})
    .then(() => {console.log('\x1b[33m%s\x1b[0m', 'ONE FOUND')});
}
let getAll = () => {
  return Glossary.find({})
    .then(() => {console.log('\x1b[33m%s\x1b[0m', 'QUERY ALL')});
}

// console.log(addOrUpdate({word: "potato", definition: "Edible root thing that Hobbits like"}));
// console.log(getAll({word: "potato", definition: "Edible root thing that Hobbits like"}));
//console.log(remove({word: "potato", definition: "Edible root thing that Hobbits like"}));

module.exports = {addOrUpdate, remove, getAll};


// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
