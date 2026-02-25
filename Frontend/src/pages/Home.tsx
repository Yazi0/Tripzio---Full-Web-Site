import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Calendar, Map, Star, ChevronRight, Heart, X, Mountain, Waves, MapPin, ChevronLeft, Calendar as CalendarIcon, Users, Navigation, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Destination } from './DestinationsPage';
import { getDestinations } from '../api/destinations';
import { ListingCard } from '../components/features/ListingCard';
import { HeroSearch } from '../components/features/HeroSearch';
import { getFeaturedListings, getListings } from '../api/listings';
import { Listing } from '../types';
import WhyChooseImage from '../assets/images/WhyChooese.png';
import { LiveDateTime } from '../components/features/LiveDateTime';

export const Home = () => {
    const [tours, setTours] = useState<Listing[]>([]);
    const [vehicles, setVehicles] = useState<Listing[]>([]);
    const [popularDestinations, setPopularDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMood, setActiveMood] = useState<'adventure' | 'relaxation' | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const toursData = await getListings('TOUR');
                const vehiclesData = await getListings('VEHICLE');
                const destData = await getDestinations();
                setTours(toursData.slice(0, 4));
                setVehicles(vehiclesData.slice(0, 4));
                setPopularDestinations(destData.slice(0, 4));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const categories = [
        { name: 'Vehicles', icon: Car, href: '/vehicles', color: 'bg-blue-100 text-blue-600' },
        { name: 'Stays', icon: Calendar, href: '/stays', color: 'bg-indigo-100 text-indigo-600' },
        { name: 'Tours', icon: Map, href: '/tours', color: 'bg-green-100 text-green-600' },
    ];


    const openDestinationModal = (destination: Destination) => {
        setSelectedDestination(destination);
        setCurrentImageIndex(0);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedDestination) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedDestination.images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedDestination) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedDestination.images.length) % selectedDestination.images.length);
        }
    };

    return (
        <div className="bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[550px] bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&q=80&w=2000"
                    alt="Sri Lanka Landscape"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
                    <LiveDateTime />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
                        Find Your Perfect <br className="hidden md:block" /> Sri Lankan Escape
                    </h1>
                    <p className="text-lg text-gray-200 max-w-2xl mb-12 drop-shadow-md">
                        Discover the island's best stays, experiences, and journeys. From misty mountains to golden shores, your adventure starts here.
                    </p>
                </div>
            </div>

            {/* Search Component (Floating) */}
            <div className="px-4">
                <HeroSearch />
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="flex justify-center flex-wrap gap-4 sm:gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.name} to={cat.href} className="flex flex-col items-center group cursor-pointer min-w-[80px]">
                            <div className={`p-4 rounded-2xl ${cat.color} bg-opacity-50 mb-3 transition-transform group-hover:scale-110 group-hover:shadow-lg`}>
                                <cat.icon className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Popular Destinations */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
                        <p className="text-gray-600 mt-2 text-lg">Most visited places this month</p>
                    </div>
                    <Link to="/destinations" className="text-primary-600 font-semibold hover:text-primary-700 flex items-center">
                        View All <ChevronRight className="h-5 w-5 ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {popularDestinations.map((dest, index) => (
                        <div
                            key={dest.name}
                            onClick={() => openDestinationModal(dest)}
                            className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Top Badge */}
                            {index === 0 && (
                                <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-lg">
                                    <Star className="h-3 w-3 mr-1 fill-yellow-900" />
                                    Top Choice
                                </div>
                            )}

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-200 transition-colors">{dest.name}</h3>
                                <div className="flex items-center text-white/90 mb-3 space-x-4">
                                    <div className="flex items-center text-sm font-medium bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg">
                                        <Map className="h-3 w-3 mr-1.5" />
                                        {dest.count} Experiences
                                    </div>
                                </div>
                                <p className="text-white/70 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                    {dest.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Tours Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Popular Tours</h2>
                        <p className="mt-1 text-gray-600">Explore our most rated tour packages</p>
                    </div>
                    <Link to="/tours">
                        <Button variant="ghost" className="hidden sm:flex items-center text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                            View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tours.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}
            </section>

            {/* Rent a Vehicle Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Rent a Vehicle</h2>
                        <p className="mt-1 text-gray-600">Reliable transportation for your journey</p>
                    </div>
                    <Link to="/vehicles">
                        <Button variant="ghost" className="hidden sm:flex items-center text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                            View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {vehicles.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}
            </section>

            {/* About Us Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="relative rounded-3xl overflow-hidden bg-primary-900 text-white">
                    <div className="absolute inset-0">
                        <img
                            src={WhyChooseImage}
                            alt="Sri Lanka Culture"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/90 to-transparent" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-800 text-primary-100 text-sm font-medium">
                                <Star className="h-4 w-4 fill-primary-100" />
                                <span>Why Choose Us</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Experience Sri Lanka with a trusted companion
                            </h2>
                            <p className="text-primary-100 text-lg leading-relaxed">
                                We are dedicated to providing you with the most authentic and memorable experiences in Sri Lanka. From curated tours to reliable vehicle rentals, we ensure your journey is seamless and unforgettable.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div>
                                    <h4 className="text-3xl font-bold mb-1">{popularDestinations.length || '50'}+</h4>
                                    <p className="text-primary-200 text-sm">Destinations</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold mb-1">10k+</h4>
                                    <p className="text-primary-200 text-sm">Happy Travelers</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold mb-1">24/7</h4>
                                    <p className="text-primary-200 text-sm">Support</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold mb-1">100%</h4>
                                    <p className="text-primary-200 text-sm">Satisfaction</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link to="/about">
                                    <Button className="bg-white text-primary-900 hover:bg-gray-100 border-none px-8 py-3 text-lg">
                                        Learn More About Us
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://thumbs.dreamstime.com/b/sri-lanka-train-ride-scenic-tea-plantations-hill-country-adventure-travel-photography-journey-stunning-picturesque-365281018.jpg"
                                    alt="Train"
                                    className="rounded-2xl transform translate-y-8 shadow-2xl"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?auto=format&fit=crop&q=80&w=600"
                                    alt="Elephant"
                                    className="rounded-2xl transform -translate-y-8 shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inspiration / Moods */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Travel Inspiration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            id: 'adventure',
                            title: 'Thrilling Heights',
                            label: 'Adventure',
                            button: 'Explore Mountains',
                            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200'
                        },
                        {
                            id: 'relaxation',
                            title: 'Golden Shores',
                            label: 'Relaxation',
                            button: 'View Beach Stays',
                            image: 'https://overatours.com/wp-content/uploads/2021/09/Bali-Best-Beach-Clubs-Sundays-Beach-Club-1.jpg'
                        }
                    ].map(mood => (
                        <div
                            key={mood.id}
                            className="relative rounded-2xl overflow-hidden h-[300px] group cursor-pointer"
                            onClick={() => setActiveMood(mood.id as any)}
                        >
                            <img src={mood.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={mood.label} />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute bottom-8 left-8">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider mb-3 inline-block">{mood.label}</span>
                                <h3 className="text-3xl font-bold text-white mb-2">{mood.title}</h3>
                                <button className="text-white font-medium flex items-center hover:underline">{mood.button} <ChevronRight className="ml-1 h-4 w-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mood Modals */}
            {activeMood && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveMood(null)} />
                    <div className="relative min-h-screen flex items-center justify-center p-4">
                        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-300">
                            <button
                                onClick={() => setActiveMood(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                            >
                                <X className="h-6 w-6 text-gray-900" />
                            </button>

                            {activeMood === 'adventure' && (
                                <div className="flex flex-col md:flex-row h-full">
                                    <div className="md:w-1/2 h-64 md:h-auto relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
                                            alt="Adventure"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                                            <h2 className="text-3xl font-bold text-white">Thrilling Heights</h2>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 p-8 md:p-12 bg-white">
                                        <div className="hidden md:flex items-center gap-2 text-amber-600 font-semibold mb-2">
                                            <Mountain className="h-5 w-5" />
                                            <span>Adventure Awaits</span>
                                        </div>
                                        <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-6">Discover Sri Lanka's Peaks</h2>

                                        <p className="text-gray-600 mb-8 leading-relaxed">
                                            Escape the heat and retreat to the cool, misty central highlands.
                                            From world-class hiking trails to scenic train journeys through tea plantations,
                                            adventure fits you perfectly here.
                                        </p>

                                        <div className="space-y-6 mb-8">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                                    <Star className="h-6 w-6 text-amber-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">Iconic Experiences</h4>
                                                    <p className="text-sm text-gray-500">Kandy to Ella Train, Adam's Peak Hike, Horton Plains</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                    <MapPin className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">Top Locations</h4>
                                                    <p className="text-sm text-gray-500">Ella, Nuwara Eliya, Haputale, Knuckles Range</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Link to="/search?category=Mountains">
                                            <Button className="w-full py-6 text-lg group">
                                                Explore Mountain Stays
                                                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {activeMood === 'relaxation' && (
                                <div className="flex flex-col md:flex-row h-full">
                                    <div className="md:w-1/2 h-64 md:h-auto relative">
                                        <img
                                            src="https://overatours.com/wp-content/uploads/2021/09/Bali-Best-Beach-Clubs-Sundays-Beach-Club-1.jpg"
                                            alt="Relaxation"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                                            <h2 className="text-3xl font-bold text-white">Golden Shores</h2>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 p-8 md:p-12 bg-white">
                                        <div className="hidden md:flex items-center gap-2 text-blue-600 font-semibold mb-2">
                                            <Waves className="h-5 w-5" />
                                            <span>Pure Relaxation</span>
                                        </div>
                                        <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-6">Sun, Sand & Serenity</h2>

                                        <p className="text-gray-600 mb-8 leading-relaxed">
                                            With over 1,300km of pristine coastline, Sri Lanka is a beach lover's paradise.
                                            Whether you want to surf world-class waves, watch whales, or simply sip a coconut by the sea.
                                        </p>

                                        <div className="space-y-6 mb-8">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                    <Waves className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">Best Activities</h4>
                                                    <p className="text-sm text-gray-500">Surfing, Whale Watching, Snorkeling, Sunbathing</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                    <MapPin className="h-6 w-6 text-orange-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">Top Locations</h4>
                                                    <p className="text-sm text-gray-500">Mirissa, Unawatuna, Arugam Bay, Trincomalee</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Link to="/search?category=Beaches">
                                            <Button className="w-full py-6 text-lg group">
                                                Find Beach Resorts
                                                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Destination Detail Modal */}
            {selectedDestination && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setSelectedDestination(null)}
                    />

                    {/* Modal */}
                    <div className="relative min-h-screen flex items-center justify-center p-4">
                        <div
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedDestination(null)}
                                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors border border-gray-100"
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
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {selectedDestination.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentImageIndex(index);
                                            }}
                                            className={`h-2 rounded-full transition-all ${index === currentImageIndex
                                                ? 'w-8 bg-white'
                                                : 'w-2 bg-white/50 hover:bg-white/80'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Destination Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                                    <h2 className="text-4xl font-bold mb-2">{selectedDestination.name}</h2>
                                    <div className="flex items-center gap-4 text-sm font-medium">
                                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="font-semibold">{selectedDestination.rating}</span>
                                            <span className="text-white/80">({selectedDestination.count} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                            <MapPin className="h-4 w-4" />
                                            <span>{selectedDestination.count}+ experiences</span>
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
                                            <p className="text-gray-600 leading-relaxed text-lg">
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
                                                        className="bg-gray-50 hover:bg-primary-50 p-4 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors"
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
                                        <Card className="p-6 bg-gray-50 border-none">
                                            <h4 className="font-bold text-gray-900 mb-4">Quick Facts</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600 flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Best Season</span>
                                                    <span className="font-semibold text-gray-900 text-right">{selectedDestination.bestSeason}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Rating</span>
                                                    <span className="font-semibold text-gray-900">{selectedDestination.rating}/5</span>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Action Buttons */}
                                        <div className="space-y-3">
                                            <Link
                                                to={`/search?location=${selectedDestination.name}`}
                                                onClick={() => setSelectedDestination(null)}
                                            >
                                                <Button className="w-full py-6 text-lg">
                                                    Explore {selectedDestination.name}
                                                    <ArrowRight className="h-5 w-5 ml-2" />
                                                </Button>
                                            </Link>
                                            <Button variant="outline" className="w-full py-4 text-base">
                                                <Navigation className="h-4 w-4 mr-2" />
                                                View on Map
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; {/* Destination Detail Modal */ }

