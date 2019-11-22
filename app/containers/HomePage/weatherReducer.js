import { handle } from 'redux-pack';

import { getSynthesizedWeatherList } from './weatherHelper';

import * as actionTypes from './weatherActionTypes';

const initialState = {
  weathers: null,
  error: '',
  loading: false
};

const weatherReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_WEEKLY_WEATHER: {
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          error: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          weathers: getSynthesizedWeatherList([...payload.list])
        }),
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
