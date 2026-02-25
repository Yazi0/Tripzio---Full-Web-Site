import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListings } from '../api/listings';
import { ListingCard } from '../components/features/ListingCard';
import { Loader2, Search, Map, Calendar, Shield, Users, Clock, Award } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Tour = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings', 'TOUR', searchTerm],
        queryFn: () => getListings('TOUR', searchTerm),
    });

    const categories = ['All', ...new Set(listings?.map(l => (l as any).tourType).filter(Boolean) || [])];

    const filteredListings = listings?.filter(l => {
        if (selectedCategory === 'All') return true;
        return (l as any).tourType === selectedCategory;
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // The query will automatically refetch when searchTerm changes if we added it to queryKey
        // But for this simple implementation, we might need a debounce or just let the button trigger it if we changed logic.
        // For now, let's keep it simple and react to input change or form submit.
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-primary-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://www.traveltalktours.com/wp-content/uploads/2022/01/yves-alarie-3R50kTNBKiE-unsplash-scaled.jpg"
                        alt="Sri Lanka Tours"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent" />
                </div>
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Experience Sri Lanka<br />Like Never Before</h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8">
                        Curated tours, expert guides, and unforgettable memories await you in the Pearl of the Indian Ocean.
                    </p>

                    {/* Search Bar in Hero */}
                    <div className="max-w-2xl bg-white p-2 rounded-2xl shadow-xl flex">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Where do you want to go?"
                                className="border-none shadow-none text-lg py-4 pl-12 text-gray-900 placeholder:text-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="rounded-xl px-8" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* Build My Tour Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 -mt-8 relative z-10">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block backdrop-blur-sm">
                                Custom Experiences
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">Want to Design Your Own Journey?</h2>
                            <p className="text-primary-100 max-w-lg text-base opacity-90 leading-relaxed">
                                Skip the pre-packaged tours. Use our interactive planner to build a custom itinerary that matches your interests, pace, and budget.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <div className="flex items-center gap-2 text-xs text-primary-100">
                                    <Clock className="w-3.5 h-3.5" /> 100% Flexible
                                </div>
                                <div className="flex items-center gap-2 text-xs text-primary-100">
                                    <Map className="w-3.5 h-3.5" /> Any Destination
                                </div>
                                <div className="flex items-center gap-2 text-xs text-primary-100">
                                    <Shield className="w-3.5 h-3.5" /> Verified Providers
                                </div>
                            </div>
                        </div>
                        <Button
                            className="bg-white text-primary-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-md whitespace-nowrap text-base"
                            onClick={() => window.open('https://wa.me/94776683072?text=I%20want%20to%20plan%20a%20custom%20tour', '_blank')}
                        >
                            Build My Tour
                        </Button>
                    </div>
                </div>
            </section>

            {/* Tours Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Popular Tours</h2>
                        <p className="text-gray-600 mt-2">Explore our most rated tour packages</p>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                ? 'bg-primary-600 text-white shadow-md transform scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
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
                        <p className="text-gray-500 text-lg">No tours found matching your criteria.</p>
                        <Button variant="ghost" onClick={() => setSearchTerm('')} className="mt-2 text-primary-600 hover:bg-primary-50">
                            Clear search
                        </Button>
                    </div>
                )}
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Tours?</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We don't just take you places; we create experiences that last a lifetime. Here's what makes us the best choice for your Sri Lankan adventure.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600">
                                <Users className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Local Guides</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our guides are certified professionals with deep knowledge of Sri Lankan history, culture, and hidden gems you won't find in guidebooks.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600">
                                <Shield className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Comfortable</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your safety is our priority. We use modern, air-conditioned vehicles and partner with top-rated hotels to ensure a comfortable journey.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600">
                                <Award className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Best Price Guarantee</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Direct partnerships with local providers mean you get the best rates without hidden fees. Quality experiences at unbeatable value.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
