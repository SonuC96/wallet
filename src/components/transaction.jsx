import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Transaction extends React.Component {
  state = {
    transaction: [],
    // wallet: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/api/showTrans")
      .then((res) => {
        console.log(res);
        console.log(res.data[0].wallet);
        this.setState({ transaction: res.data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="container mt-3">
        <h1 class="text-primary">Transaction Page</h1>
        <Link
          to="/addTrans/add"
          className="btn btn-secondary btn-large mb-1 float-end"
        >
          Add
        </Link>

        <Link to={`/transaction/transactionType/:transactionType}`}>
          <input
            type="button"
            value="Type"
            className="btn btn-primary me-2 float-end"
          />
        </Link>

        <Link to={`/transaction/transactionDate/:transactionDate}`}>
          <input
            type="button"
            value="Form Date"
            className="btn btn-success me-2 float-end"
          />
        </Link>

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
            {this.state.transaction.map((trans) => (
              <tr>
                <td>{trans.transactionId}</td>
                <td>{trans.transactionType}</td>
                <td>{trans.transactionDate}</td>

                <td>{trans.amount}</td>
                <td>{trans.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Transaction;
