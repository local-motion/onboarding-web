// credits to: https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

export const createErrorMessageSelector = actions => (state) => {
    const errors = actions.map(action => state.error[action]);
    if (errors && errors[0]) {
      return errors[0];
    }
    return '';
   };
   export const createLoadingSelector = actions => state =>
    actions.some(action => state.loading[action]);