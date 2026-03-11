
import { useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const useMutationWithError = (mutationFn, showGlobalLoader = true) => {

  return useMutation({
    mutationFn,
    meta: {showGlobalLoader},
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || error?.message || 'Something went wrong!',
      });
    },
  });
};

export const useQueryWithError = (queryKey, queryFn, showGlobalLoader = true, options = {}) => {
  return useQuery({
    queryKey,
    queryFn,
    meta: { showGlobalLoader },
    ...options,
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || error?.message || 'Something went wrong!',
      });
    },
  });
};
