import React from 'react';
import {StyleSheet, Dimensions, TouchableHighlight, Text} from 'react-native';

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },
  doubleSizeButton: {
    width: Dimensions.get('window').width / 2,
  },
  disableButton: {
    color: '#888',
    backgroundColor: 'black',
  },
});

export default props => {
  const styleArray = [styles.button];
  if (props.operation) {
    styleArray.push(styles.operationButton);
  }
  if (props.double) {
    styleArray.push(styles.doubleSizeButton);
  }
  if (props.disable) {
    styleArray.push(styles.disableButton);
  }
  return (
    <TouchableHighlight onPress={() => props.onClick(props.label)}>
      <Text style={styleArray}>{props.label}</Text>
    </TouchableHighlight>
  );
};
