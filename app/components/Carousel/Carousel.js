import React, { useState, Children } from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

const Carousel = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftNavigation = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleRightNavigation = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={`${className} carousel-container`}>
      <button onClick={handleLeftNavigation} type="button" disabled={currentIndex === 0}>
        <i className="arrow left" />
      </button>
      <div className="item-container" flex="1">
        {
          Children.map(children, (item, index) => (
            <div className={`carousel-item ${currentIndex === index ? 'active' : ''}`} key={`carousel-${index.toString()}`}>{item}</div>
          ))
        }
      </div>
      <button type="button" onClick={handleRightNavigation} disabled={currentIndex === children.length - 1}>
        <i className="arrow right" />
      </button>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string
};

Carousel.defaultProps = {
  className: ''
};

export default Carousel;
