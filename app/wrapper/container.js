import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Router from '../router/Router';
import configureStore from '../stores/configureStores';
import EventTracker from '../event-tracker';
import config from '../config';

class Container extends React.Component {
  constructor() {
    super();
    const { store } = configureStore()(this.onRehydrate);
    this.state = {
      store,
      rehydrated: false
    };
  }

  componentDidMount() {
    EventTracker.init();
  }

  onRehydrate = () => {
    this.setState({ rehydrated: true });
  }

  render() {
    const { store, rehydrated } = this.state;

    const content = rehydrated ? (
      <React.Fragment>
        <Provider store={store} key={config.STORAGE_KEY}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Provider>
      </React.Fragment>
    ) : null;

    return content;
  }
}

export default Container;
