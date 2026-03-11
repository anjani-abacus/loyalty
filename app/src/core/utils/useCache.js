import { useEffect, useState } from 'react';
import * as keychain from 'react-native-keychain';

const useCache = () => {
    const [credentials, setCredentials] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoader(true);
        setError(null);

        try{
        const resp = await keychain.getGenericPassword();
        if(!resp){
            throw new Error('No Data Found!');
        }
        const session = JSON.parse(resp.password);

        setCredentials(session);
    }catch(err){
        setError(err.message);
    }finally{
        setLoader(false);
    }
};

return {credentials, error, loader};

};
export default useCache;
