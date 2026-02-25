import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <div className="bg-white rounded-full p-2 max-w-3xl mx-auto -mt-8 relative z-20 shadow-2xl flex items-center">
            {/* Search Input Section */}
            <div className="relative flex-1 w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-600" />
                <form onSubmit={handleSearch} className="w-full">
                    <input
                        type="text"
                        placeholder="Search tours..."
                        className="w-full pl-14 pr-4 py-3 rounded-full focus:outline-none text-gray-700 placeholder:text-gray-400 font-medium bg-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
};
