import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setError } from '../../../store/slices/apiErrorSlice.js';

//Components for styling
import { COLOURS } from '../../../components/Colours.js';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar.js';
import MainButton from '../../../components/MainButton.js';
import SendEmailSvg from '../../../components/svgComponents/SendEmail.js';
import { useResendVerificationEmailMutation } from '../../../store/slices/authSlice.js';

const COUNT_DOWN_SECONDS = 60;

export default EmailConfirmation = ({ navigation, route }) => {
    const { email } = route.params;
    const { t } = useTranslation("registerEmailConfirmation");
    const [resendVerificationEmail, { data, isSuccess, isError, isLoading, error }] = useResendVerificationEmailMutation();
    const dispatch = useDispatch();
    const [disableResend, setDisableResend] = useState(false);
    const [countDown, setCountDown] = useState(COUNT_DOWN_SECONDS);
    const intervalRef = useRef();
    const startCountDown = () => {
        intervalRef.current = setInterval(()=>{
            setCountDown((prev) => {
                if (prev<=1){
                    setDisableResend(false);
                    clearInterval(intervalRef.current);
                    return COUNT_DOWN_SECONDS;
                }
                return prev -1;
            });
        }, 1000);
    };

    useEffect(() => {
        if (isError) {
            dispatch(setError({
                status: error.status,
                message: error.data?.message,
            }))
        }
    }, [isError])

    const handleEmailResend = () => {
        resendVerificationEmail({ email });
        setDisableResend(true);
        startCountDown();
    };
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor={COLOURS.shades0}
            />
            <View flex={1} style={{ alignSelf: 'center', justifyContent: 'center' }}>
                <View style={styles.imageContainer} >
                    <SendEmailSvg style={styles.image} />

                    <Text style={styles.title}>{t("title")}</Text>

                    <Text style={styles.text}>{t("message")}</Text>
                </View>
            </View>

            <View>
                <MainButton
                    nameBtn={t("mainButtonText")}
                    onPress={() => Linking.openURL("mailto:")}
                />
                {disableResend ? (
                    <Text
                        style={styles.btnResendEmailDisabled}
                    >
                        {t("resendingEmailText")} ({countDown})
                    </Text>
                ) : (
                    <Text
                        onPress={() => handleEmailResend()}
                        style={styles.btnResendEmail}
                    >
                        {t("resendButtonText")}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 58,
        paddingHorizontal: 36,
        backgroundColor: COLOURS.shades0,
    },

    imageContainer: {
        width: 290,
        alignSelf: 'center',
    },

    title: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: 12,
        color: COLOURS.primaryMain,
        fontFamily: 'Inter_700Bold',
        fontSize: 26,
        lineHeight: 29,
        textAlign: 'center',
    },

    text: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: 12,
        color: COLOURS.customText,
        fontFamily: 'Inter_400Regular',
        fontSize: 14.5,
        lineHeight: 21,
        textAlign: 'center',
    },

    btnResendEmail: {
        marginTop: 16,
        color: COLOURS.customText,
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
    },

    btnResendEmailDisabled: {
        marginTop: 16,
        color: COLOURS.neutral10,
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
    },

    image: {
        alignSelf: 'center',
        width: 240,
        height: 240,
        marginBottom: 24,
    },

});
