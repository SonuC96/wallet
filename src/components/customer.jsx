import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import UpdateCustomer from "./updatecustomer";
class Customer extends React.Component {
  state = {
    customers: [],
    // isUpdateClicked: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/getCustomers")
      .then((res) => {
        console.log(res);

        this.setState({ customers: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleDelete = (cid) => {
    axios
      .delete(`http://localhost:8080/api/deleteCustomer/${cid}`)
      .then((res) => {
        const customers = this.state.customers.filter((std) => std.cid != cid);
        this.setState({ customers: customers });
      });
  };

  // handleupdate = (cdata) => {
  //    window.sessionStorage.setItem('customerInfo',cdata);

  // }
  render() {
    return (
      <div className="container  p-3 mb-2 bg-secondary text-white">
        {this.state.customers.map((cust) => console.log(cust))}
        <Link
          to="/addcustomer"
          className="btn btn-info btn-large  float-end mb-2 mt-2"
        >
          Add
        </Link>
        <Link
          to="/getCustomerbymobileNo"
          className="btn btn-info btn-large  float-end mx-5 mt-2"
        >
          {" "}
          Search for Customer
        </Link>
        <table className="table table-striped table-dark  mx-auto mt-6 ">
          <thead>
            <tr>
              <th>Cid</th>
              <th>Name</th>
              <th>MobileNo</th>
              <th>Password</th>
              {/* <th>Balance</th> */}
              {/* <th>walletId</th> */}
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map((Customer) => (
              <tr>
                <td>{Customer.cid}</td>
                <td>{Customer.name}</td>
                <td>{Customer.mobileNo}</td>
                <td>{Customer.password}</td>
                {/* <td>{custid.Balance}</td> */}
                {/* <td>{custid.wallet.walletId}</td> */}
                <td>
                  <Link
                    to={{
                      pathname: "updatecustomer",
                      state: { customerInfo: Customer },
                    }}
                  >
                    <input
                      type="button"
                      value="update"
                      className="btn btn-success mb-2 mt-2"
                      //  onClick= {()=> this.handleupdate()}
                    />

                    {/* {this.state.isUpdateClicked ? <UpdateCustomer customerInfo={custid}/> : null} */}
                  </Link>
                  {/* <Link to="/updatecustomer"className="btn btn-info btn-large  float-end mb-2 mt-2">Update</Link> */}
                </td>
                <td>
                  <input
                    type="button"
                    value="delete"
                    className="btn btn-danger mb-2 mt-2"
                    onClick={() => this.handleDelete(Customer.cid)}
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

export default Customer;
