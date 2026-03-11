import AppTheme from './AppTheme';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
// import { useColorScheme } from "react-native";

const useTheme = () => {
    // const colorScheme = useColorScheme();
    const {theme} = useContext(ThemeContext);
    return AppTheme[theme] || AppTheme.light;
};
export default useTheme;
