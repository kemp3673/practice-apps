import React from 'react';
import ReactDOM from 'react-dom';

  // ONLY SHOWS WHEN STATE IS TRUE
  const Shipping = (props) => {
    return (
      <div>
          <form>
            <h2>Shipping Address</h2>

            <h4>Street Address</h4>
            <input type="text" placeholder="123 Sample St"  name="street"
                onChange={(event) => props.handleChange(event)}/>

            <h4>Apartment/Building Number</h4>
            <input type="text" placeholder="Apt #" name="addLine2"
                onChange={(event) => props.handleChange(event)}/>

            <h4>City</h4>
            <input type="text" placeholder="Atlanta" name="city"
                onChange={(event) => props.handleChange(event)}/>

            <h4>State</h4>
            <input type="text" placeholder="GA" name="state"
                onChange={(event) => props.handleChange(event)}/>

            <h4>Zipcode</h4>
            <input type="text" placeholder="30301" name="zipcode" maxLength = "5"
                onChange={(event) => props.handleChange(event)}/>

            <h4>Phone Number</h4>
            <input type="text" placeholder="1231231234" name="phone"
                onChange={(event) => props.handleChange(event)}/>

            <br></br>
            <input type="button" name="shippingShow" value="Back" onClick={(event) => props.handleToggle(event, "userShow")}/>
            <input type="button" name="shippingShow" value="Enter" onClick={(event) => props.handleToggle(event, "paymentShow")}/>
          </form>
      </div>
    )
};


export default Shipping;