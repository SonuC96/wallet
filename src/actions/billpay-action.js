import axios from "axios";

export const getBillPaymentsAction = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8080/api/viewBillPayment");
  console.log(response.data);
  dispatch({
    type: "GET_BILLPAYMENT",
    payload: response.data,
  });
};
export const deleteBillPaymentAction = (billid) => async (dispatch) => {
  const result = await axios.delete(
    `http://localhost:8080/api/deleteBillPayment/${billid}`
  );
  console.log(result);
  console.log(result.data);
  dispatch({
    type: "DELETE_BILLPAYMENT",
    payload: result.data,
  });
};

// export const addProductAction = (billpayment) => async (dispatch) => {
//   const result = await axios.post(
//     "http://localhost:8080/api/addBillPayment",
//     billpayment
//   );
//   console.log(result);
//   console.log(result.data);
//   dispatch({
//     type: "ADD_BILLPAYMENT",
//     payload: result.data,
//   });
// };
