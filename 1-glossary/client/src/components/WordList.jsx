import React from "react";

const WordList = (props) => {

  return (
    <div>
      {props.words.map((word, index) => (
        <li key={index}><b>{word.word}</b>: {word.definition}
          <input type="button" value="Edit"/>
          <input type="button" value="Delete"/>
        </li>
      ))}
    </div>
  )

};

export default WordList;