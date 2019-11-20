/* eslint-disable camelcase */

import { handle } from 'redux-pack';
import { findIndex } from 'lodash';

import * as actionTypes from './weatherActionTypes';

const initialState = {
  weathers: [],
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
        success: (prevState) => {
          const list = [...payload.list];
          const weathers = [];
          list.forEach(({ dt_txt, dt, main: { temp, temp_min, temp_max, humidity } }) => {
            const dateObj = new Date(dt_txt);
            const dateStr = `${dateObj.getFullYear()}-${dateObj.getDate()}-${dateObj.getMonth() + 1}`;
            const time = dateObj.getHours();
            const timeStr = `${time > 12 ? time - 12 : (time || 12)} ${time >= 12 ? 'PM' : 'AM'}`;
            const index = findIndex(weathers, ({ date }) => (date === dateStr));

            if (index >= 0) {
              const { avgTempMin, avgTempMax, avgHumidity, avgTemp } = weathers[index];
              weathers[index].chartData.push([timeStr, temp]);

              // calculating avg and converting them from string (because toFixed changing number to string) to number
              weathers[index].tempMin = +((temp_min + avgTempMin) / 2).toFixed(2);
              weathers[index].avgTemp = +((temp + avgTemp) / 2).toFixed(2);
              weathers[index].tempMax = +((temp_max + avgTempMax) / 2).toFixed(2);
              weathers[index].humidity = +((humidity + avgHumidity) / 2).toFixed(2);
            } else {
              weathers.push({
                date: dateStr,
                id: dt,
                avgTemp: temp,
                avgHumidity: humidity,
                avgTempMin: temp_min,
                avgTempMax: temp_max,
                chartData: [[timeStr, temp]]
              });
            }
          });
          return {
            ...prevState,
            weathers
          };
        },
        failure: (prevState) => ({
          ...prevState,
          error: 'Something went wrong. Please try again after some time.'
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: true
        })
      });
    }

    default:
      return state;
  }
};

export default weatherReducer;
