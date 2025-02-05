import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, useWindowDimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native';
import { Avatar, Card, Button, Icon } from 'react-native-paper';

//For animation of picture slides scroll
import Carousel from 'react-native-reanimated-carousel';
import Dots from 'react-native-dots-pagination';

import { COLOURS } from '../../components/Colours.js';
import { useHowItWorkSlides } from '../../helpers/slides.js';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar.js';

export default HowItWorks = ({ navigation }) =>
{
    const { t, i18n } = useTranslation("howItWorks");
    const { height, width } = useWindowDimensions();
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = useHowItWorkSlides(t);

    const createSlides = (Index) =>
    {
        return (
            <Card
                mode='contained'
                style={styles.slideContainer}
                key={Index}
            >
                <Text style={styles.slideImages}>{slides[Index].imgSrc}</Text>
                <Card.Title 
                    titleStyle={styles.sliderHeader} 
                    titleNumberOfLines={2} 
                    title={slides[Index].headerText} 
                />
                <Card.Content>
                    <Text style={styles.sliderBody}>{slides[Index].bodyText}</Text>
                </Card.Content>
            </Card>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor={COLOURS.shades0}
            />

            <Card style={styles.wholePageView}>
                <View style={styles.wholePageView}>
                    <View flex={1} style={{ width: 130, height: 60, padding: 5, alignItems: "center" }} >
                        <Image source={require('../../../assets/logo/New_Logo/Logo_White_BG_Horizontal.png')}
                            style={{ width: 130, height: 60 }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.slideCarousel}>
                        <Carousel
                            loop
                            width={width}
                            height={455}
                            autoPlay="true"
                            autoPlayInterval={5000}
                            data={[...new Array(3).keys()]}
                            onSnapToItem={(index) =>
                            {
                                setSlideIndex(index);
                            }}
                            renderItem={({ index }) => (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {createSlides(index)}
                                </View>
                            )}
                            panGestureHandlerProps={{
                                activeOffsetX: [-10, 10],
                            }}
                            pagingEnabled="true"
                            snapEnabled="true"
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 1,
                                parallaxScrollingOffset: 50,
                            }}
                        />

                        <View style={styles.slideCarousel.dots}>
                            <Dots
                                length={3}
                                active={slideIndex}
                                activeColor={COLOURS.primaryMain}
                                activeDotWidth={24}
                                activeDotHeight={8}
                                passiveColor={COLOURS.customBorderColour}
                                passiveDotWidth={8}
                                passiveDotHeight={8}
                            />
                        </View>
                    </View>
                </View>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: COLOURS.shades0,
    },
    btnContainer: {
        flex: 1
    },
    wholePageView: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLOURS.shades0,
    },
    slideContainer: {
        width: 290,
        alignSelf: 'center',
        backgroundColor: COLOURS.shades0,
    },
    slideImages: {
        alignSelf: 'center',
        width: 240,
        height: 240,
        marginBottom: 24,
    },

    sliderHeader: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: 12,
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_700Bold',
        fontSize: 26,
        lineHeight: 29,
        textAlign: 'center',
    },
    sliderBody: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: 12,
        color: COLOURS.customText,
        fontFamily: 'Inter_400Regular',
        fontSize: 14.5,
        lineHeight: 21,
        textAlign: 'center',
    },
    slideCarousel: {
        flex: 1,
        paddingTop: 10,
        dots: {
            flex: 1,
            paddingBottom: 12,
            marginTop: -5
        },
    },
    registerBtn: {
        width: 220,
        marginBottom: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#CE97FD',
    },
    btnText: {
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
    },
    btnSocialLoginOptions: {
        flex: 1,
        paddingBottom: 12
    },
    text: {
        justifyContent: 'center',
        color: COLOURS.customText,
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        lineHeight: 18,
    },
    textLink: {
        marginLeft: 4,
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        lineHeight: 18,
    },
});