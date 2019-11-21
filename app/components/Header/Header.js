import React from 'react';

import config from '../../config';
import { getLocation } from '../../services/helper';

import './header.scss';

const Header = () => (
  <header className="header-container">
    <div className="logo" />
    <section>
      <h1 className="logo-text">Weather Report</h1>
      <h3>{getLocation(config.LOCATION)}</h3>
    </section>
  </header>
);

export default Header;
