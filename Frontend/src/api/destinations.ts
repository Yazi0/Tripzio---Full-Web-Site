import { apiClient } from './client';
import { Destination } from '../types';

interface ApiDestination {
    id: string;
    slug: string;
    name: string;
    description: string;
    full_description: string;
    image: string;
    count: number;
    rating: number;
    best_season: string;
    seasons: number[];
    popular_activities: string[];
    coordinates: { lat: number; lng: number };
    images: string[];
    category: string;
    featured: boolean;
}

const toDestination = (d: ApiDestination): Destination => ({
    id: d.slug || d.id,
    name: d.name,
    description: d.description,
    fullDescription: d.full_description,
    image: d.image,
    count: d.count,
    rating: d.rating,
    bestSeason: d.best_season,
    seasons: d.seasons,
    popularActivities: d.popular_activities,
    coordinates: d.coordinates,
    images: d.images,
    category: d.category,
});

export const getDestinations = async (category?: string, month?: number): Promise<Destination[]> => {
    const params: Record<string, any> = {};
    if (category && category !== 'All') params.category = category;
    if (month !== undefined) params.month = month;

    const response = await apiClient.get('/destinations/', { params });
    const data = response.data.results ?? response.data;
    return data.map(toDestination);
};

export const sendContactMessage = async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}): Promise<{ message: string }> => {
    const response = await apiClient.post('/contact/send/', data);
    return response.data;
};
