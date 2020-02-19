import axios from "axios";

const LOAD_TRANSACTIONS = "LOAD_TRANSACTIONS";

const loadTransactions = transactions => ({
  type: LOAD_TRANSACTIONS,
  transactions
});

export const loadTransactionsThunk = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/transactions");
    dispatch(loadTransactions(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  transactions: []
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return { ...state, transactions: action.transactions };
    default:
      return state;
  }
};

export default transactionsReducer;
