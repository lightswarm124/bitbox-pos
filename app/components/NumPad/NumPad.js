import * as React from 'react';
import TextField from 'material-ui/TextField';
import Keyboard from 'react-material-ui-keyboard';
import { numericKeyboard } from 'react-material-ui-keyboard/layouts';

class NumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: ''
        };
        this.onInput = this.handleInput.bind(this);
    }

    handleInput(input) {
        this.setState({ value: input });
    }

    render() {
      <Keyboard
        textField={
          <TextField
            id="text"
            value={this.state.value}
          />
        }
        automatic={false}
        onInput={this.onInput}
        layouts={[numericKeyboard]}
      />;
    }
};

module.exports = NumPad;
