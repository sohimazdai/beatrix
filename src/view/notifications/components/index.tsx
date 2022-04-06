import React from "react";
import * as Application from 'expo-application';
import { connect } from "react-redux";
import uuid from 'uuid';

import { StyleSheet, View } from "react-native";
import Swiper from 'react-native-swiper'

import { INotification } from "../../../model/INotification";
import { IStorage } from "../../../model/IStorage";
import selectActiveNotificationsList from "../selectors/select-active-notifications-list";
import { PopupIntegratorConnected } from "../../../component/PopupList/PopupIntegrator";
import { COLOR } from "../../../constant/Color";
import { createGetNotificationsAction } from "../../../store/service/notifications/GetNotificationsSaga";
import { IApp } from "../../../model/IApp";
import { SwiperItem } from "./SwiperItem";
import { createSetNotificationSeenAction } from "../../../store/service/notifications/SetNotificationSeenSaga";

const mapState = (store: IStorage) => {
    const version = Application.nativeApplicationVersion;

    return {
        notifications: selectActiveNotificationsList(store, version),
        app: store.app,
    }
};

const mapDispatch = (dispatch) => ({
    loadNotifications: () => dispatch(createGetNotificationsAction()),
    setNotificationSeen: (notificationIds: string[]) => dispatch(createSetNotificationSeenAction(notificationIds)),
})

interface Props {
    notifications: INotification[];
    app: IApp;
    loadNotifications: () => void;
    setNotificationSeen: (notificationIds: string[]) => void;
}

export class Notifications extends React.Component<Props> {
    state = {
        isOpen: false,
        popupId: uuid.v1(),
    };

    componentDidMount = () => {
        const { notifications, loadNotifications } = this.props;

        loadNotifications();
        if (notifications.length) {
            this.setState({ isOpen: true });
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        const { notifications, app, loadNotifications } = this.props;

        if (app.serverAvailable && !prevProps.app.serverAvailable) {
            loadNotifications();
        }

        if (notifications.length && !prevProps.notifications.length) {
            this.setState({ isOpen: true });
        }
    }

    handleClose = () => {
        const { notifications, setNotificationSeen } = this.props;

        this.setState({ isOpen: false });

        setNotificationSeen(notifications.map((n) => String(n.id)));
    }

    render() {
        const { notifications } = this.props;
        const { popupId, isOpen } = this.state;

        return (
            <PopupIntegratorConnected
                id={popupId}
                isOpen={isOpen}
                handleClose={this.handleClose}
            >
                <View style={styles.wrapper}>
                    <Swiper style={styles.swiperBox}>
                        {notifications.map((notification, index) => (
                            <SwiperItem
                                key={notification.id}
                                notification={notification}
                                isLastItem={index === notifications.length - 1}
                                handleClose={this.handleClose}
                            />
                        ))}
                    </Swiper>
                </View>
            </PopupIntegratorConnected>
        );
    }
}

export default connect(mapState, mapDispatch)(Notifications);

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.PRIMARY_WHITE,
    },
    swiperBox: {
        maxHeight: 300,
        backgroundColor: COLOR.PRIMARY_WHITE,
    },
    swiperItem: {
        flex: 1,
        padding: 16,
        backgroundColor: COLOR.PRIMARY_WHITE,
    },
    buttonView: {
        padding: 16,
        paddingBottom: 24,
    }
});