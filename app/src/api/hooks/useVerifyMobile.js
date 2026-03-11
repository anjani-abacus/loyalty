import { useMutation } from '@tanstack/react-query';
import { requestOtp, verifyUser } from '../modules/userApi';
import { requestRedeemOtp, verifyRedeemOtp } from '../modules/masterApi';

export const useVerifyMobile = () => useMutation({
    mutationFn: verifyUser,
    retry: false,
  });

  export const useRequestMobileOtp = () => useMutation({
  mutationFn:requestOtp,
    retry: false,
});

export const useRequestRedeemOtp = () => useMutation({
  mutationFn: requestRedeemOtp,
    retry: false,
});

export const useVerifyRedeemOtp = () => useMutation({
  mutationFn: verifyRedeemOtp,
    retry: false,
});
