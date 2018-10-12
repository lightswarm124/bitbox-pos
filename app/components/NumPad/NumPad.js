import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import isNumber from './isNumber';

export default class NumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '',
      decimal: false,
      decimalPlace: 2
    };
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
      console.log(ButtonValue);
      this.setState({
        total: '',
        decimal: false,
        decimalPlace: 2
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
    } else if (ButtonValue === "pay") {
      const balance = parseFloat(this.state.total);
      console.log(balance);
    } else {
      return;
    }
  }

  render() {
    return(
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
    );
  }
}
