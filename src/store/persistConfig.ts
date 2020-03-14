import { PersistConfig, createTransform } from 'redux-persist';
import { AsyncStorage } from 'react-native';

export const persistConfig: PersistConfig = {
    key: 'root',
    blacklist: [
        'modal',
        'interactive'
    ],
    storage: AsyncStorage,
    transforms: [
        createTransform(
            inboundState => inboundState,
            outboundState => {
                if (outboundState.loading) outboundState.loading = false;
                if (outboundState.error) outboundState.error = null;
                return outboundState;
            }
        )
    ]
};
