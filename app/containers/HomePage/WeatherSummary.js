import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../services/helper';

const WeatherSummary = ({ unit, weatherData: { avgTemp, avgHumidity } }) => {
  let outside = '';
  let humid = '';
  const today = formatDate();

  if (avgTemp < 15) {
    outside = 'cold';
  } else if (avgTemp >= 15 && avgTemp <= 25) {
    outside = 'pleasant';
  } else {
    outside = 'hot';
  }

  if (avgHumidity < 20) {
    humid = 'less';
  } else if (avgHumidity >= 20 && avgHumidity < 50) {
    humid = 'mildly';
  } else if (avgHumidity >= 50 && avgHumidity < 70) {
    humid = 'highly';
  }

  return (
    <div className="weather-summary-container">
      <h3>{`Today ${today}`}</h3>
      <h4>
        {`It will be ${outside} and ${humid} humid weather as the average temperature will be ${avgTemp}.`}
        &deg;
        {unit}
      </h4>
    </div>
  );
};

WeatherSummary.propTypes = {
  weatherData: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired
};

export default WeatherSummary;
