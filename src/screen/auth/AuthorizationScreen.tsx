import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Touchable,
    // TouchableOpacity, ???
    Button,
    Image,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Polygon } from 'react-native-svg';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { shadowOptions } from '../../constant/shadowOptions';
import { GoogleLogoIcon } from '../../component/icon/GoogleLogoIcon';

interface AuthScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface AuthScreenState {
    email: string
    password: string
}

class AuthorizationScreen extends React.Component<AuthScreenProps, AuthScreenState>{
    
    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <View style={styles.AuthView}>
               <View style={styles.BackgroundAuth}>
                {this.renderBackgroundSun()}
                {this.renderBackgroundMountains()}
                {this.renderAuthForm()}
                <GoogleLogoIcon />

               </View>
            </View>
        )
    }

    renderBackgroundSun() {
        return (
            <View style={styles.BackgroundSun}>
                <BackgroundSunIcon />
            </View>
        )
    }

    renderBackgroundMountains() {
        return (
            <View style={styles.BackgroundMountains}>
                <BackgroundMountainsIcon />
            </View>
        )
    }

    // TODO: form does not exist in React Native
    renderAuthForm() {
        return (
            <View style={styles.AuthForm}>
                <Text style={styles.titleFormText}>
                    Авторизация
                </Text>
                {this.renderInputBlock()}
                <View style={styles.formButtons}>
                    {this.renderRegistrationButton()}
                    {this.renderSignInButton()}
                </View>
                <Text style={styles.titleFormText}>
                    ------- или -------
                </Text>
                <View style={styles.formButtons}>
                    {/* <GoogleLogoIcon />  */}
                    {/* <Svg width="80" height="80">
                        <Image href={require('file:///C:/Users/mikha/OneDrive/Desktop/VKAuth.svg')} />
                    </Svg> */}
                </View>
            </View>
        )
    }

    renderInputBlock() {
        return (
            <View>
                <View style={styles.inputForm}>
                    {/* TODO:keyboardType doesnt work if make custom Input and  */}
                    <TextInput 
                        style={styles.input}
                        value={this.state.email}
                        keyboardType={'email-address'} // TODO:
                        placeholder={'Почта'}
                        onChangeText={(value) => this.setState({ email: value}) }
                    />
                </View>
                <View style={styles.inputForm}>
                    <TextInput 
                        style={styles.input}
                        value={this.state.password}
                        keyboardType={'visible-password'} //TODO:
                        placeholder={'Пароль'}
                        onChangeText={(value) => this.setState({ password: value}) }
                    />
                </View>
            </View>
        )
    }

    renderRegistrationButton() {
        return (
            <TouchableOpacity
                style={styles.registrationButton}
            >
                <Text style={styles.registrationButtonText}>
                    Зарегистрироваться
                </Text>
            </TouchableOpacity>
        )
    }

    renderSignInButton() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('NoteList')}
                style={styles.signInButton}
            >
                <Text style={styles.signInButtonText}>
                    Войти
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    AuthView: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#D6E5ED',
    },
    BackgroundAuth: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    BackgroundSun: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: "absolute",
    },
    BackgroundMountains: {
        flex: 1,
        width: '100%',
        height: '100%',  
        position: "absolute",
    },
    AuthForm: {
        flex: 1,
        width: '100%',
        height: '70%',  
        position: "absolute",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#FFEBEB',
        borderRadius: 40,
        marginTop: 280,
    },
    inputForm: {
        margin: 10,
    },
    input: {
        width: 280,
        height: 30,

        padding: 5,
        borderRadius: 5,
        borderWidth: 2,

        textAlign: 'left',
        fontSize: 16,
        color: ThemeColor.TEXT_DARK_GRAY,

        borderColor: ThemeColor.TAN,
        backgroundColor: ThemeColor.WHITE,
    },
    titleFormText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#666666',
        margin: 10,
    },
    formButtons: {
        flex: 1,
        marginTop: 8,
        width: 280,
        height: 60,
        
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registrationButton: {
        width: 160,
        height: 30,

        // marginLeft: 20,
        // paddingLeft: 10,

        // elevation: 2,
        // ...shadowOptions,

        // textAlign: 'center',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
    },
    signInButton: {
        width: 120,
        height: 30,

        // marginLeft: 20,
        // paddingLeft: 10,

        // elevation: 2,
        // ...shadowOptions,

        
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#FFB4B4',
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
    },
    registrationButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#666666',
    },
    signInButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#666666',
    },
})


export default AuthorizationScreen;


{/* <TouchableOpacity onPress={() => this.props.navigation.navigate('NoteList')}>
                    <Text style={styles.text}>Go to Note List</Text>
                </TouchableOpacity> */}

            