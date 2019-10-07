import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColor } from '../../../constant/ThemeColor';
import { INoteListNote } from '../../../model/INoteList';
import { DownTopPopup } from '../../../component/popup/DownTopPopup';

export interface ChartPopupProps {
    shown?: boolean
    onClose?: () => void
    dateTitle?: string
    note?: INoteListNote
}

export function ChartPopup(props: ChartPopupProps) {
    return <DownTopPopup hidden={!props.shown}>
        <LinearGradient
            style={styles.popupGradient}
            colors={['#FFB4B4', '#D6E5ED']}
        >
            <View style={styles.dateTitleView}>
                <Text style={styles.dateTitle}>
                    {props.dateTitle}
                </Text>
            </View>
            {
                props.note && Object.keys(props.note) && Object.keys(props.note).map(key => {
                    return <Text
                        key={key}
                    >
                        {key + ': ' + props.note[key]}
                    </Text>
                })
            }
            <Button
                title="окейшн"
                onPress={props.onClose}
            />
        </LinearGradient>
    </DownTopPopup>
}

const styles = StyleSheet.create({
    animatedView: {
        width: '100%',
        display: 'flex',

        borderRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupGradient: {
        width: '100%',
        display: 'flex',

        padding: 15,

        borderRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ThemeColor.WHITE,
    },
    dateTitleView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTitle: {
        fontSize: 18,
    }
})