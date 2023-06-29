/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, Button, View} from 'react-native';
import React from 'react';

const LoginScreen = ({navigation, route}) => {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var finalTime =
      seconds == 60
        ? minutes + 1 + ':00'
        : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    console.log(finalTime);
    console.log(typeof finalTime);
    return finalTime;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{millisToMinutesAndSeconds(route?.params?.timer)}</Text>
      <Button
        title="Move to Home screen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
