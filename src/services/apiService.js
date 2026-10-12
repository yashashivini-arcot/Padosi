import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const CATEGORIES = ['Household Items', 'Tools', 'Kitchen Items', 'Personal Assistance', 'Other'];

export const apiService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('padosi_current_user', JSON.stringify(response.data));
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    localStorage.setItem('padosi_current_user', JSON.stringify(response.data));
    return response.data;
  },

  getCurrentUser: () => {
    const data = localStorage.getItem('padosi_current_user');
    if (!data) return null;
    const user = JSON.parse(data);
    // Clear old mock user data (IDs were like "u1")
    if (typeof user.id === 'string' && user.id.startsWith('u')) {
      localStorage.removeItem('padosi_current_user');
      return null;
    }
    return user;
  },

  logout: () => {
    localStorage.removeItem('padosi_current_user');
  },

  getRequests: async () => {
    const response = await axios.get(`${API_URL}/community/requests`);
    return response.data;
  },

  getRequest: async (id) => {
    const response = await axios.get(`${API_URL}/community/requests/${id}`);
    return response.data;
  },
  
  saveRequest: async (requestData, userId) => {
    const response = await axios.post(`${API_URL}/community/requests?userId=${userId}`, requestData);
    return response.data;
  },
  
  addReply: async (requestId, message, userId) => {
    const response = await axios.post(`${API_URL}/community/requests/${requestId}/replies?userId=${userId}`, { message });
    return response.data;
  },

  getReplies: async (requestId) => {
    const response = await axios.get(`${API_URL}/community/requests/${requestId}/replies`);
    return response.data;
  },

  getNotifications: async (userId) => {
    const response = await axios.get(`${API_URL}/community/notifications?userId=${userId}`);
    return response.data;
  },
  
  markNotificationRead: async (id, userId) => {
    await axios.put(`${API_URL}/community/notifications/${id}/read?userId=${userId}`);
  },

  markAllNotificationsRead: async (userId) => {
    await axios.put(`${API_URL}/community/notifications/read-all?userId=${userId}`);
  },
  
  getParticipation: async (userId) => {
    const response = await axios.get(`${API_URL}/community/participation?userId=${userId}`);
    return response.data;
  }
};
