import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, Platform, FlatList, ScrollView, StyleSheet, SafeAreaView, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Card, Text, Button, Icon } from 'react-native-paper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth.js';
import { useGetAllCharitiesRTKQuery } from "../../store/slices/charitySlice.js";
import { useGetAllRecipientsRTKQuery } from '../../store/slices/recipientSlice.js';
//import { fetchRecipients } from '../../store/slices/recipientSlice.js';

//Components for styling
import { COLOURS } from '../../components/Colours.js';
import useCustomQuery from '../../lib/hooks/useCustomQuery';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { LoadingPlaceHolder } from '../../components/LoadingPlaceHolder.js';
//import { Item } from '../../../node_modules/react-native-paper/lib/typescript/components/List/List';

const phoneWidth = Dimensions.get("window").width;
const phoneHeight = Dimensions.get("window").height;

const RecipientCardLoading = ({ index }) => {
    return (
        <Card style={{ width: 150, height: 247, marginEnd: 16 }}>
            <View style={styles.recipientsContainer.img}>
                <LoadingPlaceHolder width={105} height={105} round={true}></LoadingPlaceHolder>
            </View>
            <Card.Content>
                <View style={{ marginTop: 20 }}>
                    <LoadingPlaceHolder width={100} height={10} round={false}></LoadingPlaceHolder>
                </View>
                <View style={{ marginTop: 10 }}>
                    <LoadingPlaceHolder width={80} height={10} round={false}></LoadingPlaceHolder>
                </View>
                <View style={{ marginTop: 10 }}>
                    <LoadingPlaceHolder width={120} height={10} round={false}></LoadingPlaceHolder>
                </View>
            </Card.Content>
        </Card>
    )
};

const CharitySparesLoading = ({ index }) => {
    return (
        <View key={index.toString()} style={{ padding: 5 }}>
            <LoadingPlaceHolder width={75} height={75} round={true}></LoadingPlaceHolder>
        </View>
    )
}

