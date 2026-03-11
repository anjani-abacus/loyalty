import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, View, Animated, StyleSheet } from 'react-native';
import AppTheme from '../Theme/AppTheme';
import useTheme from '../Theme/useTheme';


const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

export default function Statusbar({ backgroundColor, ...props }) {

    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[1]);

    return (
        <StatusBar {...props} translucent animated={true} backgroundColor={'transparent'} barStyle={statusBarStyle} showHideTransition={statusBarTransition} hidden={hidden} />
    );
}

export const StatusBarHeader = ({ height = 0, style = {}, ...rest }) => {
    const safeHeight = typeof height === 'number' ? height : 0;
    const animatedHeight = useRef(new Animated.Value(safeHeight)).current;

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: height,
            duration: 100,
            useNativeDriver: false, // 'height' can't use native driver
        }).start();
    }, [height]);

    return (
        <Animated.View
            style={[
                styles.container,
                { height: animatedHeight },
                style,
            ]}
            {...rest}
        />
    );
};

export const FooterBar = ({bgColor}) => {
    return <View style={{height:160, backgroundColor:bgColor || 'transparent'}} />; //using this component to manage conent behind tab bar, keep its height same as tab bar height.
};

const styles = StyleSheet.create({
container: {
width: '100%',
backgroundColor: 'transparent', // or your desired background
},
});
