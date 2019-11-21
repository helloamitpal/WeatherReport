import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { default as thunk } from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import api from '../app/api/apiInterceptor';
// import reducer from '../src/store/rootReducer';
import weatherReducer from '../app/containers/HomePage/weatherReducer';

const reducer = combineReducers({
  weather: weatherReducer
});
const Root = ({ children, state = {} }) => {
  const store = createStore(reducer, { ...state }, applyMiddleware(thunk.withExtraArgument({ api }), reduxPackMiddleware));
  return (<Provider store={store}>{children}</Provider>);
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object
};

export default Root;
