import React from 'react';
import { shallow } from 'enzyme';

import TimeWiseSummary from '../../../app/containers/HomePage/TimeWiseSummary';

describe('Testing UnitSelector Component', () => {
  let component;

  beforeAll(() => {
    component = shallow(<TimeWiseSummary timeline={[{ time: '9AM', description: 'sample weather' }]} />);
  });

  afterAll(() => {
    component.unmount();
  });

  it('it should render component', () => {
    expect(component).toMatchSnapshot();
  });

});
