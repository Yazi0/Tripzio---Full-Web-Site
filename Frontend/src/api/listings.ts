import { apiClient } from './client';
import { Listing, ListingType } from '../types';

export interface ListingFilters {
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
}

export const getListings = async (type?: ListingType, search?: string, filters?: ListingFilters, noPagination?: boolean): Promise<Listing[]> => {
    const params: Record<string, any> = {};

    if (type) params.type = type;
    if (search) params.search = search;
    if (noPagination) params.no_pagination = 'true';
    if (filters?.minPrice !== undefined) params.min_price = filters.minPrice;
    if (filters?.maxPrice !== undefined) params.max_price = filters.maxPrice;
    if (filters?.rating !== undefined) params.rating = filters.rating;
    if (filters?.categories && filters.categories.length > 0) {
        params.category = filters.categories[0]; // API filters by single category
    }

    const response = await apiClient.get('/listings/', { params });

    // DRF paginated response
    const data = response.data.results ?? response.data;

    // Transform backend response to match frontend Listing type
    return data.map((item: any) => ({
        id: String(item.id),
        type: item.type,
        title: item.title,
        description: item.description,
        location: item.location,
        price: Number(item.price),
        rating: Number(item.rating),
        reviewsCount: item.reviews_count,
        images: item.images?.map((img: any) => img.url) || [],
        featured: item.featured,
        // Vehicle fields
        vehicleType: item.vehicle_type || undefined,
        seats: item.seats || undefined,
        driverIncluded: item.driver_included ?? undefined,
        transmission: item.transmission || undefined,
        airConditioned: item.air_conditioned ?? undefined,
        // Stay fields
        stayType: item.stay_type || undefined,
        rooms: item.rooms || undefined,
        maxGuests: item.max_guests || undefined,
        amenities: item.amenities || [],
        // Tour fields
        duration: item.duration || undefined,
        tourType: item.tour_type || undefined,
        groupSize: item.group_size || undefined,
        itinerary: item.itinerary || [],
        included: item.included || [],
    }));
};

export const getListingById = async (id: string): Promise<Listing | undefined> => {
    try {
        const response = await apiClient.get(`/listings/${id}/`);
        const item = response.data;
        return {
            id: String(item.id),
            type: item.type,
            title: item.title,
            description: item.description,
            location: item.location,
            price: Number(item.price),
            rating: Number(item.rating),
            reviewsCount: item.reviews_count,
            images: item.images?.map((img: any) => img.url) || [],
            featured: item.featured,
            vehicleType: item.vehicle_type || undefined,
            seats: item.seats || undefined,
            driverIncluded: item.driver_included ?? undefined,
            transmission: item.transmission || undefined,
            airConditioned: item.air_conditioned ?? undefined,
            stayType: item.stay_type || undefined,
            rooms: item.rooms || undefined,
            maxGuests: item.max_guests || undefined,
            amenities: item.amenities || [],
            duration: item.duration || undefined,
            tourType: item.tour_type || undefined,
            groupSize: item.group_size || undefined,
            itinerary: item.itinerary || [],
            included: item.included || [],
        };
    } catch {
        return undefined;
    }
};

export const getFeaturedListings = async (): Promise<Listing[]> => {
    const response = await apiClient.get('/listings/featured/');
    const data = response.data.results ?? response.data;
    return data.map((item: any) => ({
        id: String(item.id),
        type: item.type,
        title: item.title,
        description: item.description,
        location: item.location,
        price: Number(item.price),
        rating: Number(item.rating),
        reviewsCount: item.reviews_count,
        images: item.images?.map((img: any) => img.url) || [],
        featured: item.featured,
        vehicleType: item.vehicle_type || undefined,
        seats: item.seats || undefined,
        driverIncluded: item.driver_included ?? undefined,
        transmission: item.transmission || undefined,
        airConditioned: item.air_conditioned ?? undefined,
        stayType: item.stay_type || undefined,
        rooms: item.rooms || undefined,
        maxGuests: item.max_guests || undefined,
        amenities: item.amenities || [],
        duration: item.duration || undefined,
        tourType: item.tour_type || undefined,
        groupSize: item.group_size || undefined,
        itinerary: item.itinerary || [],
        included: item.included || [],
    }));
};

export const createListing = async (data: any): Promise<Listing> => {
    // Transform camelCase to snake_case for backend
    const apiData = {
        ...data,
        vehicle_type: data.vehicleType,
        driver_included: data.driverIncluded,
        air_conditioned: data.airConditioned,
        stay_type: data.stayType,
        max_guests: data.maxGuests,
        tour_type: data.tourType,
        group_size: data.groupSize,
        image_urls: data.images,
    };
    const response = await apiClient.post('/listings/', apiData);
    return response.data;
};

export const updateListing = async (id: string, data: any): Promise<Listing> => {
    const apiData = {
        ...data,
        vehicle_type: data.vehicleType,
        driver_included: data.driverIncluded,
        air_conditioned: data.airConditioned,
        stay_type: data.stayType,
        max_guests: data.maxGuests,
        tour_type: data.tourType,
        group_size: data.groupSize,
        image_urls: data.images,
    };
    const response = await apiClient.patch(`/listings/${id}/`, apiData);
    return response.data;
};

export const deleteListing = async (id: string): Promise<void> => {
    await apiClient.delete(`/listings/${id}/`);
};

export const getRoundTours = async (search?: string, noPagination?: boolean): Promise<Listing[]> => {
    const params: Record<string, any> = {};
    if (search) params.search = search;
    if (noPagination) params.no_pagination = 'true';

    const response = await apiClient.get('/listings/round-tours/', { params });
    const data = response.data.results ?? response.data;

    return data.map((item: any) => ({
        id: String(item.id),
        type: 'TOUR',
        title: item.title,
        description: item.description,
        location: item.location,
        price: Number(item.price),
        rating: Number(item.rating) || 0,
        reviewsCount: item.reviews_count || 0,
        images: item.images?.map((img: any) => img.url) || [],
        featured: item.featured,
        duration: item.duration || undefined,
        tourType: 'Round Tour',
        groupSize: item.group_size || undefined,
        itinerary: item.itinerary || [],
        included: item.included || [],
    }));
};
export const createRoundTour = async (data: any): Promise<Listing> => {
    const apiData = {
        ...data,
        group_size: data.groupSize,
        image_urls: data.images,
    };
    const response = await apiClient.post('/listings/round-tours/', apiData);
    return response.data;
};

export const updateRoundTour = async (id: string, data: any): Promise<Listing> => {
    const apiData = {
        ...data,
        group_size: data.groupSize,
        image_urls: data.images,
    };
    const response = await apiClient.patch(`/listings/round-tours/${id}/`, apiData);
    return response.data;
};

export const deleteRoundTour = async (id: string): Promise<void> => {
    await apiClient.delete(`/listings/round-tours/${id}/`);
};
