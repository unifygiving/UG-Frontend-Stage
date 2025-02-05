import { StyleSheet } from "react-native";
import { COLOURS } from "../../components/Colours";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    userContainer: {
        position: 'relative',
        alignSelf: 'center',
        paddingVertical: 20,
      },
      avatar: {
        alignSelf: 'center',
        width: 92,
        height: 92,
        marginBottom: 12,
        borderRadius: 46,
      },
      btnAvatarEdit: {
        position: 'absolute',
        right: -5,
        bottom: 56,
      },
      name: {
        marginBottom: 4,
    
        color: COLOURS.customText,
    
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: -0.41,
        textAlign: 'center',
      },
    errorText: {
        position: 'absolute',
        left: 10,
        bottom: 0,

        color: COLOURS.errorTextColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 18,
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
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        elevation: 0,
        avatar: {
            backgroundColor: "black",
        },
        name: {
            fontFamily: "Inter_400Regular",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: 'center'
        },
        location: {
            fontFamily: "Inter_400Regular",
            fontSize: 18,
            textAlign: 'center',
        },
        pencil: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: -5,
        },
    },
    label: {
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
    },
    input: {
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,

        borderColor: COLOURS.customBorderColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
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
    errorText: {
        position: 'absolute',
        left: 0,
        bottom: -22,

        color: COLOURS.errorTextColour,

        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 18,
    },

    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        label: {
            fontSize: 16,
            fontWeight: "bold",
            alignSelf: "flex-start",
            marginBottom: 5,
            width: "80%",
            numberOfLines: 2
        },
        textInput: {
            height: 50,
            fontSize: 16,
            marginBottom: 20,
            width: "100%",
            borderRadius: 5,
        },
        storyLabelContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 5,
        },
        storyLabel: {
            fontSize: 16,
        },
        wordCount: {
            fontSize: 16,
            marginLeft: "auto",
        },
        storyInput: {
            fontSize: 16,
            marginBottom: 20,
            width: "100%",
            borderRadius: 5,
            padding: 5,
        },
    },

    inputSuccess: {
        borderColor: COLOURS.successColour,
    },
    inputError: {
        borderColor: COLOURS.errorColour,
    },

    buttonContainer: {
        width: "100%",
        padding: 5,
        backgroundColor: COLOURS.primaryMain,
        buttonText: {
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold"
        },
    },
    buttonDisabled: {
        backgroundColor: COLOURS.shadowColor
    }
});
