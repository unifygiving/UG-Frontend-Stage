import { forwardRef, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import ShowPasswordButton from "./ShowPasswordButton";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { COLOURS } from './Colours';

export default forwardRef((props, ref) => {
    const { style, onChangeText, value, ...restProps } = props;
    const [isShowPassword, setShowPassword] = useState(false);
    const [isFocused, setFocused] = useState(false);
    return (
        <View>
            <TextInput
                {...restProps}
                style={[style]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isShowPassword}
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
            />
            <TouchableOpacity
                style={[styles.icon]}
                onPress={()=> {
                    setFocused(true);
                    setShowPassword(p=> !p);
                }}
            >
                <Feather
                    name={isShowPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={COLOURS.customText}
                />
            </TouchableOpacity>
        </View>
    )
});

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: -2,
        right: 0,
        opacity: 1,
        width: 44,
        height: 44,
        padding: 12
    },

    hideIcon: {
        opacity: 0,
    },
});