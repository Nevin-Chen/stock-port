import React from "react";

const StockForm = props => {
  const { state, handleSubmit, handleChange, purchase } = props;
  return (
    <div className="six wide column">
      <form onSubmit={handleSubmit} className="ui large form">
        <div className="field">
          <label htmlFor="ticker">Ticker Symbol</label>
          <input
            type="text"
            name="ticker"
            maxLength="5"
            onChange={handleChange}
            value={state.ticker}
          />
        </div>

        <div className="field">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            min="0"
            name="quantity"
            onChange={handleChange}
            value={state.quantity}
          />
        </div>

        <button
          className="ui fluid small blue submit button"
          type="submit"
          onClick={() => {
            purchase(state.ticker, state.quantity);
          }}
          disabled={!state.ticker || !state.quantity}
        >
          Buy
        </button>
      </form>
    </div>
  );
};

export default StockForm;
