import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as weatherActionCreators from './weatherActionCreators';
import LoadingIndicator from '../../components/LoadingIndicator';
import Carousel from '../../components/Carousel';
import config from '../../config';
import EventTracker from '../../event-tracker';
import Events from '../../event-tracker/events';

import './HomePage.scss';

class HomePage extends Component {
  componentDidMount() {
    EventTracker.raise(Events.HOME_PAGE);
  }

  render() {
    return (
      <div className="home-page container">
        <Helmet>
          <title>Weather Report</title>
          <meta name="description" content="Weather Report" />
        </Helmet>
        <div className="container">
            Amit Pal
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  weatherState: PropTypes.object,
  weatherActions: PropTypes.object
};

const mapStateToProps = (state) => ({
  weatherState: state.weather
});

const mapDispatchToProps = (dispatch) => ({
  weatherActions: bindActionCreators(weatherActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
