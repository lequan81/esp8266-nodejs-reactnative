import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Appearance, useColorScheme, StatusBar, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
// import socket from './src/utils/socket';
import Navigation from './src/navigation';

const App = () => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
  colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <StatusBar barStyle="default" />
      <Navigation />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
});

export default App;