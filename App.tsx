import React from 'react';
import { AppLoading } from 'expo';
import { AppNavigator } from './src/navigator/Navigator';
import { Provider } from 'react-redux';
import { appStore, persistor } from './src/store/appStore';
import { ModalContentConnect } from './src/component/modal-content/ModalContent';
import { PersistGate } from 'redux-persist/integration/react';
import { appStarter } from './src/app/AppStarter';

export default class App extends React.Component {
  state = {
    appIsReady: false,
  }

  async componentDidMount() {
    appStarter()
      .then(() => {
        this.setState({ appIsReady: true });
      })
  }

  render() {
    return (
      this.state.appIsReady ?
        <Provider store={appStore}>
          <PersistGate
            loading={<AppLoading key={'AppLoading'} />}
            persistor={persistor}
          >
            <AppNavigator />
            <ModalContentConnect />
          </PersistGate>
        </Provider>
        : (
          <AppLoading key={'AppLoading'} />
        )
    )
  }
}
