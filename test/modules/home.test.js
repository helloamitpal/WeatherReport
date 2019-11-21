import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../app/containers/HomePage/HomePage';

describe('Testing WeatherReport home page Component', () => {
  it('should render component child components', () => {
    shallow(<HomePage />);
  });
});
