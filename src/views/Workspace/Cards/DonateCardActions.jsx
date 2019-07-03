export const DONATIONS_GET_TRANSACTIONS_LOADING =
  'DONATIONS_GET_TRANSACTIONS_LOADING';
export const DONATIONS_GET_TRANSACTIONS_SUCCESS =
  'DONATIONS_GET_TRANSACTIONS_SUCCESS';
export const DONATIONS_GET_TRANSACTIONS_ERROR =
  'DONATIONS_GET_TRANSACTIONS_ERROR';

export const DONATIONS_GET_BANKS_LOADING = 'DONATIONS_GET_BANKS_LOADING';
export const DONATIONS_GET_BANKS_SUCCESS = 'DONATIONS_GET_BANKS_SUCCESS';
export const DONATIONS_GET_BANKS_ERROR = 'DONATIONS_GET_BANKS_ERROR';

export const DONATIONS_GET_TOTAL_BUDGET_LOADING =
  'DONATIONS_GET_TOTAL_BUDGET_LOADING';
export const DONATIONS_GET_TOTAL_BUDGET_SUCCESS =
  'DONATIONS_GET_TOTAL_BUDGET_SUCCESS';
export const DONATIONS_GET_TOTAL_BUDGET_ERROR =
  'DONATIONS_GET_TOTAL_BUDGET_ERROR';

export const DONATIONS_REQUEST_PAYMENT_LOADING =
  'DONATIONS_REQUEST_PAYMENT_LOADING';
export const DONATIONS_REQUEST_PAYMENT_SUCCESS =
  'DONATIONS_REQUEST_PAYMENT_SUCCESS';
export const DONATIONS_REQUEST_PAYMENT_ERROR =
  'DONATIONS_REQUEST_PAYMENT_ERROR';

const apiUrl = 'https://dev.api.forus.io/api/v1';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export const getTransactions = ({ id }) => async dispatch => {
  const getInTransactionsUrl = `${apiUrl}/platform/organizations/41/funds/${id}/bunq-transactions`;
  const getOutTransactionsUrl = `${apiUrl}/platform/organizations/41/funds/${id}/transactions`;

  dispatch({
    type: DONATIONS_GET_TRANSACTIONS_LOADING
  });

  try {
    const [transactionsIn, transactionsOut] = await Promise.all([
      fetchTransactionsRequest(getInTransactionsUrl),
      fetchTransactionsRequest(getOutTransactionsUrl)
    ]);

    dispatch({
      type: DONATIONS_GET_TRANSACTIONS_SUCCESS,
      payload: {
        transactionsIn,
        transactionsOut
      }
    });
  } catch (error) {
    console.error('error transactions', error);

    dispatch({
      type: DONATIONS_GET_TRANSACTIONS_ERROR,
      payload: error
    });
  }
};

export const fetchTransactionsRequest = fetchUrl => {
  return fetch(fetchUrl, {
    method: 'GET',
    headers
  })
    .then(r => r.json())
    .then(({ data }) => data);
};

export const getBanks = ({ id }) => async dispatch => {
  const getIssuersUrl = `${apiUrl}/platform/funds/${id}/ideal/issuers`;

  dispatch({
    type: DONATIONS_GET_BANKS_LOADING
  });

  return fetch(getIssuersUrl, {
    method: 'GET',
    headers
  })
    .then(r => r.json())
    .then(({ data }) => {
      dispatch({
        type: DONATIONS_GET_BANKS_SUCCESS,
        payload: data
      });
    })
    .catch(error => {
      console.error('error banks', error);

      dispatch({
        type: DONATIONS_GET_BANKS_ERROR,
        payload: error
      });
    });
};

export const getTotalBudget = ({ id }) => dispatch => {
  const fundInfoUrl = `${apiUrl}/platform/organizations/41/funds/${id}`;

  dispatch({
    type: DONATIONS_GET_TOTAL_BUDGET_LOADING
  });

  fetch(fundInfoUrl, {
    method: 'GET',
    headers
  })
    .then(r => r.json())
    .then(({ data }) => {
      dispatch({
        type: DONATIONS_GET_TOTAL_BUDGET_SUCCESS,
        payload: data.budget && data.budget.left
      });
    })
    .catch(error => {
      console.error('error getBudget', error);

      dispatch({
        type: DONATIONS_GET_TOTAL_BUDGET_ERROR
      });
    });
};

export const requestPayment = ({
  id,
  amount,
  description,
  issuer
}) => dispatch => {
  dispatch({
    type: DONATIONS_REQUEST_PAYMENT_LOADING
  });

  const requestPaymentUrl = `${apiUrl}/platform/funds/${id}/ideal/requests`;
  const body = JSON.stringify({
    amount,
    issuer,
    description
  });

  return fetch(requestPaymentUrl, {
    method: 'POST',
    body,
    headers
  })
    .then(r => r.json())
    .then(({ data }) => {
      let redirectUrl =
        data.issuer_authentication_url || data.share_url || null;

      if (redirectUrl === null) {
        return dispatch({
          type: DONATIONS_REQUEST_PAYMENT_ERROR
        });
      }

      dispatch({
        type: DONATIONS_REQUEST_PAYMENT_SUCCESS,
        payload: redirectUrl
      });

      window.open(redirectUrl);
    })
    .catch(error => {
      console.error('error request payment', error);

      dispatch({
        type: DONATIONS_REQUEST_PAYMENT_ERROR,
        payload: error
      });
    });
};
