import React from 'react';
import ReactDOM from 'react-dom';

  // ONLY SHOWS WHEN STATE IS TRUE
  const User = (props) => {
    return (
      <div>
          <form>

            <h4>Name</h4>
            <input type="text" name="name" placeholder= "John Smith"
                onChange={(event) => props.handleChange(event)}/>

            <h4>Email</h4>
            <input type="text" name="email" placeholder="example@outlook.com"
                onChange={(event) => props.handleChange(event)}/>

            <h4>Password</h4>
            <input type="text" name="password" placeholder="password"
                onChange={(event) => props.handleChange(event)}/>

            <br></br>
            <input type="button" name="userShow" value="Login/Create User"
                onClick={(event) => props.handleLogin(event, "shippingShow")}/>

          </form>
      </div>
    )
};

export default User;


//onClick={(event) => props.handleLogin(event)}