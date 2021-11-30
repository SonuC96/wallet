import axios from "axios";
import React, { Component } from "react";
class AddBillPayment extends React.Component {
  state = {
    billpayment: {
      billtype: "",
      amount: "",
    },
    errors: {
      billtype: "",
      amount: "",
    },
  };
  handleChange = (event) => {
    const billpayment = { ...this.state.billpayment };
    billpayment[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ billpayment: billpayment });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.billpayment.amount <= 0) {
      this.setState({
        errors: { ...this.state.errors, amount: "Invalid Amount" },
      });
      return;
    }
    if (this.state.billpayment.billtype === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          billtype: "Please Select valid Bill Type",
        },
      });
      return;
    }
    console.log("handleSubmit");
    const billpayment = {
      amount: this.state.billpayment.amount,
      billtype: this.state.billpayment.billtype,
    };
    axios
      .post("http://localhost:8080/api/addBillPayment", billpayment)
      .then((res) => {
        this.props.history.push("/billpay");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <h3>Payment</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div>
            <label for="exampleInputBillType" className="form-label">
              Bill Type
            </label>
          </div>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            value={this.state.billpayment.billtype}
            name="billtype"
            onChange={this.handleChange}
            // required
          >
            <option value="">Select Bill Type</option>
            <option value="DTH">DTH</option>
            <option value="MOBILEPREPAID">MOBILEPREPAID</option>
            <option value="MOBILEPOSTPAID">MOBILEPOSTPAID</option>
            <option value="CREDICTCARD">CREDICTCARD</option>
            <option value="LICPREMIUM">LICPREMIUM</option>
            <option value="LPG">LPG</option>
          </select>
          <div>
            <span className="text-danger">{this.state.errors.billtype}</span>
          </div>
          {/* <div className="shadow-lg  mb-3 bg-body rounded">
            <input
              type="text"
              className="form-control"
              id="exampleInputBillType"
              aria-describedby="emailHelp"
              value={this.state.billpayment.billtype}
              name="billtype"
              onChange={this.handleChange}
              required
            />
          </div> */}

          <div>
            <label for="exampleInputBillType" className="form-label">
              Amount
            </label>
          </div>
          <div className="input-group mb-3">
            {/* <span className="input-group-text ml=2">$</span>
            <span className="input-group-text">0.00</span> */}
            <input
              type="number"
              className="form-control"
              id="exampleInputAmount"
              // aria-label="Dollar amount (with dot and two decimal places)"
              aria-describedby="emailHelp"
              value={this.state.billpayment.amount}
              name="amount"
              onChange={this.handleChange}
              required
            />
            <span className="text-danger">{this.state.errors.amount}</span>
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              Pay
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddBillPayment;
