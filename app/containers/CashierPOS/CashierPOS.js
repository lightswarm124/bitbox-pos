import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import QRCode from 'qrcode-react';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();

import './style.scss';
import IMG from '../../images/bitcoin-bay.jpg';
let prices = {};

let publickey = "bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl";

let defaultWebURL = "https://www.meetup.com/The-Bitcoin-Bay";

export default class CashierPOS extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.updatePrices = this
      .updatePrices
      .bind(this);
    this.onValueChange = this
      .onValueChange
      .bind(this);
    this.state = {
      cryptoPrice: [],
      isLoading: false,
      url: publickey,
      amountFiat: 0,
      amountCrypto: 0,
      fiat: 'CAD',
    }
  }

  componentDidMount() {
    this.updatePrices();
  }

  updatePrices() {
    axios
      .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BCH,BTC,ETC,ETH,LTC&tsyms=${this.state.fiat}`)
      .then(res => {
        const crypto = res.data.BCH;
        this.setState({
          cryptoPrice: crypto
        }, () => console.log(this.state.cryptoPrice));
      });
  }

  handleClick = () => {
    if (this.state.amountFiat === 0) {
      console.log("no amount entered");
      return;
    } else {
      this.setState({ isLoading: true });
      let paymentValue = this.convertPrice(this.state.amountFiat);
      let paymentURL = getBIP21URL(publickey, paymentValue, "Built by Bitcoin Bay");
      this.updatePrices();
      this.setState({ url: paymentURL, amountCrypto: paymentValue, isLoading: false });
    }
  }

  onValueChange = e => this.setState({
    amountFiat: e.floatvalue
  })

  render() {
    const { cryptoPrice, url, amountFiat, amountCrypto } = this.state;
    return (
      <article>
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page"/>
        </Helmet>
        <h4>CashierPOS</h4>
        <img src={IMG} height="200" width="200"/>
        <div className="component-app">
          <h4>Price</h4>
          <p>{cryptoPrice.CAD}</p>
          {
            url == publickey
            ? <QRCode value={defaultWebURL}/>
            : <div>
                <QRCode value={url}/>
                <p>{url}</p>
                <h4>BCH</h4>
                <p>{amountCrypto}</p>
              </div>
          }
          <div className="pad">
            <NumberFormat name="amountFiat" value={'0.00'} displayType={'input'} thousandSeparator={true} decimalScale={2} allowNegative={false} prefix={'$'} onValueChange={this.onValueChange}/>

            <Button variant="contained" color="primary" onClick={this.handleClick.bind(this)}>
              Test
            </Button>
          </div>
        </div>
      </article>
    );
  }
}
