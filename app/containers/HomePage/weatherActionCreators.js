import * as actionTypes from './weatherActionTypes';
import config from '../../config';

export const getWeeklyWeather = (unit) => (dispatch, getState, { api }) => {
  const duration = config.NO_OF_DAYS * (24 / config.TIME_SEGMENT);
  const metric = unit === 'C' ? 'metric' : 'imperial';

  dispatch({
    type: actionTypes.GET_WEEKLY_WEATHER,
    promise: api.get(`/forecast?q=${config.LOCATION}&APPID=${config.APP_ID}&cnt=${duration}&units=${metric}`),
    payload: {}
  });
};
