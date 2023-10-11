import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';

const Header = () => {
  return (
    <View>
      <Text style={style.header}>Criptomonedas</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5e49e2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
  },
});

export default Header;
