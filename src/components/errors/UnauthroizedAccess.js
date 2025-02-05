import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { COLOURS } from "../Colours";
import { clearError } from "../../store/slices/apiErrorSlice";
import { clearUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

export default UnauthorizedAccess = (props) => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Oops!</Text>
                <Text style={styles.subtitle}>Unaurthorized Access</Text>
                <Text style={styles.error}>{props.message}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    dispatch(clearUser());
                    dispatch(clearError());
                }}>
                    <Text style={styles.buttonText}>Login Again</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        marginHorizontal: 16,
    },
    title: {
        fontSize: 48,
        fontWeight: '300',
        paddingBottom: 16,
        color: '#000',
    },
    subtitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000',
    },
    error: {
        paddingVertical: 16,
    },
    button: {
        backgroundColor: '#2196f3',
        borderRadius: 50,
        padding: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
})