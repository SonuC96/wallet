import React, { Component } from "react";
import axios from "axios";
class TransactionType extends React.Component {
  state = {
    trans: {
      transactionId: "",
      transactionType: "",
      transactionDate: "",
      amount: "",
      description: "",
      balance: "",
      walletId: "",
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
      .get(
        `http://localhost:8080/api/getTransactionByType/${this.state.trans.transactionType}`
      )
      .then((res) => {
        console.log(res);
        this.setState({ transaction: res.data });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <h1>Transaction Type</h1>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Eenter Your Type
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
          </div>
          <button type="submit" class="btn btn-primary ">
            Submit
          </button>
        </form>

        <table className="table table-striped w-70 mx-auto mt-3">
          <thead>
            <th>TransactionId</th>
            <th>Transaction Type</th>
            <th>Transaction Date</th>
            {/* <th>Wallet</th> */}
            <th>Amount</th>
            <th>Description</th>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.trans.transactionId}</td>
              <td>{this.state.trans.transactionType}</td>
              <td>{this.state.trans.transactionDate}</td>
              <td>{this.state.trans.amount}</td>
              <td>{this.state.trans.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionType;
