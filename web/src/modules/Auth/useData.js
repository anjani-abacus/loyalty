import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, sendOtpApi, logoutApi ,verifyOtpApi, loginDetails} from "../../reactQuery/services/auth/authApi";

// login hook
export const useLogin = () =>
  useMutation({
    mutationFn: (credentials) => loginApi(credentials),
  });

// send OTP hook
export const useSendOtp = () =>
  useMutation({
    mutationFn: (payload) => sendOtpApi(payload),
  });

  export const useVerifyOtp = () => useMutation({ mutationFn: (payload) => verifyOtpApi(payload) });

  export const useLoginDetails = () => useQuery({ queryKey:["loginDetails"], queryFn: () => loginDetails(), enabled: false });

// logout hook
export const useLogout = () =>
  useMutation({
    mutationFn: () => logoutApi(),
  });
