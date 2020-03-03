import React, { Component } from 'react';
import { IUserDiabetesPropertiesDayTimeValue } from '../../model/IUserDiabetesProperties';
import { BottomPopup } from '../../component/popup/BottomPopup';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import ProfileDayTimeRangeValuePicker from './ProfileDayTimeRangeValuePicker';
import { InteractiveUserPropertiesShedulePopupType } from '../../model/IInteractive';
import * as lodash from 'lodash';
import { IUserPropertiesShedule } from '../../model/IUserPropertiesShedule';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { CloseIcon } from '../../component/icon/CloseIcon';
import { createChangeInteractive } from '../../store/modules/interactive/interactive';
import { shadowOptions } from '../../constant/shadowOptions';
import { createOneLevelMergeUserPropertiesShedule } from '../../store/modules/user-properties-shedule/UserPropertiesShedule';
import { ThemeColor } from '../../constant/ThemeColor';

interface Props {
    userPropertiesShedule?: IUserPropertiesShedule
    shown?: boolean
    userPropertiesPopupType?: InteractiveUserPropertiesShedulePopupType

    onSaveShedule?: (shedule: IUserPropertiesShedule) => void
    onClose?: () => void
}

interface State {
    newShedule: IUserPropertiesShedule,
    needToApply?: boolean
}

export default class ProfileUserPropertiesShedulePopup extends Component<Props, State> {
    state = {
        newShedule: this.props.userPropertiesShedule || {},
        needToApply: false
    }

    render() {
        const { userPropertiesShedule, userPropertiesPopupType } = this.props;
        const { newShedule, needToApply } = this.state;

        const shedule: IUserDiabetesPropertiesDayTimeValue[] = this.sheduleArrayFromAnObject;
        return (
            <BottomPopup hidden={!this.props.shown}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollViewContent}>
                        <Text style={styles.popupTitle}>
                            {userPropertiesPopupType == InteractiveUserPropertiesShedulePopupType.INSULIN_SENSITIVITY ?
                                'Фактор чувствительности к инсулину' :
                                "Углеводный коэффициент"
                            }
                        </Text>
                        {shedule.length > 0 && (
                            <View style={styles.pickersTitleView}>
                                <Text style={styles.pickersItemTitle}>{'С(часов)'}</Text>
                                <Text style={styles.pickersItemTitle}>{'До(часов)'}</Text>
                                <Text style={styles.pickersItemTitle}>Значение</Text>
                                <Text style={styles.pickersItemTitle}></Text>
                            </View>
                        )}
                        <View>
                            {shedule.map(item => {
                                return <ProfileDayTimeRangeValuePicker
                                    key={item.id}
                                    range={item}
                                    onApplyChange={this.onApplyChange}
                                    onDelete={this.onDeleteItem}
                                />
                            })}
                        </View>
                        {!!this.rangeThatNeedToWriteMore && !needToApply && <TouchableOpacity
                            style={styles.addTouchable}
                            onPress={this.onAddPress}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {'Добавить'}
                            </Text>
                        </TouchableOpacity>}
                        {!!this.rangeThatNeedToWriteMore &&
                            <Text style={styles.rangeThatNeedToWriteMore}>
                                Необходимо заполнить временные промежутки:
                                {this.rangeThatNeedToWriteMore}
                            </Text>
                        }
                        {!!!this.rangeThatNeedToWriteMore &&
                            <TouchableOpacity
                                style={styles.addTouchable}
                                onPress={() => this.props.onSaveShedule(this.state.newShedule)}
                            >
                                <Text style={{ fontSize: 16 }}>
                                    {'Сохранить'}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={this.props.onClose}
                >
                    <CloseIcon />
                </TouchableOpacity>
            </BottomPopup>
        )
    }

    onDeleteItem = (range: IUserDiabetesPropertiesDayTimeValue) => {
        const editedShedule = this.state.newShedule;
        for (var i = range.since; i < range.to; i++) {
            delete editedShedule[i];
        }
        this.setState({
            newShedule: editedShedule
        })
    }

    onApplyChange = (range: IUserDiabetesPropertiesDayTimeValue) => {
        const newShedule = this.state.newShedule;
        for (var i = range.since; i < range.to; i++) {
            newShedule[i] = {
                id: i,
                insulinSensitivityFactor: range.value
            }
        }
        Object.values(newShedule).forEach(nSI => {
            nSI.insulinSensitivityFactor === 0 && delete newShedule[nSI.id]
        })
        this.setState({
            newShedule,
            needToApply: false
        })
        // let editedShedule = this.state.newShedule.map(item => {
        //     if (item.id === range.id) {
        //         return item = range
        //     }
        //     return item
        // }).sort((a, b) => a.since - b.since);
        // editedShedule = editedShedule.map((sheduleItem, index, array) => {
        //     if (index === 0) {
        //         return sheduleItem;
        //     }

        //     if ()
        // })
        // this.setState({
        //     newShedule: editedShedule,
        //     needToApply: false
        // })
    }

    onAddPress = () => {
        const shedule = this.sheduleArrayFromAnObject;
        let setted = false;

        for (let i = 0; i < 24; i++) {
            if (setted) return;
            if (
                !this.state.newShedule[i] || (this.state.newShedule[i] &&
                    !this.state.newShedule[i].insulinSensitivityFactor
                )) {
                this.setState({
                    newShedule: {
                        ...this.state.newShedule,
                        [i]: {
                            id: i,
                            insulinSensitivityFactor: 0
                        }
                    },
                    needToApply: true
                })
                setted = true;
            }
        }

        // if (shedule.length < 1) {
        //     this.setState({
        //         newShedule: {
        //             0: {
        //                 id: 0,
        //                 insulinSensitivityFactor: 0
        //             }
        //         },
        //         needToApply: true
        //     })
        //     return;
        // }

        // if (shedule[shedule.length - 1].to <= 23) {
        //     this.setState({
        //         newShedule: {
        //             ...this.state.newShedule,
        //             [shedule[shedule.length - 1].to]: {
        //                 id: shedule[shedule.length - 1].to,
        //                 insulinSensitivityFactor: 0
        //             }
        //         },
        //         needToApply: true
        //     })
        // }
    }

