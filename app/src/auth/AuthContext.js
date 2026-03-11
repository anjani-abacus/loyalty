import { createContext, useEffect, useState } from 'react';
import * as keychain from 'react-native-keychain';
import axiosInstance, { setLogoutHandler } from '../api/axiosInstance';
import { Alert, StatusBar } from 'react-native';
import { useExpireSession } from '../api/hooks/useUsers';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [loginData, setLoginData] = useState(null);
    const { mutate: expireSessionMutate, data: isLoggedOut } = useExpireSession();
// StatusBar.currentHeight
    const [activeStatusConfig, setActiveStatusConfigs] = useState({ height: 0, backgroundColor: '#004CAC' });

    const setActiveStatusConfig = (data) => {
        setActiveStatusConfigs(prev => {
            if (data.height == null) {data.height = StatusBar.currentHeight;}
            return { ...prev, ...data };
        });
    };


    const login = async (request, userData) => {
        let token = userData?.accessToken;

        try {
            await keychain.setGenericPassword('session', JSON.stringify({ token, userData: userData }));
            isUserLoggedIn();
        } catch (err) {
        }
    };

    const logout = async () => {
        setIsLoggingOut(true); // Start logout loading state

                    expireSessionMutate({}, {
                        onSuccess: async () => {
                            // Add delay for smooth transition
                            setTimeout(async () => {
                                await keychain.resetGenericPassword();
                                isUserLoggedIn();
                                setIsLoggingOut(false);
                            }, 500);
                        },
                        onError: () => {
                            // Even on error, still logout locally
                            setTimeout(async () => {
                                await keychain.resetGenericPassword();
                                isUserLoggedIn();
                                setIsLoggingOut(false);
                            }, 500);
                        },
                    });


        // Alert.alert('Are you sure !', 'You want to end the session?', [
        //     {
        //         text: 'Cancel',
        //         style: 'cancel',
        //     },
        //     {
        //         text: 'OK', onPress: async () => {
        //             setIsLoggingOut(true); // Start logout loading state

        //             expireSessionMutate({}, {
        //                 onSuccess: async () => {
        //                     // Add delay for smooth transition
        //                     setTimeout(async () => {
        //                         await keychain.resetGenericPassword();
        //                         isUserLoggedIn();
        //                         setIsLoggingOut(false);
        //                     }, 500);
        //                 },
        //                 onError: () => {
        //                     // Even on error, still logout locally
        //                     setTimeout(async () => {
        //                         await keychain.resetGenericPassword();
        //                         isUserLoggedIn();
        //                         setIsLoggingOut(false);
        //                     }, 500);
        //                 }
        //             })
        //         }
        //     },
        // ]);
    };

    const autoLogout = async () => {
        setIsLoggingOut(true);
        // Add delay for smooth transition even for auto-logout
        setTimeout(async () => {
            await keychain.resetGenericPassword();
            isUserLoggedIn();
            setIsLoggingOut(false);
        }, 300);
    };

    const isUserLoggedIn = async () => {
        try {
            const credentials = await keychain.getGenericPassword();

            if (credentials) {
                const session = JSON.parse(credentials.password);
                setSession(session);
            } else {
                setSession(null);
                // throw new Error("Something went wrong, try again!")
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        isUserLoggedIn();
        // setActiveStatusConfig({height:0})
        setLogoutHandler(autoLogout);
    }, []);

    return <AuthContext.Provider value={{ activeStatusConfig, setActiveStatusConfig, loading, isLoggingOut, loginToken: session?.token, loginType: session?.userData?.userType, loginData, setLoginData, userId: session?.userData?.userId, login, logout }} >
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
