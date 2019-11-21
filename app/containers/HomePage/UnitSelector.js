import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const HomeHeader = ({ unit, onUnitChange }) => (
  <FormControl component="fieldset">
    <RadioGroup aria-label="unit" name="unit" value={unit} onChange={onUnitChange}>
      <FormControlLabel value="C" control={<Radio />} label="Celcius" />
      <FormControlLabel value="F" control={<Radio />} label="Fahrenheit" />
    </RadioGroup>
  </FormControl>
);

HomeHeader.propTypes = {
  unit: PropTypes.string.isRequired,
  onUnitChange: PropTypes.func.isRequired
};

export default HomeHeader;
