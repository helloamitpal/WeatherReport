import configureMockStore from 'redux-mock-store';
import { default as reduxThunk } from 'redux-thunk';

import * as actions from '../../../app/containers/HomePage/weatherActionCreators';
import * as types from '../../../app/containers/HomePage/weatherActionTypes';
import api from '../../../app/api/apiInterceptor';

describe('weather Action Creators', () => {
  let store;
  let mockStore;
  beforeEach(() => {
    const middlewares = [reduxThunk.withExtraArgument({ api })];
    mockStore = configureMockStore(middlewares);
  });

  it('should dispatch GET_WEEKLY_WEATHER', () => {
    const expectedAction = {
      type: types.GET_WEEKLY_WEATHER,
      payload: {},
      promise: api.get('/forecast?q=Munich,de&APPID=0bc2746e999cbcd82112629ed171f4f6&cnt=40&units=metric')
    };
    store = mockStore({});
    store.dispatch(actions.getWeeklyWeather('C'));
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
