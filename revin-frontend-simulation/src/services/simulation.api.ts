import axios from 'axios';

export const runSimulation = async (
  payload: {
    water: string;
    sunlight: string;
    days: number;
  },
) => {

  const response = await axios.post(
    'http://localhost:3000/simulation',
    payload,
  );

  return response.data;
};