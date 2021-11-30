import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
//import BankAccount from './bankaccount';

class ViewAccount extends React.Component {
  state = {
    // bankaccounts:[],
    bankaccount: {
      accBalance: "",
      accountNo: "",
      bankName: "",
      ifscCode: "",
      balance: "",
      walletId: "",
    },
  };

  handleChange = (event) => {
    const bankaccount = { ...this.state.bankaccount }; //copying student object
    bankaccount[event.target.name] = event.target.value; //student[fullName]="AB"
    //student[rollno]=1;

    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ bankaccount: bankaccount });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const bankaccount = {
      accBalance: this.state.bankaccount.accBalance,
      accountNo: this.state.bankaccount.accountNo,

      bankName: this.state.bankaccount.bankName,
      ifscCode: this.state.bankaccount.ifscCode,
      wallet: {
        balance: this.state.bankaccount.balance,
        walletId: 0,
      },
    };
    axios
      .get(
        `http://localhost:8080/viewaccount/${this.state.bankaccount.accountNo}`
      )
      .then((res) => {
        console.log(res);
        //this.props.history.push("/bankaccount");
        this.setState({ bankaccount: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Account Details</h1>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Enter Account Number
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="account number"
              value={this.state.bankaccount.accountNo}
              name="accountNo"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>

        <table className=" table table-striped border-dark border w-75 mx-auto padding">
          <thead>
            <tr>
              <th>AccountBalance</th>
              <th>AccountNo</th>

              <th>BankName</th>
              <th>IfscCode</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{this.state.bankaccount.accBalance}</td>
              <td>{this.state.bankaccount.accountNo}</td>

              <td>{this.state.bankaccount.bankName}</td>
              <td>{this.state.bankaccount.ifscCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewAccount;
