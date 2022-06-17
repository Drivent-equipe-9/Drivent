import api from './api';

export async function getDatesInfo(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesByDate(d, token) {
  const response = await api.get(`/activities/${d}/activity`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
