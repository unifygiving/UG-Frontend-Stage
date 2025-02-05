import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import
    {
        useWindowDimensions,
        ScrollView,
        StyleSheet,
        Text,
        View,
        Image,
        TouchableOpacity,
    } from 'react-native';
import { Avatar, Card, Button, Icon } from 'react-native-paper';
import { COLOURS } from '../../components/Colours';

//Impact Maps with Dots
import UKImpactMapSvg from '../../components/svgComponents/impactMaps/UKImpactMapSvg';
import PortugalImpactMapSvg from '../../components/svgComponents/impactMaps/PortugalImpactMapSvg';
import SpainImpactMapSvg from '../../components/svgComponents/impactMaps/SpainImpactMapSvg';
import GermanyImpactMapSvg from '../../components/svgComponents/impactMaps/GermanyImpactMapSvg';
import IndiaImpactMapSvg from '../../components/svgComponents/impactMaps/IndiaImpactMapSvg';

import HeartInCircleSvg from '../../components/svgComponents/HeartInCircleSvg';
import RecurryInCircleSvg from '../../components/svgComponents/RecurryInCircleSvg';

import MainButton from '../../components/MainButton';

import PointsOnMap from '../../components/PointsOnMap';
import ImpactDropDownMenu from '../../components/ImpactDropDownMenu';
import ImpactEmojiRocketSvg from '../../components/svgComponents/ImpactEmojiRocket';
import AnimatedSvg from '../../components/AnimatedSvg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { selectUser } from '../../store/slices/userSlice';
import { useGetSumDonationsByDonorIdRTKQuery } from "../../store/slices/donationSlice.js";
import { getImpactResults } from "../../services/donation/index"

