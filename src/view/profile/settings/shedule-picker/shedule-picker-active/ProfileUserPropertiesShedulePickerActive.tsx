import React, { Component } from 'react';
import { IUserDiabetesPropertiesDayTimeValue } from '../../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../../model/IStorage';
import ProfileDayTimeRangeValuePicker from '../../../range-value-picker/ProfileDayTimeRangeValuePicker';
import { IUserPropertiesShedule, SheduleKeyType } from '../../../../../model/IUserPropertiesShedule';
import { TouchableOpacity, Text, View, Button } from 'react-native';
import { createChangeInteractive } from '../../../../../store/modules/interactive/interactive';
import { styles } from './Style';
import { createUpdateUserSheduleAction } from '../../../../../store/service/user/UpdateSheduleSaga';
import { InteractiveUserPropertiesShedulePopupType } from '../../../../../model/IInteractive';
import { i18nGet } from '../../../../../localisation/Translate';
import { COLOR } from '../../../../../constant/Color';

interface Props {
    sheduleKey?: SheduleKeyType
    userPropertiesShedule?: IUserPropertiesShedule
    shown?: boolean
    userPropertiesPopupType?: SheduleKeyType

    onSaveShedule?: (shedule: IUserPropertiesShedule) => void
    onClose?: () => void
}

interface State {
    newShedule: IUserPropertiesShedule,
    needToApply?: boolean
}

export default class ProfileUserPropertiesShedulePickerActive extends Component<Props, State> {
    state = {
        newShedule: this.props.userPropertiesShedule || {},
        needToApply: false
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (!props.shown) {
            return {
                newShedule: {},
                needToApply: false
            }
        }

        if (props.shown && Object.values(state.newShedule).length === 0) {
            return {
                newShedule: props.userPropertiesShedule
            }
        }
        return state;
    }

    get shedule() {
        return this.sheduleArrayFromAnObject;
    }

    get sheduleKey() {
        return this.props.sheduleKey;
    }

    render() {
        return (
            <View style={styles.scrollViewContentWrap}>
                <View style={styles.scrollViewContent}>
                    <View style={styles.pickerBlock}>
                        {this.renderInputTitles()}
                        {this.renderProfileDateTimePicker()}
                        {this.renderReangeThatNeedToFill()}
                    </View>
                    <View style={styles.bottomBlock}>
                        {this.renderCloseButton()}
                        {this.renderAddButton()}
                        {this.renderSaveButtonIfNeeded()}
                    </View>
                </View>
            </View>
        )
    }

    onDeleteItem = (range: IUserDiabetesPropertiesDayTimeValue) => {
        const editedShedule = { ...this.state.newShedule };
        for (var i = range.since; i < range.to; i++) {
            delete editedShedule[i];
        }
        this.setState({
            newShedule: editedShedule
        })
    }

    onApplyChange = (range: IUserDiabetesPropertiesDayTimeValue) => {
        const newShedule = { ...this.state.newShedule };
        for (var i = range.since; i < range.to; i++) {
            newShedule[i] = {
                id: i,
                [this.sheduleKey]: range.value
            }
        }
        Object.values(newShedule).forEach(nSI => {
            nSI[this.sheduleKey] === 0 && delete newShedule[nSI.id]
        })
        this.setState({
            newShedule,
            needToApply: false
        })
    }

    onAddPress = () => {
        let setted = false;

        for (let i = 0; i < 24; i++) {
            if (setted) return;
            if (
                !this.state.newShedule[i] || (this.state.newShedule[i] &&
                    !this.state.newShedule[i][this.sheduleKey]
                )) {
                this.setState({
                    newShedule: {
                        ...this.state.newShedule,
                        [i]: {
                            id: i,
                            [this.sheduleKey]: 0
                        }
                    },
                    needToApply: true
                })
                setted = true;
            }
        }
    }

    get rangeThatNeedToWriteMore(): string {
        let rangeThatNeedToWriteMore = "";
        let currentFrom = "";
        for (let i = 0; i <= 24; i++) {
            const sheduleItem = this.state.newShedule[i];
            if (!currentFrom && (!sheduleItem || (sheduleItem && !sheduleItem[this.sheduleKey]))) {
                currentFrom = i18nGet('since') + ' ' + i;
            } else if (currentFrom && sheduleItem && sheduleItem[this.sheduleKey]) {
                rangeThatNeedToWriteMore += rangeThatNeedToWriteMore ?
                    ", " + currentFrom + " " + i18nGet('until') + " " + i :
                    " " + currentFrom + " " + i18nGet('until') + " " + i;
                currentFrom = "";
            } else if (currentFrom && i === 24) {
                rangeThatNeedToWriteMore += rangeThatNeedToWriteMore ?
                    ", " + currentFrom + " " + i18nGet('until') + " " + (i) :
                    " " + currentFrom + " " + i18nGet('until') + " " + (i);
                currentFrom = "";
            }
        }
        return rangeThatNeedToWriteMore
    }

