import React, { useEffect, useState, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import
{
    Image,
    useWindowDimensions,
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../../store/slices/authSlice.js';

//Components for styling
import { COLOURS } from '../../../components/Colours.js';
import { signUpUser } from '../../../services/auth/index.js';
import { formInitState, formReducer } from '../../../helpers/reducers.js';
import IconSuccessError from '../../../components/IconSuccessError.js';
import ShowPasswordButton from '../../../components/ShowPasswordButton.js';
import MainButton from '../../../components/MainButton.js';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar.js';

const RegisterSchema = Yup.object({
    firstName: Yup.string().required('First name is required').min(2).max(30).matches(/^[A-Za-z\s]+$/, 'First name must only contain letters and spaces'),
    lastName: Yup.string().required('Last name is required').min(2).max(30).matches(/^[A-Za-z\s]+$/, 'Last name must only contain letters and spaces'),
    city: Yup.string().required('City is required').min(2).max(30).matches(/^[A-Za-z\s]+$/, 'City must only contain letters and spaces'),
    country: Yup.string().required('Country is required').min(2).max(30).matches(/^[A-Za-z\s]+$/, 'Country must only contain letters and spaces'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(
            8,
            'Password should contain 8 characters with one UPPERCASE, lowercase, and number, or symbol'
        )
        .max(30, "Password shouldn't contain more 30 characters"),
});

export default Register = ({ navigation }) =>
{
    const dispatch = useDispatch();
    const { t } = useTranslation('registerPage');
    const { height, width } = useWindowDimensions();
    const [responseError, setResponseError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [state, dispatchReducer] = useReducer(formReducer, formInitState);

    const [registerUser, {isSuccess, isError, isLoading, error}] = useRegisterMutation();

    const {
        isFirstNameVerified,
        isLastNameVerified,
        isCityVerified,
        isCountryVerified,
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
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const cityRef = useRef(null);
    const countryRef = useRef(null);

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });

    const onSubmit = async (data) =>
    {
        const signUpData = { ...data, role: 'donor', agreeToTerms: true };
        registerUser(signUpData);
    };

    useEffect(()=>{
        console.log("SUCCESS", JSON.stringify(getValues().email));
        if (isSuccess) navigation.navigate('EmailConfirmation', {email: getValues().email});
    }, [isSuccess])

    useEffect(()=>{
        if (isError) Alert.alert(error);
    }, [isError])

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
            <ScrollView style={[{ width, height }, styles.container]}>
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
                    <Text style={styles.label}>{t("firstname")}</Text>

                    <View style={{ position: 'relative', marginBottom: 24 }}>
                        <Controller
                            control={control}
                            name='firstName'
                            defaultValue=''
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={firstNameRef}
                                    style={[
                                        inputName === 'firstName' ? inputOnFocus : styles.input,
                                        isFirstNameVerified &&
                                        (errors.firstName
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    cursorColor={COLOURS.customText}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    autoCompleteType='name'
                                    placeholder={t('firstname_tooltip')}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isFirstNameVerified', true);
                                    }}
                                    value={value}
                                    onFocus={() =>
                                        handleChangeDataInput('inputName', 'firstName')
                                    }
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isFirstNameVerified', true);
                                    }}
                                    returnKeyType='next'
                                    onSubmitEditing={() => lastNameRef.current.focus()}
                                    blurOnSubmit={false}
                                />
                            )}
                        />

                        <IconSuccessError
                            isError={errors.firstName}
                            isVerified={isFirstNameVerified}
                        />

                        <Text style={styles.errorText}>
                            {errors.firstName && errors.firstName.message}
                        </Text>
                    </View>

                    <Text style={styles.label}>{t('lastname')}</Text>

                    <View style={{ position: 'relative', marginBottom: 24 }}>
                        <Controller
                            control={control}
                            name='lastName'
                            defaultValue=''
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={lastNameRef}
                                    style={[
                                        inputName === 'lastName' ? inputOnFocus : styles.input,
                                        isLastNameVerified &&
                                        (errors.lastName
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    cursorColor={COLOURS.customText}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    autoCompleteType='name'
                                    placeholder={t('lastname_tooltip')}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isLastNameVerified', true);
                                    }}
                                    value={value}
                                    onFocus={() => handleChangeDataInput('inputName', 'lastName')}
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isLastNameVerified', true);
                                    }}
                                    returnKeyType='next'
                                    onSubmitEditing={() => cityRef.current.focus()}
                                    blurOnSubmit={false}
                                />
                            )}
                        />

                        <IconSuccessError
                            isError={errors.lastName}
                            isVerified={isLastNameVerified}
                        />

                        <Text style={styles.errorText}>
                            {errors.lastName && errors.lastName.message}
                        </Text>
                    </View>

                    <Text style={styles.label}>{t("city")}</Text>

                    <View style={{ position: 'relative', marginBottom: 24 }}>
                        <Controller
                            control={control}
                            name="city"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={cityRef}
                                    style={[
                                        inputName === 'city' ? inputOnFocus : styles.input,
                                        isFirstNameVerified &&
                                        (errors.firstName
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    cursorColor={COLOURS.customText}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCompleteType="name"
                                    placeholder={t("city_tooltip")}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isCityVerified', true);
                                    }}
                                    value={value}
                                    onFocus={() =>
                                        handleChangeDataInput('inputName', 'city')
                                    }
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isCityVerified', true);
                                    }}
                                    returnKeyType='next'
                                    onSubmitEditing={() => countryRef.current.focus()}
                                    blurOnSubmit={false}
                                />
                            )}
                        />

                        <IconSuccessError
                            isError={errors.city}
                            isVerified={isCityVerified}
                        />

                        <Text style={styles.errorText}>
                            {errors.city && errors.city.message}
                        </Text>
                    </View>

                    <Text style={styles.label}>{t("country")}</Text>

                    <View style={{ position: 'relative', marginBottom: 24 }}>
                        <Controller
                            control={control}
                            name="country"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={countryRef}
                                    style={[
                                        inputName === 'country' ? inputOnFocus : styles.input,
                                        isFirstNameVerified &&
                                        (errors.firstName
                                            ? styles.inputError
                                            : styles.inputSuccess),
                                    ]}
                                    cursorColor={COLOURS.customText}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCompleteType="name"
                                    placeholder={t("country_tooltip")}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isCountryVerified', true);
                                    }}
                                    value={value}
                                    onFocus={() =>
                                        handleChangeDataInput('inputName', 'country')
                                    }
                                    onBlur={() =>
                                    {
                                        handleChangeDataInput('inputName', '');
                                        onBlur();
                                        handleChangeDataInput('isCountryVerified', true);
                                    }}
                                    returnKeyType='next'
                                    onSubmitEditing={() => emailRef.current.focus()}
                                    blurOnSubmit={false}
                                />
                            )}
                        />

                        <IconSuccessError
                            isError={errors.country}
                            isVerified={isCountryVerified}
                        />

                        <Text style={styles.errorText}>
                            {errors.country && errors.country.message}
                        </Text>
                    </View>

                    <Text style={styles.label}>{t("email")}</Text>

                    <View style={{ position: 'relative', marginBottom: 24 }}>
                        <Controller
                            control={control}
                            name='email'
                            defaultValue=''
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={emailRef}
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
                                    placeholder={t('email_tooltip')}
                                    placeholderTextColor={COLOURS.placeholderColour}
                                    onChangeText={(value) =>
                                    {
                                        onChange(value);
                                        handleChangeDataInput('isEmailVerified', true);
                                        if (responseError)
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
                                    This email is already in use.
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.label}>{t('password')}</Text>

                    <View style={{ position: 'relative', marginBottom: 58 }}>
                        <Controller
                            control={control}
                            name='password'
                            defaultValue=''
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    ref={passwordRef}
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
                                    }}
                                    value={value}
                                    cursorColor={COLOURS.customText}
                                    secureTextEntry={!isShowPassword}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    autoCompleteType='password'
                                    placeholder={t('password_tooltip')}
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

                        <Text style={[styles.errorText, { top: 45, bottom: -50 }]}>
                            {errors.password && errors.password.message}
                        </Text>
                    </View>

                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={COLOURS.primaryMain}
                            style={styles.checkBox}
                        />

                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.textCheckBox}>{t('agree_t&c')}</Text>
                            <Text style={termCondition}>{t('t&c')}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingVertical: 10, height: 80 }}>
                    <MainButton
                        disabled={
                            errors.firstName ||
                                !isFirstNameVerified ||
                                errors.lastName ||
                                !isLastNameVerified ||
                                errors.city ||
                                !isCityVerified ||
                                errors.country ||
                                !isCountryVerified ||
                                errors.email ||
                                !isEmailVerified ||
                                errors.password ||
                                !isPasswordVerified ||
                                !isChecked ||
                                responseError
                                ? true
                                : false
                        }
                        onPress={handleSubmit(onSubmit)}
                        nameBtn={t("register")}
                    />
                </View>
            </ScrollView>
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
        paddingBottom: 16,
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

    checkBoxContainer: {
        flexDirection: 'row',
    },
    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 6,

        borderColor: COLOURS.customBorderColour,
    },

    textCheckBox: {
        color: COLOURS.customText,

        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        lineHeight: 21,
    },
    termCondition: {
        color: COLOURS.primaryMain,

        fontFamily: 'Inter_700Bold',
    },
});

const inputOnFocus = StyleSheet.compose(styles.input, styles.inputOnFocus);

const termCondition = StyleSheet.compose(
    styles.textCheckBox,
    styles.termCondition
);
