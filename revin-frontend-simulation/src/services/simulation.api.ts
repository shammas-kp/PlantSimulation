import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export const runSimulation = async (
  payload: {
    water: string;
    sunlight: string;
    days: number;
  },
) => {

  const response = await axios.post(
    `${API_BASE_URL}/simulation`,
    payload,
  );

  return response.data;
};
