import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { INoteListByDay, INoteListNote } from '../../model/INoteList';
import { Action, Dispatch } from 'redux';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Note } from '../../view/notes/note/Note';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { RoundClocksIcon } from '../../component/icon/RoundClocksIcon';
import { VegetablesIcon } from '../../component/icon/value-icons/VegetablesIcon';
import { GlucometerIcon } from '../../component/icon/value-icons/GlucometerIcon';
import { ShortSyringeIcon } from '../../component/icon/value-icons/ShortSyringeIcon';
import { LongSyringeIcon } from '../../component/icon/value-icons/LongSyringeIcon';
import { BlockHat } from '../../component/hat/BlockHat';
import { createChangeInteractive } from '../../store/modules/interactive/interactive';
import { NoteCreationPopupButtonConnect } from '../../view/notes/note-creation-popup/button/NoteCreationPopupButton';
import { styles } from './Style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileIcon } from '../../component/icon/ProfileIcon';

interface NoteListScreenStateTProps {
    noteListByDay: INoteListByDay,
}

interface NoteListScreenDispatchProps {
    selectNoteToEdit: (noteId: string) => void
}

interface NoteListScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface FullProps extends NoteListScreenProps, NoteListScreenDispatchProps, NoteListScreenStateTProps { }

class NoteListScreen extends React.PureComponent<FullProps>{
    state = {
        noteCreationShown: false,
        noteEditingShown: false,
        editingNoteId: null
    }
    render() {
        const { noteCreationShown, noteEditingShown } = this.state;
        return (
            <View style={styles.screenView}>
                <BlockHat 
                    title={'Записи'} 
                    rightSideSlot={this.renderProfileIcon()}
                />
                {this.renderIconBar()}
                <ScrollView>
                    {this.renderCards()}
                </ScrollView>
                <View style={styles.addNoteButtonView}>
                    <NoteCreationPopupButtonConnect />
                </View>
            </View>
        )
    }

    renderProfileIcon() {
        return <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Profile")}
        >
            <ProfileIcon fill={'white'}/>
        </TouchableOpacity>
    }

    renderIconBar() {
        return (
            <View style={styles.iconBarView}>
                <RoundClocksIcon style={styles.iconBarIcon} />
                <GlucometerIcon style={styles.iconBarIcon} />
                <VegetablesIcon style={styles.iconBarIcon} />
                <ShortSyringeIcon style={styles.iconBarIcon} />
                <LongSyringeIcon style={styles.iconBarIcon} />
            </View>
        )
    }

    renderCards() {
        const days = Object.keys(this.props.noteListByDay).sort((a, b) => parseInt(b) - parseInt(a));
        return days.length !== 0 ? days.map(day => {
            return (
                <View
                    key={day}
                    style={styles.cardWrap}
                >
                    {this.renderDate(parseInt(day))}
                    {this.renderCard(this.props.noteListByDay[day])}
                </View>
            )
        }) : <Text style={styles.noNotesStub}>
                Записей не найдено!
        </Text>
    }

    renderDate(day: number) {
        const today = this.today;
        const yesterday = this.yesterday;
        let displayingDate = '';
        if (day === today) {
            displayingDate = 'Сегодня, ' + `${new Date(day).getDate()} ${this.getMonthString(new Date(day).getMonth())}`
        } else if (day === yesterday) {
            displayingDate = 'Вчера, ' + `${new Date(day).getDate()} ${this.getMonthString(new Date(day).getMonth())}`
        } else {
            displayingDate = `${new Date(day).getDate()} ${this.getMonthString(new Date(day).getMonth())}`;
        }
        return (
            <View style={styles.dateView}>
                <Text style={styles.dateText}>
                    {displayingDate}
                </Text>
            </View>
        )
    }

    renderCard(dayNotes: INoteListByDay) {
        const notesIds = Object.keys(dayNotes).sort((a, b) => {
            return parseInt(a) > parseInt(b) ? -1 : 1;
        })
        return (
            <View style={styles.dayNotes}>
                {notesIds.map(noteId => {
                    const note: INoteListNote = dayNotes[noteId]
                    return <Note
                        key={noteId}
                        note={note}
                        onPress={() => this.props.selectNoteToEdit(noteId)}
                    />
                })}
            </View>
        )
    }

    getMonthString(m: number) {
        switch (m) {
            case 0:
                return 'января';
            case 1:
                return 'февраля';
            case 2:
                return 'марта';
            case 3:
                return 'апреля';
            case 4:
                return 'мая';
            case 5:
                return 'июня';
            case 6:
                return 'июля';
            case 7:
                return 'августа';
            case 8:
                return 'сентября';
            case 9:
                return 'октября';
            case 10:
                return 'ноября';
            case 11:
                return 'декабря';
            default:
                console.warn('12 month is ... ? I think it is error')
        }
    }

    get today() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    }

    get yesterday() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).getTime();
    }
}

export const NoteListScreenConnect = connect<NoteListScreenStateTProps, NoteListScreenDispatchProps, NoteListScreenProps>(
    (state: IStorage) => ({
        noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state.noteList)
    }),
    (dispatch: Dispatch<Action>) => ({ 
        selectNoteToEdit: (noteId: string) => dispatch(createChangeInteractive({
            editingNoteId: noteId,
            creatingNoteMode: true
        }))
     })
)(NoteListScreen)

