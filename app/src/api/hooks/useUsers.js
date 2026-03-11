
import { useMutation, useQuery } from '@tanstack/react-query';
import { createUser, expireSession, fetchUserDetail, fetchUsers, streakProgress, updateUser, validateReferralcode } from '../modules/userApi';
import * as keychain from 'react-native-keychain';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useMutationWithError, useQueryWithError } from './middleware';

export const useCreateUser = () => useMutationWithError(createUser);
export const useUpdateUser = () => useMutationWithError(updateUser);
export const useValidateReferralCode = () => useMutationWithError(validateReferralcode);
export const useExpireSession = () => useMutationWithError(expireSession);
export const useStreakProgress = (request) => useQueryWithError(['streakProgress', request], ()=>streakProgress(request));

export const useGetUserData = () => {
  const { userId, setLoginData } = useContext(AuthContext);
  const query = useQuery({
    queryKey: ['usersData'],
    queryFn: () => fetchUserDetail(userId),
  }
  );
  const updateProfile = () => {
  if (query.isSuccess && query.data){ setLoginData(query?.data?.data?.result); }
  };
  useEffect(() => {
    updateProfile();
  }, [query.isSuccess, query.data]);

  return [query, updateProfile];
};
