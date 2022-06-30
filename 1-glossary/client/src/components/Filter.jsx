import React from "react";

const Filter = (props) => (
  <form>
      <input type="text" placeholder="Enter Query" onChange = {(e) => props.newWord(e.target.value)}/>&nbsp;
      <input type="button" value="SEARCH" onClick={() => props.handleQuery()}/>
    </form>
)




export default Filter;