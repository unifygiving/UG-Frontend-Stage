import React, { useReducer, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions, ScrollView, Text, TextInput, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert, } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COLOURS } from '../../components/Colours';
import { formInitState, formReducer } from '../../helpers/reducers';

import DonorUserContainer from '../../components/DonorUserContainer';
import BackButton from '../../components/BackButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import MainButton from '../../components/MainButton';
import ShowPasswordButton from '../../components/ShowPasswordButton';
import ModalSuccess from '../../components/ModalSuccess';

import { useAuth } from '../../hooks/useAuth.js';

import { changePasswordSchema } from './model/changePasswordSchema.js';
import { useUpdateUserPasswordMutation } from '../../store/slices/userApi.js';
import PasswordInput from '../../components/PasswordInput.js';

import { ModalResultsGeneric } from '../../components/ModalResultsGeneric';

const AccountChangePassword = ({ navigation }) => {
    const { t } = useTranslation("changePasswordPage");

    const { user } = useAuth();
    const { height, width } = useWindowDimensions();
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isUpdating, setUpdating] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [isModalSuccess, setModalSuccess] = useState(true);
    const [modalTitle, setModalTitle] = useState("");
    
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });

    const [updatePassword, { data, isLoading, isError, isSuccess }] = useUpdateUserPasswordMutation();

    const handleChangeDataInput = (type, payload) => {
        dispatchReducer({ type, payload });
    };
    const handleShowPassword = (type) => {
        dispatchReducer({ type });
    };

    const handleAction = (e) => {
        e.preventDefault();
        setModalVisible(false);
        setUpdating(false);
        setTimeout(() => {
            if (isModalSuccess)
                navigation.goBack();
        }, 50);
    };

    const onSubmit = async (data) => {
        const updatePasswordData = {
            oldPassword: data.password,
            newPassword: data.newPassword
        }
        try {
            const response = await updatePassword(
                { id: user.id, oldPassword: data.password, newPassword: data.newPassword }
            ).unwrap();
            setModalSuccess(true);
            setModalMessage(t("updatePasswordSuccessMessage"));
            setModalTitle(t("updatePasswordSuccessModalTitle"));
            setButtonText(t("updatePasswordSuccessButtonText"));
        } catch (error) {
            setModalMessage(error.message);
            setModalSuccess(false);
            setModalTitle(t("updatePasswordFailedModalTitle"));
            setButtonText(t("updatePasswordFailedButtonText"));
        }
        setModalVisible(true);
    };
    useEffect(() => {
        const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
            setIsShowKeyboard(true);
        });
        const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
            setIsShowKeyboard(false);
        });
        return () => {
            showKeyboard.remove();
            hideKeyboard.remove();
        };
    }, []);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSuccess = () => {
        toggleModal();
        setTimeout(() => {
            navigation.navigate('Home');
        }, 1000);
    };
    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={{ width, height, backgroundColor: COLOURS.shades0 }}>
                    <View style={styles.container}>
                        <DonorUserContainer />
                        <View style={styles.lineContainer}>
                            <View style={styles.line} />
                        </View>
                        <View
                            style={[styles.form, { marginBottom: isShowKeyboard ? 200 : 0 }]}
                        >
                            <Text style={styles.label}>{t("oldPasswordLabel")}</Text>
                            <View style={{ position: 'relative', marginBottom: 36 }}>
                                <Controller
                                    control={control}
                                    name="password"
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => (
                                        <PasswordInput
                                            style={[
                                                styles.input,
                                                errors.password ? styles.inputError : styles.inputSuccess,
                                            ]}
                                            ref={oldPasswordRef}
                                            onChangeText={onChange}
                                            value={value}
                                            cursorColor={COLOURS.customText}
                                            autoCapitalize="none"
                                            autoCompleteType="password"
                                            placeholder={t("oldPassword_ToolTip")}
                                            placeholderTextColor={COLOURS.placeholderColour}
                                            returnKeyType='next'
                                            onSubmitEditing={()=>{
                                                newPasswordRef.current.focus();
                                            }}
                                        />
                                    )}
                                />
                                <Text style={styles.errorText}>
                                    {errors.password && errors.password.message}
                                </Text>
                            </View>
                            <Text style={styles.label}>{t("newPasswordLabel")}</Text>
                            <View style={{ position: 'relative', marginBottom: 36 }}>
                                <Controller
                                    control={control}
                                    name="newPassword"
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => (
                                        <PasswordInput
                                            style={[
                                                styles.input,
                                                errors.newPassword ? styles.inputError : styles.inputSuccess,
                                            ]}
                                            onChangeText={onChange}
                                            ref={newPasswordRef}
                                            value={value}
                                            cursorColor={COLOURS.customText}
                                            autoCapitalize="none"
                                            autoCompleteType="password"
                                            placeholder={t("newPassword_ToolTip")}
                                            placeholderTextColor={COLOURS.placeholderColour}
                                            returnKeyType='next'
                                            onSubmitEditing={()=>{
                                                confirmPasswordRef.current.focus();
                                            }}
                                        />
                                    )}
                                />
                                <Text style={[styles.errorText, { top: 45, bottom: -50 }]}>
                                    {errors.newPassword?.message}
                                </Text>
                            </View>
                            <Text style={styles.label}>{t("confirmNewPasswordLabel")}</Text>
                            <View style={{ position: 'relative' }}>
                            <Controller
                                    control={control}
                                    name="confirmPassword"
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => (
                                        <PasswordInput
                                            style={[
                                                styles.input,
                                                errors.confirmPassword ? styles.inputError : styles.inputSuccess,
                                            ]}
                                            onChangeText={onChange}
                                            value={value}
                                            ref={confirmPasswordRef}
                                            cursorColor={COLOURS.customText}
                                            autoCapitalize="none"
                                            autoCompleteType="password"
                                            placeholder={t("confirmNewPassword_ToolTip")}
                                            placeholderTextColor={COLOURS.placeholderColour}
                                            returnKeyType='done'
                                        />
                                    )}
                                />
                                <Text style={[styles.errorText, { top: 45, bottom: -50 }]}>
                                    {errors.confirmPassword?.message}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <View style={styles.mainBtnWrapper}>
                <MainButton
                    nameBtn={t("savebtnLabel")}
                    onPress={handleSubmit(onSubmit)}
                    disabled={(!isValid)||(!isDirty)}
                />
            </View>
            <ModalResultsGeneric
                isModalVisible={isModalVisible}
                message={modalMessage}
                handleAction={handleAction}
                title={modalTitle}
                buttonText={buttonText}
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
    form: {
        paddingTop: 32,
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

export default AccountChangePassword;
