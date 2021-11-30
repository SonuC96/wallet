import axios from "axios";
import React, { Component } from "react";
import BankAccount from "./bankaccount";

class UpdateAccount extends React.Component {
  state = {
    bankaccounts: [],
    bankaccount: {
      accBalance: "",
      accountNo: "",
      bankName: "",
      ifscCode: "",
      balance: "",
      walletId: 0,
    },
  };

  // componentDidMount()
  // {
  //     axios.get('http://localhost:8080/bankaccount/accountNo/${this.props.match.params.accountNo}'
  //     )
  //     .then((res)=>{
  //         const ba={...this.state.bankaccount};
  //     ba.accountNo=res.data.accountNo;
  //     ba.ifscCode=res.data.ifscCode;
  //     ba.accBalance=res.data.accBalance;
  //     ba.bankName=res.data.bankName;
  //     ba.balance=res.data.balance;

  //     console.log(res.data);
  //     console.log(ba);
  //     this.setState({bankaccount: ba});
  //     })

  //     .catch((error)=>console.log(error));
  // }

  handleChange = (event) => {
    const ba = { ...this.state.bankaccount }; //copying student object
    ba[event.target.name] = event.target.value; //student[fullName]="AB"
    //student[rollno]=1;

    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ bankaccount: ba });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("HandleSubmit");
    const bankaccount = {
      accountNo: this.state.bankaccount.accountNo,
      ifscCode: this.state.bankaccount.ifscCode,

      accBalance: this.state.bankaccount.accBalance,
      bankName: this.state.bankaccount.bankName,
      wallet: {
        balance: this.state.bankaccount.balance,
        walletId: 0,
      },
    };
    axios
      .put("http://localhost:8080/updateAcc", bankaccount)
      .then((res) => {
        this.props.history.push("/bankaccount");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="w-50 mx-auto border mt-5">
        <h3>Update Bank Account</h3>
        <form onSubmit={this.handleSubmit} className="container">
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Enter AccountNo
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputAccountNo"
              //aria-describedby="emailHelp"
              value={this.state.bankaccount.accountNo}
              name="accountNo"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Enter Account Balance
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              //aria-describedby="emailHelp"
              value={this.state.bankaccount.accBalance}
              name="accBalance"
              onChange={this.handleChange}
            />
          </div>

          {/* <div className="mb-3">
            <label for="exampleInputName" className="form-label">
               Enter BankName
            </label>
            <input
              type="tel"
              className="form-control"
              //id="exampleInputBankName"
              //aria-describedby="emailHelp"
             value={this.state.bankaccount.bankName}
              name="bankName"
              onChange={this.handleChange}
            />
          </div>  */}
          <div className="mb-3">
            <label for="exampleInputContactNo" className="form-label">
              Enter IfscCode
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputCode"
              required
              pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
              //aria-describedby="emailHelp"
              value={this.state.bankaccount.ifscCode}
              name="ifscCode"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputContactNo" className="form-label">
              Enter wallet Balance
            </label>
            <input
              type="tel"
              className="form-control"
              // id="exampleInputCode"
              // aria-describedby="emailHelp"
              value={this.state.bankaccount.balance}
              name="balance"
              onChange={this.handleChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateAccount;
