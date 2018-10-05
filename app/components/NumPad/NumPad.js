import * as React from 'react';
import NumberInput from 'material-ui-number-input';
import Keyboard from 'react-material-ui-keyboard';
import { numericKeyboard } from 'react-material-ui-keyboard/layouts';

function corrector(value) {
    console.log(`correction ${value}`);
    this.makeCorrection(value);
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, value: '2' };
        this.onFocus = this.handleFocus.bind(this);
        this.onChange = this.handleChange.bind(this);
        this.onRequestClose = this.handleRequestClose.bind(this);
        this.onInput = this.handleInput.bind(this);
        this.onError = this.handleError.bind(this);
        this.onValid = this.handleValid.bind(this);
    }

    canOpenKeyboard() {
        return (this.state.value.length % 2) === 0;
    }

    handleFocus(event) {
        if(this.canOpenKeyboard()) {
            this.setState({ open: true });
        }
    }

    handleChange(event, value) {
        console.log(value);
        this.setState({ value: value });
    }

    handleRequestClose() {
        this.setState({ open: false });
    }

    handleInput(input) {
        console.log(input);
        this.setState({ value: input });
    }

    handleError(error) {
        let errorText;
        switch (error) {
            case 'required':
                errorText = 'This field is required';
                break;
            case 'invalidSymbol':
                errorText = 'You are tring to enter none number symbol';
                break;
            case 'incompleteNumber':
                errorText = 'Number is incomplete';
                break;
            case 'singleMinus':
                errorText = 'Minus can be use only for negativity';
                break;
            case 'singleFloatingPoint':
                errorText = 'There is already a floating point';
                break;
            case 'singleZero':
                errorText = 'Floating point is expected';
                break;
            case 'min':
                errorText = 'You are tring to enter number less than -10';
                break;
            case 'max':
                errorText = 'You are tring to enter number greater than 12';
                break;
        }
        this.setState({ errorText: errorText });
    }

    handleValid(value) {
        console.debug(`valid ${value}`);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ value: '89' }), 1000);
    }

    render() {
        const { state, onFocus, onChange, onError, onValid, onInput } = this;
        const { value, errorText } = state;
        const textField = (
            <NumberInput
                id="num"
                required
                value={value}
                min={-10}
                max={12}
                strategy="warn"
                errorText={errorText}
                onFocus={onFocus}
                onChange={onChange}
                onError={onError}
                onValid={onValid}
                floatingLabelText="Click for a Keyboard" />
        );

        return (
            <Keyboard
                textField={textField}
                open={this.state.open}
                onRequestClose={this.onRequestClose}
                onInput={onInput}
                correctorName="onRequestValue"
                corrector={corrector}
                layouts={[numericKeyboard]}
                keyboardKeyHeight={50}
                keyboardKeyWidth={100}
                keyboardKeySymbolSize={36}
            />
        );
    }
}
