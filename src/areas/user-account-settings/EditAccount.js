import React, { useEffect, useState } from 'react';
import editUserProfileSchema from './model/editUserProfileSchema';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useUpdateUserMutation, useUpdateUserPictureMutation } from '../../store/slices/userApi';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, IconButton } from 'react-native-paper';
import { COLOURS } from '../../components/Colours';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { setUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import MainButton from '../../components/MainButton';
import {
    ScrollView,
    View, Text,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import AvatarEditSvg from '../../components/svgComponents/AvatarEditSvg';
import { ModalResultsGeneric } from '../../components/ModalResultsGeneric';

import styles from "./styles";

const EditAccount = ({ navigation }) => {
    const { t } = useTranslation("editUserAccount");
    const { user } = useAuth();
    const dispatch = useDispatch();

    const [updateUser, { data, error, isSuccess }] = useUpdateUserMutation();
    const [updatePicture] = useUpdateUserPictureMutation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [isUpdating, setUpdating] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [isModalSuccess, setModalSuccess] = useState(true);
    const [modalTitle, setModalTitle] = useState("");

    const handleAction = (e) => {
        e.preventDefault();
        setModalVisible(false);
        setUpdating(false);
        setTimeout(() => {
            if (isModalSuccess)
                navigation.goBack();
        }, 50);
    };

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, dirtyFields },
    } = useForm({
        resolver: yupResolver(editUserProfileSchema),
        mode: 'all',
        criteriaMode: 'firstError',
        values: user
    });

    useEffect(() => {
        console.log("USER", user);
    }, [user])

    const saveProfile = async (formData) => {
        try {
            const updatedUserData = {};
            console.log(dirtyFields, formData);
            if (dirtyFields.picture) {
                const res = await updatePicture({
                    id: formData.id,
                    uri: formData.picture,
                }).unwrap();
                updatedUserData.picture = res.picture;
            }
            const res = await updateUser({ id: formData.id, data: formData }).unwrap();
            console.log("RES", res.user);
            dispatch(setUser({
                user: { ...user, ...res.user },
                token: user.token,
            }));
            setModalSuccess(true);
            setModalMessage(t("updateSuccessfulMessage"));
            setButtonText(t("btnSuccess"));
            setModalTitle(t("successTitle"));
        }
        catch(error){
            console.log("Error in updating", error);
            setModalSuccess(false);
            setButtonText(t("btnRetry"));
            setModalTitle(t("failTitle"));
            setModalMessage(t("updateFailedMessage"));
        }
        setModalVisible(true);
    }

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const handleImagePicking = async () => {
        if (status?.granted === false) {
            const permissionResponse = await requestPermission();
            console.log(permissionResponse)
            if (permissionResponse.granted === false || permissionResponse.accessPrivileges === 'none') {
                alert(t("imagesPermissionWarning"));
                return;
            }
        }
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
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

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
            <Controller
                control={control}
                name="picture"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.userContainer}>
                        <Image source={{ uri: value }} style={styles.avatar} />
                        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                        <TouchableOpacity onPress={handleImagePicking} style={styles.btnAvatarEdit}>
                            <AvatarEditSvg />
                        </TouchableOpacity>
                    </View>
                )} />
            <View style={styles.form}>
                <Controller control={control} name="firstName"
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginBottom: 24 }}>
                            <Text style={styles.label}>{t("firstNameHeader")}</Text>
                            <TextInput
                                style={[styles.input, errors.firstName ? styles.inputError : styles.inputSuccess]}
                                value={value}
                                onChangeText={onChange}
                            />
                            <Text style={styles.errorText}>
                                {errors.firstName?.message}
                            </Text>
                        </View>
                    )} />
                <Controller control={control} name="lastName"
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginBottom: 24 }}>
                            <Text style={styles.label}>{t("lastNameHeader")}</Text>
                            <TextInput
                                style={[styles.input, errors.lastName ? styles.inputError : styles.inputSuccess]}
                                value={value}
                                onChangeText={onChange}
                            />
                            <Text style={styles.errorText}>
                                {errors.lastName?.message}
                            </Text>
                        </View>
                    )} />
                <Controller control={control} name="city"
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginBottom: 24 }}>
                            <Text style={styles.label}>{t("cityHeader")}</Text>
                            <TextInput
                                style={[styles.input, errors.city ? styles.inputError : styles.inputSuccess]}
                                value={value}
                                onChangeText={onChange}
                            />
                            <Text style={styles.errorText}>
                                {errors.city?.message}
                            </Text>
                        </View>
                    )} />
                <Controller control={control} name="country"
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginBottom: 24 }}>
                            <Text style={styles.label}>{t("countryHeader")}</Text>
                            <TextInput
                                style={[styles.input, errors.country ? styles.inputError : styles.inputSuccess]}
                                value={value}
                                onChangeText={onChange}
                            />
                            <Text style={styles.errorText}>
                                {errors.country?.message}
                            </Text>
                        </View>
                    )} />
                <View style={styles.mainBtnWrapper}>
                    <MainButton
                        nameBtn={t("saveBtnLabel")}
                        onPress={handleSubmit(saveProfile)}
                        disabled={!isDirty}
                    />
                </View>
            </View>
            <ModalResultsGeneric
                isModalVisible={isModalVisible}
                message={modalMessage}
                handleAction={handleAction}
                title={modalTitle}
                buttonText={buttonText}
            />
        </ScrollView>
    )
}

export default EditAccount;