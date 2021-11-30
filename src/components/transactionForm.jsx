import React, { Component } from "react";
import axios from "axios";

class TransactionForm extends React.Component {
  state = {
    trans: {
      transactionId: 0,
      transactionType: "",
      transactionDate: "",
      amount: "",
      description: "",
      balance: "",
      walletId: 0,
    },
  };
  handleChange = (event) => {
    const trans = { ...this.state.trans };
    trans[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ trans: trans });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const trans = {
      transactionId: this.state.trans.transactionId,
      transactionType: this.state.trans.transactionType,
      transactionDate: this.state.trans.transactionDate,
      amount: this.state.trans.amount,
      description: this.state.trans.description,
      wallet: {
        balance: this.state.trans.balance,
        walletId: this.state.trans.walletId,
      },
    };
    axios
      .post("http://localhost:8080/api/addTrans", trans)
      .then((res) => {
        this.props.history.push("/transaction");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3> Transaction Details</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Eenter Your TransactionType
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.trans.transactionType}
              name="transactionType"
              onChange={this.handleChange}
            />

            <label for="exampleInputEmail1" class="form-label">
              Eenter Your TransactionDate
            </label>
            <input
              type="Date"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.trans.transactionDate}
              name="transactionDate"
              onChange={this.handleChange}
            />

            <label for="exampleInputEmail1" class="form-label">
              Eenter Your Balance
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.trans.balance}
              name="balance"
              onChange={this.handleChange}
            />
            <label for="exampleInputEmail1" class="form-label">
              Eenter Your Amount
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.trans.amount}
              name="amount"
              onChange={this.handleChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={this.state.trans.description}
              name="description"
              onChange={this.handleChange}
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default TransactionForm;
