import { useEffect } from 'react';
import { connect } from 'react-redux';

import { IStorage } from '../../model/IStorage';
import { createGetNotesAction } from '../../store/service/note/GetNotesSaga';

const mapState = (state: IStorage) => ({
    currentOffset: state.user.noteListCurrentOffset,
    noteListSize: state.user.noteListSize,
    serverAvailable: state.app.serverAvailable,
    networkConnected: state.app.networkConnected,
});

const mapDispatch = (dispatch) => ({
    getNotes: () => dispatch(createGetNotesAction()),
})

interface Props {
    currentOffset: number,
    noteListSize: number,
    serverAvailable: boolean,
    networkConnected: boolean,
    getNotes: () => void,
}

function NoteListFetcher(props: Props) {
    const {
        noteListSize, currentOffset, serverAvailable, networkConnected, getNotes,
    } = props;

    useEffect(() => {
        if ((currentOffset < noteListSize) && networkConnected && serverAvailable) {
            getNotes();
        }
    }, [currentOffset, noteListSize, serverAvailable, networkConnected]);

    return null;
}

export default connect(mapState, mapDispatch)(NoteListFetcher);