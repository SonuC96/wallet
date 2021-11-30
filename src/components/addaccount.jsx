import axios from "axios";
import React, { Component } from "react";
import BankAccount from "./bankaccount";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//import handleChange from "@mui/material/handleChange"

class AddAccount extends React.Component {
  state = {
    // bankaccounts:[],

    bankaccount: {
      accBalance: "",
      accountNo: "",
      bankName: "",
      ifscCode: "",
      balance: "",
      walletId: 0,
    },

    errors: {
      accBalance: "",
      accountNo: "",
      bankName: "",
      ifscCode: "",
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
    if (this.state.bankaccount.ifscCode == null) {
      this.setState({
        errors: { ...this.state.errors, ifscCode: "Invalid Account number" },
      });
      return;
    }
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
      .post("http://localhost:8080/addaccount", bankaccount)
      .then((res) => {
        this.props.history.push("/bankaccount");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="w-50 mx-auto border mt-5">
        <h3>Bank Account</h3>
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputAccoutBalance" className="form-label">
              Enter Account Balance
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your account balance"
              //id="exampleInput"
              //aria-describedby="emailHelp"
              value={this.state.bankaccount.accBalance}
              name="accBalance"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Enter BankName
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter bank"
              required
              //id="exampleInputBankName"
              //aria-describedby="emailHelp"
              value={this.state.bankaccount.bankName}
              name="bankName"
              onChange={this.handleChange}
            />
          </div>

          {/* <div className="mb-3">
          <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Bank Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                name="role"
                value={this.state.bankaccount.bankName}
                label="bankName"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="SBI">SBI</MenuItem>
                <MenuItem value="ICICI">ICICI</MenuItem>
                <MenuItem value="AXIS">AXIS</MenuItem>
                <MenuItem value="HDFC">HDFC</MenuItem>
                <MenuItem value="UNION">UNION</MenuItem>
              </Select>
            </FormControl>
          </div> */}

          <div className="mb-3">
            <label for="exampleInputContactNo" className="form-label">
              Enter IfscCode
            </label>
            <input
              type="tel"
              required
              pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
              className="form-control"
              placeholder="Enter a valid IFSCCODE"
              // id="exampleInputCode"
              //aria-describedby="emailHelp"
              value={this.state.bankaccount.ifscCode}
              name="ifscCode"
              onChange={this.handleChange}
            />
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddAccount;
