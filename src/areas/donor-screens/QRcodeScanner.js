import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Linking, Image, Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

//Custom Components
import { COLOURS } from '../../components/Colours';
import MainButton from '../../components/MainButton';

const beneficiaryUrlRegex = /^https:\/\/unifygiving.com\/beneficiary\/#\/(\d+)$/;

export default QRcodeScanner = ({ route, navigation }) => {
    const { t } = useTranslation();

    const [response, setResponse] = useState('');
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraActive, setCameraActive] = useState(true);

    const [scanned, setScanned] = useState(false);

    const [previewUri, setPreviewUri] = useState(null);

    const cameraRef = useRef();
    useEffect(() => {
        const subscribe = navigation.addListener("focus", () => {
            setScanned(false);
        });
    }, [navigation])


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

    const handleBarCodeScanned = ({ type, data }) => {
        // to avoid multiple scan
        if (scanned) return;
        console.log('qrcode scanned', type, data);
        const match = data?.match(beneficiaryUrlRegex);
        if (!match || match.length < 2) {
            setResponse(t("QRCode_NotBeneficiary"));
            setTimeout(() => setResponse(''), 4000);
            return;
        }

        const recipientId = parseInt(match[1]);
        navigation.navigate('DonationHome', { recipientId });
        setScanned(true);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (result && result.assets[0].uri) {
            try {
                setPreviewUri(result.assets[0].uri);
                const scannedResults = await BarCodeScanner.scanFromURLAsync(
                    result.assets[0].uri
                );

                const dataNeeded = scannedResults[0].data;
                setResponse(dataNeeded);
            } catch (error) {
                setResponse('No QR Code Found');
                setTimeout(() => setResponse(''), 4000);
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                    interval: 1
                }}
                onBarcodeScanned={response ? undefined : handleBarCodeScanned}
            />
            {response && (
                <>
                    <View style={styles.responseBox}>
                        <Text style={responseErrorText}>{response}</Text>
                    </View>
                    <View style={{ width: 220 }}>
                        <MainButton
                            nameBtn="Tap to Scan Again"
                            onPress={() => {
                                setPreviewUri(null);
                                setResponse('');
                            }}
                        />
                    </View>
                </>
            )}
            {/* <View style={styles.buttonPickBox}>
                <MainButton nameBtn="Pick from gallery" onPress={pickImage} />
            </View> */}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: COLOURS.shades0,
    },
    text: {
        color: COLOURS.customText,

        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        lineHeight: 20,
    },
    responseBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 270,
        height: 100,
        backgroundColor: 'white',
        marginBottom: 24,
        padding: 20,
    },
    responseText: {
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_700Bold',
    },
    responseErrorText: {
        color: COLOURS.errorColour,
        fontFamily: 'Inter_700Bold',
    },

    buttonPickBox: {
        width: 220,
        position: 'absolute',
        bottom: 100,
    },
});
const responseText = StyleSheet.compose(styles.text, styles.responseText);
const responseErrorText = StyleSheet.compose(
    styles.text,
    styles.responseErrorText
);