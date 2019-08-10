import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
import { INoteList } from '../../model/INoteList';

interface NoteListScreenProps {
    noteList: INoteList
}

class NoteListScreen extends React.Component<NoteListScreenProps>{
    render() {
        return (
            <View style={styles.screenView}>
                <Text style={styles.text}>
                    {this.props.noteList.test}
                </Text>
            </View>
        )
    }
}

export const NoteListScreenConnect = connect<NoteListScreenProps>(
    (state: AppState) => ({
        noteList: state.noteList
    })
)(NoteListScreen)

const styles = StyleSheet.create({
    screenView: {
        flex: 1,

        justifyContent: 'space-around',
        backgroundColor: '#D6E5ED',
    },
    text: {
        alignSelf: 'center'
    }
})
