import React, { useEffect, useState, useReducer, useRef } from "react";
import { useWindowDimensions, View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar.js';
import MainButton from '../../../components/MainButton.js';
import { formInitState, formReducer } from '../../../helpers/reducers.js';

//Components for styling
import { COLOURS } from '../../../components/Colours.js';

export default PaymentMethodForm = ({ route, navigation }) =>
{
    const { t } = useTranslation("donationAddPaymentCardForm");

    const [responseError, setResponseError] = useState('');
    const { height, width } = useWindowDimensions();
    const [state, dispatchReducer] = useReducer(formReducer, formInitState);
    const {
        isEmailVerified,
        isPasswordVerified,
        inputName,
        passwordVisibility: { isShowPassword },
    } = state;

    const paymentMethodSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
    });

    const nameRef = useRef(null);
    const expDateRef = useRef(null);
    const cvvRef = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(paymentMethodSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[{ width, height }, styles.container]}>
                <FocusAwareStatusBar
                    barStyle="dark-content"
                    backgroundColor={COLOURS.shades0}
                />

                <View style={styles.form}>
                    <Text style={styles.label}>{t("cardNumberLabel")}</Text>

                    <View style={{ position: 'relative', marginBottom: 24 }}>
                        <Controller
                            control={control}
                            name="cardNumber"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[
                                        inputName === 'cardNumber' ? inputOnFocus : styles.input,
                                        isEmailVerified &&
                                        (errors.email || responseError === 'cardNumber'
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    cursorColor={COLOURS.customText}
                                    keyboardType="numeric"
                                    placeholder={t("cardNumber_ToolTip")}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        //handleChangeDataInput('isEmailVerified', true);
                                        if (responseError === 'cardNumber')
                                        {
                                            setResponseError('');
                                        }
                                    }}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { nameRef.current.focus(); }}
                                    blurOnSubmit={false}
                                    value={value}
                                /* onFocus={() => handleChangeDataInput('inputName', 'cardNumber')}*/
                                //onBlur={() =>
                                //{
                                //    handleChangeDataInput('inputName', '');
                                //    onBlur();
                                //    handleChangeDataInput('isEmailVerified', true);
                                //}}
                                />
                            )}
                        />

                        {/*<IconSuccessError*/}
                        {/*    isError={errors.email || responseError === 'cardNumber'}*/}
                        {/*    isVerified={isEmailVerified}*/}
                        {/*/>*/}

                        {/*<Text style={styles.errorText}>*/}
                        {/*    {errors.email && errors.email.message}*/}
                        {/*</Text>*/}

                        {/*{responseError === 'email' && (*/}
                        {/*    <View style={styles.responseErrorWrapper}>*/}
                        {/*        <Text style={styles.responseErrorText}>*/}
                        {/*            We didn�t recognize this email.*/}
                        {/*        </Text>*/}
                        {/*        <Text*/}
                        {/*            onPress={() =>*/}
                        {/*            {*/}
                        {/*                navigation.navigate('Register to Unify');*/}
                        {/*            }}*/}
                        {/*            style={styles.textLink}*/}
                        {/*        >*/}
                        {/*            Create a new account?*/}
                        {/*        </Text>*/}
                        {/*    </View>*/}
                        {/*)}*/}
                    </View>

                    <Text style={styles.label}>{t("cardHolderNameLabel")}</Text>

                    <View style={{ position: 'relative' }}>
                        <Controller
                            control={control}
                            name="cardHolderName"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={nameRef}
                                    style={[
                                        inputName === 'cardHolderName' ? inputOnFocus : styles.input,
                                        isPasswordVerified &&
                                        (errors.password || responseError === 'cardHolderName'
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        //handleChangeDataInput('isPasswordVerified', true);
                                        if (responseError === 'cardHolderName')
                                        {
                                            setResponseError('');
                                        }
                                    }}
                                    value={value}
                                    cursorColor={COLOURS.customText}
                                    secureTextEntry={!isShowPassword}
                                    autoCapitalize="none"
                                    autoCompleteType="cardHolderName"
                                    placeholder={t("cardHolderName_ToolTip")}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { expDateRef.current.focus(); }}
                                    blurOnSubmit={false}
                                //onFocus={() => handleChangeDataInput('inputName', 'cardHolderName')}
                                //onBlur={() =>
                                //{
                                //    handleChangeDataInput('inputName', 'cardHolderName');
                                //    onBlur();
                                //    handleChangeDataInput('isPasswordVerified', true);
                                //}}
                                />
                            )}
                        />

                        {/*<Text style={styles.errorText}>*/}
                        {/*    {errors.password && errors.password.message}*/}
                        {/*</Text>*/}

                        {/*{responseError === 'cardHolderName' && (*/}
                        {/*    <View style={styles.responseErrorWrapper}>*/}
                        {/*        <Text style={styles.responseErrorText}>Invalid password</Text>*/}
                        {/*    </View>*/}
                        {/*)}*/}
                    </View>

                    <Text style={styles.label}>{t("expiryDataLabel")}</Text>

                    <View style={{ position: 'relative' }}>
                        <Controller
                            control={control}
                            name="cardExpiry"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={expDateRef}
                                    style={[
                                        inputName === 'cardExpiry' ? inputOnFocus : styles.input,
                                        isPasswordVerified &&
                                        (errors.password || responseError === 'cardExpiry'
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        //handleChangeDataInput('isPasswordVerified', true);
                                        if (responseError === 'cardExpiry')
                                        {
                                            setResponseError('');
                                        }
                                    }}
                                    value={value}
                                    cursorColor={COLOURS.customText}
                                    secureTextEntry={!isShowPassword}
                                    autoCapitalize="none"
                                    autoCompleteType="cardExpiry"
                                    placeholder="00/00"
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { cvvRef.current.focus(); }}
                                    blurOnSubmit={false}
                                //onFocus={() => handleChangeDataInput('inputName', 'cardExpiry')}
                                //onBlur={() =>
                                //{
                                //    handleChangeDataInput('inputName', 'cardExpiry');
                                //    onBlur();
                                //    handleChangeDataInput('isPasswordVerified', true);
                                //}}
                                />
                            )}
                        />

                        {/*<Text style={styles.errorText}>*/}
                        {/*    {errors.password && errors.password.message}*/}
                        {/*</Text>*/}

                        {/*{responseError === 'cardExpiry' && (*/}
                        {/*    <View style={styles.responseErrorWrapper}>*/}
                        {/*        <Text style={styles.responseErrorText}>Invalid password</Text>*/}
                        {/*    </View>*/}
                        {/*)}*/}
                    </View>

                    <Text style={styles.label}>{t("cvvLabel")}</Text>

                    <View style={{ position: 'relative' }}>
                        <Controller
                            control={control}
                            name="cardCVV"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={cvvRef}
                                    style={[
                                        inputName === 'cardCVV' ? inputOnFocus : styles.input,
                                        isPasswordVerified &&
                                        (errors.password || responseError === 'cardCVV'
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        //handleChangeDataInput('isPasswordVerified', true);
                                        if (responseError === 'cardCVV')
                                        {
                                            setResponseError('');
                                        }
                                    }}
                                    value={value}
                                    cursorColor={COLOURS.customText}
                                    secureTextEntry={!isShowPassword}
                                    autoCapitalize="none"
                                    autoCompleteType="cardCVV"
                                    placeholder="000"
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    returnKeyType="done"
                                //onSubmitEditing={handleSubmit(onSubmit)}
                                //onFocus={() => handleChangeDataInput('inputName', 'cardCVV')}
                                //onBlur={() =>
                                //{
                                //    handleChangeDataInput('inputName', 'cardCVV');
                                //    onBlur();
                                //    handleChangeDataInput('isPasswordVerified', true);
                                //}}
                                />
                            )}
                        />

                        {/*<Text style={styles.errorText}>*/}
                        {/*    {errors.password && errors.password.message}*/}
                        {/*</Text>*/}

                        {/*{responseError === 'cardCVV' && (*/}
                        {/*    <View style={styles.responseErrorWrapper}>*/}
                        {/*        <Text style={styles.responseErrorText}>Invalid password</Text>*/}
                        {/*    </View>*/}
                        {/*)}*/}
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
                        //onPress={handleSubmit(onSubmit)}
                        nameBtn={t("continueBtnLabel")}
                    />
                </View>
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
