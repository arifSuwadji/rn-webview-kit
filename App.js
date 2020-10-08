import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getPersistor, getStore } from './constants/CofigureStore';
import Router from './Router';

class App extends Component {
  renderLoading = () => {
    return (
      <View style={{ flex: 1, height: 500, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={"large"} />
        <StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
      </View>
    );
  }
  render(){
    const myStore = getStore();
    const myPersistor = getPersistor();
    return (
      <Provider store={myStore}>
        <PersistGate loading={this.renderLoading()} persistor={myPersistor}>
          <Router />
        </PersistGate>
      </Provider>
      
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
