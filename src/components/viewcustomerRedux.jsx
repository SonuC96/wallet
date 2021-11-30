import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getCustomersAction } from "../actions/customer-action";
import { Link } from "react-router-dom";
class ViewCus extends React.Component {
  componentDidMount() {
    this.props.getCustomersAction();
  }
  render() {
    return (
      <div className="container">
        {/* <Link
         to="/addCustomer"
         className="btn btn-secondary btn-large mb-1 float-end"
       >
         Add
       </Link> */}
        <table className="table table-striped border-dark border w-75 mx-auto padding mt-5">
          <thead>
            <tr>
              <th>CID</th>
              <th>MOBILE</th>
              <th>NAME</th>
              <th>PASSWORD</th>
              <th>WALLET_ID</th>
            </tr>
          </thead>
          <tbody>
            {this.props.customers.map((cus) => (
              <tr>
                <td>{cus.cid}</td>
                <td>{cus.name}</td>
                <td>{cus.mobileNo}</td>
                <td>{cus.password}</td>
                <td>{cus.wallet.walletId}</td>
                {/* <td>
                 <Link to={`/customer/update/${cus.cid}`}>
                   <input
                     type="button"
                     value="Update"
                     className="btn btn-secondary me-2"
                   />
                 </Link>
                 <input
                   type="button"
                   value="Delete"
                   className="btn btn-outline-danger"
                   onClick={() => this.handleDelete(cus.cid)}
                 />
               </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  //  const { fakestore } = state;
  return {
    customers: state.customer.customers,
  };
};

// function to dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    getCustomersAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ViewCus);
