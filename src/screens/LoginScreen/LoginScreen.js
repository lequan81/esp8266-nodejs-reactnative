import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
  Appearance,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Logo from '../../../assets/Logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const [ipAdress, setIpAdress] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onLoginPress = () => {
    // validate user
    console.log({ ipAdress });
    navigation.navigate('Home', { ipAdress: ipAdress });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, themeContainerStyle]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />

          <CustomInput
            placeholder="Server address"
            value={ipAdress}
            setValue={setIpAdress}
          />

          <CustomButton text="CONNECT" onPress={onLoginPress} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  inner: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '100%',
    maxWidth: 200,
    maxHeight: 160,
  },
});

export default LoginScreen;
