import { combineReducers } from 'redux';
import weatherReducer from '../containers/HomePage/weatherReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  weather: weatherReducer
});

export default rootReducer;
