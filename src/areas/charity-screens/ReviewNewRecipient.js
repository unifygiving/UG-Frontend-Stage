import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, View, ScrollView, StyleSheet, } from "react-native";
import { Avatar, Button, Card, IconButton, Text, TextInput, } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'; //redux

import { getUserProfile, createNewRecipient, uploadUserPicture } from "../../services/users/index.js";
import { getCharityById } from "../../services/charity/index.js";
import { useCreateNewRecipientMutation, useGetCharityByIdRTKQuery, useUpdateRecipientPictureMutation } from "../../store/slices/charitySlice.js";

import { ModalResultsGeneric } from "../../components/ModalResultsGeneric.js";

// Colour Guide for styling
import { COLOURS } from "../../components/Colours.js";

export default ReviewNewRecipient = ({ route, navigation }) => {
    const { recipient, navSource } = route.params;

    const { t } = useTranslation("reviewNewRecipient");
    const { user } = useSelector((state) => state.user);

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [isModalSuccess, setModalSuccess] = useState(true);
    const [isCreating, setCreating] = useState(false);

    const [
        createRecipient,
        { isLoading: isRecipientCreating }
    ] = useCreateNewRecipientMutation();

    const [
        uploadRecipientPicture,
        { isLoading: isPictureUploading }
    ] = useUpdateRecipientPictureMutation();

    useEffect(() => {
        setCreating(isRecipientCreating || isPictureUploading);
    }, [isRecipientCreating, isPictureUploading]);

    const { data: userCharity } = useGetCharityByIdRTKQuery(user.charity_id_admin);

    const addRecipient = async (e) => {
        const formData = new FormData();
        formData.append('agreeToTerms', recipient.agreeToTerms);
        formData.append('city', recipient.city);
        formData.append('country', recipient.country);
        formData.append('firstName', recipient.firstName);
        formData.append('lastName', recipient.lastName);
        formData.append('password', recipient.password);
        formData.append('email', recipient.email);
        formData.append('role', 'recipient');
        formData.append('charity_id_recipient', user.charity_id_admin);
        if (recipient.picture) {
            formData.append("image", {
                uri: recipient.picture,
                type: 'image/jpeg',
                name: "profile.jpg",
            });
        }
        formData.append('story', recipient.story);

        // console.log(newRecipientData, user);
        console.log(recipient)
        res = await createRecipient(formData);
        console.log('res', res)
        if (res.data) {
            setModalSuccess(true);
            setButtonText(t("btnHome"));
            setModalMessage(t("addedSuccessfullyMsg"));
            setModalTitle(t("successTitle"));
        } else {
            setModalSuccess(false);
            setButtonText(t("btnEdit"));
            setModalTitle(t("failedMsg"));
            setModalMessage(res.error);
        }
        setModalVisible(true);
    }

    const handleAction = () => {
        setModalVisible(false);
        setTimeout(() => {
            if (isModalSuccess)
                navigation.navigate('Home');
            else
                navigation.goBack();
        }, 50);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30, }}>
            <Card style={styles.avatarContainer} mode="contained">
                <Card.Title
                    title={recipient.firstName + " " + recipient.lastName}
                    subtitle={recipient.city + ',' + recipient.country}
                    left={() => {
                        return (recipient.picture ? (
                            <Avatar.Image
                                size={90}
                                source={{ uri: recipient.picture }}
                                style={styles.avatarContainer.avatar}
                                resizeMode="contain"
                            />
                        ) : (
                            <Avatar.Icon
                                icon="account-circle"
                                size={90}
                                color={"white"}
                                style={styles.avatarContainer.avatar}
                            />
                        ))
                    }
                    }
                    titleVariant='titleMedium'
                    subtitleVariant='labelLarge'
                    titleStyle={styles.avatarContainer.name}
                    subtitleStyle={styles.avatarContainer.location}
                    subtitleNumberOfLines={3}
                />
            </Card>
            <Card>
                <Card.Title
                    title={recipient?.story}
                    titleNumberOfLines={10}
                    titleVariant="labelLarge"
                    titleStyle={{ color: COLOURS.shades10 }}
                />
            </Card>

            <Card style={{ paddingVertical: 5, }}>
                <Card.Title
                    title={userCharity.name}
                    right={() => {
                        return (
                            <Avatar.Image
                                size={55}
                                source={{ uri: userCharity.picture }}
                                style={styles.avatarContainer.avatar}
                                resizeMode="contain"
                            />
                        )
                    }
                    }
                    subtitle={t("joinedCharityMsg")}
                    rightStyle={{ paddingHorizontal: 10 }}
                    titleStyle={{
                        color: COLOURS.shades10
                    }}
                    titleVariant="titleMedium"
                />
            </Card>
            <View flexDirection='row' style={styles.inputContainer}>
                <Button
                    mode="contained"
                    style={Object.assign({}, styles.buttonContainer,
                        isCreating ? styles.buttonDisabled : {}
                    )}
                    onPress={addRecipient}
                    disabled={isCreating}
                >
                    <Text style={styles.buttonContainer.buttonText}>
                        {t("addRecipientButton")}
                    </Text>
                </Button>
            </View>
            <ModalResultsGeneric
                success={isModalSuccess}
                title={modalTitle}
                isModalVisible={isModalVisible}
                message={modalMessage}
                handleAction={handleAction}
                buttonText={buttonText}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: COLOURS.shades0,
    },

    avatarContainer: {
        justifyContent: 'center',
        backgroundColor: COLOURS.shades0,
        height: 100,
        avatar: {
            backgroundColor: "black",
        },
        name: {
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: 'center'
        },
        location: {
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            textAlign: 'center',
        },
        //pencil: {
        //    position: 'absolute',
        //    top: 110,
        //    bottom: 0,
        //    right: -5,
        //},
    },

    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        label: {
            fontSize: 16,
            fontWeight: "bold",
            alignSelf: "flex-start",
            marginBottom: 5,
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
    buttonContainer: {
        flex: 1,
        width: "100%",
        padding: 5,
        borderRadius: 4,
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