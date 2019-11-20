import * as actionTypes from './weatherActionTypes';
import config from '../../config';

export const getAllLiveMatches = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_ALL_LIVE_MATCHES,
    promise: api.get(`http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=${config.APP_ID}&app_key=${config.APP_KEY}`),
    payload: {}
  });
};

export const placeABet = (eventId) => {
  window.open(`https://www.unibet.com/betting#/event/live/${eventId}`, '_blank');
};
