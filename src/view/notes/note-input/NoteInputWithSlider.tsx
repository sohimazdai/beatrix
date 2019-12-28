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
            <View style={styles.inputView}>
                <Text style={styles.inputTitleText}>
                    {props.inputTitle}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => {
                        value.split('.')[0].length < 3 &&
                        (!value.split('.')[1] || (value.split('.')[1] && value.split('.')[1].length < 2)) &&
                        props.onChangeText(value)
                    }}
                    placeholder={'0.0'}
                    value={Number(props.value) > 0 ? props.value : ""}
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
                        value={parseInt(props.value.split('.')[0]) || 0}
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
                        {".0"}
                    </Text>
                    <Slider
                        style={styles.slider}
                        value={parseFloat(0 + '.' + props.value.split('.')[1]) || 0.0}
                        onValueChange={(value) => value ?
                            props.onDecimalSlide((Math.floor(value * 10) / 10)) :
                            props.onDecimalSlide('0.0')
                        }
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
        flex: 1,
        width: '100%',

        margin: 5,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sliderRow: {
        flex: 1,
        width: '100%',
        height: 40,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderRowText: {
        width: 25,
        fontSize: 19,
        paddingTop: 10,

        textAlignVertical: 'center',
        textAlign: 'center',
    },
    slider: {
        flex: 1,
    },
    inputView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputTitleText: {
        margin: 3,
        fontSize: 19,
        lineHeight: 20,
        fontWeight: "bold",
        color: ThemeColor.TEXT_DARK_GRAY
    },
    input: {
        width: 70,
        height: 50,

        padding: 5,
        borderRadius: 10,
        borderWidth: 2,

        textAlign: 'center',
        fontSize: 20,
        color: ThemeColor.TEXT_DARK_GRAY,

        borderColor: '#DDDDDD',
        backgroundColor: ThemeColor.WHITE,
    },
})
