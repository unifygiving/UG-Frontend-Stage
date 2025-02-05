import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native';
import { Avatar } from 'react-native-paper';

//For animation of picture slides scroll
import Carousel from 'react-native-reanimated-carousel';
import Dots from 'react-native-dots-pagination';

//Custom Components for styling
import { COLOURS } from '../../components/Colours.js';
import { useSlides } from '../../helpers/slides.js';
//import SocialContainer from '../../components/SocialContainer.js';
import LineContainerOr from '../../components/LineContainerOr.js';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const phoneWidth = Dimensions.get("window").width;
const phoneHeight = Dimensions.get("window").height;

export default function TitlePage({ navigation })
{
    const { t, i18n } = useTranslation("titlePage");
    
    const [slideIndex, setSlideIndex] = useState(0);

    const insets = useSafeAreaInsets();

    const slides = useSlides(t);

    const createSlides = (Index) =>
    {
        return (
            <View
                style={styles.slideContainer}
                key={Index}
            >
                <Text style={styles.slideImages}>{slides[Index].imgSrc}</Text>

                <Text style={styles.sliderHeader}>{slides[Index].headerText}</Text>

                <Text style={styles.sliderBody}>{slides[Index].bodyText}</Text>
            </View>
        );
    };

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor={COLOURS.shades0}
            />
            <View flexDirection="column" flex={4} style={styles.wholePageView}>
                <View flex={1} style={{ width: 130, height: 60, padding: 5, alignItems: "center"} } >
                    <Image source={require('../../../assets/logo/New_Logo/Logo_White_BG_Horizontal.png')} 
                        style={{ width: 130, height: 60 }}
                        resizeMode="cover"
                    />
                </View>
            
                <View flex={1} style={styles.slideCarousel}>
                    <Carousel
                        loop
                        width={phoneWidth}
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

                    <View flex={1} style={styles.slideCarousel.dots}>
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

                <View
                    flex={1}
                    style={styles.btnContainer}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Register to Unify')}
                        style={styles.registerBtn}
                    >
                        <Text style={styles.btnText}>{t("registerBtnText")}
                        </Text>
                    </TouchableOpacity>

                    <LineContainerOr />
                </View>



                {/*<View flex={1} style={styles.btnSocialLoginOptions}>*/}
                {/*    <SocialContainer />*/}
                {/*</View>*/}


                <View flex={1}>
                    <Text style={styles.text}>
                        {t('hasAccountQuestion')}&nbsp;
                        <Text
                            onPress={() =>
                            {
                                navigation.navigate('Login to Unify');
                            }}
                            style={styles.textLink}
                        >
                            {t('loginBtnText')}
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.shades0,
        width: phoneWidth,
        height: phoneHeight,
    },
    btnContainer: {
        //flex: 1
    },
    wholePageView: {
        alignItems: 'center',
        padding: 10,
    },
    slideContainer: {
        width: 290,
        alignSelf: 'center',
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
        paddingTop: 10,
        dots: {
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
