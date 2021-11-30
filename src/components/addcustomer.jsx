import React, { Component } from "react";
import axios from "axios";

class AddCustomer extends React.Component {
  state = {
    customers: {
      cid: 0,
      mobileNo: "",
      name: "",
      password: "",
      balance: "",
      walletId: 0,
    },
  };

  handleChange = (event) => {
    const customers = { ...this.state.customers };
    customers[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ customers: customers });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const customers = {
      cid: 0,
      mobileNo: this.state.customers.mobileNo,
      name: this.state.customers.name,
      password: this.state.customers.password,
      // wallet: {
      //   balance: this.state.customers.balance,
      //   walletId:0
      // },
    };

    axios
      .post("http://localhost:8080/api/addCustomer", this.state.customers)
      .then((res) => {
        this.props.history.push("/customer");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="w-50 mx-auto mt-auto  ">
        <h1>Register</h1>

        <form
          onSubmit={this.handleSubmit}
          className="w-50 mx-auto mt-5 border border-dark border-3 rounded-end p-4"
        >
          <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Enter Name
            </label>
            <input
              type="text"
              class="form-control"
              // id="exampleInputEmail1"
              value={this.state.customers.name}
              name="name"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label class="form-label">Enter mobileNo</label>
            <input
              type="text"
              class="form-control"
              // id="exampleInputEmail1"
              value={this.state.customers.mobileNo}
              name="mobileNo"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3 ">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              //id="exampleInputPassword1"
              value={this.state.customers.password}
              name="password"
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="mb-3">
                <label for="exampleInputEmail1" class="form-label">Balance</label>
                <input type="text"
                 class="form-control"
                  //id="exampleInputEmail1"
                 value={this.state.customers.balance} 
                 name="balance"
                 onChange={this.handleChange}
                 />
              </div> */}

          {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" float />
                    <label className="form-check-label" for="exampleCheck1">Save Details</label>
                </div> */}
          <button type="submit " className="btn btn-primary">
            Submit
          </button>
          <div>
            <small>
              Already Account? click <a href="login">here</a> to Login
            </small>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCustomer;
