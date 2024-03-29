import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../services/helper';

const WeatherSummary = memo(({ unit, weatherData: { avgTemp, avgHumidity } }) => {
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
  } else if (avgHumidity >= 20 && avgHumidity <= 60) {
    humid = 'mildly';
  } else {
    humid = 'highly';
  }

  return (
    <div className="weather-summary-container">
      <h3>{`Today ${today}`}</h3>
      <h4>
        {`It will be ${outside} and ${humid} humid weather as the average temperature will be ${avgTemp}`}
        &deg;
        {unit}
      </h4>
    </div>
  );
});

WeatherSummary.propTypes = {
  weatherData: PropTypes.object,
  unit: PropTypes.string
};

export default WeatherSummary;
