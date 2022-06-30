import React from "react";

const Add = (props) => {
  return (
    <form>
      <h3>Add A New Word! (We are a poor excuse for a dictionary and need you're help)</h3>
      <input type="text" placeholder="Enter New Word" onChange = {(e) => props.newWord(e.target.value)}/>&nbsp;
      <input type="text" placeholder="Enter definition" onChange = {(e) => props.newDef(e.target.value)}/>&nbsp;
      <input type="button" value="SUBMIT" className="button" onClick={() => props.onClick()}/>
    </form>
    )
}




export default Add;