import React from "react";

const StockForm = props => {
  const { state, handleSubmit, handleChange } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ticker-symbol">Ticker Symbol</label>
      <input
        type="text"
        name="ticker-symbol"
        onChange={handleChange}
        value={state.ticker}
      />

      <label htmlFor="quantity">Quantity</label>
      <input
        type="text"
        name="quantity"
        onChange={handleChange}
        value={state.quantity}
      />

      <button type="submit" disabled={!state.ticker || !state.quantity}>
        Buy
      </button>
    </form>
  );
};

export default StockForm;
