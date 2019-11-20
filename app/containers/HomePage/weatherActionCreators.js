import * as actionTypes from './weatherActionTypes';
import config from '../../config';

export const getWeeklyWeather = (unit) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_WEEKLY_WEATHER,
    promise: api.get(`/forecast?q=${config.LOCATION}&APPID=${config.APP_ID}&cnt=${config.NO_OF_DAYS}&units=${unit === 'C' ? 'metric' : 'imperial'}`),
    payload: {}
  });
};
