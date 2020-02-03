import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { shadowOptions } from '../../constant/shadowOptions'

interface Props {
    title?: string
    description?: string
    hint?: string
    children?: any
    hintCritical?: boolean
}

export class ProfilePicker extends React.Component<Props> {
    render() {
        return <View style={styles.profilePickerView}>
            <View style={styles.itemCard}>
                <View style={styles.itemCardTop}>
                    {this.props.title && <Text style={styles.itemCardTitle}>
                        {this.props.title}
                    </Text>}
                    {this.props.description && <Text style={styles.itemCardDescription}>
                        {this.props.description}
                    </Text>}
                </View>
                {this.props.children}
            </View>
            {!!this.props.hint && <Text
                style={this.props.hintCritical ? { ...styles.hint, ...styles.hintCritical } : styles.hint}
            >
                {this.props.hint}
            </Text>}
        </View>
    }
}

const styles = StyleSheet.create({
    profilePickerView: {
        display: 'flex',

        marginTop: 10,
        marginBottom: 10,
    },
    itemCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        ...shadowOptions
    },
    itemCardTop: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
        padding: 5,
        fontSize: 16,
        color: "#333333"
    },
    hintCritical: {
        color: "crimson"
    }
})