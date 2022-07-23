import React from 'react';
import { AppNavigator } from './src/navigator/Navigator';
import { Provider } from 'react-redux';
import { appStore, persistor } from './src/store/appStore';
import { PersistGate } from 'redux-persist/integration/react';
import { appStarter } from './src/app/AppStarter';
import { AppConnection } from './src/app/AppConnection';
import { handleError } from './src/app/ErrorHandler';
import { DevStub } from './src/component/dev-stub/DevStub';
import { PendingWatcherConnected } from './src/app/PendingWatcher';
import * as SplashScreen from 'expo-splash-screen';
import { logger } from './src/app/Logger';

SplashScreen.preventAutoHideAsync();

interface State {
    appIsReady: boolean,
    isThereAnError: boolean,
}

export default class App extends React.Component<never, State> {
    state = {
        appIsReady: false,
        isThereAnError: false,
    }

    async componentDidMount() {
        appStarter()
            .then(() => {
                this.setState({ appIsReady: true });
                logger('👍 app started');
            })
            .catch(e => {
                handleError(e, 'Ошибка инициализации');
            });
    }

    async componentDidUpdate(_, prevState: Readonly<State>): Promise<void> {
        if (
            (!prevState.appIsReady && this.state.appIsReady) ||
            (!prevState.isThereAnError && this.state.isThereAnError)
        ) {
            await SplashScreen.hideAsync();
        }
    }

    render() {
        if (!this.state.appIsReady) return null;

        return (
            <Provider store={appStore}>
                <PersistGate persistor={persistor}>
                    <AppNavigator />
                    <AppConnection />
                    <DevStub />
                    <PendingWatcherConnected />
                </PersistGate>
            </Provider>
        )
    }
}

