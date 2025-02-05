import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { useCreateNewBusinessTransactionRTKMutation } from '../../store/slices/businessSlice';
import { EasyModalResultsDefaultData, EasyModalResultsGeneric } from '../../components/ModalResultsGeneric';

export default function ({ navigation, route }) {
    const {user} = useAuth();
    const { qrcode, amount, products } = route.params;
    const [modalData, setModalData] = useState(EasyModalResultsDefaultData());
    const [createTransaction, {
        isLoading: createTransactionLoading,
        isError: createTransactionError,
        isSuccess: createTransactionSuccess,
        data: createTransactionData,
        error: createTransactionErrorData,
    }] = useCreateNewBusinessTransactionRTKMutation();

    const confirmTransaction = async () => {
        try {
            data = await createTransaction({ businessId: user.businesses[0], qrcode, amount, products }).unwrap();
            setModalData({
                success: true,
                title: "Success",
                isModalVisible: true,
                message: `Transaction successful. Transaction ID: ${data.transaction_id}`,
                buttonText: "Back to Home",
                handleAction: () => {
                    setModalData({ ...modalData, isModalVisible: false });
                    navigation.navigate("Home");
                },
            });
        } catch (error) {
            setModalData({
                success: false,
                title: "Transaction failed",
                isModalVisible: true,
                message: error.data.error ?? "Transaction failed",
                buttonText: "Back to Home",
                handleAction: () => {
                    setModalData({ ...modalData, isModalVisible: false });
                    navigation.navigate("Home");
                },
            });
        }
    }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title title="Confirm" />
                <Card.Content>
                    <Text style={styles.text}>Transaction</Text>
                    <Text style={styles.text}>QR Code: {qrcode}</Text>
                    <Text style={styles.text}>Amount: £{amount}</Text>
                    <Text style={styles.text}>Products: {products}</Text>
                </Card.Content>
                <Card.Actions>
                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={confirmTransaction} />
                    </View>
                </Card.Actions>
            </Card>
            <EasyModalResultsGeneric data={modalData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        fontSize: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});