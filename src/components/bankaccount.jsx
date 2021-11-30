import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
//import ViewAccount from './viewaccount';

class BankAccount extends React.Component {
  state = {
    bankaccounts: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/viewallaccounts")
      .then((res) => {
        console.log(res);
        this.setState({ bankaccounts: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleDelete = (id) => {
    axios.delete(`http://localhost:8080/removeaccount/${id}`).then((res) => {
      const ba = this.state.bankaccounts.filter((std) => std.accountNo != id);
      this.setState({ bankaccounts: ba });
    });
  };

  render() {
    return (
      <div className="container mt-3">
        <Link
          to="/addaccount/add"
          className="btn btn-secondary btn-large mb-5 "
        >
          Add
        </Link>

        <Link to={`/bankaccount/viewaccount/:accountNo`}>
          <input
            type="button"
            value="search by account number"
            className="btn btn-primary btn-large float-end mb-1"
          />
        </Link>

        <table className=" table table-striped border-dark border w-75 mx-auto padding mt-5">
          <thead>
            <tr>
              <th>AccountBalance</th>
              <th>AccountNo</th>

              <th>BankName</th>
              <th>IfscCode</th>
              <th>WalletId</th>

              <th colSpan="2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.bankaccounts.map((ba) => (
              <tr>
                <td>{ba.accBalance}</td>
                <td>{ba.accountNo}</td>

                <td>{ba.bankName}</td>
                <td>{ba.ifscCode}</td>
                <td>{ba.wallet.walletId}</td>

                <td>
                  <Link to={`/bankaccount/updateaccount`}>
                    <input
                      type="button"
                      value="Update"
                      className="btn btn-secondary me-3"
                    />
                  </Link>
                </td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    className="btn btn-outline-danger me-3"
                    onClick={() => this.handleDelete(ba.accountNo)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BankAccount;
