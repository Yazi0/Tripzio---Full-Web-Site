import { apiClient } from './client';

export interface ContactInfo {
    address: string;
    email_1: string;
    email_2: string;
    phone_1: string;
    phone_2: string;
    whatsapp: string;
    map_url: string;
}

export const getContactInfo = async (): Promise<ContactInfo> => {
    const response = await apiClient.get('/contact/info/');
    return response.data;
};

export const sendContactMessage = async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => {
    const response = await apiClient.post('/contact/send/', data);
    return response.data;
};
