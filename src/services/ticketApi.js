import api from './api';

export async function saveTicket(token, body) {
  const response = await api.post('/ticket', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function findTicket(token, enrollmentId) {
  const response = await api.get(`/ticket/${enrollmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updatePayment(token, userId) {
  const response = await api.patch('/payment', { userId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function findPayment(token) {
  const response = await api.get('/payment', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
