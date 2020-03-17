import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';

export const LAST_ACTIVE_USER_ID = "last_active_user_id"

export function appStarter() {
    return new Promise((resolve, reject) => {
        Font.loadAsync({
            "Roboto": require('./../../assets/fonts/Roboto/Roboto-Regular.ttf')
        })
            .then(res => resolve(res))
            .catch(e => {
                reject(e)
                alert(e.message)
            })
    })
}
