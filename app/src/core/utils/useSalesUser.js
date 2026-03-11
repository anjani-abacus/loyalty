import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCall from '../services/ServiceProvider';


const useSalesUser = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        get_user();
    }, []);

    const get_user = async (type = '') => {
        const userData = await AsyncStorage.getItem('userData');
        const loginData = JSON.parse(userData);

        (type == 'moreItem') ? startValue = userList.length : startValue = 0;

        try {
            const result = await ApiCall({ user_id: loginData.id }, 'AppAttendence/getAllAsm');
            if (type == 'moreItem') {setUserList([...userList, ...result.asm_id]);}
            else {setUserList(result.asm_id);}

        } catch (err) {
        }
    };

    return userList;

};

export default useSalesUser;
