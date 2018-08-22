import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

//App specific import
import { Header, CryptoContainer } from './src/components';
import Store from './src/Store';

const style = StyleSheet.create({
  appCointainer : {
    backgroundColor : '#51504f'
  }
});


const {appCointainer} = style;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
          <View>
            <Header />
            <CryptoContainer />
          </View>
      </Provider>  
    );
  }
}


