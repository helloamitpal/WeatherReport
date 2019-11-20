import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      nextIndex: 0,
      prevIndex: 0
    };
  }

  componentDidUpdate() {
    const { children, delay } = this.props;
    let { currentIndex, nextIndex, prevIndex } = this.state;

    this.timeout = setTimeout(() => {
      currentIndex += 1;

      if (currentIndex === children.length) {
        currentIndex = 0;
      }

      if (currentIndex === 0) {
        prevIndex = children.length - 1;
        nextIndex = currentIndex + 1;
      } else if (currentIndex === children.length - 1) {
        prevIndex = currentIndex - 1;
        nextIndex = 0;
      } else {
        prevIndex = currentIndex - 1;
        nextIndex = currentIndex + 1;
      }

      this.setState({ currentIndex, nextIndex, prevIndex });
    }, delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { children, className } = this.props;
    const { currentIndex, nextIndex, prevIndex } = this.state;

    return (
      <div className={`${className} carousel-container`}>
        {
          Children.map(children, (item, index) => {
            const prevItemClass = (prevIndex === index && 'prev-item') || '';
            const currentItemClass = (currentIndex === index && 'current-item') || '';
            const nextItemClass = (nextIndex === index && 'next-item') || '';

            return <div className={`carousel-item ${currentItemClass} ${nextItemClass}${prevItemClass}`} key={`carousel-${index.toString()}`}>{item}</div>;
          })
        }
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  delay: PropTypes.number
};

Carousel.defaultProps = {
  className: '',
  delay: 3000
};

export default Carousel;
