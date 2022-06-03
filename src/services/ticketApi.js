import api from './api';

export async function saveTicket(token, body) {
  const response = await api.post('/ticket', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updatePayment() {
  const response = await api.patch('/ticket');

  return response.data;
}
