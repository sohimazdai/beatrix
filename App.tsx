import React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { AppNavigator } from './src/navigator/Navigator';
import { Provider } from 'react-redux';
import { appStore } from './src/store/appStore';
import { ModalContentConnect } from './src/component/modal-content/ModalContent';

export default class App extends React.Component {
  state = {
    appIsReady: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Roboto": require("./assets/fonts/Roboto/Roboto-Regular.ttf")
    });
    this.setState({appIsReady: true});
  }

  render(){
    return (
      this.state.appIsReady ?
          <Provider store={appStore}>
            <AppNavigator />
            <ModalContentConnect />
          </Provider>
      : <AppLoading />
    )
  }
}
