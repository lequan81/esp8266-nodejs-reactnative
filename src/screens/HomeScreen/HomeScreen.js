import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme, Appearance } from 'react-native';
import Constants from 'expo-constants';
// import socket from '../utils/socket';
import { io } from "socket.io-client";

const HomeScreen = ({ ipAdress }) => {
  const socket = io.connect(ipAdress);
  
  const colorScheme = useColorScheme();
  const themeContainerStyle =
  colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  
  let [btnState, setBtnState] = useState(false);

  const toggleBtn = () => {
    btnState = !btnState;
    setBtnState(btnState);
    socket.emit('changeState', btnState);
    console.log('button state is ', btnState);
  }

  socket.on('state', state => {
    console.log('updated state', state);
    btnState = state;
    setBtnState(btnState);
  });

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={styles.statusText}>Device is {btnState ? 'On' : 'Off'}</Text>
      <TouchableOpacity
        onPress={() => {
          toggleBtn();
        }}
        style={btnState ? styles.buttonContainerOn : styles.buttonContainerOff}
      >
        <Text style={styles.buttonText}>{btnState ? 'Turn Off' : 'Turn On'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },

  statusText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 60,
  },

  buttonContainerOff: {
    height: 120,
    width: 120,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#353b48',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerOn: {
    height: 120,
    width: 120,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#0097e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;