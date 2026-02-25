export type UserRole = 'GUEST' | 'PROVIDER' | 'ADMIN' | 'GUIDE';

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    token?: string;
    avatar?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export type ListingType = 'VEHICLE' | 'STAY' | 'TOUR';

export interface ListingBase {
    id: string;
    type: ListingType;
    title: string;
    description: string;
    location: string;
    price: number;
    rating: number;
    reviewsCount: number;
    images: string[];
    featured?: boolean;
}

export interface Destination {
    id: string;
    name: string;
    description: string;
    fullDescription: string;
    image: string;
    count: number;
    rating: number;
    bestSeason: string;
    seasons: number[]; // Array of month indices (0-11) when it's best to visit
    popularActivities: string[];
    coordinates: { lat: number; lng: number };
    images: string[];
    category: string;
}

export interface VehicleListing extends ListingBase {
    type: 'VEHICLE';
    vehicleType: 'Car' | 'Van' | 'Bus' | 'TukTuk' | 'SUV';
    seats: number;
    driverIncluded: boolean;
    transmission: 'Automatic' | 'Manual';
    airConditioned: boolean;
}

export interface StayListing extends ListingBase {
    type: 'STAY';
    stayType: 'Hotel' | 'Villa' | 'Homestay' | 'Resort';
    rooms: number;
    maxGuests: number;
    driverQuarters?: boolean;
    amenities: string[];
}

export interface TourListing extends ListingBase {
    type: 'TOUR';
    duration: string; // e.g., "3 Days"
    tourType: 'Cultural' | 'Wildlife' | 'Adventure' | 'City' | 'Relaxation' | 'Beach' | 'Mountain' | 'Temple' | 'Whale Watching' | 'Round Tour';
    groupSize: string; // e.g., "Max 10"
    itinerary: string[];
    included: string[];
}

export type Listing = VehicleListing | StayListing | TourListing;

export interface Guide {
    id: string;
    name: string;
    image: string;
    feePerDay: number;
    languages: string[];
    rating: number;
    experience: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'GUIDE_DECLINED';

export interface Booking {
    id: string;
    userId?: string;
    listingId: string;
    listingTitle: string;
    listingType: ListingType;
    listingImage: string;
    startDate: string; // ISO Date
    endDate?: string;
    guests?: number;
    totalPrice: number;
    status: BookingStatus;
    paymentStatus: 'PAID' | 'UNPAID' | 'REFUNDED';
    createdAt: string;
    // Tour specific extension
    guideId?: string;
    guideName?: string;
    guidePrice?: number;
    vehicleId?: string;
    vehicleName?: string;
    vehiclePrice?: number;
    paymentMethod?: 'CASH' | 'CARD';
    customerName?: string;
    customerPhone?: string;
}
