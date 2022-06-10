import api from './api';

export async function getReservation(token) {
  const response = await api.get('/reservation', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
