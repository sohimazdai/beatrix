import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Backspace from "../icon/Backspace";

import { COLOR } from "../../constant/Color";
import { StyledButton, StyledButtonType } from "../button/StyledButton";
import { i18nGet } from "../../localisation/Translate";

enum InputType {
    Natural = 'natural',
    Decimal = 'decimal',
}

interface Props {
    value: number | string,
    onClose: (value: number) => void,
    onSubmit: (value: number) => void,
}

export default function NumberPad(props: Props): JSX.Element {
    const { value, onClose, onSubmit } = props;

    const [number, setNumber] = useState(Number(value) || 0);
    const [leadInput, setLeadInput] = useState(InputType.Natural);

    const natural = useMemo(() => {
        return Number(String(number).split('.')[0]) || 0;
    }, [number, leadInput]);
    const decimal = useMemo(() => {
        return Number(String(number).split('.')[1]) || 0;
    }, [number, leadInput]);

    const handleInputButtonClick = useCallback((type: InputType) => {
        setLeadInput(type);
    }, [leadInput])

    const handleNumberClick = useCallback((value: number) => {
        if (leadInput === InputType.Natural) {
            setNumber(Number(`${natural}${value}.${decimal}`));
        } else {
            setNumber(Number(`${natural}.${value}`));
        }
    }, [leadInput, number, natural, decimal]);

    const handleBackspaceCLick = useCallback(() => {
        let newPartValue = leadInput === InputType.Natural ? natural : decimal;
        newPartValue = Number(String(newPartValue).slice(0, -1));
        setNumber(leadInput === InputType.Natural
            ? Number(`${newPartValue}.${decimal}`)
            : Number(`${natural}.${newPartValue}`)
        );
        if ((!String(decimal).length || decimal === 0) && leadInput === InputType.Decimal) {
            setLeadInput(InputType.Natural);
        }
    }, [leadInput, number, natural, decimal]);

    const handleDotClick = useCallback(() => {
        if (leadInput === InputType.Natural) setLeadInput(InputType.Decimal);
        else setLeadInput(InputType.Natural)

    }, [leadInput, number, natural, decimal]);

    const handleSubmit = useCallback(() => {
        onClose(number);
        onSubmit(number);
    }, [leadInput, number, natural, decimal]);

    const renderInputButton = useCallback((type: InputType) => {
        const value = type === InputType.Natural ? natural : decimal;
        const inputStyle = type === leadInput
            ? { ...styles.inputView, ...styles.selectedInputView }
            : styles.inputView;

        return (
            <TouchableOpacity
                style={inputStyle}
                onPress={() => handleInputButtonClick(type)}
            >
                <Text style={styles.inputText}>{value}</Text>
            </TouchableOpacity>
        )
    }, [leadInput, number, natural, decimal]);

    const renderButton = useCallback((value) => {
        return (
            <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberClick(Number(value))}
            >
                <Text style={styles.numberButtonText}>{value}</Text>
            </TouchableOpacity>
        );
    }, [leadInput, number, natural, decimal, handleNumberClick]);

    const renderBackspace = useCallback(() => {
        return (
            <TouchableOpacity
                style={styles.backspaceButton}
                onPress={handleBackspaceCLick}
            >
                <Backspace width={20} crossColor={COLOR.WHITE} badgeColor={COLOR.PRIMARY} />
            </TouchableOpacity>
        )
    }, [number, natural, decimal, leadInput, handleBackspaceCLick]);

    const renderDotButton = useCallback(() => {
        return (
            <TouchableOpacity
                style={styles.dotButton}
                onPress={handleDotClick}
            >
                <Text style={styles.dotButtonText}>
                    {
                        leadInput === InputType.Natural
                            ? '.→'
                            : '←.'
                    }
                </Text>
            </TouchableOpacity>
        )
    }, [leadInput, handleDotClick]);

    return (
        <View style={styles.content}>
            <View style={styles.inputs}>
                {renderInputButton(InputType.Natural)}
                <Text style={styles.inputsDivider}>.</Text>
                {renderInputButton(InputType.Decimal)}
            </View>
            <View style={styles.buttonPad}>
                <View style={styles.regularRow}>
                    {renderButton('1')}
                    {renderButton('2')}
                    {renderButton('3')}
                </View>
                <View style={styles.regularRow}>
                    {renderButton('4')}
                    {renderButton('5')}
                    {renderButton('6')}
                </View>
                <View style={styles.regularRow}>
                    {renderButton('7')}
                    {renderButton('8')}
                    {renderButton('9')}
                </View>
                <View style={styles.regularRow}>
                    {renderDotButton()}
                    {renderButton('0')}
                    {renderBackspace()}
                </View>
                <View style={styles.buttonsRow}>
                    <View style={styles.cancelButton}>
                        <StyledButton
                            style={StyledButtonType.OUTLINE}
                            onPress={() => onClose(number)}
                            label={i18nGet('cancel')}
                            fluid
                        />
                    </View>
                    <View style={styles.submitButton}>
                        <StyledButton
                            style={StyledButtonType.PRIMARY}
                            onPress={handleSubmit}
                            label={i18nGet('apply')}
                            fluid
                        />
                    </View>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
    },
    inputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 16,
    },
    inputView: {
        padding: 16,
        borderWidth: 2,
        borderColor: COLOR.GRAY,
        borderRadius: 10,
        backgroundColor: COLOR.PRIMARY_WHITE,
        marginHorizontal: 8,
    },
    selectedInputView: {
        borderColor: COLOR.PRIMARY,
    },
    inputText: {
        fontSize: 19,
    },
    inputsDivider: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 16,
    },
    buttonPad: {
        display: 'flex',
        marginTop: 16,
        flexDirection: 'column',
    },
    regularRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    numberButton: {
        width: 90,
        height: 40,
        margin: 4,
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberButtonText: {
        color: COLOR.TEXT_WHITE,
        fontSize: 19,
    },
    dotButton: {
        width: 90,
        height: 40,
        margin: 4,
        backgroundColor: COLOR.PRIMARY_WHITE,
        borderWidth: 1,
        borderColor: COLOR.PRIMARY,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotButtonText: {
        color: COLOR.PRIMARY,
        fontSize: 19,
        fontWeight: 'bold',
    },
    backspaceButton: {
        width: 90,
        height: 40,
        margin: 4,
        backgroundColor: COLOR.PRIMARY_WHITE,
        borderWidth: 1,
        borderColor: COLOR.PRIMARY,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsRow: {
        marginTop: 16,
        flexDirection: 'row',
    },
    submitButton: {
        flex: 2,
        margin: 4,
    },
    cancelButton: {
        margin: 4,
        flex: 1,
    },
});