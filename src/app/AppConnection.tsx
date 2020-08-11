import React from 'react'
import { connect } from 'react-redux';
import { createChangeAppAction } from '../store/modules/app/app';
import { NetInfo } from 'react-native';
import { createAppPingAction } from '../store/service/app/AppPingSaga';
import { IStorage } from '../model/IStorage';
import { IApp } from '../model/IApp';
import { logger } from './Logger';
import Variables from './Variables';
import { appAnalytics } from './Analytics';

interface Props {
    app?: IApp
    changeAppConnection: (isConnected: boolean) => void
    pingServer: () => void
    setServerNotAvailability: () => void
}

function Component(props: Props) {
    React.useEffect(() => {
        logger('Environment: ', Variables);
        NetInfo.isConnected.fetch().then(isConnected => {
            props.changeAppConnection(isConnected);
            isConnected && props.pingServer();
            logger('Phone is ' + (isConnected ? 'online' : 'offline'));

            appAnalytics.sendEventWithProps(appAnalytics.events.PHONE_CONNECTION_STATUS_CHANGE, {
                isConnected
            });
        });

        function handleConnectivityChange(isConnected) {
            props.changeAppConnection(isConnected);
            !isConnected && props.setServerNotAvailability();
            isConnected && props.pingServer();
            logger('Phone connecting change to ' + (isConnected ? 'online' : 'offline'));
        }

        NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityChange);

        return function cleanup() {
            NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityChange);
        }
    }, [])
    return null;
}

export const AppConnection = connect(
    (state: IStorage) => ({
        app: state.app,
        user: state.user
    }),
    (dispatch) => ({
        dispatch,
        changeAppConnection: (isConnected: boolean) => {
            dispatch(createChangeAppAction({ networkConnected: isConnected }))
        },
        pingServer: () => dispatch(createAppPingAction()),
        setServerNotAvailability: () => dispatch(createChangeAppAction({
            serverAvailable: false
        }))
    })
)(Component)
