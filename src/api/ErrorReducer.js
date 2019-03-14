import { CLEAR_ERROR } from "./StreamActions";

// credits to: https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6


export const errorReducer = (state = {}, action) => {

  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        [action.baseActionIdentifier]: '',
      }
    default:
      const { type, payload } = action;
      const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
    
      // not a *_REQUEST / *_FAILURE actions, so we ignore them
      if (!matches) return state;
    
      const [, requestName, requestState] = matches;
      return {
        ...state,
        // Store errorMessage
        // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
        //      else clear errorMessage when receiving GET_TODOS_REQUEST
        [requestName]: requestState === 'FAILURE' ? payload.message : '',
      };
    }

};