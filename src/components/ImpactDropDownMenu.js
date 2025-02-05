import React, { useState, useRef, useEffect } from 'react';
import
{
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';
import { COLOURS } from './Colours';
import DownArrowSvg from './svgComponents/DownArrowSvg';

const countries = [
    {
        label: 'UK',
        value: 'uk',
        disabled: false,
        icon: () => (
            <Image source={require('../../assets/Impact/BritishFlag.png')}
                style={{ width: 30, height: 24 }} />
        ),
    },
    {
        label: 'Portugal',
        value: 'portugal',
        disabled: false,
        icon: () => (
            <Image source={require('../../assets/Impact/PortugueseFlag.png')}
                style={{ width: 30, height: 24 }} />
        ),
    },
    {
        label: 'Spain',
        value: 'spain',
        disabled: false,
        icon: () => (
            <Image source={require('../../assets/Impact/SpainFlag.png')}
                style={{ width: 30, height: 24 }} />

        ),
    },
    {
        label: 'Germany',
        value: 'germany',
        disabled: false,
        icon: () => (
            <Image source={require('../../assets/Impact/GermanyFlag.png')}
                style={{ width: 30, height: 24 }} />
        ),
    },
    {
        label: 'India',
        value: 'india',
        disabled: false,
        icon: () => (
            <Image source={require('../../assets/Impact/IndiaFlag.png')}
                style={{ width: 30, height: 24 }} />
        ),
    }, 
];

const countriesWithSmallFlag = [
    {
        label: 'UK',
        value: 'uk',
        icon: () => (
            <Image
                source={require('../../assets/Impact/BritishFlag.png')}
                style={{ width: 22, height: 15 }}
            />
        ),
    },
    {
        label: 'Portugal',
        value: 'portugal',
        icon: () => (
            <Image
                source={require('../../assets/Impact/PortugueseFlag.png')}
                style={{ width: 22, height: 15 }}
            />
        ),
    },
    {
        label: 'Spain',
        value: 'spain',
        icon: () => (
            <Image
                source={require('../../assets/Impact/SpainFlag.png')}
                style={{ width: 22, height: 15 }}
            />
        ),
    },
    {
        label: 'Germany',
        value: 'germany',
        icon: () => (
            <Image
                source={require('../../assets/Impact/GermanyFlag.png')}
                style={{ width: 22, height: 15 }}
            />
        ),
    },
    {
        label: 'India',
        value: 'india',
        icon: () => (
            <Image
                source={require('../../assets/Impact/IndiaFlag.png')}
                style={{ width: 22, height: 15 }}
            />
        ),
    },
];

const DropDownMenu = ({
    selectedContainerWidth = 80,
    small = false,
    changeCountry,
}) =>
{
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(countries[0].value);
    const [showBorder, setShowBorder] = useState(false);

    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() =>
    {
        if (open)
        {
            setShowBorder(true);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        } else
        {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => setShowBorder(false));
        }
    }, [open, animatedValue]);

    const handleOpenClose = () =>
    {
        setOpen(!open);
    };

    const handleSelectCountry = (value) =>
    {
        changeCountry(value);
        setValue(value);
        setOpen(false);
    };

    const selectedCountry = small
        ? countriesWithSmallFlag.find((item) => item.value === value)
        : countries.find((item) => item.value === value);

    const dropdownHeight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={handleOpenClose}
                style={[styles.selectedContainer, { width: selectedContainerWidth }]}
            >
                {selectedCountry ? (
                    selectedCountry.icon()
                ) : small ? (
                    <Image
                        source={require('../../assets/Impact/BritishFlag.png')}
                        style={{ width: 22, height: 15 }}
                    />
                ) : (
                    <Image source={require('../../assets/Impact/BritishFlag.png')} />
                )}
                <DownArrowSvg />
            </TouchableOpacity>

            {showBorder && (
                <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
                    {small
                        ? countriesWithSmallFlag.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={() => handleSelectCountry(item.value)}
                                style={
                                    value === item.value ? activeBtnCountry : styles.btnCountry
                                }
                            >
                                {item.icon()}
                                <Text style={styles.nameCountry}>{item.label}</Text>
                            </TouchableOpacity>
                        ))
                        : countries.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={() => handleSelectCountry(item.value)}
                                style={
                                    item.disabled ? styles.disabledButton : value === item.value ? activeBtnCountry : styles.btnCountry
                                }
                                disabled={item.disabled}
                            >
                                {item.icon()}
                                <Text style={styles.nameCountry}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    disabledButton: {
        flexDirection: 'row',
        alignItems: 'center',

        width: 119,
        height: 35.5,
        padding: 8,
        backgroundColor: COLOURS.neutral40,
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingLeft: 12,
        paddingRight: 6,
        paddingVertical: 4,

        borderWidth: 1,
        borderColor: COLOURS.neutral,
        borderRadius: 4,
    },

    dropdown: {
        position: 'absolute',
        left: -27.5,
        top: 40,

        width: 135,
        padding: 8,

        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLOURS.neutral,

        backgroundColor: COLOURS.white,
        overflow: 'hidden',
        zIndex: 100,
    },
    btnCountry: {
        flexDirection: 'row',
        alignItems: 'center',

        width: 119,
        height: 35.5,
        padding: 8,

        backgroundColor: COLOURS.white,
    },
    activeBtnCountry: {
        backgroundColor: COLOURS.neutral10,
    },

    nameCountry: {
        marginLeft: 8,

        color: COLOURS.neutral70,

        fontFamily: 'Inter_500Medium',
        fontSize: 14,
    },
});
const activeBtnCountry = StyleSheet.compose(
    styles.btnCountry,
    styles.activeBtnCountry
);
export default DropDownMenu;
