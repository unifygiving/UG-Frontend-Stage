import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Button, Divider, Icon, IconButton, SegmentedButtons } from 'react-native-paper';
import Modal from 'react-native-modal';
import _, { forEach } from 'lodash';
import uuid from 'react-native-uuid';
import { skipToken } from '@reduxjs/toolkit/query/react';

import { useGetAllRecipientsRTKQuery, useFilterRecipientsRTKQuery, useGetAllLocationsRTKQuery} from '../../../store/slices/recipientSlice.js';

//Components and Helpers
import { COLOURS } from '../../../components/Colours.js';

export default DonationRecipientsList = ({ navigation }) => {
    const { t } = useTranslation("donationRecipientsList");

    // Variable states
    const [filterOptions, setFilterOptions] = useState({ location: null });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectLocation, setSelectLocation] = useState("");
    //const [location, setLocation] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);

    // Fetch all recipients initially
    const { data: recipients, isFetching, isError } = useGetAllRecipientsRTKQuery();

    // Fetch locations only when the modal is opened
    const { data: locations } = useGetAllLocationsRTKQuery(recipients ? recipients : skipToken);

    // Fetch filtered recipients based on location
    const { data: filteredRecipients } = useFilterRecipientsRTKQuery(filterOptions, {
        skip: !filterOptions.location, // Skip if no location is selected
    });

    const showFilterModal = () => {
       // if (location) setSelectLocation(location);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const applyFilter = () => {
        //setLocation(selectLocation);
        setFilterOptions({
            location: selectLocation,
        });
        closeModal();
    };

    // Refresh function to reset filters
    const handleRefresh = (resetFilters) => {
        if (resetFilters) {
            //setLocation(null);
            setSelectLocation(null);
            setFilterOptions({ location: null });
        }
    };

    const recipientList = filterOptions.location ? filteredRecipients : recipients;
    console.log("location", locations);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={isFetching}
                    onRefresh={() => handleRefresh(true)}
                />
            }
        >
            <View style={styles.instructions}>
                <Image source={require('../../../../assets/DonorHome_images/unifyCard.png')} style={styles.instructions.instructionsImage} />
                <Text style={styles.instructions.instructionsText}>{t("instruction")}</Text>
            </View>

            <View style={styles.filters}>
                <TouchableOpacity
                    style={styles.filters.btnQRCode}
                    onPress={() => navigation.navigate('QR code Scanner')}
                >
                    <Text style={styles.filters.btnQRCode.text}>{t("findButton")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filters.filterButtons}
                    onPress={() => handleRefresh(true)}
                >
                    <Icon
                        source="restart"
                        color={COLOURS.primaryMain}
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showFilterModal}
                    style={styles.filters.filterButtons}
                >
                    <Icon
                        source={require('../../../../assets/icons/setting1.png')}
                        color={COLOURS.primaryMain}
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            {recipientList?.map((recipient, index) => (
                <View key={index.toString()} style={styles.recipientItem}>
                    <Image source={{ uri: recipient.picture }} style={styles.recipientItem.avatar} />
                    <View style={styles.recipientItem.recipientDetails}>
                        <Text style={styles.recipientItem.recipientName}>{recipient?.first_name + " " + recipient?.last_name}</Text>
                        <Text style={styles.recipientItem.recipientLocation}>{recipient?.city + ", " + recipient?.country}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.btnDonate}
                        onPress={() => navigation.navigate('DonationHome', { recipientId: recipient.id })}
                    >
                        <Text style={styles.btnDonate.donateText}>{t("donateButton")}</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {/* Filter Modal */}
            <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.filterModal}>
                <View style={styles.filterModal.content}>
                    <View flexDirection='row' style={styles.filterModal.filterTitle}>
                        <Text flex={1} style={styles.filterModal.filterLabels}>{t("filterTitle")}</Text>
                        <IconButton flex={0.5} icon="close" iconColor={COLOURS.neutral90} size={24} onPress={closeModal} />
                    </View>

                    <Divider bold='true' style={styles.divider} />
                    <Text style={styles.filterModal.filterLabels}>{t("location")}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.filterModal.scrollviewContent }>
                        {/* Location Filter Options */}
                        {locations && locations?.map((loc, index) => (
                            <View key={index.toString()} style={styles.filterModal.filterButtonsContainer }>
                                <Button
                                    mode="outlined"
                                    onPress={() =>
                                    {
                                        console.log('selected location', loc);
                                        setSelectLocation(loc);
                                        setIsDisabled(loc == selectLocation);
                                    }}
                                    style={selectLocation === loc ? styles.filterModal.filterButtonsContainer.btnSelectedFilter : styles.filterModal.filterButtonsContainer.btnUnSelectedFilter}
                                    theme={{ roundness: 2 }}
                                    labelStyle={[
          {
              color: selectLocation === loc ? COLOURS.primaryMain : COLOURS.neutral60,
          },
          styles.filterModal.btnText,
                                    ]}
                                >
                                    {loc}
                                </Button>
                        </View>
                        ))}
                    </ScrollView>
                    <Divider bold='true' style={styles.divider} />
                    <TouchableOpacity
                        disabled={isDisabled}
                        style={[styles.btnDonate, { alignSelf: 'center', margin: 10, backgroundColor: isDisabled ? COLOURS.neutral40 : COLOURS.shades0 }]}
                        onPress={applyFilter}
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
    },
  
    filters: {
        flexDirection: 'row',
        width: window.width,
        marginHorizontal: 10,

        btnQRCode: {
            backgroundColor: COLOURS.primaryMain,
            paddingVertical: 12,
            borderRadius: 5,
            alignItems: 'center',
            flex: 1,
            width: 216,
            height: 48,
            text: {
                color: 'white',
                fontWeight: 'bold',
            },
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

    recipientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        width: window.width,
        height: 70,

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
    },

    filterModal: {
        top: "28%",
        maxWidth: 360,
        maxHeight: 300,
        backgroundColor: COLOURS.shades0,
        scrollviewContent: {
            flexDirection: 'column',
            height: 255,
            flexWrap: 'wrap'
        },
        filterButtonsContainer: {
            paddingRight: 8,
            paddingVertical: 5,
            btnText: {
                fontSize: 14,
            },
            btnSelectedFilter: {
                borderColor: COLOURS.primaryMain,
                backgroundColor: COLOURS.primarySurface,
            },
            btnUnSelectedFilter: {
                borderColor: COLOURS.neutral40,
            },
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

        filterTitle: {
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },

        filterLabels: {
            fontSize: 16,
            paddingVertical: 8
        },
    }, 

    
});