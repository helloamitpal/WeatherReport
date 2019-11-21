import React from 'react';
import { shallow } from 'enzyme';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { default as reduxThunk } from 'redux-thunk';

import HomePage from '../../app/containers/HomePage/HomePage';
import weatherReducer from '../../app/containers/HomePage/weatherReducer';

describe('Testing WeatherReport home page Component', () => {
  let component;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((fn) => fn());
  };

  beforeAll(() => {
    const rootReducers = combineReducers({
      weather: weatherReducer
    });

    const store = createStore(
      rootReducers,
      applyMiddleware(reduxThunk)
    );

    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();

    component = shallow(<HomePage />, { context: { store } });
    component.setProps({
      weatherState: {
        weathers: [{
          avgTemp: 10,
          avgTempMin: 10,
          avgTempMax: 10,
          avgHumidity: 10,
          date: '2019-10-10',
          id: 123456,
          chartData: [[10, 10]]
        }],
        loading: false
      },
      weatherActions: {
        getWeeklyWeather: () => jest.fn()
      }
    });
    component.setState({ unitValue: 'C', selectedCardIndex: 0 });
    component.update();
  });

  afterAll(() => {
    component.unmount();
  });

  it('it should render component', () => {
    expect(component).toMatchSnapshot();
  });

  it('it should have certain props', () => {
    const compInstance = component.instance();
    compInstance.props.weatherActions.getWeeklyWeather();
    expect(compInstance.props.weatherState.weathers.length).toEqual(1);
  });

});
