import React from 'react';
import { shallow } from 'enzyme';

import WeatherSummary from '../../../app/containers/HomePage/WeatherSummary';

describe('Testing UnitSelector Component', () => {
  let component;

  beforeAll(() => {
    component = shallow(<WeatherSummary weatherData={{ avgTemp: 10, avgHumidity: 10 }} unit="C" />);
  });

  afterAll(() => {
    component.unmount();
  });

  it('it should render component', () => {
    expect(component).toMatchSnapshot();
  });

  it('it should render proper text high Temperature', () => {
    component = shallow(<WeatherSummary weatherData={{ avgTemp: 20, avgHumidity: 40 }} unit="C" />);
    component.update();
    expect(component).toMatchSnapshot();
  });

  it('it should render proper text very high Temperature', () => {
    component = shallow(<WeatherSummary weatherData={{ avgTemp: 40, avgHumidity: 80 }} unit="C" />);
    component.update();
    expect(component).toMatchSnapshot();
  });

});
