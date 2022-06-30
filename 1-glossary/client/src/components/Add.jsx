import React from "react";

const Add = (props) => {
  return (
    <form>
      <input type="text" placeholder="Enter New Word" onChange = {(e) => props.newWord(e.target.value)}/>&nbsp;
      <input type="text" placeholder="Enter definition" onChange = {(e) => props.newDef(e.target.value)}/>&nbsp;
      <input type="button" value="SUBMIT" onClick={() => props.onClick()}/>
    </form>
    )
}




export default Add;