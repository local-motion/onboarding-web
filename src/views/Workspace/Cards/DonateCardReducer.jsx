import {
  DONATIONS_GET_TRANSACTIONS_LOADING,
  DONATIONS_GET_TRANSACTIONS_SUCCESS,
  DONATIONS_GET_TRANSACTIONS_ERROR,
  DONATIONS_GET_BANKS_LOADING,
  DONATIONS_GET_BANKS_SUCCESS,
  DONATIONS_GET_BANKS_ERROR,
  DONATIONS_GET_TOTAL_BUDGET_LOADING,
  DONATIONS_GET_TOTAL_BUDGET_SUCCESS,
  DONATIONS_GET_TOTAL_BUDGET_ERROR,
  DONATIONS_REQUEST_PAYMENT_LOADING,
  DONATIONS_REQUEST_PAYMENT_SUCCESS,
  DONATIONS_REQUEST_PAYMENT_ERROR
} from './DonateCardActions';

const mocks = {
  names: ['Chloe', 'Maximillian', 'Den', 'Bill', 'James', 'Peter'],
  notes: ['Longfonds: flyers', 'Success allemaal']
};

const prepareTransaction = ({ id, amount, created_at, payment_id }) => {
  const createdAt = new Date(created_at);
  const hours = ('0' + createdAt.getHours()).slice(-2);
  const minutes = ('0' + createdAt.getMinutes()).slice(-2);
  const day = createdAt.getDate();
  const month = createdAt.toLocaleString('nl', { month: 'long' });
  const year = createdAt.getFullYear();

  // change later when backend will implement related fields
  const randomNameNum = Math.floor(Math.random() * mocks.names.length);
  const randomNotesNum = Math.floor(Math.random() * mocks.notes.length);

  return {
    id,
    amount,
    time: `${hours}:${minutes} - ${day} ${month}, ${year}`,
    created_at,
    inOut: payment_id ? 'Uit' : 'In',
    name: mocks.names[randomNameNum],
    note: mocks.notes[randomNotesNum]
  };
};

const sortTransactions = (a, b) =>
  new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf();

const initialState = {
  banks: [],
  banksLoading: false,
  totalBudget: 0,
  totalBudgetLoading: false,
  transactionsIn: [],
  transactionsOut: [],
  allTransactions: [],
  transactionsLoading: false,
  submitLoading: null,
  redirectUrl: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DONATIONS_GET_BANKS_LOADING: {
      return {
        ...state,
        banksLoading: true
      };
    }

    case DONATIONS_GET_BANKS_ERROR: {
      return {
        ...state,
        banksLoading: false
      };
    }

    case DONATIONS_GET_BANKS_SUCCESS: {
      return {
        ...state,
        banks: action.payload,
        banksLoading: false
      };
    }

    case DONATIONS_GET_TOTAL_BUDGET_LOADING: {
      return {
        ...state,
        totalBudgetLoading: true
      };
    }

    case DONATIONS_GET_TOTAL_BUDGET_ERROR: {
      return {
        ...state,
        totalBudgetLoading: false
      };
    }

    case DONATIONS_GET_TOTAL_BUDGET_SUCCESS: {
      return {
        ...state,
        totalBudget: action.payload,
        totalBudgetLoading: false
      };
    }

    case DONATIONS_GET_TRANSACTIONS_LOADING: {
      return {
        ...state,
        transactionsLoading: true
      };
    }

    case DONATIONS_GET_TRANSACTIONS_ERROR: {
      return {
        ...state,
        transactionsLoading: false
      };
    }

    case DONATIONS_GET_TRANSACTIONS_SUCCESS: {
      const transactionsIn = action.payload.transactionsIn
        .map(prepareTransaction)
        .sort(sortTransactions);
      const transactionsOut = action.payload.transactionsOut
        .map(prepareTransaction)
        .sort(sortTransactions);

      return {
        ...state,
        transactionsLoading: false,
        transactionsIn,
        transactionsOut,
        allTransactions: [...transactionsIn, ...transactionsOut]
          .map(prepareTransaction)
          .sort(sortTransactions)
      };
    }

    case DONATIONS_REQUEST_PAYMENT_LOADING: {
      return {
        ...state,
        submitLoading: true
      };
    }

    case DONATIONS_REQUEST_PAYMENT_ERROR: {
      return {
        ...state,
        submitLoading: false
      };
    }

    case DONATIONS_REQUEST_PAYMENT_SUCCESS: {
      return {
        ...state,
        submitLoading: false,
        redirectUrl: action.payload
      };
    }

    default:
      return state;
  }
};
