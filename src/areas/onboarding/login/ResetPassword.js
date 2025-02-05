import React, { useEffect, useState, useRef, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import
{
    Image,
    useWindowDimensions,
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { formInitState, formReducer } from '../../../helpers/reducers.js';

//Components for styling
import { COLOURS } from '../../../components/Colours.js';

import MainButton from '../../../components/MainButton.js';
import ShowPasswordButton from '../../../components/ShowPasswordButton.js';
import IconSuccessError from '../../../components/IconSuccessError.js';
//import SocialContainer from '../../../components/SocialContainer.js';
//import LineContainerOr from '../../../components/LineContainerOr.js';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar.js';
import { resetPassword } from '../../../services/users/index.js';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('New password is required')
        .min(
            8,
            'Password should contain 8 characters with one UPPERCASE, lowercase, and number, or symbol'
        )
        .max(30, "Password shouldn't contain more 30 characters"),
    confirmPassword: Yup.string().required(
        'Сonfirmation new password is required'
    ),
});

export default ResetPassword = ({ navigation }) =>
{
    const dispatch = useDispatch();
    const { t } = useTranslation("loginResetPassword");

    const [responseError, setResponseError] = useState('');
    const { height, width } = useWindowDimensions();
    const [state, dispatchReducer] = useReducer(formReducer, formInitState);
    const {
        isEmailVerified,
        isPasswordVerified,
        isConfirmPasswordVerified,
        inputName,
        passwordVisibility: { isShowPassword, isShowConfirmPassword },
        isErrorConfirmPassword,
        password,
        confirmPassword,
    } = state;

    const handleChangeDataInput = (type, payload) =>
    {
        dispatchReducer({ type, payload });
    };

    const handleShowPassword = (type) =>
    {
        dispatchReducer({ type });
    };

    useEffect(() =>
    {
        dispatchReducer({ type: 'compairePasswords' });
    }, [confirmPassword, password]);


    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });

    const onSubmit = async (data) =>
    {
        console.log('ResetData', data);
        // setResponseError('email');
        navigation.navigate('Login to Unify');
        try
        {
            //const response = await loginUser(data);
            //const { data: resData } = response;
            //console.log("resData", resData);
            //dispatch(
            //  setUser({
            //    id: resData.id,
            //    firstName: resData.firstName,
            //    lastName: resData.lastName,
            //    avatar: resData.photo,
            //    email: resData.email,
            //    role: resData.role,
            //    charity_id_admin: resData.charity_id_admin,
            //    charity_id_recipient: resData.charity_id_recipient,
            //  })
            //);*/
        } catch (error)
        {
            // TODO: Handle error
            console.error('Login failed:', error);
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
                    barStyle='dark-content'
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

                    <View style={{ position: 'relative', marginBottom: 36 }}>
                        <Controller
                            control={control}
                            name='email'
                            defaultValue=''
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
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    autoCompleteType='email'
                                    placeholder='Enter your email address'
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
                                    onSubmitEditing={() => newPasswordRef.current.focus()}
                                    blurOnSubmit={false}
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
                                    We didn’t recognize this email.
                                </Text>

                                <Text
                                    onPress={() =>
                                    {
                                        navigation.navigate('Register to Unify');
                                    }}
                                    style={styles.textLink}
                                >
                                    {t("createAccountBtnLabel")}
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.label}>New Password</Text>

                    <View style={{ position: 'relative', marginBottom: 36 }}>
                        <Controller
                            control={control}
                            name='password'
                            defaultValue=''
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={newPasswordRef}
                                    style={[
                                        inputName === 'password' ? inputOnFocus : styles.input,
                                        isPasswordVerified &&
                                        (errors.password
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isPasswordVerified', true);
                                        handleChangeDataInput('password', value);
                                    }}
                                    value={value}
                                    cursorColor={COLOURS.customText}
                                    secureTextEntry={!isShowPassword}
                                    autoCapitalize='none'
                                    autoCompleteType='password'
                                    placeholder='Enter your new password'
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onFocus={() => handleChangeDataInput('inputName', 'password')}
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isPasswordVerified', true);
                                    }}
                                    returnKeyType='next'
                                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                                    blurOnSubmit={false}
                                />
                            )}
                        />

                        <ShowPasswordButton
                            isFerified={isPasswordVerified}
                            toggle={() => handleShowPassword('isShowPassword')}
                            isVisibility={isShowPassword}
                        />

                        <Text style={[styles.errorText, { top: 45, bottom: -50 }]}>
                            {errors.password && errors.password.message}
                        </Text>
                    </View>

                    <Text style={styles.label}>Confirm New Password</Text>

                    <View style={{ position: 'relative' }}>
                        <Controller
                            control={control}
                            name='confirmPassword'
                            defaultValue=''
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={confirmPasswordRef}
                                    style={[
                                        inputName === 'confirmPassword'
                                            ? inputOnFocus
                                            : styles.input,
                                        isConfirmPasswordVerified &&
                                        (errors.confirmPassword || isErrorConfirmPassword
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isConfirmPasswordVerified', true);
                                        handleChangeDataInput('confirmPassword', value);
                                    }}
                                    value={value}
                                    cursorColor={COLOURS.customText}
                                    secureTextEntry={!isShowConfirmPassword}
                                    autoCapitalize='none'
                                    autoCompleteType='password'
                                    placeholder='Re-enter your new password'
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onFocus={() =>
                                        handleChangeDataInput('inputName', 'confirmPassword')
                                    }
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isConfirmPasswordVerified', true);
                                    }}
                                    returnKeyType='done'
                                    onSubmitEditing={handleSubmit(onSubmit)}
                                />
                            )}
                        />

                        <ShowPasswordButton
                            isFerified={isConfirmPasswordVerified}
                            toggle={() => handleShowPassword('isShowConfirmPassword')}
                            isVisibility={isShowConfirmPassword}
                        />

                        <Text style={styles.errorText}>
                            {errors.confirmPassword
                                ? errors.confirmPassword.message
                                : isConfirmPasswordVerified && isErrorConfirmPassword
                                    ? 'Password not match'
                                    : ''}
                        </Text>
                    </View>
                </View>

                <View style={{ paddingVertical: 10, marginBottom: 16 }}>
                    <MainButton
                        disabled={
                            errors.email ||
                                !isEmailVerified ||
                                errors.password ||
                                !isPasswordVerified ||
                                errors.confirmPassword ||
                                !isConfirmPasswordVerified ||
                                isErrorConfirmPassword ||
                                responseError
                                ? true
                                : false
                        }
                        onPress={handleSubmit(onSubmit)}
                        nameBtn={t("resetPasswordBtnLabel")}
                    />
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
        paddingBottom: 36,
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
});
const inputOnFocus = StyleSheet.compose(styles.input, styles.inputOnFocus);
