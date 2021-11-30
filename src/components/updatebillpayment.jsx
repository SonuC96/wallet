import axios from "axios";
import React, { Component } from "react";
import BillPayments from "./billpayments";
class UpdateBillPayment extends React.Component {
  state = {
    errors: {
      billtype: "",
      amount: "",
      paymentDate: "",
      balance: "",
    },
    billpayment: {
      billtype: "",
      amount: "",
      paymentDate: "",
      balance: "",
    },
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/getBillPayment/${this.props.match.params.billId}`
      )
      .then((res) => {
        const billpayment = { ...this.state.billpayment };
        billpayment.billtype = res.data.billtype;
        billpayment.amount = res.data.amount;
        billpayment.paymentDate = res.data.paymentDate;
        billpayment.balance = res.data.wallet.balance;
        console.log(res.data);
        console.log(billpayment);
        this.setState({ billpayment: billpayment });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const billpayment = { ...this.state.billpayment };
    billpayment[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ billpayment: billpayment });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log("handleSubmit");
      const billpayment = {
        amount: this.state.billpayment.amount,
        billId: this.props.match.params.billId,
        billtype: this.state.billpayment.billtype,
        paymentDate: this.state.billpayment.paymentDate,
        wallet: {
          balance: this.state.billpayment.balance,
        },
      };
      axios
        .put("http://localhost:8080/api/updateBillPayment", billpayment)
        .then((res) => {
          this.props.history.push("/billpay");
        })
        .catch((err) => console.log(err));
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((bp, curr) => (errors[curr] ? bp + 1 : bp), 0);
    return count === 0;
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  validateAll = () => {
    let { billtype, amount, paymentDate, balance } = this.state.billpayment;
    let errors = {};
    errors.billtype = this.validateName(billtype);
    errors.amount = this.validateName(amount);
    errors.paymentDate = this.validateName(paymentDate);
    errors.balance = this.validateName(balance);

    if (!billtype) errors.billtype = "Please select Bill Type";
    if (!amount) errors.amount = "Amound must be entered";
    if (!paymentDate) errors.paymentDate = "PaymentDate must be select";
    if (!balance) errors.balance = "Balance must be entered";
    return errors;
  };
  validateName = (billtype) =>
    !billtype
      ? "Billtype must be entered"
      : billtype === ""
      ? "Please Select valid Bill Type"
      : "";

  validateName = (amount) =>
    !amount ? "Amount must be entered" : amount <= 0 ? "Invalid Amount" : "";

  validateName = (paymentDate) =>
    !paymentDate ? "paymentDate must be select" : "";

  validateName = (balance) =>
    !balance ? "Balance must be entered" : balance <= 0 ? "Invalid Amount" : "";
  render() {
    let { billtype, amount, paymentDate, balance } = this.state.billpayment;
    let { errors } = this.state;
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="w-50 mx-auto border p-3 mt-3"
        >
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
            {errors.billtype ? (
              <span className="text-danger">{errors.billtype}</span>
            ) : (
              ""
            )}
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
            <span className="input-group-text ml=2">$</span>
            <span className="input-group-text">0.00</span>

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
            {errors.amount ? (
              <span className="text-danger">{errors.amount}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label for="exampleInputBillType" className="form-label">
              Payment Date
            </label>
          </div>
          <div className="input-group mb-3">
            <input
              type="Date"
              className="form-control"
              id="exampleInputPaymentDate"
              // aria-label="Dollar amount (with dot and two decimal places)"
              aria-describedby="emailHelp"
              value={this.state.billpayment.paymentDate}
              name="paymentDate"
              onChange={this.handleChange}
              required
            />
            {errors.paymentDate ? (
              <span className="text-danger">{errors.paymentDate}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label for="exampleInputBillType" className="form-label">
              Balance
            </label>
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              id="exampleInputBalance"
              // aria-label="Dollar amount (with dot and two decimal places)"
              aria-describedby="emailHelp"
              value={this.state.billpayment.balance}
              name="balance"
              onChange={this.handleChange}
              required
            />
            {errors.balance ? (
              <span className="text-danger">{errors.balance}</span>
            ) : (
              ""
            )}
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateBillPayment;
