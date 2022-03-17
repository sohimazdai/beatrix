import { PersistConfig, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStorage } from '../model/IStorage';

export const persistConfig: PersistConfig<IStorage> = {
    key: 'root',
    blacklist: [
        'modal',
        'interactive',
        'noteFilter',
        'popupList',
        //________o b l i v i o n________l i n e________//
        // 'noteList',
        // 'pendingNoteList',
        // 'userDiabetesProperties',
        // 'userPropertiesShedule',
        // 'user',
        // 'tagList',
        // 'food',
        // 'shedule'
    ],
    storage: AsyncStorage,
    transforms: [
        createTransform(
            inboundState => inboundState,
            outboundState => {
                if (outboundState.loading) outboundState.loading = false;
                if (outboundState.syncLoading) outboundState.syncLoading = false;
                if (outboundState.exportLoading) outboundState.exportLoading = false;
                if (outboundState.error) outboundState.error = null;
                if (outboundState.serverAvailable) outboundState.serverAvailable = false;
                if (outboundState.networkConnected) outboundState.networkConnected = false;
                return outboundState;
            }
        )
    ]
};
