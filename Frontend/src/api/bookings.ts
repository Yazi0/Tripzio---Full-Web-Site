import { apiClient } from './client';
import { Booking } from '../types';

export const createBooking = async (bookingData: any): Promise<Booking> => {
    // Transform frontend camelCase to backend snake_case if necessary
    const apiData = {
        listing: bookingData.listingId,
        guest_name: bookingData.guestName,
        guest_country: bookingData.guestCountry,
        guest_phone: bookingData.guestPhone,
        guest_id_passport: bookingData.guestIdPassport,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        guests: bookingData.guests,
        with_driver: bookingData.withDriver,
        total_price: bookingData.totalPrice,
        guide_price: bookingData.guidePrice,
        guide: bookingData.guideId,
    };

    const response = await apiClient.post('/bookings/', apiData);
    return response.data;
};

export const getMyBookings = async (): Promise<Booking[]> => {
    const response = await apiClient.get('/bookings/');
    const data = response.data.results ?? response.data;

    return data.map((b: any): Booking => ({
        id: String(b.id),
        listingId: String(b.listing),
        listingTitle: b.listing_title,
        listingType: b.listing_type,
        listingImage: b.listing_image,
        startDate: b.start_date,
        endDate: b.end_date,
        guests: b.guests,
        totalPrice: Number(b.total_price),
        guidePrice: b.guide_price ? Number(b.guide_price) : undefined,
        status: b.status,
        paymentStatus: b.payment_status,
        createdAt: b.created_at,
    }));
};

export const payBooking = async (id: string, method: 'CASH' | 'CARD'): Promise<Booking> => {
    const response = await apiClient.post(`/bookings/${id}/pay/`, { method });
    return response.data;
};

export const cancelBooking = async (id: string): Promise<void> => {
    await apiClient.post(`/bookings/${id}/cancel/`);
};

export const getGuideBookings = async (): Promise<Booking[]> => {
    const response = await apiClient.get('/bookings/');
    const data = response.data.results ?? response.data;
    return data.map((b: any): Booking => ({
        id: String(b.id),
        listingId: String(b.listing),
        listingTitle: b.listing_title,
        listingType: b.listing_type,
        listingImage: b.listing_image,
        startDate: b.start_date,
        endDate: b.end_date,
        guests: b.guests,
        totalPrice: Number(b.total_price),
        guidePrice: b.guide_price ? Number(b.guide_price) : undefined,
        status: b.status,
        paymentStatus: b.payment_status,
        createdAt: b.created_at,
    }));
};

export const respondToBooking = async (id: string, action: 'ACCEPT' | 'DECLINE'): Promise<Booking> => {
    const response = await apiClient.post(`/bookings/${id}/respond/`, { action });
    return response.data;
};

export const getBookings = async (): Promise<Booking[]> => {
    const response = await apiClient.get('/bookings/');
    const data = response.data.results ?? response.data;
    return data.map((b: any): Booking => ({
        id: String(b.id),
        listingId: String(b.listing),
        listingTitle: b.listing_title,
        listingType: b.listing_type,
        listingImage: b.listing_image,
        startDate: b.start_date,
        endDate: b.end_date,
        guests: b.guests,
        totalPrice: Number(b.total_price),
        guidePrice: b.guide_price ? Number(b.guide_price) : undefined,
        status: b.status,
        paymentStatus: b.payment_status,
        createdAt: b.created_at,
        customerName: b.guest_name,
        customerPhone: b.guest_phone,
    }));
};

export const updateBookingStatus = async (id: string, status: string): Promise<Booking> => {
    const response = await apiClient.patch(`/bookings/${id}/`, { status });
    return response.data;
};
