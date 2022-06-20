import api from './api';

export async function getDatesInfo(token) {
  const response = await api.get('/activities/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesByDate(d, token) {
  const response = await api.get(`/activities/${d}/schedule`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function register(activityId, token) {
  const response = await api.post(`/activities/${activityId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
