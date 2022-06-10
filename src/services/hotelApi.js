import api from './api';

export async function getHotelInfo(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getRooms(hotelId, token) {
  const response = await api.get(`/hotels/${hotelId}/rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getTotalVacanciesByHotelId(hotelId, token) {
  const response = await api.get(`/hotels/${hotelId}/rooms/vacanciesLeft`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function saveHotel(token, body) {
  const response = await api.post('/hotel', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function saveRoom(token, body) {
  const response = await api.post('/hotel/room', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
