import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../../hooks/useAuth";
import ModalComponent from "../../components/ModalComponent";
import { encodePaymentQRCode } from "../../helpers/beneficiaryQRCode";

export const ClickableQRCode = (props) => {
    const { user } = useAuth();
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TouchableOpacity
                onPress={() => { setVisible(true) }}
            >
                <QRCode
                    value={encodePaymentQRCode(user.qrcode)}
                    size={150}
                />
            </TouchableOpacity>
            <ModalComponent
                isModalVisible={visible}
                onDismiss={() => { setVisible(false) }}
            >
                <TouchableOpacity
                    onPress={() => { setVisible(false) }}
                >
                    <QRCode
                        value={user.qrcode}
                        size={300}
                    />
                </TouchableOpacity>
            </ModalComponent>
        </>
    )
}

const styles = StyleSheet.create({
    qrcodeContainer: {
        flex: 1, height: 200, justifyContent: "center", alignItems: "center"
    },
});