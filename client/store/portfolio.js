import axios from "axios";
import { me } from './user'

const PURCHASE_STOCK = "PURCHASE_STOCK";
const LOAD_PORTFOLIO = "LOAD_PORTFOLIO";

const purchaseStock = stock => ({
  type: PURCHASE_STOCK,
  stock
});

const loadPortfolio = portfolio => ({
  type: LOAD_PORTFOLIO,
  portfolio
});

export const purchaseStockThunk = (
  tickerSymbol,
  quantity
) => async dispatch => {
  try {
    const { data } = await axios.post("/api/stocks/purchase", {
      tickerSymbol: tickerSymbol,
      quantity: quantity
    });
    dispatch(purchaseStock(data));
    dispatch(me());
  } catch (error) {
    console.error(error);
  }
};

export const loadPortfolioThunk = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/stocks");
    dispatch(loadPortfolio(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  stocks: []
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_STOCK:
      return { ...state, stocks: [...state.stocks, action.stock] };
    case LOAD_PORTFOLIO:
      return { ...state, stocks: action.portfolio };
    default:
      return state;
  }
};

export default portfolioReducer;
