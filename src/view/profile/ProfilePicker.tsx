import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

interface Props {
    title?: string
    description?: string
    hint?: string
    children?: any
    hintCritical?: boolean
    titleTooltip?: React.ReactNode
}

export class ProfilePicker extends React.Component<Props> {
    render() {
        const { titleTooltip } = this.props;

        return (
            <View style={styles.profilePickerView}>
                <View style={styles.itemHeader}>
                    {this.props.title && <Text style={styles.itemCardTitle}>
                        {this.props.title}
                    </Text>}
                    {!!titleTooltip && (titleTooltip)}
                </View>
                <View style={styles.itemCard}>
                    {this.props.description && <Text style={styles.itemCardDescription}>
                        {this.props.description}
                    </Text>}
                </View>
                {this.props.children}
                {!!this.props.hint && (
                    <Text
                        style={
                            this.props.hintCritical
                                ? { ...styles.hint, ...styles.hintCritical }
                                : styles.hint
                        }
                    >
                        {this.props.hint}
                    </Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilePickerView: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    itemCard: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    itemHeader: {
        display: 'flex',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
    },
    itemCardTitle: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 18,
        color: "#333333",
        fontWeight: 'bold'
    },
    itemCardDescription: {
        fontSize: 18,
        color: "#333333"
    },
    hint: {
        padding: 10,
        paddingTop: 5,
        fontSize: 16,
        color: "#333333"
    },
    hintCritical: {
        color: "crimson"
    }
})
