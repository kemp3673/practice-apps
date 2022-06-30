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
    };
  }

  //didmount
  componentDidMount() {
    this.handleQuery();
  }

  // Add/Update input handler
  handleWordInput = (e) => {
    console.log(e);
    let input = e;
    this.setState({newWord: input});
  }
  handleDefInput = (e) => {
    console.log(e);
    let input = e;
    this.setState({newDef: input});
  }

  //GET
  handleQuery = (query) => {
    axios.get("/glossary", {data: {word: query}})
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  //UPDATE
  handleUpdate = (toUpdate, UpdatedDefinition) => {
    // axios.put("/glossary", {word: toUpdate, definition: UpdatedDefinition})
    //   .then(res => {
    //     this.handleQuery();
    //   });
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
        <Add words={this.state.dict} onClick={this.handleAdd} newWord = {this.handleWordInput} newDef = {this.handleDefInput}/>
        <WordList class="list" words={this.state.dict} delete={this.handleDelete} update={this.handleUpdate}/>
        {/* <Filter words={this.state.dict} onClick={this.handleQuery}/> */}
      </div>
    )
  }
};



ReactDOM.render(<App />, document.getElementById("app"));
