import React from 'react';
import { mount } from 'enzyme';

import Carousel from '../../../app/components/Carousel/Carousel';

describe('Testing Carousel Component', () => {
  let component;

  beforeAll(() => {
    const Children = [<div key={1} onClick={() => jest.fn(0, {})} />];
    component = mount(<Carousel onSelectCard={jest.fn()}>{Children}</Carousel>);
  });

  afterAll(() => {
    component.unmount();
  });

  it('it should render component', () => {
    expect(component).toMatchSnapshot();
  });

  it('it should have two side buttons', () => {
    expect(component.find('button').length).toEqual(2);
  });

  it('card click event listner must work', () => {
    component.find('.carousel-item').simulate('click', {
      onClickCard: () => jest.fn(0, {})
    });
    expect(component.find('.carousel-item').length).toEqual(1);
  });

  it('navigation button click event listner must work', () => {
    component.find('button').first().simulate('click', {
      handleLeftNavigation: () => jest.fn(0, {})
    });
    expect(component.find('.left').length).toEqual(1);
  });

});
