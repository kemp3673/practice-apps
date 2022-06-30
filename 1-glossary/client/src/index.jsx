import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import WordList from "./components/WordList.jsx";
import Add from "./components/Add.jsx";
import Filter from "./components/Filter.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      dict: [],
      newWord: '',
      newDef: '',
      updateWord: '',
      updateDef: '',
      ogWord: '',
    };
  }

  //didmount
  componentDidMount() {
    this.handleQuery('undefined');
  }

  // Add/Update input handler
  handleWordInput = (e) => {
    let input = e;
    this.setState({newWord: input});
  }
  handleDefInput = (e) => {
    let input = e;
    this.setState({newDef: input});
  }
  handleWordUpdateInput = (e, word) => {
    let input = e;
    this.setState({updateWord: input, ogWord: word.word});
  }
  handleDefUpdateInput = (e) => {
    console.log(e);
    let input = e;
    this.setState({updateDef: input});
  }
  // wordUpdating = (e) => {
  //   console.log(e);
  //   let input = e;
  //   this.setState({ogWord: input});
  // }




  //GET
  handleQuery = (query) => {
    if (this.state.newWord === '') {
      query = 'undefined';
    } else {
      query = this.state.newWord;
    }
    axios.get(`/glossary/${query}`)
      .then(res => {
        this.setState({
          dict: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //POST
  handleAdd = (newWord, newDefinition) => {
    newWord = this.state.newWord;
    newDefinition = this.state.newDef;
    axios.post("/glossary", {word: newWord, definition: newDefinition})
      .then(res => {
        this.setState({
          newWord: '',
          newDef: ''
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //UPDATE
  handleUpdate = (filter, word, definition) => {
    filter = this.state.ogWord;
    word = this.state.updateWord || this.state.ogWord;
    console.log(filter, word)
    definition = this.state.updateDef || this.state.dict[this.state.dict.indexOf(this.state.dict[filter])];
    axios.put("/glossary", {filter: filter, word: word, definition: definition})
      .then(() => {
        this.handleQuery(word);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //DELETE
  handleDelete = (toDelete) => {
    axios.delete("/glossary", {data: {word: toDelete}})
    .then(res => {
    })
    .catch(err => {
      console.log(err);
    });
  }

    // Should be a body-parsing issue. Have express.json as middleware on server side. Tried manually setting header to content-type: application/json.


  render() {
    return (
      <div>
        <img src="https://www.nicepng.com/png/detail/340-3404228_book-book-bfdi-pose.png"/>
        <h1>The Not So Complete Dictionary</h1>
        <br></br>
        <Add onClick={this.handleAdd} newWord = {this.handleWordInput} newDef = {this.handleDefInput}/>
        {/* <Update handleUpdate={this.handleUpdate} updateWord = {this.handleWordUpdateInput} updateDef = {this.handleDefUpdateInput} wordUpdating = {this.wordUpdating}/> */}
        <Filter words={this.state.dict} newWord = {this.handleWordInput} handleQuery={this.handleQuery}/>
        <WordList class="list" words={this.state.dict} delete={this.handleDelete} handleUpdate={this.handleUpdate} updateWord = {this.handleWordUpdateInput} updateDef = {this.handleDefUpdateInput} wordUpdating = {this.wordUpdating}/>
      </div>
    )
  }
};



ReactDOM.render(<App />, document.getElementById("app"));
