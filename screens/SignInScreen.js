import React from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../components/Context'
import { useTheme } from '@react-navigation/native';

import Users from '../model/users'

const SignInScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUsername: true,
        isValidPassword: true
    })

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext)

    const textInputChange = (val) => {
        if (val.length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUsername: true
            })
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUsername: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        if (val.length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            })
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            })
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const loginHandle = (userName, password) => {
        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username & Password cannot be empty', [
                { text: 'Okay' }
            ])
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username & Password is incorrect', [
                { text: 'Okay' }
            ])
            return;
        }

        signIn(foundUser)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Username"
                        placeholderTextColor={colors.text}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View>
                        : null
                    }
                </View>
                {data.isValidUsername ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 character long.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor={colors.text}
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={() => updateSecureTextEntry()}>
                        {data.secureTextEntry ?
                            <Feather name="eye-off" color="grey" size={20} /> :
                            <Feather name="eye" color="grey" size={20} />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 character long.</Text>
                    </Animatable.View>
                }

                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot Password</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => { loginHandle(data.username, data.password) }}>
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={styles.signUp}>
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#009387',
        borderWidth: 1,
        marginTop: 15
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})