import { useQuery } from '@tanstack/react-query';
import { fetchExpenses } from '../modules/expenseApi';

const useExpenses = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
  });
};

export default useExpenses;
