import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import WordList from "./components/WordList.jsx";
import Add from "./components/Add.jsx";
import Filter from "./components/Filter.jsx";
import Delete from "./components/Delete.jsx";
import Update from "./components/Update.jsx";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test',
      dict: [],
    };
  }

  //didmount
  componentDidMount() {
    this.handleQuery();
  }

  //GET
  handleQuery = (query) => {
    axios.get("/glossary", {word: query})
      .then(res => {
        this.setState({
          dict: res.data
        });
      });
  }

  //POST
  handleAdd = (newWord, newDefinition) => {
    axios.get("/glossary", {word: newWord, definition: newDefinition})
      .then(res => {
        this.setState({
          dict: res.data
        });
      });
  }

  //UPDATE
  handleUpdate = (toUpdate, UpdatedDefinition) => {
    axios.put("/glossary", {word: toUpdate, definition: UpdatedDefinition})
      .then(res => {
        this.handleQuery();
      });
  }

  //DELETE
  handleDelete = (toDelete) => {
    axios.delete("/glossay", {word: toDelete})
  }



  render() {
    return (
      <div>
        <h1>The Not So Complete Dictionary</h1>
        <form>
          <input type="text" placeholder="Enter New Word"/>
          <input type="text" placeholder="Enter definition"/>
          <input type="button" value="SUBMIT"/>
        </form>
        <WordList words={this.state.dict}/>
        {/* <Add words={this.state.dict} onClick={this.handleAdd}/>
        <Filter words={this.state.dict} onClick={this.handleQuery}/>
        <Delete words={this.state.dict} onClick={this.handleDelete}/>
        <Update words={this.state.dict} onClick={this.handleUpdate}/> */}

      </div>
    )
  }
};



ReactDOM.render(<App />, document.getElementById("app"));
