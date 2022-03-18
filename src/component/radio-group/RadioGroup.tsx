import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLOR } from "../../constant/Color";

type RadioItem = {
    title: string;
    value: string;
};

interface Props {
    items: RadioItem[];
    selectedValue: string;
    onSelect: (itemValue: string) => void;
};

export default class RadioGroup extends React.Component<Props> {
    handleRadioButtonSelect = (value: string) => this.props.onSelect(value);

    render() {
        const { items, selectedValue } = this.props;

        return (
            <View style={styles.group}>
                {items.map((ri) => (
                    <TouchableOpacity
                        key={ri.value}
                        onPress={() => this.handleRadioButtonSelect(ri.value)}
                        disabled={ri.value === selectedValue}
                        style={styles.row}
                    >
                        <View
                            style={{
                                ...styles.radio,
                                ...(ri.value === selectedValue ? styles.radioActive : {})
                            }} />
                        <Text style={styles.title}>{ri.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    group: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    radio: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLOR.GRAY,
        backgroundColor: COLOR.WHITE,
    },
    radioActive: {
        borderColor: COLOR.GREEN_DARK,
        backgroundColor: COLOR.GREEN,
    },
    title: {
        fontSize: 19,
        marginLeft: 16,
    },
})