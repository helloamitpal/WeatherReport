import React, { useState, Children, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './Carousel.scss';

const Carousel = ({ children, className, onSelectCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noOfCards, setNoOfCards] = useState(0);
  const [indexes, setIndexes] = useState([]);
  const containerRef = useRef(null);

  const determineVisibleCards = (cardCount, index) => {
    const arr = [...Array(children.length).keys()];

    if (cardCount === 1) {
      setIndexes([index]);
      return;
    }

    if (index < cardCount) {
      setIndexes(arr.slice(0, cardCount));
    } else if (index >= cardCount && index + cardCount <= children.length) {
      setIndexes(arr.slice(index - 1, index - 1 + cardCount));
    } else {
      setIndexes(arr.slice(cardCount * -1));
    }
  };

  const onClickCard = (evt, cardIndex, dataObj) => {
    evt.preventDefault();
    if (cardIndex !== currentIndex) {
      setCurrentIndex(cardIndex);
      onSelectCard(cardIndex, dataObj);
    }
  };

  const resizeHandler = () => {
    const { current: { clientWidth } } = containerRef;
    let cards = 0;

    if (clientWidth < 400) {
      cards = 1;
    } else if (clientWidth >= 400 && clientWidth < 700) {
      cards = Math.min(2, children.length);
    } else {
      cards = Math.min(3, children.length);
    }

    setNoOfCards(cards);
    determineVisibleCards(cards, currentIndex);
  };

  const resizeDebounce = debounce(resizeHandler, 500);

  const handleNavigation = (index) => {
    setCurrentIndex(index);
    determineVisibleCards(noOfCards, index);
    onSelectCard(index, children[index]);
  };

  const handleLeftNavigation = (evt) => {
    evt.preventDefault();
    const index = currentIndex - 1;
    handleNavigation(index);
  };

  const handleRightNavigation = (evt) => {
    evt.preventDefault();
    const index = currentIndex + 1;
    handleNavigation(index);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeDebounce);
    resizeDebounce();

    return () => {
      window.removeEventListener('resize', resizeDebounce);
    };
  }, []);

  return (
    <div className={`${className} carousel-container mt-1`} ref={containerRef}>
      <button onClick={handleLeftNavigation} type="button" disabled={currentIndex === 0}>
        <i className="arrow left" />
      </button>
      <div className="item-container">
        {
          Children.map(children, (item, index) => (
            <div
              className={`carousel-item ${indexes.includes(index) ? '' : 'hide'} ${currentIndex === index ? 'active' : ''}`}
              key={`carousel-${index.toString()}`}
              onClick={(evt) => onClickCard(evt, index, item)}
            >
              {item}
            </div>
          ))
        }
      </div>
      <button type="button" onClick={handleRightNavigation} disabled={children && currentIndex === children.length - 1}>
        <i className="arrow right" />
      </button>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  onSelectCard: PropTypes.func.isRequired
};

Carousel.defaultProps = {
  className: ''
};

export default Carousel;
