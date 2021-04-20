import React, { Component } from "react";
import { connect } from "react-redux";
import { loadTransactionsThunk } from "../store/transactions";

class Transactions extends Component {
  componentDidMount() {
    this.props.loadTransactions();
  }

  render() {
    const { transactions } = this.props.transactions;
    if (transactions.length) {
      return (
        <div className="ui vertical stripe segment">
          <div className="ui text container">
            <h2>Transaction History</h2>
            <div className="ui segment">
              {transactions.map((t) => {
                const { id, tickerSymbol, quantity, price, createdAt } = t;
                return (
                  <div className="stock-details" key={id}>
                    <li className="transactions-list">
                      <ul>
                        Purchased {quantity} shares of{" "}
                        {tickerSymbol.toUpperCase()} @ {price} per share
                      </ul>
                      <ul>Total: {(price * quantity).toFixed(2)}</ul>
                      <span className="date-box">
                        Date: {createdAt.substring(0, 10)} <br></br> Time of
                        purchase: {createdAt.substring(11, 19)}
                      </span>
                    </li>
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui text container">
          <h2>Transaction History</h2>
          <h4>You have not made any transactions</h4>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

const mapDispatchToProps = (dispatch) => ({
  loadTransactions: () => {
    dispatch(loadTransactionsThunk());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
