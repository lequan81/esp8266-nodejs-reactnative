import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#333"
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    maxWidth: 360,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 5,
    marginTop: 50,
    marginBottom: 10,
  },
  input: {
    marginVertical: 16,
  },
});

export default CustomInput;
