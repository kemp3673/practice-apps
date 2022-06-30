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
    .then(() => {console.log('\x1b[33m%s\x1b[0m', 'ENTRY CREATED')});
}

// DELETE
let remove = (query) => {
  console.log(`Inner Remove-DB: ${query}`)
  return Glossary.deleteOne({word: query})
    .exec();
}

// GET - One
let getOne = (query) => {
  console.log(`Get One - ${query}`)
  return Glossary.find({word: query})
    .exec();
}
// GET - All
let getAll = () => {
  console.log('Inside DB GET')
  return Glossary.find({})
    .limit(10)
    .exec();
}

module.exports = {addOrUpdate, remove, getAll, getOne};
