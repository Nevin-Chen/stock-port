import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import StockForm from "./StockForm";
import { purchaseStockThunk, loadPortfolioThunk } from "../store/portfolio";

class UserPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      quantity: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadPortfolio();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      ticker: "",
      quantity: "",
    });
  }

  render() {
    if (this.props.portfolio.stocks.length) {
      let totalValue = 0;

      for (let i = 0; i < this.props.portfolio.stocks.length; i++) {
        const { price, quantity } = this.props.portfolio.stocks[i];
        totalValue += price * quantity;
      }

      return (
        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">
            <div className="center aligned row three">
              <div className="eight wide column">
                <h2>
                  Portfolio <br></br>( ${totalValue.toFixed(2)} )
                </h2>
                <div className="ui segment">
                  <div className="ui vertically divided grid">
                    <h3 className="six wide column">Ticker</h3>
                    <h3 className="five wide column">Shares</h3>
                    <h3 className="five wide column">Current Price</h3>
                  </div>
                  <div className="ui vertically divided grid">
                    {this.props.portfolio.stocks.map((stock) => {
                      let color;
                      if (stock.price > stock.openPrice) {
                        color = {
                          color: "green",
                        };
                      } else if (stock.price < stock.openPrice) {
                        color = {
                          color: "red",
                        };
                      } else {
                        color = {
                          color: "grey",
                        };
                      }
                      return (
                        <Fragment key={stock.id}>
                          <div className="six wide column" style={color}>
                            {stock.tickerSymbol}
                          </div>
                          <div className="five wide column" style={color}>
                            {stock.quantity}
                          </div>
                          <div className="five wide column" style={color}>
                            ${stock.price}
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="eight wide column">
                <h2>Current Cash in Account <br></br> ( ${this.props.balance} )</h2>
                <StockForm
                  state={this.state}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  purchase={this.props.purchaseStock}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">
            <div className="center aligned row three">
              <div className="eight wide column">
                <h2>Portfolio</h2>
              </div>
              <div className="eight wide column">
                <h2>
                  Current Cash in Account <br></br> ( ${this.props.balance} )
                </h2>
                <StockForm
                  state={this.state}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  purchase={this.props.purchaseStock}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  balance: state.user.balance,
  portfolio: state.portfolio,
});

const mapDispatchToProps = (dispatch) => ({
  loadPortfolio: () => {
    dispatch(loadPortfolioThunk());
  },
  purchaseStock: (ticker, quantity) => {
    dispatch(purchaseStockThunk(ticker, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolio);
