import api from './api';

export async function getReservation(token) {
  const response = await api.get('/reservation', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function createReservation(body, token) {
  const response = await api.post('/reservation', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
