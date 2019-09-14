import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
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
    render() {
        return (
            <View style={styles.screenView}>
                <Header />
                <ScrollView>
                    {this.renderCards()}
                </ScrollView>
                <View style={styles.addNoteButtonView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NoteChart')}>
                        <ToChartButton />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NoteCreation')}>
                        <AddNoteIcon />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderCards() {
        const days = Object.keys(this.props.noteListByDay).sort((a, b) => parseInt(b) - parseInt(a));
        return days.map(day => {
            return (
                <View
                    key={day}
                    style={styles.cardWrap}
                >
                    {this.renderDate(parseInt(day))}
                    {this.renderCard(this.props.noteListByDay[day])}
                </View>
            )
        })
    }

    renderDate(day: number) {
        const today = this.today;
        const yesterday = this.yesterday;
        let displayingDate = '';
        if (day === today) {
            displayingDate = 'Сегодня'
        } else if (day === yesterday) {
            displayingDate = 'Вчера'
        } else {
            displayingDate = `${new Date(day).getDate()} ${this.getMonthString(new Date(day).getMonth())}`;
        }
        return (
            <View style={styles.dateView}>
                <View style={styles.dash} />
                <Text style={styles.dateText}>
                    {displayingDate}
                </Text>
                <View style={styles.dash} />
            </View>
        )
    }

    renderCard(dayNotes: INoteListByDay) {
        const notesIds = Object.keys(dayNotes).sort((a, b) => {
            return parseInt(a) > parseInt(b) ? -1 : 1;
        })
        return (
            <View style={styles.dayNotesWrap}>
                <View style={styles.dayNotes}>
                    {this.renderCardHat()}
                    {notesIds.map(noteId => {
                        const note: INoteListNote = dayNotes[noteId]
                        return <Note
                            key={noteId}
                            note={note}
                            onPress={() => { }}
                            onLongPress={() => this.props.navigation.navigate('NoteEditor', {
                                noteId: noteId
                            })}
                        />
                    })}
                </View>
            </View>
        )
    }

    renderCardHat() {
        return (
            <View style={styles.cardHat}>
                <Text style={styles.cardHatText}>
                    Время
                </Text>
                <Text style={styles.cardHatText}>
                    Глюкоза
                </Text>
                <Text style={styles.cardHatText}>
                    ХЕ
                </Text>
                <Text style={styles.cardHatText}>
                    Инсулин
                </Text>
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
    (state: AppState) => ({
        noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state.noteList)
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteListScreen)

const styles = StyleSheet.create({
    fakeInput: {
        height: 300,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#D6E5ED',
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
        width: '30%',

        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 21,

        color: '#666666'
    },
    dash: {
        width: '25%',
        height: 1,

        backgroundColor: '#C4C4C4',
    },
    dayNotesWrap: {
        width: '100%',

        padding: 5,
        paddingBottom: 10,

        elevation: 2,

        ...shadowOptions,

        borderRadius: 25,
        backgroundColor: ThemeColor.LIGHT_PINK,
    },
    dayNotes: {
        width: '100%',

        padding: 10,

        elevation: 3,

        ...shadowOptions,

        borderRadius: 25,

        flexDirection: 'column',
        backgroundColor: ThemeColor.LIGHT_GRAY,
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
})
