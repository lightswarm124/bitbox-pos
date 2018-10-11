import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import QRCode from 'qrcode-react';

import NumPad from '../../components/NumPad';

import './style.scss';
import IMG from '../../images/bitcoin-bay.jpg';

const BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
const BITBOX = new BITBOXCli();

const prices = {};
const publickey = 'bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl';
const defaultWebURL = 'https://www.meetup.com/The-Bitcoin-Bay';

export default class CashierPOS extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.updatePrices = this
      .updatePrices
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.state = {
      cryptoPrice: [],
      isLoading: false,
      url: publickey,
      amountFiat: 0,
      amountCrypto: 0,
      fiat: 'CAD',
    };
  }

  componentDidMount() {
    this.updatePrices();
  }

  updatePrices() {
    axios
      .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BCH,BTC,ETC,ETH,LTC&tsyms=${this.state.fiat}`)
      .then((res) => {
        const crypto = res.data.BCH;
        this.setState({
          cryptoPrice: crypto
        }, () => console.log(this.state.cryptoPrice));
      });
  }

  handleClick = (value) => {
    if (value === 0) {
      console.log('no amount entered');
    } else {
      this.setState({ isLoading: true });
      const paymentValue = this.convertPrice(value);
      const paymentURL = getBIP21URL(publickey, paymentValue, 'Built by Bitcoin Bay');
      this.updatePrices();
      this.setState({ url: paymentURL, amountCrypto: paymentValue, isLoading: false });
    }
  }

  onChange = (e) => {
    console.log(e);
/*
      this.setState({
      amountFiat: e.target.value
    });
*/
}

  render() {
    const {
      cryptoPrice, url, amountFiat, amountCrypto
    } = this.state;
    return (
      <article>
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page" />
        </Helmet>
        <h4>CashierPOS</h4>
        <div className="component-app">
          <h4>Price</h4>
          <p>{cryptoPrice.CAD}</p>
          {
            url == publickey
              ? <img src={IMG} height="200" width="200" />
              : <div>
                  <QRCode value={url} />
                  <p>{url}</p>
                  <h4>BCH</h4>
                  <p>{amountCrypto}</p>
                </div>
          }
          <NumPad />
        </div>
      </article>
    );
  }
}
