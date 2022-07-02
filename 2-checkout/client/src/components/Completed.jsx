import React from 'react';
import ReactDOM from 'react-dom';

  // ONLY SHOWS WHEN STATE IS TRUE
  const Completed = (props) => {
    return (
      <div>
          <form>
             <h2>Thank You For Your Order</h2>
             <img src= "https://assets.ltkcontent.com/images/34169/thank-you-letter_0066f46bde.jpg"/>
            <input type="button" name="messageShow" value="HOME" onClick={(event) => props.handleToggle(event, "userShow")}/>
          </form>
      </div>
    )
};


export default Completed;