import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
import { Dispatch, Action } from 'redux';
import { StyleSheet } from 'react-native';
import { INoteList } from '../../model/INoteList';

export interface NoteChartProps {
    noteList: INoteList
}

class NoteChart extends React.PureComponent<NoteChartProps> {
    render() {
        return null
    }
}

export const NoteChartConnect = connect(
    (state: AppState) => ({
        noteList: state.noteList
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteChart)

const styles = StyleSheet.create({

})
