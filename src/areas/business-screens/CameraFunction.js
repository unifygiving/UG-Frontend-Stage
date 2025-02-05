import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Card, Modal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'; //redux
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { COLOURS } from '../../components/Colours.js';
import MainButton from '../../components/MainButton.js';
import { decodePaymentQRCode } from '../../helpers/beneficiaryQRCode.js';
import { useAuth } from '../../hooks/useAuth.js';
import { EasyModalResultsGeneric, EasyModalResultsDefaultData } from '../../components/ModalResultsGeneric.js';

//Api Hooks
import { useCreateNewBusinessTransactionRTKMutation, useGetRecipientByQRCodeRTKQuery } from "../../store/slices/businessSlice.js";

export default CameraFunction = ({ route, navigation }) => {
    const { posTranNumber, posTranTotal } = route.params;
    const { user } = useAuth();
    const [permission, requestPermission] = useCameraPermissions();
    const [response, setResponse] = useState('');
    const [shouldScan, setShouldScan] = useState(true);
    const [modalData, setModalData] = useState(EasyModalResultsDefaultData);

    const [
        createBusinessTransaction,
        { isLoading: isBusinessTransactionCreating }
    ] = useCreateNewBusinessTransactionRTKMutation();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const handleBarCodeScanned = async ({ data }) => {
        const qrdata = data;
        if (!shouldScan) return;
        try {
            setShouldScan(false);
            const code = decodePaymentQRCode(qrdata);
            navigation.navigate('Transaction', { qrcode: code, amount: posTranTotal, products: "food" });
        } catch (e) {
            setModalData({
                success: false,
                title: "Error",
                handleAction: () => {
                    setModalData({ success: false, title: "Error", isModalVisible: false });
                    setTimeout(setShouldScan(true), 1000);
                },
                isModalVisible: true,
                message: e.message,
                buttonText: "Retry",
            })
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                    interval: 10
                }}
                onBarcodeScanned={shouldScan ? handleBarCodeScanned : null}
            >
                <View style={styles.messageContainer}>
                    <Card style={styles.messageContainer.messageCard}>
                        <Card.Title
                            title="Manual card code input will require cardholder push notification confirmation. Please scan the Customer's QR Code."
                            titleNumberOfLines={4}
                            titleVariant="labelLarge"
                            style={styles.messageContainer.messageTitle}
                        />
                    </Card>
                </View>

                <View style={styles.buttonContainer}>
                    <MainButton
                        disabled={response === '' ? true : false}
                        onPress={() => addNewBusinessTransaction}
                        nameBtn="Create Transaction"
                    />
                </View>
            </CameraView>
            <EasyModalResultsGeneric
                data={modalData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    messageContainer: {
        padding: 10,
        messageCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        messageTitle: {
            padding: 10,
        }
    },
    buttonContainer: {
        marginHorizontal: 50,
    },
});