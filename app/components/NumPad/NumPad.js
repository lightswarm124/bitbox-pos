import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import isNumber from './isNumber';

export default class NumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null
    };
  }

  handleClick = buttonName => {
    console.log(buttonName);
    if (buttonName === "clear") {
      this.setState({
        total: null,
        next: null
      });
    }

    if (isNumber(buttonName)) {
      if (buttonName === "0" && this.state.next === "0") {
        return;
      }
    }
  }

  render() {
    return(
      <div className="pad">
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <Paper>{this.state.next || this.state.total || "Enter Amount"}</Paper>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="7">7</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="8">8</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="9">9</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="4">4</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="5">5</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="6">6</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="1">1</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="2">2</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="3">3</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="clear">Clear</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name=".">.</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="0">0</Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth={true} size="large" onClick={this.handleClick} variant="contained" color="primary" name="pay">Pay</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
