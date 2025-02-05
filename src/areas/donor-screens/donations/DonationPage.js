import React, { useState, useEffect, useReducer, } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Button, Card, Checkbox, Icon, SegmentedButtons, Divider } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _, { create } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput, {createNumberMask} from 'react-native-mask-input';

//Components for styling
import { COLOURS } from '../../../components/Colours.js';
import MainButton from '../../../components/MainButton.js';
import MoneyAmountButtons from '../../../components/MoneyAmountButtons.js';
import { formInitState, formReducer } from '../../../helpers/reducers.js';

//Data
import IconSuccessError from '../../../components/IconSuccessError.js';
import { useGetAllRecipientsRTKQuery, useGetRecipientByIdRTKQuery } from '../../../store/slices/recipientSlice.js';
import { useGetCharityByIdRTKQuery } from "../../../store/slices/charitySlice.js";
import { useGetDonationByRecipientIdRTKQuery } from "../../../store/slices/donationSlice.js";

const DonationSchema = Yup.object().shape({
    custom: Yup.number().integer("must be a number")
});

export default DonationPage = ({ route, navigation }) => {
    const { t } = useTranslation("donationHome");
    const insets = useSafeAreaInsets();
    const [occuranceValue, setOccuranceValue] = useState('Single');
    const [value, setValue] = useState(5);
    const [checked, setChecked] = useState(false);
    const { recipientId } = route.params;
    const [hasDefaultPaymentMethod, setHasDefaultPaymentMethod] = useState(false);
    const [amountSelected, setAmountSelected] = useState("Five");
    const [state, dispatchReducer] = useReducer(formReducer, formInitState);
    const selectDateReducer = (state, newDate) =>
    {
        if (isValidDate(newDate))
            return new Date(newDate);
        return null;
    }

    const aMonthAgo = () =>
    {
        var today = new Date();
        today.setMonth(today.getMonth() - 1);
        today.setDate(1);
        return today;
    }
    const [selectStartDate, setSelectStartDate] = React.useReducer(selectDateReducer, aMonthAgo());
    const [selectEndDate, setSelectEndDate] = React.useReducer(selectDateReducer, new Date());

    const selectRecipient = createSelector(
        (res) => res.data,
        (res, recipientId) => recipientId,
        (data, recipientId) => data?.find(recipient => recipient.id === parseInt(recipientId))
    );
    
    const {
        isCustomAmountVerified,
        inputName,
    } = state;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(DonationSchema),
        mode: 'all',
        criteriaMode: 'firstError',
    });

    // const {recipient} = useGetRecipientByIdRTKQuery(recipientId);

    const { recipient, isFetching } = useGetAllRecipientsRTKQuery(undefined, {
        selectFromResult: result => ({
            ...result,
            recipient: selectRecipient(result, recipientId)
        })
    });

    const { data: charity, error, isFetching: charityIsLoading } = useGetCharityByIdRTKQuery(recipient?.charity_id_recipient);

    //Get Donations Given for the Selected Recipient
    //const { data: donations, refetch, isFetching: recipientDonationsLoading } = useGetDonationByRecipientIdRTKQuery(
    //    { id: recipientId, startDate: selectStartDate.toString(), endDate: selectEndDate?.toString() });

    //console.log("donations", donations);

    const handleChangeDataInput = (type, payload) => {
        dispatchReducer({ type, payload });
    };

    useEffect(()=>{
        console.log("DonationHome", route);
    }, [route]);

    useEffect(() => {
        console.log("Updated value:", value);
    }, [value]);

    useEffect(() => {
        console.log("Updated amountSelected:", amountSelected);
    }, [amountSelected]);

    useEffect(() => {
        console.log("Updated occurance:", occuranceValue);
    }, [occuranceValue]);

    const handleDonationSelection = (amountValue, amountText, isCustom = false) => {
        console.log("value, text", amountValue + ", " + amountText);
        setValue(amountValue);

        if (isCustom) {
            setAmountSelected("");
        }
        else {
            console.log("good morning", amountValue);
            setAmountSelected(amountText);
        }
    };

    const onSubmit = (data) => {
        try
        {
            //Payment Methods in Stripe so we do not need the PaymentMethod screens in MVP. Might bring back post-MVP.
            //if (hasDefaultPaymentMethod) {
                navigation.navigate('Donation Summary', {
                    key: recipient?.id,
                    name: recipient?.first_name + " " + recipient?.last_name,
                    location: recipient?.city + "," + recipient?.country,
                    dob: recipient?.dob,
                    avatar: recipient?.picture,
                    story: recipient?.story,
                    amount: value,
                    occurance: occuranceValue,
                    anonymous: checked,
                    charityId: charity?.id,
                });
            //} else {
            //    navigation.navigate('PaymentMethod', {
            //        key: recipient?.id,
            //        name: recipient?.first_name + " " + recipient?.last_name,
            //        location: recipient?.city + "," + recipient?.country,
            //        dob: recipient?.dob,
            //        avatar: recipient?.picture,
            //        story: recipient?.story,
            //        amount: value,
            //        anonymous: checked
            //    });
            //}

        } catch (error) {
            console.error('Donation failed:', error);
            Alert.alert(error)
            setResponseError('customAmount');
        }
    };

    console.log("recip", recipient);

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ paddingBottom: 40}}>
                <View style={styles.recipient}>
                    <Image source={{ uri: recipient?.picture }} style={styles.avatar} />
                    <View style={styles.recipientDetails}>
                        <Text style={styles.recipientName}>{recipient?.first_name} {recipient?.last_name}</Text>
                        <Text style={styles.recipientLocation}>{recipient?.city + ", " + recipient?.country}</Text>
                    </View>
                </View>
                <View style={styles.recipientStory}>
                    <Text numberOfLines={3}>
                        {recipient?.story}
                    </Text>
                </View>

                <Card mode="outlined" style={styles.donationOptionsContainer}>
                    <Card.Content>
                        {/*Might need POST-MVP*/}
                        {/*<View flexDirection="row" style={styles.occuranceBtnsContainer}>*/}
                        {/*    <View key="0" flex={1} style={{ paddingHorizontal: 5 }}>*/}
                        {/*        <Button*/}
                        {/*            mode="outlined"*/}
                        {/*            onPress={() => setOccuranceValue("Monthly")}*/}
                        {/*            style={occuranceValue === "Monthly" ? styles.occuranceBtnsContainer.selectedOccuranceBtn : styles.occuranceBtnsContainer.unSelectedOccuranceBtns}*/}
                        {/*            theme={{ roundness: 2 }}*/}
                        {/*            labelStyle={occuranceValue === "Monthly" ? styles.occuranceBtnsContainer.selectedOccuranceBtn.text : styles.occuranceBtnsContainer.unSelectedOccuranceBtns.text}*/}
                        {/*        >*/}
                        {/*            {t("monthly")}*/}
                        {/*        </Button>*/}
                        {/*    </View>*/}
                        {/*    <View key="1" flex={1}>*/}
                        {/*        <Button*/}
                        {/*            mode="outlined"*/}
                        {/*            onPress={() => setOccuranceValue("Single")}*/}
                        {/*            style={occuranceValue === "Single" ? styles.occuranceBtnsContainer.selectedOccuranceBtn : styles.occuranceBtnsContainer.unSelectedOccuranceBtns}*/}
                        {/*            theme={{ roundness: 2 }}*/}
                        {/*            labelStyle={occuranceValue === "Single" ? styles.occuranceBtnsContainer.selectedOccuranceBtn.text : styles.occuranceBtnsContainer.unSelectedOccuranceBtns.text}*/}
                        {/*        >*/}
                        {/*            {t("single")}*/}
                        {/*        </Button>*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        <View style={styles.donationSelectionButtons}>
                            <MoneyAmountButtons
                                pageSource="donations"
                                onPress={handleDonationSelection}
                                selected={amountSelected}
                            />
                        </View>

                        <View style={styles.customInputContainer}>
                            <View>
                                <Text style={styles.customInputContainer.inputLabel}>{t("custom")}</Text>
                                <Controller
                                    control={control}
                                    name='customAmount'
                                    defaultValue=''
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <MaskInput
                                            style={[
                                                inputName === 'customAmount' ? inputOnFocus : styles.input,
                                                isCustomAmountVerified &&
                                                (errors.custom
                                                    ? styles.inputError
                                                    : styles.inputSuccess),
                                            ]}
                                            mask={createNumberMask({
                                                prefix: ['£'],
                                                delimiter: ',',
                                                separator: '.',
                                                precision: 0
                                            })}
                                            cursorColor={COLOURS.neutral90}
                                            keyboardType='numeric'
                                            autoCapitalize='none'
                                            autoCompleteType='name'
                                            placeholder={t("custom_tooltip")}
                                            placeholderTextColor={COLOURS.neutral50}
                                            inputMode='numeric'
                                            onChangeText={(masked, unmasked, obfuscated) => {
                                                console.log(unmasked);
                                                onChange(unmasked);
                                                setValue(unmasked);
                                                setAmountSelected("");
                                                handleChangeDataInput('isCustomAmountVerified', true);
                                            }}
                                            value={value}
                                            onFocus={() =>
                                                handleChangeDataInput('inputName', 'customAmount')
                                            }
                                            onBlur={() => {
                                                handleChangeDataInput('inputName', '');
                                                onBlur();
                                                handleChangeDataInput('isCustomAmountVerified', true);
                                            }}
                                            blurOnSubmit={false}
                                            returnKeyType='one'
                                            returnKeyType='done'
                                        />
                                    )}
                                />

                                {/*<IconSuccessError*/}
                                {/*    isError={errors.custom}*/}
                                {/*    isVerified={isCustomAmountVerified}*/}
                                {/*/>*/}

                                <Text style={styles.errorText}>
                                    {errors.custom && errors.custom.message}
                                </Text>
                            </View>
                        </View>

                        <Divider bold='true' style={styles.divider} />

                        <View>
                            <Checkbox.Item
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                color='#6200EE'
                                uncheckedColor='#6200EE'
                                style={styles.checkboxView}
                                label={t("anonymousCheckbox")}
                                position='leading'
                                labelStyle={styles.checkboxLabel}
                            />

                        </View>
                    </Card.Content>
                </Card>

                <View style={styles.charityPartnerContainer}>
                    <Text style={styles.charityPartnerContainer.header}>{t("charityPartner")}</Text>
                    {!charityIsLoading &&
                        <View style={styles.recipient}>
                            <Image source={{ uri: charity?.picture }} style={styles.avatar} />
                            <View style={styles.recipientDetails}>
                                <Text style={styles.recipientName}>{charity?.name}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.btnCharity}
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'Recipients',
                                        },
                                        {
                                            name: 'About'
                                        }
                                        ],
                                    });
                                    navigation.navigate('AboutCharity', {
                                        screen: 'About',
                                        id: charity?.id,
                                    });
                                }}
                            >
                                <Text style={styles.btnCharity.btnCharityText}>{t("visitBtnLabel")}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                {/*Not needed for MVP - Will implement Post-MVP maybe*/}
                {/*<View style={styles.donorsStories}>*/}
                {/*    <View flexDirection='row'>*/}
                {/*        <Icon*/}
                {/*            source='heart-circle-outline'*/}
                {/*            color={COLOURS.primaryMain}*/}
                {/*            size={40}*/}
                {/*        />*/}
                {/*        <Text style={styles.donorsStories.storyHeader}>120 Donors</Text>*/}
                {/*    </View>*/}

                {/*    <Divider bold='true' style={styles.divider} />*/}

                {/*    <View> */}
                {/*    {donations.slice(0, 4).map((donorMsg, index) => (*/}
                {/*        <View key={index.toString()} style={{ flexDirection: 'column' }}>*/}
                {/*            <View style={styles.reviewItem}>*/}
                {/*                <Image source={donorMsg.avatar} style={styles.reviewAvatar} />*/}
                {/*                <View style={styles.reviewerDetails}>*/}
                {/*                    <Text style={styles.reviewerName}>*/}
                {/*                        {donorMsg.anonymous === 'false' ? donorMsg.name : 'Anonymous'}*/}
                {/*                    </Text>*/}

                {/*                    <Text style={{ flex: 1, textAlign: 'right' }}>{donorMsg.amount}</Text>*/}
                {/*                </View>*/}
                {/*            </View>*/}
                {/*            <View>*/}
                {/*                {donorMsg.message === '' ?*/}
                {/*                    <Text style={{ fontSize: 12, color: COLOURS.neutral50 }}>16 minutes ago</Text> :*/}
                {/*                    <View>*/}
                {/*                        <Text style={{ fontSize: 14, color: COLOURS.neutral60 }}>{donorMsg.message}</Text>*/}
                {/*                        <Text style={{ fontSize: 12, color: COLOURS.neutral50 }}>16 minutes ago</Text>*/}
                {/*                    </View>*/}
                {/*                }*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    ))}*/}
                {/*    </View>*/}

                {/*    <TouchableOpacity*/}
                {/*        style={styles.btnDonarMsgs}*/}
                {/*        onPress={() => navigation.navigate('Home')}*/}
                {/*    >*/}
                {/*        <Text style={styles.btnDonarMsgs.msgText}>{t("allDonors")}</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </ScrollView>

            <View style={[styles.bottom, { paddingBottom: insets.bottom }]}>
                <MainButton
                    disabled={false}
                    onPress={handleSubmit(onSubmit)}
                    nameBtn={t("donateBtnLabel")}
                    style={{ elevation: 0 }}
                />

                <TouchableOpacity onPress={() => navigation.navigate('HowItWorks')}>
                    <Text style={styles.howItWorksText}>{t("howItWorks")}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    occuranceBtnsContainer: {
        width: '99%',

        selectedOccuranceBtn: {
            backgroundColor: COLOURS.neutral20,
            borderColor: COLOURS.primaryMain,
            width: '100%',
            text: {
                fontSize: 14,
                color: COLOURS.primaryMain
            },
        },

        unSelectedOccuranceBtns: {
            backgroundColor: COLOURS.shades0,
            borderColor: COLOURS.neutral40,
            width: '100%',
            text: {
                fontSize: 14,
                color: COLOURS.neutral60
            },
        },
    },

    customInputContainer: {
        paddingHorizontal: 5,
        inputLabel: {
            fontSize: 14,
            paddingVertical: 4,
        },
        inputText: {
            borderWidth: 1,
            borderRadius: 5,
            padding: 10
        },
    },

    donationOptionsContainer: {
        backgroundColor: COLOURS.shades0,
        borderColor: COLOURS.neutral30
    },

    charityPartnerContainer: {
        paddingVertical: 10,
        header: {
            fontSize: 16, fontWeight: 'bold', textAlign: 'left'
        },
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 100,
        backgroundColor: 'white',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    bottom: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        width: '106%',
        padding: 10,
        paddingBottom: 15,
        backgroundColor: COLOURS.shades0,
        zIndex: 50,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    recipient: {
        flexDirection: 'row',
        width: window.width,
        height: 80,
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 25,
        marginRight: 10,
    },
    recipientDetails: {
        flex: 1,
        textAlign: 'left',
    },
    recipientName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    recipientLocation: {
        color: 'grey',
        fontSize: 12,
    },
    recipientStory: {
        textAlign: 'left',
        width: window.width,
        height: 73,
    },
    donationAmounts: {
        flexDirection: 'column',
        width: window.width,
        height: 317,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    divider: {
        color: '#D5CDE0',
        width: '100%',
        alignSelf: 'center',
        marginVertical: 12,
    },
    checkboxView: {
        width: 295,
        paddingStart: 0,
        height: 35,
        marginStart: -8,
    },
    checkboxLabel: {
        textAlign: 'left',
        height: 25,
    },

    donationSelectionButtons: {
        paddingVertical: 10
    },

    btnCharity: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOURS.primaryMain,
        width: 89,
        height: 37,
        btnCharityText: {
            color: COLOURS.primaryMain,
            padding: 10,
            fontWeight: 'bold',
        },
    },
    //donorsStories: {
    //    padding: 10,
    //    borderWidth: 1,
    //    borderRadius: 5,
    //    storyHeader: {
    //        fontSize: 20,
    //        fontWeight: 'bold',
    //        alignSelf: 'center',
    //    },
    //},

    reviewItem: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        width: window.width,
        height: 70,
    },
    reviewAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewerDetails: {
        flex: 1,
        flexDirection: 'row',
    },
    reviewerName: {
        fontWeight: 'bold',
    },

    btnDonarMsgs: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOURS.primaryMain,
        width: 128,
        height: 32,
        msgText: {
            color: COLOURS.primaryMain,
            padding: 4,
            fontWeight: 'bold',
        },
    },

    howItWorksText: {
        color: COLOURS.primaryMain,
        fontSize: 14,
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

    input: {
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLOURS.neutral40,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
    },
});

const inputOnFocus = StyleSheet.compose(styles.input, styles.inputOnFocus);