import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import QRCode from 'qrcode-react';
import openSocket from 'socket.io-client';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {getBIP21URL, generateNewAddress} from '../../services/paymentApi';
import isNumber from './isNumber';
import NumPad from '../../components/NumPad';
import IMG from '../../images/bitcoin-bay.jpg';
import './style.scss';

const BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
const BITBOX = new BITBOXCli();
const prices = {};
const publickey = 'bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl';
const defaultWebURL = 'https://www.meetup.com/The-Bitcoin-Bay';
const socket = openSocket('http://localhost:3000');

export default class CashierPOS extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.sendSocketIO = this
      .sendSocketIO
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
      total: '',
      decimal: false,
      decimalPlace: 2,
      socketData: []
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

  sendSocketIO(msg) {
    socket.emit('event', msg);
  }

  convertPrice(fiat) {
    let convertedAmount = parseFloat(((parseFloat(1 / (this.state.cryptoPrice.CAD))) * fiat));
    return convertedAmount;
  }

  handleClick = event => {
    let ButtonValue = event.target.value;
    if (isNumber(ButtonValue)) {
      if (this.state.decimalPlace === 0) {
        return;
      } else if (this.state.decimal) {
        this.setState({
          total: this.state.total + ButtonValue,
          decimalPlace: this.state.decimalPlace - 1
        });
      } else {
        this.setState({
          total: this.state.total + ButtonValue
        })
      }
    } else if (ButtonValue === "clear") {
      this.setState({
        total: '',
        decimal: false,
        decimalPlace: 2,
        amountFiat: 0
      })

    } else if (ButtonValue === ".") {
      if (this.state.total.includes(".")) {
        return;
      }
      console.log(ButtonValue);
      this.setState({
        total: this.state.total + ButtonValue,
        decimal: true
      })
    } else if (ButtonValue === "pay" && this.state.total != '') {
      this.setState({ isLoading: true });
      const paymentValue = this.convertPrice(this.state.total);
      const paymentURL = getBIP21URL(publickey, paymentValue, 'Built by Bitcoin Bay');
      this.updatePrices();
      this.setState({ url: paymentURL, amountFiat: this.state.total, amountCrypto: paymentValue, isLoading: false });
      this.sendSocketIO(paymentValue, this.state.total, paymentURL, this.state.cryptoPrice.CAD)
    } else {
      return;
    }
  }

  render() {
    const {
      cryptoPrice, url, amountFiat, amountCrypto, total
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
            amountFiat === 0
              ? <img src={IMG} height="200" width="200" alt="logo" />
              : <div>
                  <QRCode value={url} />
                  <p>{url}</p>
                  <h4>BCH</h4>
                  <p>{amountCrypto}</p>
                </div>
          }
          <div className="pad">
            <Grid container spacing={32}>
              <Grid item xs={12}>
                <Paper>{ this.state.total || "Enter Amount" }</Paper>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="7">7</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="8">8</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="9">9</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="4">4</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="5">5</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="6">6</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="1">1</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="2">2</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="3">3</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="clear">Clear</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value=".">.</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="0">0</Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={(value) => {this.handleClick(value)}} value="pay">Pay</Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </article>
    );
  }
}