    get sheduleArrayFromAnObject(): IUserDiabetesPropertiesDayTimeValue[] {
        const shedule: IUserDiabetesPropertiesDayTimeValue[] = [];
        Object.values(this.state.newShedule).map((prop, index, array) => {
            if (prop[this.sheduleKey] >= 0) {
                if (index === 0) {
                    shedule.push({
                        since: prop.id,
                        to: prop.id + 1,
                        value: prop[this.sheduleKey] || 0,
                        id: prop.id,
                        needToSave: prop[this.sheduleKey] > 0 ? false : true
                    })

                    return;
                }
                if ((
                    prop[this.sheduleKey] > 0 && prop[this.sheduleKey] === array[index - 1][this.sheduleKey] &&
                    prop.id === array[index - 1].id + 1
                )) {
                    shedule[shedule.length - 1].to = prop.id + 1;
                    return
                }

                shedule.push({
                    since: prop.id,
                    to: prop.id + 1,
                    value: prop[this.sheduleKey] || 0,
                    id: prop.id,
                    needToSave: prop[this.sheduleKey] > 0 ? false : true
                })
                return;
            }
        });
        return shedule;
    }

    onSaveSheduleClick = () => {
        this.props.onSaveShedule(this.state.newShedule);
        this.props.onClose();
    }


    //render
    renderInputTitles() {
        return this.shedule.length > 0 && (
            <View style={styles.pickersTitleView}>
                <Text style={styles.pickersItemTitle}>{i18nGet('shedule_since')}</Text>
                <Text style={styles.pickersItemTitle}>{i18nGet('shedule_until')}</Text>
                <Text style={styles.pickersItemTitle}>{i18nGet('shedule_value')}</Text>
                <Text style={styles.pickersItemTitle}></Text>
            </View>
        )
    }

    renderProfileDateTimePicker() {
        return (
            <View>
                {this.shedule.map(item => {
                    return <ProfileDayTimeRangeValuePicker
                        key={item.id}
                        range={item}
                        onApplyChange={this.onApplyChange}
                        onDelete={this.onDeleteItem}
                    />
                })}
            </View>
        )
    }

    renderAddButton() {
        const { needToApply } = this.state;
        return !!this.rangeThatNeedToWriteMore && !needToApply && (
            <View style={styles.addTouchable}>
                <Button
                    title={i18nGet('add')}
                    onPress={this.onAddPress}
                    color={COLOR.PRIMARY}
                />
            </View>
        )
    }

    renderCloseButton() {
        return (
            <View style={styles.closeTouchable}>
                <Button
                    title={i18nGet('cancel')}
                    onPress={this.props.onClose}
                />
            </View>
        )
    }

    renderReangeThatNeedToFill() {
        return !!this.rangeThatNeedToWriteMore &&
            <Text style={styles.rangeThatNeedToWriteMore}>
                {i18nGet('need_to_fill_time_period') + ': '}
                {this.rangeThatNeedToWriteMore}
            </Text>
    }

    renderSaveButtonIfNeeded() {
        return !!!this.rangeThatNeedToWriteMore && (
            <View style={styles.addTouchable}>
                <Button
                    title={i18nGet('save')}
                    onPress={this.onSaveSheduleClick}
                    color={COLOR.GREEN_DARK}
                />
            </View>
        )
    }
}

export const ProfileUserPropertiesShedulePickerActiveConnect = connect(
    (state: IStorage) => ({
        userPropertiesShedule: state.userPropertiesShedule || {},
        interactive: state.interactive
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        const shown = stateProps.interactive.userPropertiesShedulePopupType &&
            stateProps.interactive.userPropertiesShedulePopupType !== SheduleKeyType.NONE;

        return {
            ...stateProps,
            ...ownProps,
            shown,
            userPropertiesPopupType: stateProps.interactive.userPropertiesShedulePopupType,
            sheduleKey:
                stateProps.interactive.userPropertiesShedulePopupType === SheduleKeyType.INSULIN_SENSITIVITY_FACTOR ?
                    SheduleKeyType.INSULIN_SENSITIVITY_FACTOR :
                    SheduleKeyType.CARBOHYDRATE_RATIO,
            onClose: () => {
                dispatch(createChangeInteractive({
                    userPropertiesShedulePopupType: null
                }))
            },
            onSaveShedule: (shedule: IUserPropertiesShedule) => {
                dispatch(createUpdateUserSheduleAction(shedule));
            }
        }
    }
)(ProfileUserPropertiesShedulePickerActive)
