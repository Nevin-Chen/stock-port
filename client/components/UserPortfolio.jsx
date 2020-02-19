import React, { Component } from "react";
import { connect } from "react-redux";
import StockForm from "./StockForm";
import { purchaseStockThunk } from "../store/portfolio";

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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
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

const mapStateToProps = state => ({
  balance: state.user.balance
});

const mapDispatchToProps = dispatch => ({
  purchaseStock: (ticker, quantity) => {
    dispatch(purchaseStockThunk(ticker, quantity));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolio);
