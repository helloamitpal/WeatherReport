import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TimeWiseSummary = memo(({ timeline }) => (
  <div className="timeline-container">
    <h2>Timewise Details</h2>
    {
      timeline && timeline.map(({ time, description }, index) => (
        <p key={`timeline-${time}-${index.toString()}`}>{`${time}: ${description}`}</p>
      ))
    }
  </div>
));

TimeWiseSummary.propTypes = {
  timeline: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }))
};

export default TimeWiseSummary;
