import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import QRCode from 'qrcode-react';
import { Button, TextField } from '@material-ui/core/Button';

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

  handleClick = (payAmount) => {
    if (payAmount == 0) {
      console.log("no amount entered");
      return;
    } else {
      this.setState({isLoading: true});
      let paymentValue = this.convertPrice(payAmount);
      let paymentURL = getBIP21URL(publickey, paymentValue, "Built by Bitcoin Bay");
      this.updatePrices();
      this.setState({url: paymentURL, amountCrypto: paymentValue, amountFiat: parseFloat(payAmount), isLoading: false});
    }
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Cashier POS Page</title>
          <meta name="description" content="CashierPOS Page"/>
        </Helmet>
        <img src={IMG} height="400" width="400"/>
        <h4>CashierPOS</h4>
        <div className="component-app">
          <h4>Price</h4>
          <p>{this.state.cryptoPrice.CAD}</p>
          {
            this.state.url == publickey
            ? <QRCode value={defaultWebURL}/>
            : <div>
                <QRCode value={this.state.url}/>
                <p>{this.state.url}</p>
                <h4>BCH</h4>
                <p>{this.state.amountCrypto}</p>
              </div>
          }
          {/*<div className="pad">
          <TextField id="paymentAmount" value={this.state.amountFiat} />
            <Button variant="contained" color="primary" onClick={this.handleClick.bind(this)}>
              Test
            </Button>
          </div>
          */}
        </div>
      </article>
    );
  }
}
