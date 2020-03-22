import React from 'react'
import { connect } from 'react-redux';
import { createChangeAppAction } from '../store/modules/app/app';
import { NetInfo } from 'react-native';
import { createAppPingAction } from '../store/service/app/AppPingSaga';

interface Props {
    changeAppConnection: (isConnected: boolean) => void
    pingServer: () => void
    setServerNotAvailability: () => void
}

function Component(props: Props) {
    React.useEffect(() => {
        props.setServerNotAvailability();
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('Phone is ' + (isConnected ? 'online' : 'offline'));
            props.changeAppConnection(isConnected);
            isConnected && props.pingServer();
        });

        function handleConnectivityChange(isConnected) {
            console.log('Phone connecting change to ' + (isConnected ? 'online' : 'offline'));
            props.changeAppConnection(isConnected);
            !isConnected && props.setServerNotAvailability()
        }

        NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityChange);

        return function cleanup() {
            NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityChange);
        }
    }, [])
    return null;
}

export const AppConnection = connect(
    () => ({}),
    (dispatch) => ({
        changeAppConnection: (isConnected: boolean) => {
            dispatch(createChangeAppAction({ networkConnected: isConnected }))
        },
        pingServer: () => dispatch(createAppPingAction()),
        setServerNotAvailability: () => dispatch(createChangeAppAction({
            serverAvailable: false
        }))
    })
)(Component)
