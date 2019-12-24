import React from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';
import { IAppState } from '../../model/IAppState';
import { INoteListByDay, INoteListNote } from '../../model/INoteList';
import { Action, Dispatch } from 'redux';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Note } from '../../view/notes/note/Note';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddNoteIcon } from '../../component/icon/AddNoteIcon';
import { ThemeColor } from '../../constant/ThemeColor';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { shadowOptions } from '../../constant/shadowOptions';
import { ToChartButton } from '../../component/icon/ToChartButton';
import { Header } from '../../component/header/Header';
import { RoundClocksIcon } from '../../component/icon/RoundClocksIcon';
import { VegetablesIcon } from '../../component/icon/value-icons/VegetablesIcon';
import { GlucometerIcon } from '../../component/icon/value-icons/GlucometerIcon';
import { ShortSyringeIcon } from '../../component/icon/value-icons/ShortSyringeIcon';
import { LongSyringeIcon } from '../../component/icon/value-icons/LongSyringeIcon';
import { BottomPopup } from '../../component/popup/BottomPopup';
import { NoteCreationScreenConnect } from '../note-creation/NoteCreationScreen';
import { NoteEditingScreenConnect } from '../note-editing/NoteEditingScreen';
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator';
import { BlockHat } from '../../component/hat/BlockHat';


interface NoteListScreenStateTProps {
    noteListByDay: INoteListByDay,
}

interface NoteListScreenDispatchProps {
    dispatch: Dispatch<Action>
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
        return (
            <View style={styles.screenView}>
                <BlockHat title={'Записи'} />
                {this.renderIconBar()}
                <ScrollView>
                    {this.renderCards()}
                </ScrollView>
                {
                    !this.state.noteCreationShown ?
                        <View style={styles.addNoteButtonView}>
                            <TouchableOpacity onPress={() => this.setState({ noteCreationShown: true })}>
                                <View style={styles.addNoteButton}>
                                    <Text style={styles.addNoteButtonText}>
                                        Записать
                                    </Text>
                                    <AddNoteIcon />
                                </View>
                            </TouchableOpacity>
                        </View> 
                        : 
                        <BottomPopup>
                            <NoteCreationScreenConnect
                                onBackPress={() => this.setState({ noteCreationShown: false })}
                            />
                        </BottomPopup>
                }
                <BottomPopup hidden={!this.state.noteEditingShown}>
                    <NoteEditingScreenConnect
                        noteId={this.state.editingNoteId}
                        onBackPress={() => this.setState({ noteEditingShown: false })}
                    />
                </BottomPopup>
            </View>
        )
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
                        onPress={() => this.setState({
                            noteEditingShown: true,
                            editingNoteId: noteId
                        })}
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
    (state: IAppState) => ({
        noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state.noteList)
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteListScreen)

const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        width: '100%',
        backgroundColor: ThemeColor.BG_COLOR,
    },
    iconBarView: {
        display: 'flex',

        padding: 10,

        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#E3EAFF',
    },
    iconBarIcon: {
        flex: 1,
        height: 30,
    },
    cardWrap: {
        width: '100%',

        marginBottom: 15,
        marginTop: 15,

        alignItems: 'center',
    },
    dateView: {
        marginBottom: 10,

        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: 22,

        color: '#555'
    },
    dayNotes: {
        width: '100%',

        padding: 10,

        elevation: 3,

        borderRadius: 25,

        flexDirection: 'column',
    },
    cardHat: {
        height: 20,
        width: '100%',

        marginBottom: 20,

        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    cardHatText: {
        width: '25%',

        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 19,

        color: '#666666'
    },
    addNoteButtonView: {
        position: 'absolute',
        bottom: 20,
        right: 20,

        elevation: 4,
        ...shadowOptions,
    },
    noNotesStub: {
        flex: 1,
        padding: 40,
        fontSize: 20,

        color: '#333333'

    },
    addNoteButton: {
        display: 'flex',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(250,250,250, 0.9)',
        borderRadius: 30,
    },
    addNoteButtonText: {
        fontSize: 18,
        color: "#333333",
        marginRight: 5
    }
})
