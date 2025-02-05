import React, { useState, useEffect } from 'react';
import { Alert, Button, View, ActivityIndicator } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useCreateStripePaymentMutation } from '../../../store/slices/donationSlice.js';

import {useAuth} from "../../../hooks/useAuth.js";

import MainButton from '../../../components/MainButton.js';

export default function CheckoutScreen({ recipientId, checkoutAmount, nameBtn, toggleModal, message, charityId })
{
    const { user } = useAuth();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [isSheetInitialized, setIsSheetInitialized] = useState(false);
    const [createStripePayment] = useCreateStripePaymentMutation();

    const fetchPaymentSheetParams = async () =>
    {
        console.log("fetchpaymentsheetparams start")
        try
        {
            const response = await createStripePayment({
                donor_id: user.id,
                charity_id: charityId,
                recipient_id: recipientId,
                amount_donation: checkoutAmount,
                message: message,
                customer_email: user.email,
                currency: "gbp",
            }).unwrap();

            const { paymentIntent, publishableKey } = response;

            console.log("end fetchpaymentsheetparams")

            return {
                paymentIntent,
                publishableKey,
            };
        }
        catch (error)
        {
            console.error("Error fetching payment sheet params:", error);
            Alert.alert('Error fetching payment params', error.message);
        }
    };

    const initializePaymentSheet = async () =>
    {
        setLoading(true);  // Start loading
        try
        {
            console.log("Initializing Payment Sheet Start");
            const { paymentIntent, publishableKey } = await fetchPaymentSheetParams();

            console.log("Fetched payment intent:", paymentIntent);
            console.log("Fetched publishableKey:", publishableKey);
            if (!paymentIntent || !publishableKey)
            {
                throw new Error("Missing required payment parameters");
            }

            const { error } = await initPaymentSheet({
                merchantDisplayName: "Unify Giving",
                customerEphemeralKeySecret: publishableKey,
                paymentIntentClientSecret: paymentIntent,
                // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                //methods that complete payment after a delay, like SEPA Debit and Sofort.
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: `${user.firstName} ${user.lastName}`,
                },
                returnURL: 'ug://stripe-redirect',
                googlePay: {
                    countryCode: "UK", // Replace with your country code
                    currencyCode: "GBP", // Replace with your currency code
                    testEnv: true, // Set to false in production
                },
            });

            console.log("Init Payment Sheet Error:", error);

            if (!error)
            {
                setIsSheetInitialized(true);
            } else
            {
                Alert.alert('Error initializing payment sheet', error.message);
            }

            console.log("end Initializing Payment Sheet");
        } catch (e)
        {
            console.error("Error in initializePaymentSheet:", e.message);
            Alert.alert('Initialization Error', e.message);
        } finally
        {
            setLoading(false);  // Stop loading regardless of success/failure
        }
    };

    const openPaymentSheet = async () =>
    {
        //Initialize a payment sheet with new data again if isSheetInitialized is false
        if (!isSheetInitialized)
        {
            await initializePaymentSheet();
        }

        const { error } = await presentPaymentSheet();

        if (error)
        {
            console.log("error", error);
            if (error.code === "Canceled")
            {
                setIsSheetInitialized(false);
                openPaymentSheet;
            }
            else
            {
                Alert.alert(`Error code: ${error.code}`, error.message);
            }

        } else
        {
            console.log("Donation Stripe Transaction Successfull");
            toggleModal()
        }
    };

    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            merchantIdentifier="merchant.identifier"
            urlScheme="ug"
        >
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <MainButton
                    disabled={false}
                    onPress={openPaymentSheet}
                    nameBtn={nameBtn}
                    style={{ elevation: 0 }}
                />
            )}
        </StripeProvider>
    );
}
