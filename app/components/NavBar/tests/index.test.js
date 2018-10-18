import React from 'react';
import { shallow } from 'enzyme';

import NavBar from '../index';

describe('<Navbar />', () => {
  it('should render the Navbar', () => {
    const renderedComponent = shallow(<Navbar />);
    expect(
      renderedComponent.contains(
        <Link className="router-link" to="/">Home</Link>
        <Link className="router-link" to="/features">Features</Link>
        <Link className="router-link" to="/CashierPOS">CashierPOS</Link>
        <Link className="router-link" to="/CustomerPOS">CustomerPOS</Link>
      ).toEqual(true);
    )
  });
})
