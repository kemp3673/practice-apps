import React from "react";

const WordList = (props) => {
  return (
    <div>
      {props.words.map((word, index) => (
        <li key={index} >
          <input type="button" value="Delete" className="delete" onClick={() => props.delete(word.word)}/>&nbsp;
          <b>{word.word}</b>: {word.definition}&nbsp;
          <br></br>
          <input type="text" placeholder="Edit Word" onChange = {(e) => props.updateWord(e.target.value, word)}/>&nbsp;
      <input type="text" placeholder="Edit Definition" onChange = {(e) => props.updateDef(e.target.value)}/>&nbsp;
      <input type="button" value="Edit" className="button" onClick={() => props.handleUpdate()}/>&nbsp;
        </li>
      ))}
    </div>
  )

};

export default WordList;
