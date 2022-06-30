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

// POST
let addOrUpdate = (data) => {
    console.log('DATA @ DB: ', data)
    return Glossary.findOneAndUpdate(
      {word: data.word},
      {...data},
      {upsert: true}
      )
    .exec();
}

//PUT
let updateEntry = (data) => {
  console.log('inside PUT - DB', data)
  return Glossary.updateOne({word: data.filter}, {word: data.word, definition: data.definition})
    .exec();
}

// DELETE
let remove = (query) => {
  return Glossary.deleteOne({word: query})
    .exec();
}

// GET - One
let getOne = (query) => {
  return Glossary.find({word: query})
    .exec();
}
// GET - All
let getAll = () => {
  return Glossary.find({})
    .limit(10)
    .exec();
}

module.exports = {addOrUpdate, remove, getAll, getOne, updateEntry};
