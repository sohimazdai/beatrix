import React, { Component } from 'react';
import { IUserDiabetesPropertiesDayTimeValue } from '../../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../../model/IStorage';
import ProfileDayTimeRangeValuePicker from '../../../range-value-picker/ProfileDayTimeRangeValuePicker';
import { IUserPropertiesShedule, SheduleKeyType } from '../../../../../model/IUserPropertiesShedule';
import { TouchableOpacity, Text, View } from 'react-native';
import { createChangeInteractive } from '../../../../../store/modules/interactive/interactive';
import { styles } from './Style';
import { createUpdateUserSheduleAction } from '../../../../../store/service/user/UpdateSheduleSaga';
import i18n from 'i18n-js';
import { InteractiveUserPropertiesShedulePopupType } from '../../../../../model/IInteractive';

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
                currentFrom = i18n.t('since') + ' ' + i;
            } else if (currentFrom && sheduleItem && sheduleItem[this.sheduleKey]) {
                rangeThatNeedToWriteMore += rangeThatNeedToWriteMore ?
                    ", " + currentFrom + " " + i18n.t('until') + " " + i :
                    " " + currentFrom + " " + i18n.t('until') + " " + i;
                currentFrom = "";
            } else if (currentFrom && i === 24) {
                rangeThatNeedToWriteMore += rangeThatNeedToWriteMore ?
                    ", " + currentFrom + " " + i18n.t('until') + " " + (i) :
                    " " + currentFrom + " " + i18n.t('until') + " " + (i);
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
                <Text style={styles.pickersItemTitle}>{i18n.t('shedule_since')}</Text>
                <Text style={styles.pickersItemTitle}>{i18n.t('shedule_until')}</Text>
                <Text style={styles.pickersItemTitle}>{i18n.t('shedule_value')}</Text>
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
        return !!this.rangeThatNeedToWriteMore && !needToApply && <TouchableOpacity
            style={styles.addTouchable}
            onPress={this.onAddPress}
        >
            <Text style={{ fontSize: 16 }}>
                {i18n.t('add')}
            </Text>
        </TouchableOpacity>
    }

    renderCloseButton() {
        return (
            <TouchableOpacity
                style={styles.closeTouchable}
                onPress={this.props.onClose}
            >
                <Text style={{ fontSize: 16 }}>
                    {i18n.t('cancel')}
                </Text>
            </TouchableOpacity>
        )
    }

    renderReangeThatNeedToFill() {
        return !!this.rangeThatNeedToWriteMore &&
            <Text style={styles.rangeThatNeedToWriteMore}>
                {i18n.t('need_to_fill_time_period') + ': '}
                {this.rangeThatNeedToWriteMore}
            </Text>
    }

    renderSaveButtonIfNeeded() {
        return !!!this.rangeThatNeedToWriteMore &&
            <TouchableOpacity
                style={styles.addTouchable}
                onPress={this.onSaveSheduleClick}
            >
                <Text style={{ fontSize: 16 }}>
                    {i18n.t('save')}
                </Text>
            </TouchableOpacity>
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
