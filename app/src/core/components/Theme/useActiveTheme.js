import AppTheme from './AppTheme';
// import { useColorScheme } from "react-native";

const useActiveTheme = () => {
    // const colorScheme = useColorScheme();
    const mode = 'light';
    return AppTheme[mode];
};

export default useActiveTheme;