    get rangeThatNeedToWriteMore(): string {
        let rangeThatNeedToWriteMore = "";
        let currentFrom = "";
        for (let i = 0; i < 24; i++) {
            const sheduleItem = this.state.newShedule[i];
            if (!currentFrom && (!sheduleItem || (sheduleItem && !sheduleItem.insulinSensitivityFactor))) {
                currentFrom = "с " + i;
            } else if (currentFrom && sheduleItem && sheduleItem.insulinSensitivityFactor) {
                rangeThatNeedToWriteMore += rangeThatNeedToWriteMore ?
                    ", " + currentFrom + " до " + i :
                    " " + currentFrom + " до " + i;
                currentFrom = "";
            } else if (currentFrom && i === 23) {
                rangeThatNeedToWriteMore += rangeThatNeedToWriteMore ?
                    ", " + currentFrom + " до " + (i + 1) :
                    " " + currentFrom + " до " + (i + 1);
                currentFrom = "";
            }
        }
        return rangeThatNeedToWriteMore
    }

    get sheduleArrayFromAnObject(): IUserDiabetesPropertiesDayTimeValue[] {
        const { userPropertiesPopupType } = this.props;
        const shedule: IUserDiabetesPropertiesDayTimeValue[] = [];

        if (userPropertiesPopupType === InteractiveUserPropertiesShedulePopupType.INSULIN_SENSITIVITY) {
            lodash.values(this.state.newShedule).map((prop, index, array) => {
                if (index === 0) {
                    shedule.push({
                        since: prop.id,
                        to: prop.id + 1,
                        value: prop.insulinSensitivityFactor,
                        id: prop.id,
                        needToSave: prop.insulinSensitivityFactor > 0 ? false : true
                    })

                    return;
                }
                if ((
                    prop.insulinSensitivityFactor === array[index - 1].insulinSensitivityFactor &&
                    prop.id === array[index - 1].id + 1
                )) {
                    shedule[shedule.length - 1].to = prop.id + 1;

                    return
                }


                shedule.push({
                    since: prop.id,
                    to: prop.id + 1,
                    value: prop.insulinSensitivityFactor,
                    id: prop.id,
                    needToSave: prop.insulinSensitivityFactor > 0 ? false : true
                })
                console.log('prev !== this', shedule);
                return;
            });
        } else if (userPropertiesPopupType === InteractiveUserPropertiesShedulePopupType.CARBOHYDRATE_RATIO) {
            lodash.values(this.state.newShedule).map((prop, index, array) => {
                if (index === 0) {
                    shedule.push({
                        since: prop.id,
                        to: prop.id + 1,
                        value: prop.carbohydrateRatio,
                        id: prop.id,
                        needToSave: prop.carbohydrateRatio > 0 ? false : true
                    })
                }
                if (prop.carbohydrateRatio === array[index - 1].carbohydrateRatio) {
                    shedule[shedule.length].to = prop.id + 1;
                }
                shedule.push({
                    since: prop.id,
                    to: prop.id + 1,
                    value: prop.carbohydrateRatio,
                    id: prop.id,
                    needToSave: prop.carbohydrateRatio > 0 ? false : true
                })
            });
        }
        return shedule.sort((a, b) => a.since - b.since)
    }

}

export const ProfileUserPropertiesShedulePopupConnect = connect(
    (state: IStorage) => ({
        userPropertiesShedule: state.userPropertiesShedule,
        interactive: state.interactive
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        const shown = stateProps.interactive.userPropertiesShedulePopupType &&
            stateProps.interactive.userPropertiesShedulePopupType !== InteractiveUserPropertiesShedulePopupType.NONE;

        return {
            ...stateProps,
            shown,
            userPropertiesPopupType: stateProps.interactive.userPropertiesShedulePopupType,

            onClose: () => {
                dispatch(createChangeInteractive({
                    userPropertiesShedulePopupType: null
                }))
            },
            onSaveShedule: (shedule: IUserPropertiesShedule) => {
                dispatch(createOneLevelMergeUserPropertiesShedule(shedule));
            }
        }
    }
)(ProfileUserPropertiesShedulePopup)


const styles = StyleSheet.create({
    scrollView: {
        position: 'relative',

        width: "100%",
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: '#FDFFDE',

        borderRadius: 25,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    scrollViewContent: {
        width: '100%',

        display: 'flex',

        alignItems: 'center',
        justifyContent: 'center',
    },
    popupTitle: {
        width: '70%',
        fontSize: 18,
        marginBottom: 20,

        textAlign: 'center',

        color: ThemeColor.TEXT_DARK_GRAY
    },
    closeButton: {
        position: 'absolute',

        top: 15,
        right: 15
    },
    pickersItemTitle: {
        flex: 1,
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 16,
    },
    pickersTitleView: {
        display: 'flex',

        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        padding: 20,
        paddingBottom: 10,
        paddingTop: 10
    },

    addTouchable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 120,

        margin: 10,
        padding: 10,

        backgroundColor: 'white',
        borderRadius: 50,
        ...shadowOptions
    },
    rangeThatNeedToWriteMore: {
        padding: 10,
        fontSize: 16,

        color: "#871800",
    }
})