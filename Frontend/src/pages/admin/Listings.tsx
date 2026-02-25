import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../../components/ui/Card';
import { getListings, deleteListing, getRoundTours, deleteRoundTour } from '../../api/listings';
import { Loader2, Plus, Search, Filter, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { AddListingModal } from '../../components/admin/AddListingModal';

export const AdminListings = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('ALL');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: listings = [], isLoading } = useQuery({
        queryKey: ['admin-listings-full', searchTerm, typeFilter],
        queryFn: async () => {
            if (typeFilter === 'ROUND_TOUR') {
                return getRoundTours(searchTerm, true);
            }
            const listings = await getListings(typeFilter === 'ALL' ? undefined : typeFilter as any, searchTerm, undefined, true);
            if (typeFilter === 'ALL') {
                const roundTours = await getRoundTours(searchTerm, true);
                return [...listings, ...roundTours];
            }
            return listings;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (listing: any) => listing.type === 'ROUND_TOUR' ? deleteRoundTour(listing.id) : deleteListing(listing.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-listings-full'] });
        }
    });



    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manage Listings</h1>
                        <p className="text-gray-500 text-sm">Create and edit your travel offerings</p>
                    </div>
                    {isLoading && <Loader2 className="h-5 w-5 animate-spin text-primary-600" />}
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 shadow-lg shadow-primary-100"
                >
                    <Plus className="h-4 w-4" /> Add New Listing
                </Button>
            </div>

            <AddListingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Card className="p-4 border-none shadow-sm bg-white">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search listings by title or location..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        {['ALL', 'TOUR', 'ROUND_TOUR', 'STAY', 'VEHICLE'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                                    typeFilter === type
                                        ? "bg-primary-600 text-white shadow-md shadow-primary-100"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing: any) => (
                    <Card key={listing.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48">
                            <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className={cn(
                                    "px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md",
                                    listing.type === 'TOUR' ? "bg-blue-500/80" :
                                        listing.type === 'STAY' ? "bg-emerald-500/80" : "bg-purple-500/80"
                                )}>
                                    {listing.type}
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button className="p-2 bg-white rounded-lg text-primary-600 hover:bg-primary-50 transition-colors">
                                    <Edit2 className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this listing?')) {
                                            deleteMutation.mutate(listing);
                                        }
                                    }}
                                    className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900 line-clamp-1">{listing.title}</h3>
                                <p className="text-primary-600 font-bold text-sm">Rs {listing.price.toLocaleString()}</p>
                            </div>
                            <p className="text-gray-500 text-xs flex items-center gap-1 mb-4">
                                <MapPin className="h-3 w-3" /> {listing.location}
                            </p>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-400">
                                        <Star className="h-3 w-3 fill-current" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">{listing.rating}</span>
                                    <span className="text-xs text-gray-400">({listing.reviewsCount})</span>
                                </div>
                                <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                    <ExternalLink className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
                {!isLoading && listings.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No listings found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search term</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const MapPin = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const Star = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
