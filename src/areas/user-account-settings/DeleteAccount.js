import React, { useReducer, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions, ScrollView, Text, TextInput, StyleSheet, View, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { useTranslation } from 'react-i18next';

import { selectUser } from '../../store/slices/userSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import { COLOURS } from '../../components/Colours';
import { formInitState, formReducer } from '../../helpers/reducers';

import DonorUserContainer from '../../components/DonorUserContainer';
import BackButton from '../../components/BackButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import MainButton from '../../components/MainButton';
import ShowPasswordButton from '../../components/ShowPasswordButton';
import AccountDeleteWarningSvg from '../../components/svgComponents/AccountDeleteWarningSvg';
import ModalConfirm from '../../components/ModalConfirm';
import { deleteUser } from '../../services/users';

const DeleteAccountSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(30, "Password shouldn't contain more 30 characters"),

    confirmPassword: Yup.string().required('Сonfirmation  password is required'),
});
const DeleteAccount = ({ navigation }) =>
{
    const { t } = useTranslation("deleteAccount");

    const { user } = useSelector((state) => state.user);
    const { height, width } = useWindowDimensions();
    const [responseError, setResponseError] = useState('');
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [state, dispatchReducer] = useReducer(formReducer, formInitState);

    const {
        isPasswordVerified,
        isConfirmPasswordVerified,
        inputName,
        passwordVisibility: { isShowPassword, isShowConfirmPassword },
        isErrorConfirmPassword,
        password,
        confirmPassword,
    } = state;

    useEffect(() =>
    {
        dispatchReducer({ type: 'compairePasswords' });
    }, [confirmPassword, password]);

    const confirmPasswordRef = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(DeleteAccountSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });
    const handleChangeDataInput = (type, payload) =>
    {
        dispatchReducer({ type, payload });
    };
    const handleShowPassword = (type) =>
    {
        dispatchReducer({ type });
    };
    const onSubmit = async (data) =>
    {
        console.log(user.id, user.token, data.password);
        try
        {
            const response = await deleteUser(user.id, user.token, data.password);
            if (response.status === 200)
            {
                console.log(response.data.message);
                Alert.alert("Success", response.data.message);
                toggleModal();
                setTimeout(() =>
                {
                    navigation.navigate('Onboarding Home');
                }, 1000);
            } else
            {
                Alert.alert(response.data.message);
            }
        } catch (error)
        {
            console.log(error);
            Alert.alert(error);
        }
    };

    const toggleModal = () =>
    {
        setModalVisible(!isModalVisible);
    };

    useEffect(() =>
    {
        const showKeyboard = Keyboard.addListener('keyboardDidShow', () =>
        {
            setIsShowKeyboard(true);
        });
        const hideKeyboard = Keyboard.addListener('keyboardDidHide', () =>
        {
            setIsShowKeyboard(false);
        });
        return () =>
        {
            showKeyboard.remove();
            hideKeyboard.remove();
        };
    }, []);

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={{ width, height, backgroundColor: COLOURS.shades0 }}>
                    {/* <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={COLOURS.primaryMain}
        /> */}
                    <View style={styles.container}>
                        {/*<BackButton onPress={() => navigation.navigate('Settings')} />*/}
                        <DonorUserContainer />
                        <View style={styles.lineContainer}>
                            <View style={styles.line} />
                        </View>
                        <View style={styles.wrapperWarning}>
                            <AccountDeleteWarningSvg />
                            <View style={{ paddingHorizontal: 10, paddingVertical: 7 }}>
                                <Text style={styles.titleWarning}>
                                    {t("deletionValidationHeader")}
                                </Text>
                                <Text style={styles.textWarning}>
                                    {'\u2022' + '  ' + t("warning1")}
                                </Text>
                                <Text style={styles.textWarning}>
                                    {'\u2022' + '  ' + t("warning2")}
                                </Text>
                                <Text style={styles.textWarning}>
                                    {'\u2022' + '  ' + t("warning3")}
                                </Text>
                                <Text style={[styles.textWarning, { marginBottom: 0 }]}>
                                    {'\u2022' + '  ' + t("warning4")}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[styles.form, { marginBottom: isShowKeyboard ? 130 : 0 }]}
                        >
                            <Text style={styles.label}>{t("passwordHeader")}</Text>

                            <View style={{ position: 'relative', marginBottom: 36 }}>
                                <Controller
                                    control={control}
                                    name="password"
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
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
                                            autoCapitalize="none"
                                            autoCompleteType="password"
                                            placeholder={t("password_ToolTip")}
                                            placeholderTextColor={COLOURS.placeholderColour}
                                            onFocus={() =>
                                                handleChangeDataInput('inputName', 'password')
                                            }
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

                            <Text style={styles.label}>{t("confirmPasswordHeader")}</Text>

                            <View style={{ position: 'relative' }}>
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    defaultValue=""
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            ref={confirmPasswordRef}
                                            style={[
                                                inputName === 'confirmPassword'
                                                    ? inputOnFocus
                                                    : styles.input,
                                                isConfirmPasswordVerified &&
                                                (errors.confirmPassword ||
                                                    isErrorConfirmPassword ||
                                                    errors.password
                                                    ? styles.inputError
                                                    : styles.inputSuccess),
                                            ]}
                                            onChangeText={(value) =>
                                            {
                                                onChange(value);
                                                handleChangeDataInput(
                                                    'isConfirmPasswordVerified',
                                                    true
                                                );
                                                handleChangeDataInput('confirmPassword', value);
                                            }}
                                            value={value}
                                            cursorColor={COLOURS.customText}
                                            secureTextEntry={!isShowConfirmPassword}
                                            autoCapitalize="none"
                                            autoCompleteType="password"
                                            placeholder={t("confirmPassword_ToolTip")}
                                            placeholderTextColor={COLOURS.placeholderColour}
                                            onFocus={() =>
                                                handleChangeDataInput('inputName', 'confirmPassword')
                                            }
                                            onBlur={() =>
                                            {
                                                handleChangeDataInput('inputName', '');
                                                onBlur();
                                                handleChangeDataInput(
                                                    'isConfirmPasswordVerified',
                                                    true
                                                );
                                            }}
                                            returnKeyType='done'
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
                                            ? t("passwordError")
                                            : ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <View style={styles.mainBtnWrapper}>
                <View style={{ marginBottom: 10 }}>
                    <MainButton
                        nameBtn={t("deleteAccountBtnLabel")}
                        onPress={toggleModal}
                        disabled={
                            errors.password ||
                                !isPasswordVerified ||
                                errors.confirmPassword ||
                                !isConfirmPasswordVerified ||
                                isErrorConfirmPassword ||
                                responseError
                                ? true
                                : false
                        }
                        whiteButton={true}
                    />
                </View>

                <MainButton
                    nameBtn={t("cancelBtnLabel")}
                    onPress={() => navigation.navigate('Account')}
                />
            </View>
            <ModalConfirm
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                deleteModal={true}
                handleAction={handleSubmit(onSubmit)}
            />
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,

        position: 'relative',

        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    lineContainer: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,

        height: 1,

        backgroundColor: COLOURS.neutral30,
    },
    wrapperWarning: {
        flexDirection: 'row',
        marginTop: 12,
    },
    titleWarning: {
        marginBottom: 20,

        color: COLOURS.customText,

        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
        lineHeight: 20,
    },
    textWarning: {
        marginBottom: 5,

        color: COLOURS.customText,

        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        lineHeight: 20,
    },
    form: {
        paddingTop: 12,
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
    mainBtnWrapper: {
        paddingBottom: 40,
        paddingHorizontal: 20,

        backgroundColor: COLOURS.shades0,
    },
});

const inputOnFocus = StyleSheet.compose(styles.input, styles.inputOnFocus);

export default DeleteAccount;
