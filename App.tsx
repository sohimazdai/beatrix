import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './src/navigator/Navigator';
import { Provider } from 'react-redux';
import { appStore } from './src/store/appStore';

export default function App() {
  return (
    <Provider store={appStore}>
      <AppNavigator />
    </Provider>
  );
}
