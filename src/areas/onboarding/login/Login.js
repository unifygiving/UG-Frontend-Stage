import React, { useEffect, useState, useReducer, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Image, useWindowDimensions, View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useLoginMutation } from '../../../store/slices/authSlice.js';
import { setCredentials } from '../../../store/slices/authSlice.js';

//Components for styling
import { COLOURS } from '../../../components/Colours.js';

import { store } from '../../../store';
import { setUser } from '../../../store/slices/userSlice';
import { clearCharity } from "../../../store/slices/charitySlice.js";
import { loginUser } from '../../../services/auth/index.js';
import MainButton from '../../../components/MainButton.js';
import IconSuccessError from '../../../components/IconSuccessError.js';
//import SocialContainer from '../../../components/SocialContainer.js';
import ShowPasswordButton from '../../../components/ShowPasswordButton.js';
//import LineContainerOr from '../../../components/LineContainerOr.js';
import { formInitState, formReducer } from '../../../helpers/reducers.js';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar.js';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

export default Login = ({ navigation }) =>
{
    const { t } = useTranslation("loginPage");
    const dispatch = useDispatch();
    const [responseError, setResponseError] = useState('');
    const { height, width } = useWindowDimensions();
    const [state, dispatchReducer] = useReducer(formReducer, formInitState);
    const {
        isEmailVerified,
        isPasswordVerified,
        inputName,
        passwordVisibility: { isShowPassword },
    } = state;

    const handleChangeDataInput = (type, payload) =>
    {
        dispatchReducer({ type, payload });
    };
    const handleShowPassword = (type) =>
    {
        dispatchReducer({ type });
    };

    //Input Textboxes Tab Key References
    const passwordRef = useRef(null);

    const [login, {isLoading}] = useLoginMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });

    const onSubmit = async (data) =>
    {
        try
        {
/*
            const response = await loginUser(data);
            console.log(response.data);
            dispatch(
                setUser({
                    id: response.data.id,
                    token: response.data.token,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    avatar: response.data.picture,
                    email: response.data.email,
                    role: response.data.role,
                    charity_id_admin: response.data.charity_id_admin,
                    charity_id_recipient: response.data.charity_id_recipient,
                    city: response.data.city,
                    country: response.data.country,
                })
            );*/
            const credentials = await login(data).unwrap();
            dispatch(setUser(credentials));
            navigation.navigate("Home");
            /*
            switch (credentials.user.role)
            {
                case 'recipient':
                    navigation.navigate('Recipient Home');
                    break;
                case 'donor':
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Donor Home' }],
                        })
                    );
                    break;
                case 'charity':
                    dispatch(clearCharity());
                    navigation.navigate('Charity Home');
                    break;
                default:
                    break;
            }
                    */
        } catch (error)
        {
            console.error('Login failed:', error);
            setResponseError('password');
        }
    };


    useEffect(() =>
    {
        const showKeyboard = Keyboard.addListener('keyboardDidShow', () => { });
        const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => { });
        return () =>
        {
            showKeyboard.remove();
            hideKeyboard.remove();
        };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[{ width, height }, styles.container]}>
                <FocusAwareStatusBar
                    barStyle="dark-content"
                    backgroundColor={COLOURS.shades0}
                />

                <View style={{ width: 130, height: 60, padding: 5, alignSelf: "center" }} >
                    <Image source={require('../../../../assets/logo/New_Logo/Logo_White_BG_Horizontal.png')}
                        style={{ width: 130, height: 60 }}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>{t("emailHeader")}</Text>

                    <View style={{ position: 'relative', marginBottom: 24 }}>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[
                                        inputName === 'email' ? inputOnFocus : styles.input,
                                        isEmailVerified &&
                                        (errors.email || responseError === 'email'
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    cursorColor={COLOURS.customText}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    placeholder={t("email_toolkit")}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isEmailVerified', true);
                                        if (responseError === 'email')
                                        {
                                            setResponseError('');
                                        }
                                    }}
                                    value={value}
                                    onFocus={() => handleChangeDataInput('inputName', 'email')}
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isEmailVerified', true);
                                    }}
                                    returnKeyType='next'
                                    onSubmitEditing={() => passwordRef.current.focus()}
                                    blueOnSubmit={false}
                                />
                            )}
                        />

                        <IconSuccessError
                            isError={errors.email || responseError === 'email'}
                            isVerified={isEmailVerified}
                        />

                        <Text style={styles.errorText}>
                            {errors.email && errors.email.message}
                        </Text>

                        {responseError === 'email' && (
                            <View style={styles.responseErrorWrapper}>
                                <Text style={styles.responseErrorText}>
                                    {t("nonExistingAccountMessage")}
                                </Text>
                                <Text
                                    onPress={() =>
                                    {
                                        navigation.navigate('Register to Unify');
                                    }}
                                    style={styles.textLink}
                                >
                                    {t("newAccountBtn")}
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.label}>{t("passwordHeader")}</Text>

                    <View style={{ position: 'relative' }}>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={passwordRef}
                                    style={[
                                        inputName === 'password' ? inputOnFocus : styles.input,
                                        isPasswordVerified &&
                                        (errors.password || responseError === 'password'
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isPasswordVerified', true);
                                        if (responseError === 'password')
                                        {
                                            setResponseError('');
                                        }
                                    }}
                                    value={value}
                                    cursorColor={COLOURS.customText}
                                    secureTextEntry={!isShowPassword}
                                    autoCapitalize="none"
                                    autoCompleteType="password"
                                    placeholder={t("password_toolkit")}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onFocus={() => handleChangeDataInput('inputName', 'password')}
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isPasswordVerified', true);
                                    }}
                                    returnKeyType='done'
                                    onSubmitEditing={handleSubmit(onSubmit)}
                                />
                            )}
                        />

                        <ShowPasswordButton
                            isFerified={isPasswordVerified}
                            toggle={() => handleShowPassword('isShowPassword')}
                            isVisibility={isShowPassword}
                        />

                        <Text style={styles.errorText}>
                            {errors.password && errors.password.message}
                        </Text>

                        {responseError === 'password' && (
                            <View style={styles.responseErrorWrapper}>
                                <Text style={styles.responseErrorText}>{t("invalidPassword")}</Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <MainButton
                        disabled={
                            false
                            // errors.email ||
                            // !isEmailVerified ||
                            // errors.password ||
                            // !isPasswordVerified ||
                            // responseError
                            //   ? true
                            //   : false
                        }
                        onPress={handleSubmit(onSubmit)}
                        nameBtn={t("loginBtnText")}
                    />
                </View>

                <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Reset Password')}
                    >
                        <Text style={styles.forgotPasswordText}>{t("forgottenPassword")}</Text>
                    </TouchableOpacity>
                </View>
                {/*<LineContainerOr />*/}
                {/*<SocialContainer />*/}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingHorizontal: 20,

        backgroundColor: COLOURS.shades0,
    },
    form: {
        paddingTop: 32,
        paddingBottom: 32,
    },
    label: {
        marginBottom: 5,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
    },
    input: {
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,

        borderColor: COLOURS.customBorderColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
    },

    inputOnFocus: {
        borderColor: COLOURS.primaryMain,
    },
    inputSuccess: {
        borderColor: COLOURS.successColour,
    },
    inputError: {
        borderColor: COLOURS.errorColour,
    },

    errorText: {
        position: 'absolute',
        left: 0,
        bottom: -22,

        color: COLOURS.errorTextColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 18,
    },

    responseErrorWrapper: {
        position: 'absolute',
        left: 0,
        bottom: -22,

        flexDirection: 'row',
    },

    responseErrorText: {
        color: COLOURS.errorTextColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 18,
    },
    textLink: {
        marginLeft: 4,

        color: COLOURS.primaryMain,

        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        lineHeight: 18,
    },

    forgotPasswordContainer: {
        alignSelf: 'center',

        paddingTop: 16,
        paddingBottom: 8,
    },
    forgotPasswordText: {
        color: COLOURS.customText,

        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        lineHeight: 17,
    },
});

const inputOnFocus = StyleSheet.compose(styles.input, styles.inputOnFocus);
