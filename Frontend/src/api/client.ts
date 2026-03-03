import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://tripzio-backend.onrender.com/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('tripzio_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
