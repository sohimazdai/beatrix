import React from 'react'
import { connect } from 'react-redux';
import { createChangeAppAction } from '../store/modules/app/app';
import NetInfo from "@react-native-community/netinfo";
import { createAppPingAction } from '../store/service/app/AppPingSaga';
import { logger } from './Logger';
import Variables from './Variables';
import { appAnalytics } from './Analytics';

interface Props {
    changeAppConnection: (isConnected: boolean) => void
    pingServer: () => void
    setServerNotAvailability: () => void
}

function Component(props: Props) {
    React.useEffect(() => {
        logger('Environment: ', Variables);
        const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
            appAnalytics.sendEventWithProps(
                appAnalytics.events.PHONE_CONNECTION_STATUS_CHANGE,
                { isConnected: isConnected }
            );

            props.changeAppConnection(isConnected);
            isConnected && props.pingServer();

            logger('🤙✨ Phone connecting change to ' + (isConnected ? 'online ✅' : 'offline ⛔'));
        });

        return unsubscribe;
    }, [])
    return null;
}

export const AppConnection = connect(
    null,
    (dispatch) => ({
        dispatch,
        changeAppConnection: (isConnected: boolean) => {
            if (isConnected) {
                dispatch(createChangeAppAction({ networkConnected: true }))
            } else {
                dispatch(createChangeAppAction({
                    networkConnected: false,
                    serverAvailable: false,
                }))
            }
        },
        pingServer: () => dispatch(createAppPingAction()),
        setServerNotAvailability: () => dispatch(createChangeAppAction({
            serverAvailable: false
        }))
    })
)(Component)
