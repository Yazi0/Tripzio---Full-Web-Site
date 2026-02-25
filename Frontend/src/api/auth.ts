import { apiClient } from './client';
import { User, LoginCredentials } from '../types';

export const login = async (credentials: LoginCredentials): Promise<User> => {
    const response = await apiClient.post('/auth/login/', credentials);
    const data = response.data;

    if (data.token) {
        localStorage.setItem('tripzio_token', data.token);
    }

    return {
        id: String(data.id),
        username: data.username,
        email: data.email,
        role: data.role,
        token: data.token,
        avatar: data.avatar_url,
        phone: data.phone,
        firstName: data.first_name,
        lastName: data.last_name,
    };
};

export const getMe = async (): Promise<User> => {
    const response = await apiClient.get('/auth/me/');
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('tripzio_token');
    window.location.href = '/adminlogin';
};

export const getToken = () => localStorage.getItem('tripzio_token');

export const isAuthenticated = () => !!getToken();
