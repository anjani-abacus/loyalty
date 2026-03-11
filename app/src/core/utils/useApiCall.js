import { useEffect, useRef, useState } from 'react';
import { ApiCall } from '../services/ServiceProvider';
import axios from '../api/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

const useApiCall = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async ({ request, url }, callback) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiCall(request, url);
            setData(response);
            if (callback) {
                callback(response);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    return { data, loading, error, sendRequest };
};

export default useApiCall;
