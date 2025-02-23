import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboardStats() {
  const response = await axios.get(`${API_URL}/api/analytics/dashboard`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export async function getRecentActivities() {
  const response = await axios.get(`${API_URL}/api/analytics/recent-activities`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export async function getDistrictAnalytics() {
  const response = await axios.get(`${API_URL}/api/analytics/districts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export async function searchCriminals(query: string) {
  const response = await axios.get(`${API_URL}/api/criminals/search`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export async function addCriminal(criminalData: any) {
  const response = await axios.post(`${API_URL}/api/criminals`, criminalData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export async function updateCriminal(id: string, criminalData: any) {
  const response = await axios.put(`${API_URL}/api/criminals/${id}`, criminalData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export async function getCriminalDetails(id: string) {
  const response = await axios.get(`${API_URL}/api/criminals/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export async function getAnalytics(type: 'daily' | 'weekly' | 'monthly') {
  const response = await axios.get(`${API_URL}/api/analytics/trends`, {
    params: { type },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}