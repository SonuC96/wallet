const initialState = {
  billpayments: [],
  billpayment: {},
};

const billpaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BILLPAYMENT":
      return { ...state, billpayments: [...action.payload] };
    // case "ADD_BILLPAYMENT":
    //   return { ...state, billpayments: [...billpayment, action.payload] };
    case "DELETE_BILLPAYMENT":
      const billpayments = state.billpayments.filter(
        (p) => p.billId !== action.payload
      );
      return { ...state, billpayments: billpayments };
    default:
      return state;
  }
};
export default billpaymentReducer;
