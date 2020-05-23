import React from 'react';
import { AppLoading } from 'expo';
import { AppNavigator } from './src/navigator/Navigator';
import { Provider } from 'react-redux';
import { appStore, persistor } from './src/store/appStore';
import { ModalContentConnect } from './src/component/modal-content/ModalContent';
import { PersistGate } from 'redux-persist/integration/react';
import { appStarter } from './src/app/AppStarter';
import { AppConnection } from './src/app/AppConnection';
import { handleError } from './src/app/ErrorHandler';
import { DevStub } from './src/component/dev-stub/DevStub';

interface State {
  appIsReady: boolean
}

export default class App extends React.Component<never, State> {
  state = {
    appIsReady: false
  }

  async componentDidMount() {
    appStarter()
      .then(() => {
        this.setState({ appIsReady: true });
      })
      .catch(e => handleError(e, 'Ошибка инициализации'))
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
            <AppConnection />
            <DevStub />
          </PersistGate>
        </Provider>
        : (
          <AppLoading key={'AppLoading'} />
        )
    )
  }
}

