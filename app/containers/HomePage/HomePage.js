import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import * as weatherActionCreators from './weatherActionCreators';
import LoadingIndicator from '../../components/LoadingIndicator';
import Carousel from '../../components/Carousel';
import EventTracker from '../../event-tracker';
import Events from '../../event-tracker/events';

import './HomePage.scss';

const HomePage = ({ weatherState, weatherActions }) => {
  const [value, setValue] = React.useState('cel');
  const { loading, weathers } = weatherState;

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  useEffect(() => {
    EventTracker.raise(Events.HOME_PAGE);
    weatherActions.getWeeklyWeather();
  }, []);

  return (
    <div className="home-page container">
      <Helmet>
        <title>Weather Report</title>
        <meta name="description" content="Weather Report" />
      </Helmet>
      <div className="container">
        <FormControl component="fieldset">
          <RadioGroup aria-label="unit" name="unit" value={value} onChange={handleChange}>
            <FormControlLabel value="cel" control={<Radio />} label="Celcius" />
            <FormControlLabel value="far" control={<Radio />} label="Fahrenheit" />
          </RadioGroup>
        </FormControl>
        {loading && !weathers.length ? <LoadingIndicator /> : <Carousel list={weathers} />}
      </div>
    </div>
  );
};

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
