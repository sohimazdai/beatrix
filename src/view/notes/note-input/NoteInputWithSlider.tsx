import React from 'react';
import { Platform, StyleSheet, View, Slider, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ThemeColor } from '../../../constant/ThemeColor';

interface Props {
    onChangeText: (text: string) => void;
    onNaturalSlide: (value) => void;
    onDecimalSlide: (value) => void;

    inputTitle: string;
    value: string;
    maximumNum: string;
}

export function NoteInputWithSlider(props: Props) {
    return (
        <View style={styles.view}>
            <View style={styles.sliderView}>
                <View style={styles.sliderRow}>
                    <Text style={styles.sliderRowText}>
                        {"0"}
                    </Text>
                    <Slider
                        style={styles.slider}
                        onValueChange={(value) => props.onNaturalSlide(value)}
                        maximumValue={parseInt(props.maximumNum)}
                        step={1}
                    />
                    <Text style={styles.sliderRowText}>
                        {props.maximumNum}
                    </Text>
                </View>
                <View style={styles.sliderRow}>
                    <Text style={styles.sliderRowText}>
                        {"0.0"}
                    </Text>
                    <Slider
                        style={styles.slider}
                        value={parseFloat(0 + '.' + props.value.split('.')[1])}
                        onValueChange={(value) => props.onDecimalSlide(Math.floor(value * 10) / 10)}
                        maximumValue={0.9}
                        step={0.1}
                    />
                    <Text style={styles.sliderRowText}>
                        {"0.9"}
                    </Text>
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputTitleText}>
                    {props.inputTitle}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => props.onChangeText(value)}
                    value={props.value}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        height: 70,
        flexDirection: 'row-reverse',
    },
    sliderView: {
        flex: 1,
        height: 70,

        padding: 5,
        borderWidth: 2,
        borderRadius: 10,

        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: ThemeColor.TAN,
        backgroundColor: ThemeColor.WHITE,
    },
    sliderRow: {
        flex: 1,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderRowText: {
        width: 20,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    slider: {
        flex: 1,
    },
    inputView: {
        height: 70,
        width: 85,

        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    inputTitleText: {
        fontSize: 16,
        lineHeight: 20,
        color: ThemeColor.DIMGRAY
    },
    input: {
        width: 50,
        height: 41,

        padding: 5,
        borderRadius: 5,
        borderWidth: 2,

        borderColor: ThemeColor.TAN,
        backgroundColor: ThemeColor.WHITE,
    },
})