const Impact = ({ navigation }) =>
{
    const { t, i18n } = useTranslation("Impact");

    const { height, width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const [showMap, setShowMap] = useState('uk');
    const { user } = useSelector(selectUser);
    const [impactResults, setImpactResults] = useState(); 
    const handleChangeMap = (country) =>
    {
        setShowMap(country);
    };

    const { data, refetch, isFetching } = useGetSumDonationsByDonorIdRTKQuery(
        { id: user.id });
    console.log("data ", data);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const result = await getImpactResults();
                setImpactResults(result);
            } catch (error)
            {
                console.error(JSON.stringify(error));
            }
        };

        fetchData();
    }, []);

    const britainMapSettings = {
        width: 246,
        height: 286,
        lonMin: -8.091102,
        lonMax: 1.468843,
        latMin: 50.00591,
        latMax: 58.5908609,
    };

    const currency = 'GBP';

    const formatCurrency = (amount, currency) =>
    {
        //Use the Intl.NumberFormat API for currency formatting
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    };

    const renderCountryMap = (countrySelected, IsFetchingMap, IsFetchingAmount = false) =>
    {
        switch (_.toLower(countrySelected))
        {
            case 'germany':
                return (IsFetchingMap ? <GermanyImpactMapSvg /> : (IsFetchingAmount ? 1 : "Germany"))
            case 'india':
                return (IsFetchingMap ? <IndiaImpactMapSvg /> : (IsFetchingAmount ? 2 : "India"))
            case 'portugal':
                return (IsFetchingMap ? <PortugalImpactMapSvg /> : (IsFetchingAmount ? 7 : "Portugal"))
            case 'spain':
                return (IsFetchingMap ? <SpainImpactMapSvg /> : (IsFetchingAmount ? 5 : "Spain"))
            case 'uk':
                return (IsFetchingMap ? <UKImpactMapSvg /> : (IsFetchingAmount ? 7 : "UK"))
        }
    };

    return (
        <ScrollView style={[{ width, height }, { backgroundColor: COLOURS.white }]}>
            <View style={styles.container}>
                <Card style={styles.countContainer}>
                    <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
                        <View>
                            <Text style={styles.headerText}>
                                <Text style={styles.amount}>{renderCountryMap(showMap, false, true)} </Text>
                                {t("amountOfCharitiesHeader")} {renderCountryMap(showMap, false, false)}
                            </Text>
                        </View>
                        {/*<View style={styles.countWrapper}>*/}
                        {/*    <Text style={styles.amount}>{impactResults?.UgTotalHelpedRecipientsCount}</Text>*/}
                        {/*    <Text style={styles.text}>People helped</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.countWrapper}>*/}
                        {/*    <Text style={styles.amount}>{formatCurrency(Math.round(impactResults?.ugTotalDonationsAmount), currency)}</Text>*/}
                        {/*    <Text style={styles.text}>Total Donated</Text>*/}
                        {/*</View>*/}
                    </Card.Content>
                </Card>

                <View style={styles.dropdownContainer}>
                    <Text style={styles.textSelect}>{t("countryChoice")}</Text>
                    <ImpactDropDownMenu changeCountry={handleChangeMap} />
                </View>

                <View
                    style={[
                        styles.mapContainer,
                        {
                            marginBottom: user.congrats ? 0 : 24,
                            width: showMap === 'spain' ? 312 : (showMap === 'india' ? 282 : 260)
                        },
                    ]}
                >
                    {renderCountryMap(showMap, true)}
                </View>
                
                <View style={styles.infoContainer}>
                    <Card style={[styles.info, { marginBottom: 10 }]} mode='contained'>
                        <Card.Content style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 0, paddingVertical: 0 }}>
                            <HeartInCircleSvg />
                            <View style={{ marginLeft: 24 }}>
                                <Text style={textInfo}>{t("contributionTitle")}</Text>
                                <Text style={amountInfo}>{formatCurrency(Math.round(data?.donationsGivenSum), currency)}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={[styles.info, { marginBottom: 20 }]} mode='contained'>
                        <Card.Content style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 0, paddingVertical: 0 }}>
                            <RecurryInCircleSvg />
                            <View style={{ marginLeft: 24 }}>
                                <Text style={textInfo}>{t("ReoccurringTitle")}</Text>
                                <Text style={amountInfo}>{data?.supportCount}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={[{ marginBottom: 20 }]} mode='contained'>
                        <Card.Cover
                            source={require('../../../assets/Impact/ImpactImage.jpg')}
                            style={styles.image}
                            resizeMode='cover'
                        />
                        <Card.Content style={styles.textContainer}>
                            <Text style={styles.textDescription}>
                                <Text style={styles.boldText}>{t("imageMessage1")}</Text>
                                {t("imageMessage2")}
                            </Text>
                        </Card.Content>
                    </Card>
                    <MainButton
                        nameBtn={t("btnDonateTitle")}
                        onPress={() => navigation.navigate('Donation')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    countContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingVertical: 24,
        paddingHorizontal: 44,
    },
    countWrapper: {
        alignItems: 'center',
    },
    amount: {
        marginBottom: 3,
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 28,
    },
    headerText: {
        marginBottom: 3,

        color: COLOURS.customText,

        fontFamily: 'Inter_600SemiBold',
        fontSize: 28,
    },
    text: {
        color: COLOURS.customText,

        fontFamily: 'Inter_500Medium',
        fontSize: 15,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

        marginRight: 44,
    },
    textSelect: {
        marginRight: 10,

        color: COLOURS.neutral,

        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
        lineHeight: 20,
    },
    mapContainer: {
        position: 'relative',
        alignSelf: 'center',
        height: 293,
        marginTop: 10,
    },
    congratsContainer: {
        flexDirection: 'row',

        backgroundColor: COLOURS.neutral10,
        marginVertical: 24,
        marginHorizontal: 20,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    congratsText: {
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_700Bold',
    },
    infoContainer: {
        position: 'relative',

        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,

        backgroundColor: COLOURS.neutral10,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',

        padding: 12,
        borderRadius: 8,

        backgroundColor: COLOURS.white,
    },
    textInfo: {
        color: COLOURS.additionalText,
    },
    amountInfo: {
        fontSize: 26,
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    textContainer: {
        padding: 16,

        backgroundColor: COLOURS.white,
    },
    textDescription: {
        color: COLOURS.placeholderColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        lineHeight: 19,
    },
    boldText: {
        color: COLOURS.neutral60,

        fontFamily: 'Inter_600SemiBold',
    },
});
const textInfo = StyleSheet.compose(styles.text, styles.textInfo);
const amountInfo = StyleSheet.compose(styles.amount, styles.amountInfo);
export default Impact;
