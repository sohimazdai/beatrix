import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Restart } from 'fiction-expo-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { getLocale, i18nGet, LocaleType } from '../../../../localisation/Translate';
import { appAnalytics } from '../../../../app/Analytics';
import { BlockHat } from '../../../../component/hat/BlockHat';
import RadioGroup from '../../../../component/radio-group/RadioGroup';
import { PopupHeader } from '../../../../component/popup/PopupHeader';
import { ProfilePicker } from '../../../../view/profile/ProfilePicker';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';

import { styles } from './Style';
import { COLOR } from '../../../../constant/Color';

import { createHidePopupToPopupList } from '../../../../store/modules/popup-list/popup-list';
import { SuperPopup } from '../../../../component/popup/SuperPopup';

const mapDispatch = (dispatch: Dispatch) => ({
    hidePopup: (id: string) => dispatch(createHidePopupToPopupList(id))
})

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    hidePopup: (id: string) => void;
}

interface State {
    isSelected: boolean;
    initialLanguage: string,
    selectedLanguage: string,
    popupId: string,
}

export class LanguageSettingsComponent extends Component<Props, State> {
    state = {
        isSelected: false,
        initialLanguage: getLocale(),
        selectedLanguage: getLocale(),
        popupId: uuid.v1(),
    };

    componentDidMount() {
        appAnalytics.sendEventWithProps(
            appAnalytics.events.LANGUAGE_SEEN,
            {
                language: this.state.initialLanguage,
            },
        );
    }

    handleSelectLanguage = (language: LocaleType) => {
        this.setState({
            isSelected: true,
            selectedLanguage: language,
        });
    }

    restartApp = async () => {
        const {
            initialLanguage,
            selectedLanguage,
        } = this.state;

        AsyncStorage
            .setItem('language', selectedLanguage)
            .then(() => appAnalytics.sendEventWithProps(
                appAnalytics.events.LANGUAGE_CHANGE,
                { initial: initialLanguage, selected: selectedLanguage },
            ))
            .then(Restart);
    }

    handleClose = () => {
        this.setState({ isSelected: false, selectedLanguage: getLocale() });
    }

    render() {
        const { isSelected, popupId, selectedLanguage } = this.state;

        return (
            <View style={styles.keyboardAvoidingView}>
                <BlockHat
                    onBackPress={() => this.props.navigation.navigate('Profile')}
                    title={i18nGet('language_profile')}
                />
                <ScrollView style={styles.scrollView}>
                    <ProfilePicker
                        title={i18nGet('language_change_language')}
                        description={i18nGet('language_restarting_causes_description')}
                    >
                        <RadioGroup
                            selectedValue={selectedLanguage}
                            items={[
                                { title: i18nGet('language_english'), value: LocaleType.en },
                                { title: i18nGet('language_spanish'), value: LocaleType.es },
                                { title: i18nGet('language_russian'), value: LocaleType.ru },
                                { title: i18nGet('language_ukrainian'), value: LocaleType.ua },
                            ]}
                            onSelect={this.handleSelectLanguage}
                        />
                    </ProfilePicker>
                </ScrollView>
                <SuperPopup
                    hidden={!isSelected}
                    handleClose={this.handleClose}
                >
                    <View style={innerStyles.popupContent}>
                        <PopupHeader title={i18nGet('language_approve_changing')} />
                        <Text style={innerStyles.popupDescription}>
                            {i18nGet('language_popup_restarting')}
                        </Text>
                        <StyledButton
                            label={i18nGet('ok')}
                            style={StyledButtonType.PRIMARY}
                            onPress={this.restartApp}
                        />
                        <View style={innerStyles.buttonBottom}>
                            <StyledButton
                                label={i18nGet('cancel')}
                                style={StyledButtonType.DELETE}
                                onPress={this.handleClose}
                            />
                        </View>
                    </View>
                </SuperPopup>
            </View>
        )
    }
}

export const LanguageSettings = connect(null, mapDispatch)(LanguageSettingsComponent);

const innerStyles = StyleSheet.create({
    popupContent: {
        padding: 16,
        backgroundColor: COLOR.WHITE,
    },
    popupDescription: {
        textAlign: 'center',
        fontSize: 17,
        marginVertical: 12,
    },
    buttonBottom: {
        marginVertical: 12,
    }
})