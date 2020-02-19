import React from "react";

const StockForm = props => {
  const { state, handleSubmit, handleChange, purchase } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ticker">Ticker Symbol</label>
      <input
        type="text"
        name="ticker"
        maxLength="5"
        onChange={handleChange}
        value={state.ticker}
      />

      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        min="0"
        name="quantity"
        onChange={handleChange}
        value={state.quantity}
      />

      <button
        type="submit"
        onClick={() => {
          purchase(state.ticker, state.quantity)
        }}
        disabled={!state.ticker || !state.quantity}
      >
        Buy
      </button>
    </form>
  );
};

export default StockForm;
