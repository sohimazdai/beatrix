import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { shadowOptions } from '../../constant/ShadowOptions'

interface Props {
    header?: string
    title?: string
    description?: string
    activeElement?: JSX.Element
    hint?: string
}

export class ProfileItem extends React.Component<Props> {
    render() {
        return <View style={styles.profileItemView}>
            {this.props.header && <Text style={styles.itemHeader}>
                {this.props.header}
            </Text>}
            <View style={styles.itemCard}>
                <View style={styles.itemCardLeft}>
                    {this.props.title && <Text style={styles.itemCardTitle}>
                        {this.props.title}
                    </Text>}
                    {this.props.description && <Text style={styles.itemCardDescription}>
                        {this.props.description}
                    </Text>}
                </View>
                {
                    this.props.activeElement && (
                        <View style={styles.itemCardRight}>
                            {this.props.activeElement}
                        </View>
                    )
                }
            </View>
            {this.props.hint && <Text style={styles.hint}>
                {this.props.hint}
            </Text>}
        </View>
    }
}

const styles = StyleSheet.create({
    profileItemView: {
        display: 'flex',
        marginTop: 10,
        marginBottom: 10,
    },
    itemHeader: {
        margin: 10,
        paddingRight: 5,
        marginBottom: 5,
        fontSize: 19,
        fontWeight: 'bold',
        color: "#000000"
    },
    itemCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        ...shadowOptions
    },
    itemCardLeft: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    itemCardRight: {
        display: 'flex',
        width: "20%",
        minWidth: 60,
        marginLeft: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 16,
        color: "#333333"
    }
})
