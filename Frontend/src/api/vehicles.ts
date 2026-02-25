import { getListings } from './listings';
import { VehicleListing } from '../types';

export const getAvailableVehicles = async (guestCount?: number): Promise<VehicleListing[]> => {
    const listings = await getListings('VEHICLE');
    const vehicles = listings as VehicleListing[];

    if (guestCount) {
        return vehicles.filter(v => v.seats >= guestCount);
    }
    return vehicles;
};
