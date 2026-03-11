import React from 'react';
import { Text } from 'react-native';
import useTheme from '../Theme/useTheme';

const ThemedText = ({ style, color, ...props }) => {
    const activeTheme = useTheme();

    const textColor = color || activeTheme.text;

    return (
        <Text
            style={[
                { color: textColor },
                style,
            ]}
            {...props}
        />
    );
};

export default ThemedText;
