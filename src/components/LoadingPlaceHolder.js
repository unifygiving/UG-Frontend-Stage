import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing, withDelay } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { interpolateColor } from 'react-native-reanimated';

export const LoadingPlaceHolder = ({width=50, height=50, round=false}) => {
    const gray = useSharedValue(0); 
    const animatedStyle = useAnimatedStyle(()=>({
       backgroundColor: interpolateColor(
        gray.value,
        [0,1],
        ['#bbbbbb', '#eeeeee']
       )
    }));

    const styles = StyleSheet.create({
        placeholder: {
            width: width,
            height: height,
            borderRadius: round? width/2: 0,
        }
    });

    useEffect(()=>{
        gray.value = withRepeat(
            withTiming(1, {duration: 2000}),
            -1, true);
    },[]);
    
    return (
        <Animated.View style={[styles.placeholder, animatedStyle]}>
        </Animated.View>
    )
}