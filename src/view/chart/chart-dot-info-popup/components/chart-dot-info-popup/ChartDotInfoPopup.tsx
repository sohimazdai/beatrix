import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native";

import { BottomPopup } from '../../../../../component/popup/BottomPopup';
import { ChartDotInfoPopupValue } from '../dot-info-popup-value/ChartDotInfoPopupValue';
import { CloseIcon } from '../../../../../component/icon/CloseIcon';
import { EditNoteIcon } from '../../../../../component/icon/EditNoteIcon';

import { INoteListNote } from '../../../../../model/INoteList';
import { ChartValueType, ChartPeriodType } from '../../../../../model/IChart';
import { IStorage } from '../../../../../model/IStorage';
import { DateHelper } from '../../../../../utils/DateHelper';
import { SHADOW_OPTIONS } from "../../../../../constant/ShadowOptions";
import { COLOR } from "../../../../../constant/Color";
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { createChangeInteractive } from '../../../../../store/modules/interactive/interactive';
import { i18nGet } from '../../../../../localisation/Translate';
import { selectAverageValue } from '../../selectors/select-value-average';
import { appAnalytics } from '../../../../../app/Analytics';
import { NavigatorEntities } from '../../../../../navigator/modules/NavigatorEntities';

interface ChartDotInfoPopupProps {
    note?: INoteListNote
    selectedDotId?: number
    selectedChartPeriod?: string

    openEditPopup?: (noteId) => void
    closePopup?: () => void;
}

interface OwnProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Props extends OwnProps, ChartDotInfoPopupProps { }

export class ChartDotInfoPopup extends React.Component<Props> {
    componentDidMount() {
        const { closePopup } = this.props;
        BackHandler.addEventListener('hardwareBackPress', function close() {
            closePopup();
        });
    }

    componentDidUpdate(pP: ChartDotInfoPopupProps) {
        if (!pP.note && this.props.note) {
            appAnalytics.sendEvent(appAnalytics.events.CHART_DOT_SELECTED);
        }
    }

    componentWillUnmount() {
        const { closePopup } = this.props;
        BackHandler.removeEventListener('hardwareBackPress', function close() {
            closePopup();
        });
    }

    goToNoteEditor = (noteId?: string) => {
        const { navigation } = this.props;

        navigation.navigate(NavigatorEntities.NOTE_EDITOR, { noteId });
    }

    getChartPopupTitle = () => {
        const { selectedChartPeriod = ChartPeriodType.DAY, note } = this.props;
        let displayingDate = '';

        switch (selectedChartPeriod) {
            case ChartPeriodType.DAY:
                displayingDate = note && DateHelper.makeTimewithDateWithMonthAsString(new Date(note.date));
                return displayingDate
            case ChartPeriodType.MONTH:
                if (DateHelper.getDiffDate(new Date(note.date), 0) === DateHelper.today()) {
                    return i18nGet('chart_today');
                }
                if (note.date === DateHelper.yesterday()) {
                    return i18nGet('chart_yesterday');
                }
                displayingDate = DateHelper.makeDateWithMonthAsString(new Date(note.date))
                return displayingDate
            case ChartPeriodType.THREE_MONTH:
                displayingDate = DateHelper.makeDateWithMonthAsNumber(new Date(Number(note.date))) +
                    ' - ' + DateHelper.makeDateWithMonthAsNumber(
                        new Date(DateHelper.getDiffDate(new Date(note.date), 6))
                    )
                return displayingDate
        }
    }
    render() {
        const {
            selectedChartPeriod = ChartPeriodType.DAY,
            note,
            closePopup,
        } = this.props;

        const editable = selectedChartPeriod == ChartPeriodType.DAY;


        return <BottomPopup hidden={!note}>
            <View style={styles.animatedView}>
                <LinearGradient
                    style={styles.popupGradient}
                    colors={['#DFF2FF', '#F6F8FF']}
                >
                    {note && <>
                        <View style={styles.dateTitleView}>
                            <Text style={styles.dateTitle}>
                                {this.getChartPopupTitle()}
                            </Text>
                        </View>
                        <View style={styles.upperValues}>
                            <ChartDotInfoPopupValue
                                type={ChartValueType.GLUCOSE}
                                value={note[ChartValueType.GLUCOSE]}
                            />
                            <ChartDotInfoPopupValue
                                type={ChartValueType.INSULIN}
                                value={note[ChartValueType.INSULIN]}
                            />
                        </View>
                        <View style={styles.bottomValues}>
                            <ChartDotInfoPopupValue
                                type={ChartValueType.BREAD_UNITS}
                                value={note[ChartValueType.BREAD_UNITS]}
                            />
                            <ChartDotInfoPopupValue
                                type={ChartValueType.LONG_INSULIN}
                                value={note[ChartValueType.LONG_INSULIN]}
                            />
                        </View>
                        {!!note.commentary && <ScrollView style={styles.commentValue}>
                            <View>
                                <Text style={styles.commentValueText}>
                                    {note.commentary}
                                </Text>
                            </View>
                        </ScrollView>}
                    </>}
                    <TouchableOpacity
                        style={styles.closeTouchable}
                        onPress={closePopup}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                    {editable && (
                        <View style={styles.editNoteIconTouchableView}>
                            <TouchableOpacity
                                style={styles.editNoteIconTouchable}
                                onPress={() => {
                                    this.goToNoteEditor(note.id);
                                    closePopup();
                                }}
                            >
                                <EditNoteIcon style={styles.editNoteIcon} />
                            </TouchableOpacity>
                        </View>
                    )}
                </LinearGradient>
            </View>
        </BottomPopup>
    }
}




export const ChartDotInfoPopupConnect = connect(
    (state: IStorage, ownProps: OwnProps) => ({
        state,
        selectedDotId: state.interactive.selectedDotId,
        selectedChartPeriod: state.interactive.selectedChartPeriod,
        note: state.noteList[state.interactive.selectedDotId] || null,
        navigation: ownProps.navigation,
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            note: stateProps.selectedDotId && selectAverageValue(
                stateProps.state,
                stateProps.selectedChartPeriod,
                stateProps.selectedDotId
            ) || null,
            closePopup: () => {
                dispatch(createChangeInteractive({
                    selectedDotId: null,
                }));
            },
        }
    }
)(ChartDotInfoPopup)

const styles = StyleSheet.create({
    animatedView: {
        width: '100%',
        display: 'flex',

        borderRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: COLOR.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    popupGradient: {
        width: '100%',
        display: 'flex',

        padding: 15,
        paddingBottom: 35,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
    },
    dateTitleView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTitle: {
        fontSize: 18,
    },
    upperValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottomValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    commentValue: {
        marginTop: 15,
        width: '100%',
        maxHeight: 200,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 15,
        overflow: 'scroll'
    },
    commentValueText: {
        fontSize: 18,
        color: "#333333"
    },
    closeTouchable: {
        position: 'absolute',
        right: 20,
        top: 20,
        borderRadius: 50,
        ...SHADOW_OPTIONS,
    },
    editNoteIconTouchableView: {
        position: 'absolute',
        left: 20,
        top: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        ...SHADOW_OPTIONS,
    },
    editNoteIconTouchable: {

    },
    editNoteIcon: {
        width: 30,
        height: 30
    }
})
