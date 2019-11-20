import React from 'react';
import { mount } from 'enzyme';
import HomePage from '../../app/containers/HomePage/HomePage';

describe('Testing WeatherReport home page Component', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = mount(
      <HomePage
        weatherActions={{
          getAllLiveMatches: () => jest.fn()
        }}
        weather={{
          liveMatches: [],
          loading: false,
          error: ''
        }}
      />
    );
  });

  it('should render component child components', () => {
    expect(wrapped).toMatchSnapshot();
  });
});
