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
      })
      .catch(err => {
        console.log(err);
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
    // axios.put("/glossary", {word: toUpdate, definition: UpdatedDefinition})
    //   .then(res => {
    //     this.handleQuery();
    //   });
  }

  //DELETE
  handleDelete = (toDelete) => {
    axios.delete("/glossary", {word: toDelete}, {headers: {'Content-Type': 'application/json'}
 })
    .then(res => {
      console.log(`DELETED ${toDelete}`)
    })
  }



  render() {
    return (
      <div>
        <img src="https://www.nicepng.com/png/detail/340-3404228_book-book-bfdi-pose.png"/>
        <h1>The Not So Complete Dictionary</h1>
        <Add words={this.state.dict} onClick={this.handleAdd}/>
        <WordList class="list" words={this.state.dict} delete={this.handleDelete} update={this.handleUpdate}/>
        {/* <Filter words={this.state.dict} onClick={this.handleQuery}/> */}
      </div>
    )
  }
};



ReactDOM.render(<App />, document.getElementById("app"));
