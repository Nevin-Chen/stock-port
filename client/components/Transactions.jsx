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
        <div>
          {transactions.map(t => {
            const { id, tickerSymbol, quantity, total } = t;
            return (
              <div className="stock-details" key={id}>
                <div>
                  Purchased {quantity} shares of {tickerSymbol} @{" "}
                  {total / quantity} per share -- Total: {total}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>You have not made any transactions</div>;
    }
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: () => {
    dispatch(loadTransactionsThunk());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
