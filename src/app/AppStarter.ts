import * as Font from 'expo-font';
import { StatusBar } from 'react-native';
import { appAnalytics } from './Analytics';
import Variables from './Variables';
import { logger } from './Logger';

export function appStarter() {
    logger('App environment:', Variables.name);

    return new Promise((resolve, reject) => {

        StatusBar.setBarStyle("light-content", true);

        Font.loadAsync({ "Roboto": require('./../../assets/fonts/Roboto/Roboto-Regular.ttf') })
            .then(res => appAnalytics.init())
            .then(res => resolve(res))
            .catch(e => reject(e))
    })
}
