import React, { useState, useEffect, useCallback, useRef, useReducer } from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { Image, View, ScrollView, StyleSheet, } from "react-native";
import { Avatar, Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ModalResultsGeneric } from "../../components/ModalResultsGeneric.js";

import { MaskedTextInput } from "react-native-mask-text";
import { recipientSchema } from "./model/recipientProfile.js";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { formInitState, formReducer } from "../../helpers/reducers.js";

// Colour Guide for styling
import { COLOURS } from "../../components/Colours.js";
import { updateUserPicture, uploadUserPicture, updateUserPassword, updateUser } from "../../services/users/index.js";

import {
    useUpdateRecipientRTKMutation,
    useUpdateRecipientPictureMutation,
    useUpdateRecipientPasswordMutation
} from "../../store/slices/charitySlice.js";

const inActiveColor = COLOURS.neutral40;
const activeColor = COLOURS.primaryMain;
const maxChars = 1000;

const TextField = (props, inputId) => {
    return (
        <View key={inputId} style={styles.inputContainer}>
            <Text style={styles.inputContainer.label}>{props.title}</Text>
            <Controller
                control={props.control}
                name={props.name}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.inputContainer.textInput}
                        value={value}
                        type={props.type}
                        disabled={props.disabled}
                        onChangeText={(value) => {
                            onChange(value);
                        }}
                        onSubmitEditing={() => {
                            focusNextInput(props.nextInputRef);
                        }}
                        placeholder={props.placeholder}
                        ref={props.inputRef}
                        returnKeyType="next"
                        mode='outlined'
                        outlineColor={inActiveColor}
                        activeOutlineColor={activeColor}
                    />
                )}
            />
            {props.errors[props.name] &&
                <Text style={styles.errorText}>{props.errors[props.name].message}</Text>
            }
        </View>
    );
}

const focusNextInput = (nextInputRef) => {
    if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
    }
};

