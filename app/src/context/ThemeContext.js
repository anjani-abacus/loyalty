import { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../storage/mmkv';
import { AuthContext } from '../auth/AuthContext';

export const ThemeContext = createContext();

const saveTheme = (theme) => {
    storage.set('app_theme', theme); // 'Light' / 'Dark' / System
};

const ThemeProvider = ({ children }) => {
    // const storedTheme = storage?.getString('app_theme');
    const storedTheme = 'Dark';
    const [theme, setTheme] = useState(storedTheme || 'light');
    const {setActiveStatusConfig} = useContext(AuthContext);

    useEffect(()=>{
        if(theme == 'light'){
            setActiveStatusConfig({backgroundColor:'#004CAC'});
        }else if(theme == 'dark'){
            setActiveStatusConfig({backgroundColor:'#000'});
        }
    }, [theme]);

    const toggleTheme = (activeTheme) => {
        setTheme(activeTheme);
        saveTheme(activeTheme);
    };



    return <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme, toggleTheme: toggleTheme }}>
        {children}
    </ThemeContext.Provider>;
};
export default ThemeProvider;

