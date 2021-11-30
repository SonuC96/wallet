import React, { Component, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const UpdateCustomer = () => {
  const location = useLocation();
  const cdata = location.state?.customerInfo;

  // state = {
  //     customers: {
  //       cid: 0,
  //       mobileNo:"",
  //       name:"",
  //       password:"",
  //       balance: "",
  //       walletId: 0
  //     },
  //   };

  // componentDidMount() {
  //   axios.get("http://localhost:8080/api/addCustomer")
  //       .then((res) => {
  //           console.log(res);

  //           this.setState({ customers: res.data });
  //       })
  //       .catch((err) => console.log(err));
  // }

  const handleChange = (event, cdt) => {
    const customers = { cdata };
    cdata[event.target.name] = event.target.value;

    console.log("name", event.target.name);
    console.log("value", event.target.value);
    console.log("cdatavalue", cdata);
  };

  const handleSubmit = (event, cdata) => {
    event.preventDefault();
    console.log("handleSubmit");
    // const customers = {
    //  cid: 0,
    //  mobileNo: cdata.mobileNo,
    //  name: cdata.name,
    //  password: cdata.password,
    //   wallet: {
    //     balance: cdata.balance,
    //     walletId:0
    //   },
    // };

    axios
      .put("http://localhost:8080/api/updateAccount", cdata)
      .then((res) => {
        window.location.href = "http://localhost:3000/customer";
      })
      .catch((err) => console.log(err));
  };

  // const { customerInfo }  = this.props;

  console.log("customerInfo", location);
  return (
    <div className="w-50 mx-auto mt-auto ">
      <h1>Update Details</h1>

      <form
        onSubmit={handleSubmit}
        className="w-50 mx-auto mt-5 border border-dark border-3 rounded-end p-4"
      >
        <div className="mb-3">
          <label class="form-label">Enter mobileNo</label>
          <input
            type="text"
            class="form-control"
            // id="exampleInputEmail1"
            defaultValue={cdata.mobileNo}
            name="mobileNo"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Enter Name
          </label>
          <input
            type="text"
            class="form-control"
            // id="exampleInputEmail1"
            defaultValue={cdata.name}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 ">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            //id="exampleInputPassword1"
            defaultValue={cdata.password}
            name="password"
            onChange={handleChange}
          />
        </div>

        {/* <div className="mb-3">
                <label for="exampleInputEmail1" class="form-label">Balance</label>
                <input type="text"
                 class="form-control"
                  //id="exampleInputEmail1"
                 defaultValue={cdata?.balance} 
                 name="balance"
                 onChange={handleChange}
                 />
              </div> */}

        {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" float />
                    <label className="form-check-label" for="exampleCheck1">Save Details</label>
                </div> */}

        <button
          onClick={(e) => handleSubmit(e, cdata)}
          type="submit "
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
