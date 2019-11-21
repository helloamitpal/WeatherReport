import React from 'react';
import { mount } from 'enzyme';
import { debounce } from 'lodash';
import { act } from 'react-dom/test-utils';

import Carousel from '../../../app/components/Carousel/Carousel';

describe('Testing Carousel Component', () => {
  let component;
  const setCurrentIndex = jest.fn();
  const onSelectCard = jest.fn();

  beforeAll(() => {
    const Children = [
      <div key={1} onClick={() => jest.fn(0, {})} />,
      <div key={2} onClick={() => jest.fn(0, {})} />
    ];
    component = mount(<Carousel onSelectCard={jest.fn()}>{Children}</Carousel>);
    jest.useFakeTimers();
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

  it('resize event listener should work', () => {
    const resizeHandler = jest.fn();
    jest.runOnlyPendingTimers();
    window.addEventListener('resize', () => debounce(resizeHandler, 500));
    global.dispatchEvent(new Event('resize'));
    jest.runAllTimers();
    expect(resizeHandler).toBeDefined();
  });

  it('card click event listner must work', () => {
    const cardIndex = 1;

    act(() => {
      component.find('.carousel-item').first().simulate('click', {
        preventDefault: () => {
          setCurrentIndex(cardIndex);
          onSelectCard(cardIndex, {});
        }
      });
      component.update();
      component.find('.carousel-item').first().props().onClick({
        preventDefault: jest.fn()
      });
    });

    expect(component.find('.carousel-item').length).toEqual(2);
  });

  it('left navigation button should be disabled', () => {
    let currentIndex = 1;
    const handleNavigation = jest.fn();

    act(() => {
      component.find('button').first().simulate('click', {
        preventDefault: () => {
          currentIndex -= 1;
          handleNavigation(currentIndex);
        }
      });
      component.update();
      component.find('button').first().props().onClick({
        preventDefault: jest.fn()
      });
    });
    expect(component.find('button').first().props().disabled).toEqual(true);
    expect(currentIndex).toBe(1);
  });

  it('right navigation button should be disabled', () => {
    let currentIndex = 1;
    const handleNavigation = jest.fn();
    act(() => {
      component.find('button').last().simulate('click', {
        preventDefault: () => {
          currentIndex += 1;
          handleNavigation(currentIndex);
        }
      });

      component.update();
      component.find('button').last().props().onClick({
        preventDefault: jest.fn()
      });
    });
    expect(component.find('button').last().props().disabled).toEqual(false);
    expect(currentIndex).toBe(2);
  });

});
