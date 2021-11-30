import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getBillPaymentsAction,
  deleteBillPaymentAction,
} from "../actions/billpay-action";

class BillPayments extends React.Component {
  componentDidMount() {
    this.props.getBillPaymentsAction();
  }
  // handleDelete = (eid) => {
  //   axios
  //     .delete(`http://localhost:8080/api/deleteBillPayment/${eid}`)
  //     .then((res) => {
  //       const billpayments = this.props.billpayments.filter(
  //         (std) => std.billId != eid
  //       );
  //       this.setState({ billpayments: billpayments });
  // });
  // };
  handleDelete = (billid) => {
    this.props.deleteBillPaymentAction(billid);
  };
  render() {
    return (
      <div>
        <table className=" mt-3 table table-dark table-striped w-75 mx-auto padding">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Amount</th>
              <th>Bill Type</th>
              <th>Payment Date</th>
              <th>Wallet Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.billpayments.map((bp) => (
              <tr>
                <td>{bp.billId}</td>
                <td>{bp.amount}</td>
                <td>{bp.billtype}</td>
                <td>{bp.paymentDate}</td>
                <td>{bp.wallet.walletId}</td>
                <td>
                  <Link to={`/updatebillpay/${bp.billId}`}>
                    <input
                      type="button"
                      value="Update"
                      className="btn btn-success me-2 mt-3"
                    />
                  </Link>
                  <i className="bi bi-trash-fill">
                    <input
                      type="button"
                      value="Clear"
                      className="btn btn-outline-secondary ms-2 mt-3"
                      onClick={() => this.handleDelete(bp.billId)}
                    />
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    billpayments: state.bpdetais.billpayments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillPaymentsAction,
    deleteBillPaymentAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(BillPayments);
