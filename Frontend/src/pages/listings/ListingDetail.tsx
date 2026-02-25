import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getListingById } from '../../api/listings';
import { Star, MapPin, Check, Share2, Heart, ArrowLeft, Loader2, Info, X, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { createBooking } from '../../api/bookings';


export const ListingDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Booking Wizard State
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        guests: 1,
        arrivalDate: '',
        days: 1,
        withDriver: 'With Driver',
        country: '',
        passport: ''
    });

    // Filtering State (kept for non-tour listings if needed, or legacy)
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [guests, setGuests] = useState<number>(1);

    const { data: listing, isLoading } = useQuery({
        queryKey: ['listing', id],
        queryFn: () => getListingById(id!),
        enabled: !!id,
        staleTime: 0 // Ensure fresh data
    });

    const handleBookClick = () => {
        if (listing?.type === 'TOUR' || listing?.type === 'VEHICLE') {
            setIsBookingModalOpen(true);
        } else {
            navigate(`/checkout/${listing?.type}/${listing?.id}`);
        }
    };

    const handleWhatsAppRedirect = async () => {
        // Validation
        if (!formData.name || !formData.phone || !formData.arrivalDate) {
            alert('Please fill in Name, Phone, and Date');
            return;
        }
        if (listing?.type !== 'VEHICLE' && !formData.location) {
            alert('Please fill in Location');
            return;
        }

        setIsSubmitting(true);
        if (!listing) return;
        try {
            // Save to Backend Database
            await createBooking({
                listingId: listing.id,
                guestName: formData.name,
                guestPhone: formData.phone,
                guestCountry: formData.country,
                guestIdPassport: formData.passport,
                startDate: formData.arrivalDate,
                guests: formData.guests,
                totalPrice: listing.price, // Basic calculation for now
                withDriver: formData.withDriver === 'With Driver'
            });

            // Prepare WhatsApp Message
            const typeLabel = listing?.type === 'VEHICLE' ? 'Vehicle Rental' : 'Tour Booking';
            const dateLabel = listing?.type === 'VEHICLE' ? 'Pickup Date' : 'Arrival Date';

            let message = `*New ${typeLabel} Request*
Listing: ${listing?.title}
Name: ${formData.name}
Phone: ${formData.phone}`;

            if (listing?.type !== 'VEHICLE') {
                message += `\nLocation: ${formData.location}
Guests: ${formData.guests}`;
            }

            message += `\n${dateLabel}: ${formData.arrivalDate}`;

            if (listing?.type === 'VEHICLE') {
                message += `\nVehicle Type: ${(listing as any).vehicleType || 'Standard'}
Duration: ${formData.days} Days
Driver Option: ${formData.withDriver}
Country: ${formData.country}
Passport/ID: ${formData.passport}`;
            }

            const url = `https://wa.me/94776683072?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
            setIsBookingModalOpen(false);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Listing not found</h2>
                <Link to="/">
                    <Button className="mt-4">Go Home</Button>
                </Link>
            </div>
        );
    }

    // Modal Content
    const renderBookingModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {listing.type === 'VEHICLE' ? 'Book Your Vehicle' : 'Book Your Tour'}
                        </h2>
                        <p className="text-gray-500 text-sm">{listing.title}</p>
                    </div>
                    <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (WhatsApp)</label>
                        <input
                            type="tel"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="+94 77 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="Your Country"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID / Passport No</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="Passport ID"
                                value={formData.passport}
                                onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
                            />
                        </div>
                    </div>

                    {listing.type !== 'VEHICLE' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Location / Hotel</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="Colombo, Kandy, etc."
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        {listing.type !== 'VEHICLE' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    value={formData.guests}
                                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                                />
                            </div>
                        )}
                        <div className={listing.type === 'VEHICLE' ? "col-span-2" : ""}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {listing.type === 'VEHICLE' ? 'Pickup Date' : 'Arrival Date'}
                            </label>
                            <input
                                type="date"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.arrivalDate}
                                onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <Button
                        className="w-full py-4 text-lg font-bold mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                        onClick={handleWhatsAppRedirect}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                        {isSubmitting ? 'Processing...' : 'Confirm Book'}
                    </Button>                    <p className="text-center text-xs text-gray-500">
                        You will be redirected to WhatsApp to complete your booking.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-16">
            {isBookingModalOpen && renderBookingModal()}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
                            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-red-500 transition-colors shadow-sm">
                                    <Heart className="h-5 w-5" />
                                </button>
                                <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-blue-500 transition-colors shadow-sm">
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="default" className="mb-2 uppercase tracking-wide text-[10px]">{listing.type}</Badge>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                                    <div className="flex items-center text-gray-500">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {listing.location}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                                        <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                                        <span className="font-bold text-gray-900 text-lg">{listing.rating}</span>
                                        <span className="text-gray-500 text-sm ml-1">({listing.reviewsCount} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">About this option</h3>
                                <p className="text-gray-600 leading-relaxed">{listing.description}</p>
                            </div>

                            {/* Amenities/Details */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {(listing as any).amenities?.map((am: string) => (
                                        <div key={am} className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> {am}
                                        </div>
                                    ))}
                                    {(listing as any).vehicleType && (
                                        <div className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> {(listing as any).vehicleType}
                                        </div>
                                    )}
                                    {(listing as any).seats && (
                                        <div className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> {(listing as any).seats} Seats
                                        </div>
                                    )}
                                    {(listing as any).driverIncluded && (
                                        <div className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> Driver Included
                                        </div>
                                    )}
                                    {/* Tour Specific highlights */}
                                    {listing.type === 'TOUR' && (listing as any).duration && (
                                        <div className="flex items-center text-gray-600 font-medium">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> Duration: {(listing as any).duration}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Itinerary if Tour */}
                            {listing.type === 'TOUR' && (listing as any).itinerary && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Itinerary</h3>
                                    <div className="space-y-4">
                                        {(listing as any).itinerary.map((item: string, index: number) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <div className="pt-1">
                                                    <p className="text-gray-700">{item}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Panel */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24 border-primary-100 shadow-lg">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">Rs {listing.price.toLocaleString()}</span>
                                    <span className="text-gray-500 ml-1">
                                        {listing.type === 'STAY' ? '/night' : listing.type === 'VEHICLE' ? '/day' : '/person'}
                                    </span>
                                </div>
                            </div>

                            {/* Conditional Rendering for Tour/Vehicle vs Others */}
                            {listing.type === 'TOUR' || listing.type === 'VEHICLE' ? (
                                <div className="space-y-6">
                                    <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                                        <p className="text-sm text-primary-800 font-semibold mb-1">
                                            {listing.type === 'VEHICLE' ? 'Vehicle Type' : 'Duration'}
                                        </p>
                                        <p className="text-2xl font-bold text-primary-600">
                                            {listing.type === 'VEHICLE' ? (listing as any).vehicleType || 'Standard' : (listing as any).duration || 'Flexible'}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Info className="w-4 h-4 text-primary-500" />
                                        <span>
                                            {listing.type === 'VEHICLE' ? 'Driver included in price' : 'Customizable itinerary available'}
                                        </span>
                                    </div>

                                    <Button size="lg" className="w-full py-6 text-lg shadow-primary-500/30 hover:shadow-primary-500/50" onClick={handleBookClick}>
                                        {listing.type === 'VEHICLE' ? 'Book Vehicle' : 'Book Tour'}
                                    </Button>
                                    <p className="text-center text-xs text-gray-500">Instant confirmation via WhatsApp</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-md p-3 hover:border-primary-300 transition-colors">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Dates</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="date"
                                                className="w-full text-sm outline-none bg-transparent"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                            <span className="text-gray-400">→</span>
                                            <input
                                                type="date"
                                                className="w-full text-sm outline-none bg-transparent"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="border border-gray-200 rounded-md p-3 hover:border-primary-300 transition-colors">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Guests</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full text-sm font-medium outline-none bg-transparent"
                                            value={guests}
                                            onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                                        />
                                    </div>

                                    <Button size="lg" className="w-full mt-4" onClick={handleBookClick}>
                                        Book Now
                                    </Button>
                                    <p className="text-center text-xs text-gray-500 mt-2">You won't be charged yet</p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
