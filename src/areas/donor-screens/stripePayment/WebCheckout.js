import React, { useState, useRef } from "react";

import { View, Text, Button, Linking, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useCreateStripeLinkMutation } from "../../../store/slices/donationSlice";
import { useAuth } from "../../../hooks/useAuth";
import MainButton from '../../../components/MainButton.js';
import { WebView } from 'react-native-webview';
import { useTranslation } from "react-i18next";

export const WebCheckout = ({ recipientId, checkoutAmount, toggleModal, message, charityId }) => {
    const [createStripeLink, { data, error, isLoading }] = useCreateStripeLinkMutation();
    const { user } = useAuth();

    const { t } = useTranslation("webCheckout");

    const [modalVisible, setModalVisible] = useState(false);
    const [paymentLink, setPaymentLink] = useState("");

    const webViewRef = useRef(null);

    const createLink = async () => {
        try {
            const res = await createStripeLink({
                donor_id: user.id,
                charity_id: charityId,
                recipient_id: recipientId,
                amount_donation: checkoutAmount,
                message: message,
                customer_email: user.email,
                currency: "gbp",
                ios: true,
            });
            console.log("Stripe Link", res);
            setPaymentLink(res.data.sessionUrl);
            setModalVisible(true);
        } catch (error) {
            console.log("Error creating stripe link", error);
        }
    }

    const handleOnLoadStart = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log("onLoadStart", nativeEvent);
        const regex = /transaction\/(\d+)(?:\?(cancel|success)=1$)?/gm;
        const url = nativeEvent.url;
        if (url.match(regex)) {
            webViewRef.current.stopLoading();
            setModalVisible(false);
            const m = regex.exec(url);
            console.log(`Transaction ID: ${m[1]}, Status: ${m[2]}`);
            if (m[2] === "cancel") {
                setModalVisible(false);
            } else {
                toggleModal();
                setModalVisible(false);
            }
            console.log(`Transaction ID: ${m[1]}, Status: ${m[2]}`);
        }
    }

    return (
        <>
            <View>
                <MainButton
                    disabled={isLoading | modalVisible}
                    onPress={createLink}
                    nameBtn={isLoading ? t("creatingDonation") : t("donateButton")}
                    style={{ elevation: 0 }}
                />
            </View>
            <Modal animationType="fade"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.webViewContainer}>
                                <Text>Payment Link</Text>
                                <WebView
                                    ref={webViewRef}
                                    source={{ uri: paymentLink }}
                                    style={styles.webView}
                                    onLoadStart={handleOnLoadStart}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal >
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    webViewContainer: {
        height: '75%',
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    webView: {
        flex: 1,
    },
});