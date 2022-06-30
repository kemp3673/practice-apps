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
  return Glossary.deleteOne({word: query})
    .exec();
}
let getOne = (query) => {
  return Glossary.find({word: query})
    .exec();
}
let getAll = () => {
  return Glossary.find({})
    .limit(10)
    .exec();
}

// console.log(addOrUpdate({word: "potato", definition: "Edible root thing that Hobbits like"}));
// console.log(getAll({word: "potato", definition: "Edible root thing that Hobbits like"}));
//console.log(remove({word: "potato", definition: "Edible root thing that Hobbits like"}));

module.exports = {addOrUpdate, remove, getAll, getOne};


// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