export default function DonorHome({ navigation }) {
    const { t, i18n } = useTranslation("donorHome");

    const dispatch = useDispatch();
    const auth = useAuth();

    React.useEffect(() => {
        console.log(auth);
    }, [auth]);

    const { data: charities, error: charityIsError, isFetching: charityIsLoading } = useGetAllCharitiesRTKQuery();

    const { data: recipients, error: recipientError, isFetching: recipientIsLoading } = useGetAllRecipientsRTKQuery();

    const CharitySpares = ({ nav }) => {
        if (charityIsLoading)
            return (
                <>
                    <CharitySparesLoading index={0}></CharitySparesLoading>
                    <CharitySparesLoading index={1}></CharitySparesLoading>
                    <CharitySparesLoading index={2}></CharitySparesLoading>
                </>
            );

        return (
            <FlatList
                horizontal={true}
                data={charities}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: charity, index }) => (
                    <TouchableOpacity
                        key={index.toString()}
                        onPress={() => {
                            nav.navigate('AboutCharity', {
                                screen: 'About',
                                id: charity.id,
                            });
                        }}
                        style={styles.charityContainer} >
                        <Avatar.Image size={68} source={{ uri: charity.picture }} />
                        <Text style={styles.charityContainer.content.name}>{charity.name}</Text>
                    </TouchableOpacity>
                )} />
        );
    };

    const RecipientCard = ({ nav, index }) => {
        if (recipientIsLoading) return (
            <>
                <RecipientCardLoading index={0} />
                <RecipientCardLoading index={1} />
                <RecipientCardLoading index={2} />
            </>
        );
        return (
            <FlatList
                horizontal={true}
                data={recipients}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: recipient, index }) => (
                    <TouchableOpacity key={index.toString()} style={{ marginBottom: 10 }} onPress={
                        () =>
                            nav.navigate('DonationHome',
                                {
                                    recipientId: recipient.id
                                }
                            )
                    } >
                        <Card style={styles.recipientsContainer.recipCard} theme={{ roundness: 4 }}>
                            <Card.Cover
                                source={{ uri: recipient.picture }}
                                style={styles.recipientsContainer.img}
                            />
                            <Card.Title
                                title={recipient?.first_name + " " + recipient?.last_name}
                                subtitle={
                                    <Text style={styles.recipientsContainer.subtitle}>
                                        <Icon
                                            source="map-marker-outline"
                                            size={16}
                                        />
                                        {recipient?.city}, {recipient?.country}
                                    </Text>
                                }
                                numberOfLines={2}
                                subtitleNumberOfLines={2}
                                titleStyle={styles.recipientsContainer.title}
                                subtitleStyle={[styles.recipientsContainer.subtitle, { fontSize: 12 }]}
                                titleVariant="titleMedium"
                                subtitleVariant="labelSmall"
                            />
                            <Card.Content style={styles.recipientsContainer.storyCard}>
                                <Text variant="bodyMedium" numberOfLines={2} style={styles.recipientsContainer.storyCard.storyText}>
                                    {recipient?.story
                                        ? recipient?.story
                                        : 'Lorem ipsum dolor sit amet, tas'}
                                </Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )} />
        );
    };

    return (
        <ScrollView >
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor={COLOURS.shades0}
            />
            <View flexDirection="column" style={styles.contentContainer}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingContainer.header}>
                        {`${t("hello")} ${auth?.user.firstName} ${auth?.user.lastName}`}</Text>
                    <Text style={styles.greetingContainer.content}>{t("helloMessage")}</Text>
                </View>
                <ImageBackground source={require("../../../assets/DonorHome_images/Frame4242.png")}
                    resizeMode="cover" style={styles.coverMessagesContainers}
                    imageStyle={styles.coverMessagesContainers.img}
                >
                    <Text style={styles.coverMessagesContainers.messageText}>
                        {t("titleMessage")}
                    </Text>
                    <View style={styles.coverMessagesContainers.coverButtonContainer}>
                        <Button
                            mode="outlined"
                            style={styles.coverMessagesContainers.coverButton}
                            onPress={() => navigation.navigate('Donation')}
                            textColor={COLOURS.shades0}
                            theme={{ roundness: 2 }}
                            labelStyle={styles.coverMessagesContainers.messageText}
                        >
                            {t("donateButton")}
                        </Button>
                    </View>
                </ImageBackground>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeader.text}>{t("recipientListHeader")}</Text>
                    <Button mode='text'
                        onPress={() => navigation.navigate('Donation')}
                        labelStyle={styles.sectionHeader.button}
                    >
                        {t("showAllButton")}
                    </Button>
                </View>
                <RecipientCard nav={navigation} />
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeader.text}>{t("charityTitle")}</Text>
                    <Button mode='text'
                        onPress={() => navigation.navigate('ListOfCharities')}
                        labelStyle={styles.sectionHeader.button}
                    >
                        {t("showAllButton")}
                    </Button>
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.charitySubtitle}>{t("charitySubtitle")}</Text>
                </View>
                <CharitySpares nav={navigation} />
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeader.text}>{t("howItWorks")}</Text>
                </View>
                <ImageBackground source={require("../../../assets/DonorHome_images/Frame4045.png")}
                    resizeMode="stretch" style={styles.coverMessagesContainers}
                    imageStyle={styles.coverMessagesContainers}
                >
                    <Text style={styles.coverMessagesContainers.messageText}>
                        {t("howItWorksContent")}
                    </Text>
                    <View style={styles.coverMessagesContainers.coverButtonContainer}>
                        <Button
                            mode="outlined"
                            style={styles.coverMessagesContainers.coverButton}
                            onPress={() => navigation.navigate('HowItWorks')}
                            textColor={COLOURS.shades0}
                            theme={{ roundness: 2 }}
                            labelStyle={styles.coverMessagesContainers.messageText}
                        >
                            {t("showMoreButton")}
                        </Button>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    //containers
    container: {
        flex: 1,
        width: phoneWidth,
        height: phoneHeight,
        backgroundColor: COLOURS.shades0,
    },

    contentContainer: {
        width: phoneWidth,
        paddingHorizontal: 10,
        paddingBottom: 40,
    },

    greetingContainer: {
        width: "100%",
        padding: 20,
        marginBottom: 2,
        header: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 20,
            fontWeight: 'bold',
            color: COLOURS.neutral90,
            textAlign: 'left',
            right: 10,
        },
        content: {
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            textAlign: 'left',
            right: 10,
            marginTop: 10,
        },
    },

    coverMessagesContainers: {
        width: '100%',
        height: 200,
        marginTop: 5,
        marginBottom: 5,
        paddingBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        img: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
        },
        messageText: {
            fontSize: 14,
            width: "90%",            
            fontFamily: 'Inter_600SemiBold',
            color: COLOURS.shades0,
        },
        coverButtonContainer: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
            paddingRight: 10,
        },
        coverButton: {
            borderColor: 'white',
            width: 140,
        }
    },

    sectionHeader: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        text: {
            flex: 1,
            fontSize: 20,
            fontFamily: 'Inter_600SemiBold',
        },
        button: {
            color: '#6200EE',
            fontFamily: 'Inter_600SemiBold',
            fontStyle: 'normal',
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'right',
        }
    },

    howItWorksContainer: {
        width: '100%',
        height: 176,
        backgroundColor: COLOURS.shades0,
        marginBottom: 2,
        img: {
            width: "100%",
            height: 200,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
        },
        actions: {
            position: 'absolute',
            bottom: -40,
            alignSelf: 'flex-end',
        },
        content: {
            position: 'absolute',
            bottom: 10,
            width: "100%",
            height: 36,
        },
        header: {
            fontFamily: 'Inter_400Regular',
            fontSize: 18,
            fontWeight: 'bold',
            color: COLOURS.neutral90,
            textAlign: 'left',
        },
        messageText: {
            fontSize: 14,
            fontFamily: 'Inter_600SemiBold',
            color: COLOURS.shades0,
        },

    },

    recipientsContainer: {
        width: "100%",
        paddingVertical: 10,
        backgroundColor: COLOURS.shades0,
        marginBottom: 2,
        recipCard: {
            width: 142,
            height: 247,
            alignItems: "center",
            marginRight: 10,
        },
        storyCard: {
            top: -14,
            storyText: {
                fontSize: 12,
                width: 130,
                color: COLOURS.neutral60
            },
        },
        img: {
            height: 142,
            width: 142,
            alignSelf: "center",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        title: {
            fontSize: 16,
        },
        subtitle: {
            right: 2,
            bottom: 5,
            fontSize: 12,
            color: COLOURS.neutral60,
        },
    },
    avatar: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 0.5,
        borderColor: COLOURS.neutral30,
        borderStyle: 'solid',
        height: 75,
        width: 75,
        margin: 5,
    },

    charityContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 2,
        content: {
            name: {
                textAlign: 'center',
                width: 100,
            }
        },
    },

    //End of Containers

    //headers
    cardTitles: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLOURS.neutral90,
        textAlign: 'left',
        right: 10,
    },

    //End of headers

    //recipient and charity list action buttons
    listCardActions: {
        width: "100%",
        position: 'absolute',
        top: -12,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        btnViewAll: {
            color: '#6200EE',
            fontFamily: 'Inter_400Regular',
            fontStyle: 'normal',
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'right',
        },
    },

    //End of recipient and charity list action buttons
});