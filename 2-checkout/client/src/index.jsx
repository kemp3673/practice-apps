import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import User from "./components/User.jsx";
import Shipping from "./components/Shipping.jsx";
import Payment from "./components/Payment.jsx";
import Completed from "./components/Completed.jsx";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      exist: false,
      street: "",
      addLine2: "",
      city: "",
      zipcode: "",
      state: "",
      phone: "",
      card: "",
      billingZipcode: "",
      cvv: "",
      expDate: "",



      userShow: true,
      shippingShow: false,
      paymentShow: false,
      messageShow: false,

    }
  }

// put name="" on each element that can be typed into

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleToggle = (event, next) => {
    this.setState({[event.target.name]: this.state[event.target.name] = !this.state[event.target.name]});
    this.setState({[next]: !this.state[next]})
  }

  handleLogin = (event, next) => {
    let query = this.state.name;
    this.handleToggle(event, next);
    axios.get(`/checkout/${query}`)
      .then((res) =>  {
        console.log(res.data);
        if (res.data.length === 0) {
          axios.post('/checkout', ({name: this.state.name, email: this.state.email, password: this.state.password}))
            .then((res) =>
            console.log(res)
            )
            .catch((err) => {
              console.log(err)
            });
        } else {
          this.setState({
            email: res.data[0].email,
            password: res.data[0].password,
            street: res.data[0].street,
            addLine2: res.data[0].addLine2,
            city: res.data[0].city,
            zipcode: res.data[0].zipcode,
            state: res.data[0].state,
            phone: res.data[0].phone,
            card: res.data[0].card,
            billingZipcode: res.data[0].billZipcode,
            cvv: res.data[0].cvv,
            expDate: res.data[0].exp_date,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        {this.state.userShow ? <User props={this.state} handleChange={this.handleChange} handleToggle={this.handleToggle} handleLogin={this.handleLogin}/> : null}
        {this.state.shippingShow ? <Shipping props={this.state} handleChange={this.handleChange} handleToggle={this.handleToggle}/> : null}
        {this.state.paymentShow ? <Payment props={this.state} handleChange={this.handleChange} handleToggle={this.handleToggle}/> : null}
        {this.state.messageShow ? <Completed props={this.state} handleToggle={this.handleToggle}/> : null}
      </div>
      )
    }
};




ReactDOM.render(<App />, document.getElementById("app"));