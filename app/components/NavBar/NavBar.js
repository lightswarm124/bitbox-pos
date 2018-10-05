import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import './style.scss';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const barClass = ['navbar '];
    return (
      <div>
        <Header />
        <nav className={barClass.join('')}>
          <div className="overlay btn-close"/>
          <div className="container d-flex">
            <a className="title" href="/">
              <svg viewBox="0 0 7.66 7.12">
                <path
                  d="M4.78,7.12,3.86,4.78l-1,2.34L0,0H1.1L2.93,4.75,3.4,3.63,2,0H3L4.78,4.62,6.59,0H7.66Z"/>
              </svg>
            </a>
            <ul>
              <Link className="router-link" to="/">Home</Link>
              <Link className="router-link" to="/features">Features</Link>
              <Link className="router-link" to="/CashierPOS">CashierPOS</Link>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
