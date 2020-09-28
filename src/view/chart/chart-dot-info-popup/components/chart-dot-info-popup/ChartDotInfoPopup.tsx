import React from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native";

import { SuperPopup, PopupDirection } from '../../../../../component/popup/SuperPopup';
import { ChartDotInfoPopupValue } from '../dot-info-popup-value/ChartDotInfoPopupValue';
import { EditNoteIcon } from '../../../../../component/icon/EditNoteIcon';

import { INoteListNote } from '../../../../../model/INoteList';
import { ChartValueType, ChartPeriodType } from '../../../../../model/IChart';
import { IStorage } from '../../../../../model/IStorage';
import { DateHelper } from '../../../../../utils/DateHelper';
import { COLOR } from "../../../../../constant/Color";
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { createChangeInteractive } from '../../../../../store/modules/interactive/interactive';
import { i18nGet } from '../../../../../localisation/Translate';
import { selectAverageValue } from '../../selectors/select-value-average';
import { appAnalytics } from '../../../../../app/Analytics';
import { NavigatorEntities } from '../../../../../navigator/modules/NavigatorEntities';
import { PopupHeader } from '../../../../../component/popup/PopupHeader';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../../component/button/StyledButton';
import { ArrowDirection, ArrowTaillessIcon } from '../../../../../component/icon/ArrowTaillessIcon';
import { FoodListComponent } from '../../../../food/components/FoodList';

interface ChartDotInfoPopupProps {
    note?: INoteListNote
    selectedDotId?: number
    selectedChartPeriod?: string

    openEditPopup?: (noteId) => void
    closePopup?: () => void;
    changeNoteFoodInteractive?: (foodId: string) => void
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

        navigation.navigate(NavigatorEntities.NOTE_EDITOR, {
            noteId,
            backPage: (navigation.state as any).routeName
        });
    }

    goToFoodCard = (foodId?: string) => {
        const { navigation } = this.props;

        navigation.navigate(NavigatorEntities.FOOD_CARD, {
            foodId,
            backPage: (navigation.state as any).routeName
        });
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

        return <SuperPopup
            hidden={!note}
            direction={PopupDirection.BOTTOM_TOP}
        >
            <LinearGradient
                style={styles.popupGradient}
                colors={['#DFF2FF', '#F6F8FF']}
            >
                {note && <ScrollView style={styles.wrap}>
                    <PopupHeader
                        title={this.getChartPopupTitle()}
                        leftSlot={(
                            editable && <StyledButton
                                icon={<EditNoteIcon width={30} height={30} fill={COLOR.PRIMARY} />}
                                iconPosition={IconPositionType.LEFT}
                                onPress={() => {
                                    this.goToNoteEditor(note.id);
                                    closePopup();
                                }}
                                style={StyledButtonType.EMPTY}
                            />
                        )}
                        rightSlot={(
                            <StyledButton
                                icon={<ArrowTaillessIcon direction={ArrowDirection.DOWN} width={20} height={20} fill={COLOR.PRIMARY} />}
                                iconPosition={IconPositionType.RIGHT}
                                onPress={closePopup}
                                style={StyledButtonType.EMPTY}
                            />
                        )}
                    />
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
                    {Object.values(note.foodList).length > 0 && <View style={styles.valueBlock}>
                        <Text style={styles.blockTitle}>
                            {i18nGet('racion')}
                        </Text>
                        <FoodListComponent
                            foodList={note.foodList}
                            goToFoodCard={this.goToFoodCard}
                        />
                    </View>}
                    {!!note.commentary && <View style={styles.valueBlock}>
                        <Text style={styles.blockTitle}>
                            {i18nGet('comment')}
                        </Text>
                        <Text style={styles.commentValueText}>
                            {note.commentary}
                        </Text>
                    </View>}
                </ScrollView>}
            </LinearGradient>
        </SuperPopup>
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
            changeNoteFoodInteractive: (foodId: string) => dispatch(createChangeInteractive({
                cardFoodId: foodId
            }))
        };
    }
)(ChartDotInfoPopup)

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        maxHeight: Dimensions.get('screen').height / 2,
        padding: 16,
    },
    popupGradient: {
        width: '100%',
        display: 'flex',

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
    blockTitle: {
        fontSize: 17,
        color: COLOR.PRIMARY,
    },
    valueBlock: {
        width: '100%',
        marginVertical: 16,
        padding: 8,
        backgroundColor: COLOR.HALF_TRANSPARENT,
        borderRadius: 10,
    },
    commentValueText: {
        marginTop: 4,
        fontSize: 16,
        color: "#333333"
    },
})
