import React from 'react';
import { shallow } from 'enzyme';

import UnitSelector from '../../../app/containers/HomePage/UnitSelector';

describe('Testing UnitSelector Component', () => {
  let component;
  const fn = jest.fn();

  beforeAll(() => {
    component = shallow(<UnitSelector unit="C" onUnitChange={fn} />);
  });

  afterAll(() => {
    component.unmount();
  });

  it('it should render component', () => {
    expect(component).toMatchSnapshot();
  });

});
