import React from "react";

const Filter = (props) => {
  return (
    <form>
      <h3>Can't See What You're Looking For?</h3>
      <input type="text" placeholder="Enter Query" onChange = {(e) => props.newWord(e.target.value)}/>&nbsp;
      <input type="button" value="SEARCH" className="search" onClick={() => props.handleQuery()}/>
    </form>
  )
}




export default Filter;