import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Star, Calendar, Users, X, ChevronLeft, ChevronRight, Heart, Share2, Navigation, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { getDestinations } from '../api/destinations';
import { useNavigate } from 'react-router-dom';

import { Destination } from '../types';



import { ShareModal } from '../components/ui/ShareModal';

export const DestinationsPage = () => {
    const navigate = useNavigate();
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});

    // Share State
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareDestination, setShareDestination] = useState<Destination | null>(null);

    // Filter Logic
    const [activeCategory, setActiveCategory] = useState('All');
    const [showBestTimeOnly, setShowBestTimeOnly] = useState(false);

    const categories = ['All', 'Beaches', 'Mountains', 'Cultural', 'Wildlife', 'Historical'];
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
    const currentMonth = new Date().getMonth();

    // Fetch from real backend
    const { data: allDestinations = [], isLoading } = useQuery({
        queryKey: ['destinations', activeCategory, showBestTimeOnly ? currentMonth : null],
        queryFn: () => getDestinations(
            activeCategory !== 'All' ? activeCategory : undefined,
            showBestTimeOnly ? currentMonth : undefined,
        ),
    });

    const filteredDestinations = allDestinations;


    const handleDestinationClick = (destination: Destination) => {
        setSelectedDestination(destination);
        setCurrentImageIndex(0);
    };

    const closeModal = () => {
        setSelectedDestination(null);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedDestination) return;
        setCurrentImageIndex((prev) =>
            prev === selectedDestination.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedDestination) return;
        setCurrentImageIndex((prev) =>
            prev === 0 ? selectedDestination.images.length - 1 : prev - 1
        );
    };

    const toggleFavorite = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setIsFavorite(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Header */}
                <div className="bg-primary-900 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Sri Lanka</h1>
                        <p className="text-xl text-primary-200 max-w-2xl mx-auto">
                            Discover ancient cities, pristine beaches, and misty mountains.
                            Your journey to paradise begins here.
                        </p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
                    <Card className="p-6 shadow-xl border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Find Your Perfect Destination</h3>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveCategory(category)}
                                            className={`px-4 py-2 rounded-full border transition-colors ${activeCategory === category
                                                ? 'bg-primary-50 border-primary-500 text-primary-700 font-medium'
                                                : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50 text-gray-700 hover:text-primary-700'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant={showBestTimeOnly ? 'primary' : 'outline'}
                                    onClick={() => setShowBestTimeOnly(!showBestTimeOnly)}
                                    className="flex items-center gap-2"
                                >
                                    <Calendar className="h-4 w-4" />
                                    {showBestTimeOnly ? `Best in ${currentMonthName}` : 'Best Time to Visit'}
                                </Button>
                                <Button
                                    className="flex items-center gap-2"
                                    onClick={() => navigate('/custom-tour')}
                                >
                                    <Navigation className="h-4 w-4" />
                                    Explore Map
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Destinations Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <Loader2 className="h-10 w-10 animate-spin text-primary-600 mb-4" />
                            <p className="text-gray-500">Loading destinations...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredDestinations.map((dest) => (
                                <div
                                    key={dest.id}
                                    className="group cursor-pointer"
                                    onClick={() => handleDestinationClick(dest)}
                                >
                                    <Card className="h-full overflow-hidden border border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-2xl">
                                        {/* Image Section */}
                                        <div className="relative h-72 overflow-hidden">
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            {/* Top Badges */}
                                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                                    <span className="font-semibold text-gray-900">{dest.rating}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        toggleFavorite(e, dest.id);
                                                    }}
                                                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white"
                                                >
                                                    <Heart className={`h-4 w-4 ${isFavorite[dest.id] ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                                                </button>
                                            </div>

                                            {/* Destination Info Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center text-white/90">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        <span className="font-medium">{dest.count}+ Experiences</span>
                                                    </div>
                                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                                        {dest.bestSeason}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <p className="text-gray-600 mb-4 line-clamp-2">{dest.description}</p>

                                            {/* Popular Activities */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {dest.popularActivities.slice(0, 3).map((activity) => (
                                                    <span
                                                        key={activity}
                                                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                                                    >
                                                        {activity}
                                                    </span>
                                                ))}
                                                {dest.popularActivities.length > 3 && (
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                                        +{dest.popularActivities.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-primary-700 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                                                    Explore Destination
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShareDestination(dest);
                                                        setShareModalOpen(true);
                                                    }}
                                                    className="p-2 hover:bg-gray-100 rounded-full"
                                                >
                                                    <Share2 className="h-4 w-4 text-gray-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Travel Inspiration Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Travel Inspiration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Adventure Card */}
                            <div className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
                                onClick={() => {
                                    setActiveCategory('Mountains');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                <img
                                    src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200"
                                    alt="Mountains"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <span className="px-3 py-1 bg-amber-500 rounded-full text-sm font-medium mb-4 inline-block">Adventure</span>
                                    <h3 className="text-3xl font-bold mb-2">Thrilling Heights</h3>
                                    <p className="text-white/80 mb-6 max-w-md">Discover the misty mountains and breathtaking peaks of Sri Lanka's hill country.</p>
                                    <Button
                                        className="bg-white text-gray-900 hover:bg-gray-100 border-none"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveCategory('Mountains');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        Explore Mountains
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Relaxation Card */}
                            <div className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
                                onClick={() => {
                                    setActiveCategory('Beaches');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                <img
                                    src="https://tse1.mm.bing.net/th/id/OIP.TdtPJUAqHwjE7LJPkpiZawHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                                    alt="Beach"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium mb-4 inline-block">Relaxation</span>
                                    <h3 className="text-3xl font-bold mb-2">Golden Shores</h3>
                                    <p className="text-white/80 mb-6 max-w-md">Unwind on pristine sandy beaches an enjoy the tropical warmth of the coast.</p>
                                    <Button
                                        className="bg-white text-gray-900 hover:bg-gray-100 border-none"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveCategory('Beaches');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        View Beach Stays
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Link to="/search">
                            <Button variant="outline" size="lg" className="px-8 py-3">
                                View All Destinations
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Destination Detail Modal */}
            {
                selectedDestination && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={closeModal}
                        />

                        {/* Modal */}
                        <div className="relative min-h-screen flex items-center justify-center p-4">
                            <div
                                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-700" />
                                </button>

                                {/* Image Gallery */}
                                <div className="relative h-96">
                                    <img
                                        src={selectedDestination.images[currentImageIndex]}
                                        alt={selectedDestination.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Image Navigation */}
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>

                                    {/* Image Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {selectedDestination.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`h-2 rounded-full transition-all ${index === currentImageIndex
                                                    ? 'w-8 bg-white'
                                                    : 'w-2 bg-white/50 hover:bg-white/80'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Destination Title Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                        <h2 className="text-3xl font-bold mb-2">{selectedDestination.name}</h2>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                                <span className="font-semibold">{selectedDestination.rating}</span>
                                                <span className="text-white/80">({selectedDestination.count} reviews)</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span>{selectedDestination.count}+ experiences available</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 overflow-y-auto max-h-[calc(90vh-24rem)]">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        {/* Main Content */}
                                        <div className="flex-1">
                                            <div className="mb-8">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-4">About {selectedDestination.name}</h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {selectedDestination.fullDescription}
                                                </p>
                                            </div>

                                            {/* Popular Activities */}
                                            <div className="mb-8">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4">Popular Activities</h4>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {selectedDestination.popularActivities.map((activity) => (
                                                        <div
                                                            key={activity}
                                                            className="bg-gray-50 hover:bg-primary-50 p-4 rounded-xl border border-gray-200 hover:border-primary-200 transition-colors"
                                                        >
                                                            <span className="font-medium text-gray-900">{activity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sidebar Info */}
                                        <div className="lg:w-80 space-y-6">
                                            {/* Quick Facts */}
                                            <Card className="p-6">
                                                <h4 className="font-bold text-gray-900 mb-4">Quick Facts</h4>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Best Season</span>
                                                        <span className="font-semibold text-gray-900">{selectedDestination.bestSeason}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Rating</span>
                                                        <span className="font-semibold text-gray-900">{selectedDestination.rating}/5</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Experiences</span>
                                                        <span className="font-semibold text-gray-900">{selectedDestination.count}+</span>
                                                    </div>
                                                </div>
                                            </Card>

                                            {/* Action Buttons */}
                                            <div className="space-y-3">
                                                <Link
                                                    to={`/search?location=${selectedDestination.name}`}
                                                    onClick={closeModal}
                                                >
                                                    <Button className="w-full py-3">
                                                        <Calendar className="h-4 w-4 mr-2" />
                                                        Browse Experiences
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" className="w-full py-3">
                                                    <Users className="h-4 w-4 mr-2" />
                                                    Join Group Tour
                                                </Button>
                                                <Button variant="ghost" className="w-full py-3">
                                                    <Navigation className="h-4 w-4 mr-2" />
                                                    View on Map
                                                </Button>
                                            </div>

                                            {/* Social Actions */}
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={(e) => toggleFavorite(e, selectedDestination.id)}
                                                    className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
                                                >
                                                    <Heart className={`h-4 w-4 ${isFavorite[selectedDestination.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                                                    <span>{isFavorite[selectedDestination.id] ? 'Saved' : 'Save'}</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShareDestination(selectedDestination);
                                                        setShareModalOpen(true);
                                                    }}
                                                    className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
                                                >
                                                    <Share2 className="h-4 w-4 text-gray-600" />
                                                    <span>Share</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <ShareModal
                isOpen={shareModalOpen}
                onClose={() => setShareModalOpen(false)}
                title={shareDestination ? `Check out ${shareDestination.name} in Sri Lanka!` : 'Tripzio'}
                url={shareDestination ? `${window.location.origin}/search?location=${encodeURIComponent(shareDestination.name)}` : window.location.href}
            />
        </>
    );
};