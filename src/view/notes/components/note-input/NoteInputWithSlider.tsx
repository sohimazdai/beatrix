import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import { COLOR } from '../../../../constant/Color';
import { BaseDecimalInput } from '../../../../component/input/BaseDecimalInput';

interface Props {
    onChangeText: (text: string) => void;
    onNaturalSlide: (value) => void;
    onDecimalSlide: (value) => void;

    inputTitle: string;
    value: string;
    maximumNum: string;
    defaultValue?: number;
}



export function NoteInputWithSlider(props: Props) {
    let natural = Number(String(props.defaultValue).split('.')[0] || 0);
    let decimal = Number('.' + (String(props.defaultValue).split('.')[1] || 0));

    return (
        <View style={styles.view}>
            <View style={styles.inputView}>
                <Text style={styles.inputTitleText}>
                    {props.inputTitle}
                </Text>
                <BaseDecimalInput
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    placeholder={'0.0'}
                    value={props.value}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                />
            </View>
            <View style={styles.sliderView}>
                <View style={styles.sliderRow}>
                    <Text style={styles.sliderRowText}>
                        {"0"}
                    </Text>
                    <Slider
                        style={styles.slider}
                        value={natural}
                        onValueChange={(value) => {
                            props.onNaturalSlide(value)
                        }}
                        maximumValue={parseInt(props.maximumNum)}
                        step={1}
                    />
                    <Text style={styles.sliderRowText}>
                        {props.maximumNum}
                    </Text>
                </View>
                <View style={styles.sliderRow}>
                    <Text style={styles.sliderRowText}>
                        {".0"}
                    </Text>
                    <Slider
                        key={props.inputTitle}
                        style={styles.slider}
                        value={decimal}
                        onValueChange={(value) => {
                            value ?
                                props.onDecimalSlide((Math.round(value * 10) / 10)) :
                                props.onDecimalSlide(.0)
                        }}
                        maximumValue={0.9}
                        step={0.1}
                    />
                    <Text style={styles.sliderRowText}>
                        {".9"}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    sliderView: {
        marginTop: 20,
        display: 'flex',
        height: 140,
        width: '100%',
        margin: 5,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    sliderRow: {
        flex: 1,
        width: '100%',
        height: 60,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sliderRowText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        fontSize: 19,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    slider: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputTitleText: {
        margin: 3,
        fontSize: 19,
        lineHeight: 20,
        fontWeight: "bold",
        color: COLOR.TEXT_DARK_GRAY
    },
    input: {
        width: 70,
        height: 50,

        padding: 5,
        borderRadius: 10,
        borderWidth: 2,

        textAlign: 'center',
        fontSize: 20,
        color: COLOR.TEXT_DARK_GRAY,

        borderColor: '#DDDDDD',
        backgroundColor: COLOR.WHITE,
    },
})
