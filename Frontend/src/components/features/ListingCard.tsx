import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Listing } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ListingCardProps {
    listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
    const getLink = () => {
        switch (listing.type) {
            case 'VEHICLE': return `/vehicles/${listing.id}`;
            case 'STAY': return `/stays/${listing.id}`;
            case 'TOUR': return `/tours/${listing.id}`;
            default: return '#';
        }
    };

    const getSubtitle = () => {
        switch (listing.type) {
            case 'VEHICLE': return `${listing.vehicleType} • ${listing.seats} Seats`;
            case 'STAY': return `${listing.stayType} • ${listing.maxGuests} Guests`;
            case 'TOUR': return (listing as any).tourType;
            default: return '';
        }
    };

    return (
        <Link to={getLink()} className="group block h-full">
            <Card hover className="h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {listing.featured && (
                        <div className="absolute top-2 right-2">
                            <Badge variant="warning" className="shadow-sm">Featured</Badge>
                        </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                        <Badge variant="default" className="bg-white/90 text-gray-900 shadow-sm backdrop-blur-sm">
                            {listing.type}
                        </Badge>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 mr-2">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{listing.title}</h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                <span className="truncate">{listing.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center bg-gray-50 px-1.5 py-0.5 rounded text-sm font-medium text-gray-700 flex-shrink-0">
                            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                            {listing.rating}
                        </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{listing.description}</p>

                    <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500 font-medium">
                            {getSubtitle()}
                        </div>
                        <div className="text-right">
                            {listing.type === 'TOUR' ? (
                                <span className="text-lg font-bold text-primary-600">View Details</span>
                            ) : (
                                <div className="flex flex-col items-end">
                                    <span className="text-lg font-bold text-primary-600">
                                        Rs {listing.price.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {listing.type === 'STAY' ? 'per night' : listing.type === 'VEHICLE' ? 'per day' : 'per person'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};
