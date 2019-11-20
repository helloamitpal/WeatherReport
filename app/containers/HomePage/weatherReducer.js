import { handle } from 'redux-pack';

import * as actionTypes from './weatherActionTypes';

const initialState = {
  liveMatches: [],
  error: '',
  loading: false
};

const weatherReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_ALL_LIVE_MATCHES: {
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          error: '',
          loading: true
        }),
        success: (prevState) => {
          const liveMatches = [...payload.liveEvents];
          return {
            ...prevState,
            liveMatches
          };
        },
        failure: (prevState) => ({
          ...prevState,
          error: 'Something went wrong. Please try again after some time.'
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });
    }

    default:
      return state;
  }
};

export default weatherReducer;
