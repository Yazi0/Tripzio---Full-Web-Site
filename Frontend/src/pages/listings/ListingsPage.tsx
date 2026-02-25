import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListings } from '../../api/listings';
import { ListingType } from '../../types';
import { ListingCard } from '../../components/features/ListingCard';
import { FiltersSidebar } from '../../components/features/FiltersSidebar';
import { Loader2, Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';

interface ListingsPageProps {
    type?: ListingType;
    title: string;
    subtitle?: string;
}

import { useSearchParams } from 'react-router-dom';

export const ListingsPage = ({ type, title, subtitle }: ListingsPageProps) => {
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState({});

    const initialSearch = searchParams.get('q') || '';
    const [term, setTerm] = useState(initialSearch);
    const [search, setSearch] = useState(initialSearch);

    // Sync state with URL params changes
    React.useEffect(() => {
        const q = searchParams.get('q') || '';
        setTerm(q);
        setSearch(q);
    }, [searchParams]);

    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings', type, search, filters],
        queryFn: () => getListings(type, search, filters),
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(term);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {type === 'TOUR' && (
                    <div className="col-span-1 lg:col-span-4 mb-4">
                        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white relative overflow-hidden group hover:shadow-xl transition-shadow cursor-pointer" onClick={() => window.open('https://wa.me/94776683072?text=I%20want%20to%20plan%20the%20tour', '_blank')}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-colors"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Want to explore your own way?</h2>
                                    <p className="text-primary-100 max-w-xl text-lg">Create a fully customized tour with our interactive map builder. Choose your stops, pick your vehicle, and get a personalized quote.</p>
                                </div>
                                <button className="bg-white text-primary-700 px-8 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg whitespace-nowrap flex items-center gap-2">
                                    Build My Tour
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <aside className="hidden lg:block">
                    <FiltersSidebar type={type || 'VEHICLE'} onApply={setFilters} onReset={() => setFilters({})} />
                </aside>

                <div className="lg:col-span-3">
                    <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by name, location..."
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <button type="submit" className="hidden">Search</button>
                    </form>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                        </div>
                    ) : listings && listings.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {listings.map(l => (
                                <ListingCard key={l.id} listing={l} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">No listings found matching your criteria.</p>
                            <button onClick={() => { setSearch(''); setTerm(''); }} className="mt-2 text-primary-600 hover:underline">Clear search</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
