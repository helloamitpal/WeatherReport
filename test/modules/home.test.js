import React from 'react';
import { shallow } from 'enzyme';
import { combineReducers, createStore } from 'redux';
import PropTypes from 'prop-types';

import HomePage from '../../app/containers/HomePage/HomePage';
import weatherReducer from '../__mocks__/weatherReducerMockData';

const reducer = combineReducers({
  weather: weatherReducer
});
const store = createStore(reducer);
const baseProps = {
  weathers: [
    {
      date: '2019-21-11',
      id: 1574316000,
      avgTemp: 2.23,
      avgHumidity: 93,
      avgTempMin: 0.08,
      avgTempMax: 1.75,
      chartData: [
        [
          '6 AM',
          1.75
        ]
      ],
      tempMin: 0.53,
      tempMax: 1.36,
      humidity: 93
    }
  ],
  error: '',
  loading: false
};

describe('Testing WeatherReport home page Component', () => {
  let component;

  it('component should be rendered', () => {
    component = shallow(
      <HomePage
        weatherActions={{
          getWeeklyWeather: () => Promise.resolve([])
        }}
        weatherState={baseProps}
      />, {
        context: {
          store
        },
        ildContextTypes: {
          store: PropTypes.object
        }
      }
    );
    component.setState({ unitValue: 'C', selectedCardIndex: 0 });
    expect(component).toMatchSnapshot();
  });
});
