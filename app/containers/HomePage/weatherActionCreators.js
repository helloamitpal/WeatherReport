import * as actionTypes from './weatherActionTypes';
import config from '../../config';

export const getWeeklyWeather = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_WEEKLY_WEATHER,
    promise: api.get(`/forecast?q=${config.LOCATION}&APPID=${config.APP_ID}&cnt=40`),
    payload: {}
  });
};