export default CharityRecipientProfileSetup = ({ route, navigation }) => {
    const { key, recipient, navSource, resetForm } = route.params;
    const { t } = useTranslation("charityRecipientProfileSetup");
    const [navigationSource, setNavigationSource] = useState(navSource);
    const { user } = useSelector((state) => state.user);

    const formValues = useCallback(() => {
        if (navigationSource && navigationSource == "Edit")
        {
            return {
                ...recipient,
                picture: recipient.picture,
                firstName: recipient.first_name,
                lastName: recipient.last_name,
                story: recipient.story ? recipient.story : "",
                password: null,
                passwordConfirm: null,
            }
        }
        else if (navigationSource && resetForm)
        {
            return {
                picture: null,
                firstName: "",
                lastName: "",
                story: "",
                country: "",
                city: "",
                email: null,
                password: null,
                passwordConfirm: null,
            }
        }
    }, [recipient]);

    const [state, dispatchReducer] = useReducer(formReducer, formInitState);
    const {
        isFirstNameVerified,
        isLastNameVerified,
        isCityVerified,
        isCountryVerified,
        isEmailVerified,
        isConfirmEmailVerified,
        isPasswordVerified,
        isNewPasswordVerified,
        isLocationVerified,
        inputName,
        isErrorConfirmEmail,
        isFormChanged,
        email,
        confirmEmail,
    } = state;

    const [
        updateRecipientRTK,
        { isLoading: isRecipientUpdating }
    ] = useUpdateRecipientRTKMutation();

    const [
        updateRecipientPicture,
        { isLoading: isPictureUpdating }
    ] = useUpdateRecipientPictureMutation();

    const [
        updateRecipientPassword,
        { isLoading: isPasswordUpdating }
    ] = useUpdateRecipientPasswordMutation();

    const {
        control,
        handleSubmit,
        formState: { errors, dirtyFields, isDirty },
        setValue,
        getValues,
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(recipientSchema),
        values: formValues(),
        mode: "onChange",
    });

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const ageInputRef = useRef(null);
    const cityInputRef = useRef(null);
    const countryInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const passwordConfirmInputRef = useRef(null);
    const storyInputRef = useRef(null);

    //Permission for accessing user's image library
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

    const [isUpdating, setUpdating] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [isModalSuccess, setModalSuccess] = useState(true);
    const [modalTitle, setModalTitle] = useState("");


    useEffect(() => {
        setSaveDisabled(!isDirty || isRecipientUpdating || isPictureUpdating);
    }, [isDirty, isRecipientUpdating, isPictureUpdating, isUpdating]);

    const saveProfile = async (formData) => {
        console.log("Save Profile", formData);
        console.log("Dirty Fields", dirtyFields);
        console.log("UPDATING USER: \n\n", user);
        setUpdating(true);
        var errors = [];
        if (dirtyFields.picture) {
            const res = await updateRecipientPicture({
                id: formData.id,
                token: user.token,
                userId: user.charity_id_admin,
                uri: formData.picture
            });
            if (res.error) errors.push(res.error);
            delete dirtyFields.picture;
        }
        if (dirtyFields.password) {
            const res = await updateRecipientPassword(formData.id, user.token, {
                oldPassword: recipient.password,
                newPassword: formData.password
            });
            if (res.error) errors.push(res.error);
            delete dirtyFields.password;
        }
        const updateUserData = { userId: user.charity_id_admin };
        var needUpdate = false;
        Object.keys(dirtyFields).map((field) => {
            console.log(field);
            if (dirtyFields[field]) {
                updateUserData[field] = formData[field];
                needUpdate = true;
            }
        });
        if (needUpdate) {
            console.log("Update User Data", updateUserData);
            const res = await updateRecipientRTK({
                id: recipient.id,
                token: user.token,
                recipientData: updateUserData
            });
            if (res.error) errors.push(res.error);
        }
        if (errors.length > 0) {
            console.log("error updating", JSON.stringify(errors));
            setModalMessage(t("updateFailedMessage"));
            setButtonText(t("btnRetry"));
            setModalSuccess(false);
            setModalTitle(t("failTitle"));
        } else {
            setModalSuccess(true);
            setModalMessage(t("updateSuccessfulMessage"));
            setButtonText(t("btnHome"));
            setModalTitle(t("successTitle"));
        }
        setModalVisible(true);
        setUpdating(false);
    }

    const previewProfile = async (formData) => {
        // Perform actions with the validated form data
        const recipient = {
            ...formData,
        }
        
        navigation.navigate("ReviewNewRecipient", {
            recipient: recipient,
            navSource: navSource
        });
    };

    //Check user's permissions then open the image library for user to select profile photo
    const handleImagePicking = async () => {
        if (status?.granted === false) {
            const permissionResponse = await requestPermission();
            if (permissionResponse.granted === false || permissionResponse.accessPrivileges === 'none') {
                alert(t("imagesPermissionWarning"));
                return;
            }
        }
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const resizedImage = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 160, height: 160 } }], // Set your desired width and height here
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
            setValue("picture", resizedImage.uri, { shouldDirty: true });
        }
    };

    const handleAction = (e) => {
        e.preventDefault();
        setModalVisible(false);
        setUpdating(false);
        setTimeout(() => {
            if (isModalSuccess)
                navigation.navigate('Home');
        }, 50);
    };

    const inputFieldsProperties = [
        {
            title: "firstNameLabel",
            name: "firstName",
            style: [
                inputName === 'firstNameLabel' ? inputOnFocus : styles.input,
                isFirstNameVerified &&
                (errors.firstName
                    ? styles.inputError
                    : styles.inputSuccess),
            ],
            placeholder: "firstName_ToolTip",
            inputRef: firstNameInputRef,
            nextInputRef: lastNameInputRef
        },
        {
            title: "lastNameLabel",
            name: "lastName",
            style: [
                inputName === 'lastNameLabel' ? inputOnFocus : styles.input,
                isLastNameVerified &&
                (errors.lastName
                    ? styles.inputError
                    : styles.inputSuccess),
            ],
            placeholder: "lastName_ToolTip",
            inputRef: lastNameInputRef,
            nextInputRef: cityInputRef
        },
        {
            title: "cityLabel",
            name: "city",
            style: [
                inputName === 'cityLabel' ? inputOnFocus : styles.input,
                isCityVerified &&
                (errors.city
                    ? styles.inputError
                    : styles.inputSuccess),
            ],
            placeholder: "city_ToolTip",
            inputRef: cityInputRef,
            nextInputRef: countryInputRef
        },
        {
            title: "countryLabel",
            name: "country",
            style: [
                inputName === 'countryLabel' ? inputOnFocus : styles.input,
                isCountryVerified &&
                (errors.country
                    ? styles.inputError
                    : styles.inputSuccess),
            ],
            placeholder: "country_ToolTip",
            inputRef: countryInputRef,
            nextInputRef: emailInputRef
        },
        {
            title: "emailLabel",
            name: "email",
            style: [
                inputName === 'emailLabel' ? inputOnFocus : styles.input,
                isEmailVerified &&
                (errors.email
                    ? styles.inputError
                    : styles.inputSuccess),
            ],
            placeholder: "email_ToolTip",
            type: "email",
            inputRef: emailInputRef,
            nextInputRef: passwordInputRef
        },
    ]

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30, }}>
            <Card style={styles.avatarContainer}>
                <Card.Content>
                    <Controller
                        control={control}
                        name="picture"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                {value ? (
                                    <Avatar.Image
                                        size={170}
                                        source={{ uri: value }}
                                        style={styles.avatarContainer.avatar}
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <Avatar.Icon
                                        icon="account-circle"
                                        size={170}
                                        color={"white"}
                                        style={styles.avatarContainer.avatar}
                                    />
                                )}
                                <IconButton
                                    icon="pencil"
                                    size={25}
                                    onPress={handleImagePicking}
                                    mode="outlined"
                                    iconColor={COLOURS.shades0}
                                    containerColor={COLOURS.primaryMain}
                                    style={styles.avatarContainer.pencil}
                                />
                                <Card.Title
                                    title={
                                        (watch("firstName") ? watch("firstName").trim() : " ") + ' ' +
                                        (watch("lastName") ? watch("lastName").trim() : " ")
                                    }
                                    subtitle={
                                        (watch("city") ? watch("city").trim() : " ") + ', ' +
                                        (watch("country") ? watch("country").trim() : " ")
                                    }
                                    titleVariant='titleMedium'
                                    subtitleVariant='labelLarge'
                                    titleStyle={styles.avatarContainer.name}
                                    subtitleStyle={styles.avatarContainer.location}
                                    subtitleNumberOfLines={3}
                                />
                            </View>
                        )} />
                </Card.Content>
            </Card>

            <View>
                {inputFieldsProperties.map((inputType, index) => (
                    <TextField
                        key={index.toString()}
                        inputId={index.toString()}
                        control={control}
                        errors={errors}
                        title={t(inputType.title)}
                        name={inputType.name}
                        style={inputType.style}
                        placeholder={t(inputType.placeholder)}
                        inputRef={inputType.inputRef}
                        nextInputRef={inputType.nextInputRef}
                        disabled={isUpdating}
                    />
                ))
                }
            </View>
            
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputContainer.label}>{t("passwordLabel")}</Text>
                        <TextInput
                            style={styles.inputContainer.textInput}
                            value={value}
                            placeholder={t("password_ToolTip")}
                            right={<TextInput.Icon
                                icon={isPasswordVisible ? "eye-off" : "eye"}
                                size={24}
                                onPress={() => { setPasswordVisible(!isPasswordVisible) }}
                            />}
                            onChangeText={(text) => onChange(text)}
                            mode='outlined'
                            outlineColor={inActiveColor}
                            activeOutlineColor={activeColor}
                            keyboardType='default'
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextInput(passwordConfirmInputRef)}
                            blurOnSubmit={false}
                            secureTextEntry={!isPasswordVisible}
                            ref={passwordInputRef}
                            disabled={isUpdating}
                        />
                        {errors.password &&
                            <Text style={styles.errorText}>{errors.password.message}</Text>
                        }
                    </View>
                )} />
            <Controller
                control={control}
                name="passwordConfirm"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputContainer.label}>{t("confirmPasswordLabel")}</Text>
                        <TextInput
                            style={styles.inputContainer.textInput}
                            value={value}
                            placeholder={t("confirmPassword_ToolTip")}
                            right={<TextInput.Icon
                                icon={isPasswordVisible ? "eye-off" : "eye"}
                                size={24}
                                onPress={() => { setPasswordVisible(!isPasswordVisible) }}
                            />}
                            onChangeText={(text) => onChange(text)}
                            mode='outlined'
                            outlineColor={inActiveColor}
                            activeOutlineColor={activeColor}
                            keyboardType='default'
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextInput(storyInputRef)}
                            blurOnSubmit={false}
                            secureTextEntry={!isPasswordVisible}
                            ref={passwordConfirmInputRef}
                            disabled={isUpdating}
                        />
                        {errors.passwordConfirm &&
                            <Text style={styles.errorText}>{errors.passwordConfirm.message}</Text>
                        }
                    </View>
                )} />
                

            <Controller control={control} name="story"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <View style={styles.inputContainer.storyLabelContainer}>
                            <Text style={styles.inputContainer.label}>{t("storyLabel")}</Text>
                            <Text style={styles.inputContainer.wordCount}>{value ? value.length : '0'}/{maxChars}</Text>
                        </View>
                        <TextInput
                            style={styles.inputContainer.storyInput}
                            multiline
                            numberOfLines={8}
                            maxLength={maxChars}
                            value={value}
                            onChangeText={(text) => onChange(text)}
                            placeholder={t("story_ToolTip")}
                            mode='outlined'
                            outlineColor={inActiveColor}
                            activeOutlineColor={activeColor}
                            keyboardType='default'
                            returnKeyType="done"
                            disabled={isUpdating}
                            ref={storyInputRef}
                        />
                    </View>
                )} />

            <View style={styles.inputContainer}>
                {navigationSource && navigationSource === 'Edit' ?
                    <Button
                        mode="contained"
                        style={Object.assign({}, styles.buttonContainer,
                            saveDisabled ? styles.buttonDisabled : {}
                        )}
                        onPress={(e) => {
                            console.log(errors);
                            handleSubmit(saveProfile)(e);
                        }}
                        disabled={saveDisabled}
                    >
                        <Text style={styles.buttonContainer.buttonText}>
                            {isPictureUpdating || isRecipientUpdating ? t("saveBtnStatusLabel") : t("saveBtnLabel")}
                        </Text>
                    </Button>
                    : <Button
                        mode="contained"
                        style={styles.buttonContainer}
                        onPress={(e) => {
                            handleSubmit(previewProfile)(e);
                        }}
                    >
                        <Text style={styles.buttonContainer.buttonText}>
                            {t("previewBtnLabel")}
                        </Text>
                    </Button>
                }
            </View>
            <ModalResultsGeneric
                isModalVisible={isModalVisible}
                message={modalMessage}
                handleAction={handleAction}
                title={modalTitle}
                buttonText={buttonText}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },

    errorText: {
        position: 'absolute',
        left: 10,
        bottom: 0,

        color: COLOURS.errorTextColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 18,
    },

    modal: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'flex-start',
    },
    content: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        elevation: 0,
        avatar: {
            backgroundColor: "black",
        },
        name: {
            fontFamily: "Inter_400Regular",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: 'center'
        },
        location: {
            fontFamily: "Inter_400Regular",
            fontSize: 18,
            textAlign: 'center',
        },
        pencil: {
            position: 'absolute',
            top: 110,
            bottom: 0,
            right: -5,
        },
    },

    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        label: {
            fontSize: 16,
            fontWeight: "bold",
            alignSelf: "flex-start",
            marginBottom: 5,
            width: "80%",
            numberOfLines: 2
        },
        textInput: {
            height: 50,
            fontSize: 16,
            marginBottom: 20,
            width: "100%",
            borderRadius: 5,
        },
        storyLabelContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 5,
        },
        storyLabel: {
            fontSize: 16,
        },
        wordCount: {
            fontSize: 16,
            marginLeft: "auto",
        },
        storyInput: {
            fontSize: 16,
            marginBottom: 20,
            width: "100%",
            borderRadius: 5,
            padding: 5,
        },
    },

    inputSuccess: {
        borderColor: COLOURS.successColour,
    },
    inputError: {
        borderColor: COLOURS.errorColour,
    },

    buttonContainer: {
        width: "100%",
        padding: 5,
        backgroundColor: COLOURS.primaryMain,
        buttonText: {
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold"
        },
    },
    buttonDisabled: {
        backgroundColor: COLOURS.shadowColor
    }
});
