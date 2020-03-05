import React, { Component } from 'react';
import { IUserDiabetesPropertiesDayTimeValue } from '../../../model/IUserDiabetesProperties';
import { BottomPopup } from '../../../component/popup/BottomPopup';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import ProfileDayTimeRangeValuePicker from '../range-value-picker/ProfileDayTimeRangeValuePicker';
import { IUserPropertiesShedule, SheduleKeyType } from '../../../model/IUserPropertiesShedule';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, Text, View } from 'react-native';
import { CloseIcon } from '../../../component/icon/CloseIcon';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';
import { createOneLevelMergeUserPropertiesShedule } from '../../../store/modules/user-properties-shedule/UserPropertiesShedule';
import { styles } from './Style';

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

export default class ProfileUserPropertiesShedulePopup extends Component<Props, State> {
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
    }

    //get
    get shedule() {
        return this.sheduleArrayFromAnObject;
    }

    get sheduleKey() {
        return this.props.sheduleKey;
    }

    render() {
        return (
            <BottomPopup hidden={!this.props.shown}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollViewContent}>
                        {this.renderTitle()}
                        {this.renderInputTitles()}
                        {this.renderProfileDateTimePicker()}
                        {this.renderAddButton()}
                        {this.renderReangeThatNeedToFill()}
                        {this.renderSaveButtonIfNeeded()}
                    </View>
                </ScrollView>
                {this.renderCloseButton()}
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
                [this.sheduleKey]: range.value
            }
        }
        Object.values(newShedule).forEach(nSI => {
            nSI[this.sheduleKey] === 0 && delete newShedule[nSI.id]
        })
        this.setState({
            newShedule,
            needToApply: false
        }, () => console.log('newShedule', this.state.newShedule))
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
                }, () => console.log('onAddPress', this.state.newShedule))
                setted = true;
            }
        }
    }

    get rangeThatNeedToWriteMore(): string {
        let rangeThatNeedToWriteMore = "";
        let currentFrom = "";
        for (let i = 0; i < 24; i++) {
            const sheduleItem = this.state.newShedule[i];
            if (!currentFrom && (!sheduleItem || (sheduleItem && !sheduleItem[this.sheduleKey]))) {
                currentFrom = "с " + i;
            } else if (currentFrom && sheduleItem && sheduleItem[this.sheduleKey]) {
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
        const shedule: IUserDiabetesPropertiesDayTimeValue[] = [];
        console.log('sheduleArrayFromAnObject newwShedule', this.state.newShedule)
        Object.values(this.state.newShedule).map((prop, index, array) => {
            console.log(' Object.values(this.state.newShedule).map((prop, index, array) => {', prop, index, array, shedule)
            if (prop[this.sheduleKey] >= 0) {
                console.log('prop[this.sheduleKey] > 0', prop, index, array, shedule)
                
                if (index === 0) {
                console.log('index === 0', prop, index, array, shedule)

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
        console.log('sheduleArrayFromAnObject', shedule)
        return shedule;
    }

    onSaveSheduleClick = () => {
        this.props.onSaveShedule(this.state.newShedule);
        this.props.onClose();
    }


    //render
    renderTitle() {
        const { userPropertiesPopupType } = this.props;
        return <Text style={styles.popupTitle}>
            {userPropertiesPopupType == SheduleKeyType.INSULIN_SENSITIVITY_FACTOR ?
                'Фактор чувствительности к инсулину' :
                "Углеводный коэффициент"
            }
        </Text>
    }

    renderInputTitles() {
        return this.shedule.length > 0 && (
            <View style={styles.pickersTitleView}>
                <Text style={styles.pickersItemTitle}>{'С(часов)'}</Text>
                <Text style={styles.pickersItemTitle}>{'До(часов)'}</Text>
                <Text style={styles.pickersItemTitle}>Значение</Text>
                <Text style={styles.pickersItemTitle}></Text>
            </View>
        )
    }
    renderProfileDateTimePicker() {
        return <View>
            {this.shedule.map(item => {
                return <ProfileDayTimeRangeValuePicker
                    key={item.id}
                    range={item}
                    onApplyChange={this.onApplyChange}
                    onDelete={this.onDeleteItem}
                />
            })}
        </View>
    }

    renderAddButton() {
        const { needToApply } = this.state;
        return !!this.rangeThatNeedToWriteMore && !needToApply && <TouchableOpacity
            style={styles.addTouchable}
            onPress={this.onAddPress}
        >
            <Text style={{ fontSize: 16 }}>
                {'Добавить'}
            </Text>
        </TouchableOpacity>
    }

    renderReangeThatNeedToFill() {
        return !!this.rangeThatNeedToWriteMore &&
            <Text style={styles.rangeThatNeedToWriteMore}>
                Необходимо заполнить временные промежутки:
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
                    {'Сохранить'}
                </Text>
            </TouchableOpacity>
    }

    renderCloseButton() {
        return <TouchableOpacity
            style={styles.closeButton}
            onPress={this.props.onClose}
        >
            <CloseIcon />
        </TouchableOpacity>
    }
}

export const ProfileUserPropertiesShedulePopupConnect = connect(
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
                dispatch(createOneLevelMergeUserPropertiesShedule(shedule));
            }
        }
    }
)(ProfileUserPropertiesShedulePopup)


