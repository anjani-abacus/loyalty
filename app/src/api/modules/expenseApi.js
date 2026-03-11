import axios from '../axiosInstance';

export const fetchExpenses = async () => {
  const response = await axios.post('/expenses');
  return response.data;
};

export const addExpense = async (data) => {
  const response = await axios.post('/expenses', data);
  return response.data;
};
