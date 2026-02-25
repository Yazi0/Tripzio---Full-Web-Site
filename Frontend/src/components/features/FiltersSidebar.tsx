import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface FiltersSidebarProps {
    type: string;
    onApply: (filters: any) => void;
    onReset: () => void;
}

export const FiltersSidebar = ({ type, onApply, onReset }: FiltersSidebarProps) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [rating, setRating] = useState<number | null>(null);

    const handleCategoryChange = (val: string) => {
        setCategories(prev =>
            prev.includes(val) ? prev.filter(c => c !== val) : [...prev, val]
        );
    };

    const handleApply = () => {
        onApply({
            categories: categories.length > 0 ? categories : undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            rating: rating || undefined
        });
    };

    const handleLocalReset = () => {
        setCategories([]);
        setMinPrice('');
        setMaxPrice('');
        setRating(null);
        onReset();
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button onClick={handleLocalReset} className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    Reset all
                </button>
            </div>

            <div className="space-y-6">
                {/* Tour Type Filter */}
                {type === 'TOUR' ? (
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-3">Tour Type</label>
                        <div className="space-y-2">
                            {['Cultural', 'Wildlife', 'Adventure', 'City', 'Relaxation'].map(t => (
                                <label key={t} className="flex items-center text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                                        checked={categories.includes(t)}
                                        onChange={() => handleCategoryChange(t)}
                                    />
                                    {t}
                                </label>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Price Filter for others */
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-3">Price Range (LKR)</label>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Min"
                                type="number"
                                className="h-9 text-sm"
                                value={minPrice}
                                onChange={e => setMinPrice(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Dynamic Filters based on Type */}
                {type === 'VEHICLE' && (
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-3">Vehicle Type</label>
                        <div className="space-y-2">
                            {['Car', 'Van', 'SUV', 'Bus', 'TukTuk'].map(t => (
                                <label key={t} className="flex items-center text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                                        checked={categories.includes(t)}
                                        onChange={() => handleCategoryChange(t)}
                                    />
                                    {t}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {type === 'STAY' && (
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-3">Property Type</label>
                        <div className="space-y-2">
                            {['Hotel', 'Villa', 'Resort', 'Homestay'].map(t => (
                                <label key={t} className="flex items-center text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                                        checked={categories.includes(t)}
                                        onChange={() => handleCategoryChange(t)}
                                    />
                                    {t}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Rating Filter */}
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-3">Rating</label>
                    <div className="space-y-2">
                        {[5, 4, 3].map(r => (
                            <label key={r} className="flex items-center text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                                    checked={rating === r}
                                    onChange={() => setRating(r === rating ? null : r)}
                                />
                                {r}+ Stars
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <Button size="md" className="w-full" onClick={handleApply}>Apply Filters</Button>
                </div>
            </div>
        </div>
    );
};
