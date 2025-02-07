import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);
  return data;
};
