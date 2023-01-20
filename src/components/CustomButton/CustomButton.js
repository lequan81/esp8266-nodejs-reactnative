import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 160,

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#0097e6',
  },

  container_SECONDARY: {
    borderColor: '#0097e6',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#0097e6',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
