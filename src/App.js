import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import BillPayments from "./components/billpayments";
import UpdateBillPayment from "./components/updatebillpayment";
import Nav from "./components/nav";
import Home from "./components/home";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./components/pageNotFound";
import AddBillPayment from "./components/addbillpayment";
import MobileNo from "./components/entermobile";
import CreateAccount from "./components/createAccount";
import CusById from "./components/customerById";
import UpdateAcc from "./components/updateAccount1";
import Deposite from "./components/deposite";
import Withdraw from "./components/withdraw";
import FundTransfer from "./components/fundtransfer";
// import Login from "./components/Login";
import ViewCus from "./components/viewcustomerRedux";
import Transaction from "./components/transaction";
import TransactionForm from "./components/transactionForm";
import TransactionType from "./components/transactionType";
import TransactionDate from "./components/transactionDate";
import AddAccount from "./components/addaccount";
import UpdateAccount from "./components/updateaccount";
import ViewAccount from "./components/viewaccount";
import BankAccount from "./components/bankaccount";
function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/billpay/add" component={AddBillPayment} />
        <Route path="/billpay" component={BillPayments} />
        <Route path="/updatebillpay/:billId" component={UpdateBillPayment} />

        <Route path="/createAcc" component={CreateAccount} />
        <Route path="/showBalance/:mobileNo" component={MobileNo} />
        <Route path="/getCustomerbyId/:cid" component={CusById} />
        <Route path="/updateAccount/:cid" component={UpdateAcc} />
        <Route path="/makeDeposit/:mobileNo/:amount" component={Deposite} />
        <Route path="/withdrawMoney/:mobileNo/:amount" component={Withdraw} />
        <Route
          path="/transferMoney/:sourcemobileNo/:targetMobileNo/:amount"
          component={FundTransfer}
        />
        <Route path="/viewAccount" component={ViewCus} />

        <Route exact path="/transaction" component={Transaction} />
        <Route exact path="/addTrans/add" component={TransactionForm} />
        <Route
          exact
          path="/transaction/transactionType/:transactionType"
          component={TransactionType}
        />
        <Route
          exact
          path="/transaction/transactionDate/:transactionDate"
          component={TransactionDate}
        />

        <Route path="/addaccount/add" component={AddAccount} />
        <Route
          path="/bankaccount/viewaccount/:accountNo"
          component={ViewAccount}
        />
        <Route path="/bankaccount/updateaccount" component={UpdateAccount} />
        <Route path="/bankaccount" component={BankAccount} />

        <Route exact path="/" component={Home} />
        <Redirect from="/home" to="/" />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
