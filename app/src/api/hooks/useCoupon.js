import { useMutation } from '@tanstack/react-query';
import { couponScan } from '../modules/couponApi';

const useCoupon = () => {
  return useMutation({mutationFn: couponScan});
};

export default useCoupon;
