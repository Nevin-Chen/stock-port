import React, { Component } from "react";
import { connect } from "react-redux";
import StockForm from "./StockForm";
import { purchaseStockThunk, loadPortfolioThunk } from "../store/portfolio";

class UserPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      quantity: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadPortfolio();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      ticker: "",
      quantity: ""
    });
  }

  render() {
    if (this.props.portfolio) {
      return (
        <div>
          <h2>Portfolio (total)</h2>
          {this.props.portfolio.stocks.map(stock => {
            return (
              <div className="stock-details" key={stock.id}>
                <div className="ticker-symbol">{stock.tickerSymbol}</div>
                <div className="quantity">{stock.quantity}</div>
                <div className="total">{stock.total}</div>
              </div>
            );
          })}
          <hr />
          <h2>Current Cash in Account - ${this.props.balance}</h2>
          <StockForm
            state={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            purchase={this.props.purchaseStock}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Portfolio (total)</h2>
          <hr />
          <h2>Current Cash in Account - ${this.props.balance}</h2>
          <StockForm
            state={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            purchase={this.props.purchaseStock}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  balance: state.user.balance,
  portfolio: state.portfolio
});

const mapDispatchToProps = dispatch => ({
  loadPortfolio: () => {
    dispatch(loadPortfolioThunk());
  },
  purchaseStock: (ticker, quantity) => {
    dispatch(purchaseStockThunk(ticker, quantity));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolio);
