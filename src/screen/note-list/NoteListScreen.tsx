import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
import { INoteList } from '../../model/INoteList';
import { Action, Dispatch } from 'redux';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

interface NoteListScreenStateTProps {
    noteList: INoteList,
}

interface NoteListScreenDispatchProps {
    dispatch: Dispatch<Action>
}

interface NoteListScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface FullProps extends NoteListScreenProps, NoteListScreenDispatchProps, NoteListScreenStateTProps {}

class NoteListScreen extends React.Component<FullProps>{
    componentWillMount() {
        if (this.props.noteList && !this.props.noteList.mappedNotes) {
            this.props.navigation.navigate('NoteCreation')
        }
    }

    render() {
        return (
            <View style={styles.screenView}>
                <Text style={styles.text}>
                    Hola mundo!
                </Text>
            </View>
        )
    }
}

export const NoteListScreenConnect = connect<NoteListScreenStateTProps, NoteListScreenDispatchProps>(
    (state: AppState) => ({
        noteList: state.noteList || {}
    }),
    ( dispatch: Dispatch<Action>) => ({ dispatch })
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
