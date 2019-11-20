/* eslint-disable camelcase */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import * as weatherActionCreators from './weatherActionCreators';
import LoadingIndicator from '../../components/LoadingIndicator';
import Carousel from '../../components/Carousel';
import EventTracker from '../../event-tracker';
import Events from '../../event-tracker/events';
import { formatDate } from '../../services/helper';

import './HomePage.scss';

const HomePage = ({ weatherState, weatherActions }) => {
  const [unitValue, setUnitValue] = useState('C');
  const { loading, weathers } = weatherState;

  const handleChange = ({ target }) => {
    setUnitValue(target.value);
  };

  useEffect(() => {
    EventTracker.raise(Events.HOME_PAGE);
    weatherActions.getWeeklyWeather(unitValue);
  }, []);

  return (
    <div className="home-page container">
      <Helmet>
        <title>Weather Report</title>
        <meta name="description" content="Weather Report" />
      </Helmet>
      <div className="container">
        <FormControl component="fieldset">
          <RadioGroup aria-label="unit" name="unit" value={unitValue} onChange={handleChange}>
            <FormControlLabel value="C" control={<Radio />} label="Celcius" />
            <FormControlLabel value="F" control={<Radio />} label="Fahrenheit" />
          </RadioGroup>
        </FormControl>
        {loading && !weathers.length
          ? <LoadingIndicator />
          : (
            <Carousel>
              {
                weathers.map(({ main: { temp, temp_min, temp_max, humidity }, weather, dt_txt }) => (
                  <Card>
                    <CardContent>
                      <header className="card-header">{formatDate(dt_txt)}</header>
                      <h1 className="mt-1">
                        {temp}
                        &deg;
                        {unitValue}
                      </h1>
                      <section className="min-max-section">
                        <span>{`Min: ${temp_min}`}</span>
                        <span>{`Max: ${temp_max}`}</span>
                      </section>
                      {weather && weather[0] && <section>{weather[0].description}</section>}
                      <section>{`Humidity: ${humidity}%`}</section>
                    </CardContent>
                  </Card>
                ))
              }
            </Carousel>
          )
        }
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
