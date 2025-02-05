import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Divider, Icon, SegmentedButtons } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

//Components for styling
import { COLOURS } from '../../../components/Colours.js';

{/*TODO - POST MVP: Get all messages that other donors have left for the recipient.*/ }
const DonorMessages = ({ navigation }) =>
{
    const { t } = useTranslation("donationRecipientsList");

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [locationValue, setLocationValue] = React.useState('');
    const [genderValue, setGenderValue] = React.useState('');
    const [ageRange, setAgeRange] = React.useState('');

    const toggleModal = () =>
    {
        setModalVisible(!isModalVisible);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.instructions}>
                <Image source={require('../../../../assets/DonorHome_images/unifyCard.png')} style={styles.instructionsImage} />
                <Text style={styles.instructionsText}>
                    {t("instructions")}
                </Text>
            </View>

            <View style={styles.filters}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QR code Scanner')}>
                    <Text style={styles.buttonText}>{t("RecipientSearchBtnLabel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButtons}>
                    <Icon
                        source="restart"
                        color={COLOURS.primaryMain}
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.filterButtons}>
                    <Icon
                        source={require('../../../../assets/icons/setting1.png')}
                        color={COLOURS.primaryMain}
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            {/*TODO - POST MVP: Get all messages that other donors have left for the recipient.*/}

            {/*{recipients.map((recipient, index) => (*/}
            {/*    <View key={index} style={styles.recipientItem}>*/}
            {/*        <Image source={recipient.avatar} style={styles.avatar} />*/}
            {/*        <View style={styles.recipientDetails}>*/}
            {/*            <Text style={styles.recipientName}>{recipient.name}</Text>*/}
            {/*            <Text style={styles.recipientLocation}>{recipient.location}</Text>*/}
            {/*        </View>*/}
            {/*        <TouchableOpacity*/}
            {/*            style={styles.btnDonate}*/}
            {/*            onPress={() => navigation.navigate('DonationHome', {*/}
            {/*                key: recipient.key,*/}
            {/*                name: recipient.name,*/}
            {/*                location: recipient.location,*/}
            {/*                age: recipient.age,*/}
            {/*                avatar: recipient.avatar,*/}
            {/*                story: recipient.story*/}
            {/*            })}*/}
            {/*        >*/}
            {/*            <Text style={styles.btnDonate.donateText}>{t("donateBtnLabel")}</Text>*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*))}*/}

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
            >
                <View style={styles.content}>
                    <Text style={styles.filterLabels}>Filters</Text>
                    <Divider bold='true' style={styles.divider} />
                    <Text style={styles.filterLabels}>Location</Text>
                    <SegmentedButtons
                        value={locationValue}
                        onValueChange={setLocationValue}
                        style={styles.filterOptions}
                        theme={styles.filterOptions.theme}
                        buttons={[
                            {
                                value: 'United Kingdom',
                                label: 'United Kingdom',
                            },
                            {
                                value: 'Portugal',
                                label: 'Portugal',
                            },
                        ]}
                    />
                    <Text style={styles.filterLabels}>Gender</Text>
                    <SegmentedButtons
                        value={genderValue}
                        onValueChange={setGenderValue}
                        style={styles.filterOptions}
                        theme={styles.filterOptions.theme}
                        buttons={[
                            {
                                value: 'Male',
                                label: 'Male',

                            },
                            {
                                value: 'Female',
                                label: 'Female',
                            },
                            {
                                value: 'Other',
                                label: 'Other',
                            },
                        ]}
                    />
                    <Text style={styles.filterLabels}>Age Range</Text>
                    <SegmentedButtons
                        value={ageRange}
                        onValueChange={setAgeRange}
                        density='medium'
                        style={styles.filterOptions}
                        theme={styles.filterOptions.theme}
                        buttons={[
                            {
                                value: '14-21',
                                label: '14-21',
                            },
                            {
                                value: '22-34',
                                label: '22-34',
                            },
                            {
                                value: '35-50',
                                label: '35-50',
                            },
                            {
                                value: '51-67',
                                label: '51-67',
                            },
                            {
                                value: '68+',
                                label: '68+',
                            },
                        ]}
                    />

                    <TouchableOpacity
                        style={[styles.btnDonate, { alignSelf: 'center', margin: 10 }]}
                        onPress={toggleModal}
                    >
                        <Text style={styles.btnDonate.donateText}>{t("applyBtnLabel")}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    instructions: {
        flexDirection: 'row',
        width: window.width,
        height: 74,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#564A67',
        alignSelf: 'center',
        marginBottom: 12,
        marginTop: 2,
        marginHorizontal: 10,
    },
    instructionsImage: {
        flex: 0.3,
        alignSelf: 'center',
        width: 69,
        height: 44,
    },
    instructionsText: {
        flex: 1,
        textAlign: 'left',
        alignSelf: 'center',
    },

    filters: {
        flexDirection: 'row',
        width: window.width,
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: COLOURS.primaryMain,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        width: 216,
        height: 48,
    },

    btnDonate: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOURS.primaryMain,
        width: 89,
        height: 37,
        donateText: {
            color: COLOURS.primaryMain,
            padding: 7,
            fontWeight: 'bold',
        },
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    filterButtons: {
        flex: 0.2,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 48,
        height: 48,
        marginLeft: 8,
    },

    recipientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        width: window.width,
        height: 70,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    recipientDetails: {
        flex: 1,
    },
    recipientName: {
        fontWeight: 'bold',
    },
    recipientLocation: {
        color: 'grey',
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
    filterOptions: {
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        theme: {
            roundness: 5,
        }
    },
    filterLabels: {
        fontSize: 16,
        paddingVertical: 8
    },
});

export default DonationScreen;
