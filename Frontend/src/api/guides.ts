import { apiClient } from './client';
import { Guide } from '../types';

export const getAvailableGuides = async (startDate?: string, endDate?: string): Promise<Guide[]> => {
    const params: Record<string, string> = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    const response = await apiClient.get('/guides/', { params });
    const data = response.data.results ?? response.data;

    return data.map((g: any): Guide => ({
        id: String(g.id),
        name: g.name,
        image: g.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(g.name)}&background=random`,
        feePerDay: Number(g.fee_per_day),
        languages: g.languages || [],
        rating: Number(g.rating),
        experience: g.experience || '',
    }));
};

export const getGuideById = async (id: string): Promise<Guide | undefined> => {
    try {
        const response = await apiClient.get(`/guides/${id}/`);
        const g = response.data;
        return {
            id: String(g.id),
            name: g.name,
            image: g.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(g.name)}&background=random`,
            feePerDay: Number(g.fee_per_day),
            languages: g.languages || [],
            rating: Number(g.rating),
            experience: g.experience || '',
        };
    } catch {
        return undefined;
    }
};
