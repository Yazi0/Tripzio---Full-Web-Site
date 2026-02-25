import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRoundTours } from '../api/listings';
import { ListingCard } from '../components/features/ListingCard';
import { Loader2, Search, Clock, Map, Shield, Award, Users } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const RoundTour = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: listings, isLoading } = useQuery({
        queryKey: ['round-tours', searchTerm],
        queryFn: () => getRoundTours(searchTerm),
    });

    const filteredListings = listings; // No need to filter by tourType anymore as it's a separate backend


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-primary-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2000&auto=format&fit=crop"
                        alt="Sri Lanka Round Tours"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent" />
                </div>
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Complete Sri Lanka<br />Round Tours</h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8">
                        The ultimate island experience. All-inclusive multi-day journeys covering the best of Sri Lanka.
                    </p>

                    {/* Search Bar in Hero */}
                    <form onSubmit={handleSearch} className="max-w-2xl bg-white p-2 rounded-2xl shadow-xl flex">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Search round tours..."
                                className="border-none shadow-none text-lg py-4 pl-12 text-gray-900 placeholder:text-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="rounded-xl px-8">
                            Search
                        </Button>
                    </form>
                </div>
            </div>

            {/* Tours Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Round Tours</h2>
                        <p className="text-gray-600 mt-2">Discover our most comprehensive tour packages</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                    </div>
                ) : filteredListings && filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredListings.map(l => (
                            <div key={l.id} className="h-full">
                                <ListingCard listing={l} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No round tours found.</p>
                        <Button variant="ghost" onClick={() => setSearchTerm('')} className="mt-2 text-primary-600 hover:bg-primary-50">
                            View all
                        </Button>
                    </div>
                )}
            </section>

            {/* Why Choose Round Tours */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Book a Round Tour?</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">See the whole island with zero stress. We handle everything from transport to accommodation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600">
                                <Map className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Coverage</h3>
                            <p className="text-gray-600 leading-relaxed">
                                From the mountains to the beaches, our round tours are designed to give you a complete taste of everything Sri Lanka has to offer.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600">
                                <Shield className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Hassle-Free Travel</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No need to worry about bookings or directions. Your dedicated vehicle and guide stay with you throughout the journey.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600">
                                <Award className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Best Value</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Bundled packages offer significantly better value than booking transport and stays separately. Maximum experience for your budget.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
