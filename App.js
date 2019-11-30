import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

// import { Container } from './styles';
import Button from './src/components/Button';
import Display from './src/components/Display';

const INITIAL_STATE = {
  displayValue: 0,
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends React.Component {
  state = {...INITIAL_STATE};

  addDigit = n => {
    // console.debug(typeof this.state.displayValue);
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }

    if (n === '0' && this.state.displayValue === 0) {
      return;
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({displayValue, clearDisplay: false});

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];

      values[this.state.current] = newValue;
      this.setState({values});
    }
  };

  clearDisplay = () => {
    this.setState({...INITIAL_STATE});
  };

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({operation, clearDisplay: true, current: 1});
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (error) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        // clearDisplay: !equals,
        clearDisplay: true,
        values,
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.button}>
          <Button label="AC" onClick={this.clearDisplay} />
          <Button label="+/-" disable onClick={() => {}} />
          <Button label="%" disable onClick={() => {}} />
          <Button label="/" operation onClick={this.setOperation} />
          <Button label="7" onClick={this.addDigit} />
          <Button label="8" onClick={this.addDigit} />
          <Button label="9" onClick={this.addDigit} />
          <Button label="*" operation onClick={this.setOperation} />
          <Button label="4" onClick={() => this.addDigit(4)} />
          <Button label="5" onClick={() => this.addDigit(5)} />
          <Button label="6" onClick={() => this.addDigit(6)} />
          <Button label="-" operation onClick={this.setOperation} />
          <Button label="1" onClick={() => this.addDigit(1)} />
          <Button label="2" onClick={() => this.addDigit(2)} />
          <Button label="3" onClick={() => this.addDigit(3)} />
          <Button label="+" operation onClick={this.setOperation} />
          <Button label="0" double onClick={this.addDigit} />
          <Button label="." onClick={() => this.addDigit('.')} />
          <Button label="=" operation onClick={() => this.setOperation('=')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
