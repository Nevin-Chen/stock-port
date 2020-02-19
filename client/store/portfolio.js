import axios from "axios";

const PURCHASE_STOCK = "PURCHASE_STOCK";

const purchaseStock = stock => ({
  type: PURCHASE_STOCK,
  stock
});

export const purchaseStockThunk = (tickerSymbol, quantity) => {
  return async dispatch => {
    try {
      const { data } = await axios.post("/api/stocks/purchase", {
        tickerSymbol: tickerSymbol,
        quantity: quantity
      });
      dispatch(purchaseStock(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  stocks: []
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_STOCK:
      return { ...state, stocks: [...state.stocks, action.stock] };
    default:
      return state;
  }
};

export default portfolioReducer;
