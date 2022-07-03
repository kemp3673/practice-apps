import React from 'react';
import ReactDOM from 'react-dom';

  // ONLY SHOWS WHEN STATE IS TRUE
  const Payment = (props) => {
    return (
      <div>
          <form>
             <h2>Payment Information</h2>

            <h4>Card Number</h4>
            <input type="text"  placeholder= {props.props.card || "123456789"} name="card"
                onChange={(event) => props.handleChange(event)}/>

            <h4>Billing Zipcode</h4>
            <input type="text" placeholder= {props.props.billingZipcode || "30301"} name="billingZipcode"
                onChange={(event) => props.handleChange(event)}/>

            <h4>CVV</h4>
            <input type="text" placeholder= {props.props.cvv || "123"} name="cvv"
                onChange={(event) => props.handleChange(event)}/>

            <h4>Expiration Date</h4>
            <input type="text" placeholder= {props.props.expDate || "2024-05-21"} name="expDate"
                onChange={(event) => props.handleChange(event)}/>

            <br></br>
            <input type="button" name="paymentShow" value="Back" onClick={(event) => props.handleToggle(event, "shippingShow")}/>
            <input type="button" name="paymentShow" value="Checkout" onClick={(event) => props.handleToggle(event, "messageShow")}/>
          </form>
      </div>
    )
};


export default Payment;