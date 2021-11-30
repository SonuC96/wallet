import billpaymentReducer from "./billpay-reducer";
import customerReducer from "./customer-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  customer: customerReducer,
  bpdetais: billpaymentReducer,
});

export default rootReducer;
