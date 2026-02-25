import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getListingById } from '../api/listings';
import { createBooking } from '../api/bookings';
import { getContactInfo } from '../api/contact';
import { Loader2, CheckCircle, MessageSquare } from 'lucide-react';

export const CheckoutPage = () => {
    const { type, id } = useParams<{ type: string; id: string }>();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        guestName: '',
        guestEmail: '',
        guestPhone: '',
    });

    const { data: listing, isLoading } = useQuery({
        queryKey: ['listing', id],
        queryFn: () => getListingById(id!),
        enabled: !!id
    });

    const { data: contactInfo } = useQuery({
        queryKey: ['contactInfo'],
        queryFn: getContactInfo
    });

    const bookingMutation = useMutation({
        mutationFn: (data: any) => createBooking(data),
        onSuccess: (newBooking) => {
            setIsSuccess(true);

            // Construct WhatsApp message
            const message = `*New Booking Request from Tripzio*%0A%0A` +
                `*Listing:* ${listing?.title}%0A` +
                `*Type:* ${listing?.type}%0A` +
                `*Customer:* ${formData.guestName}%0A` +
                `*Phone:* ${formData.guestPhone}%0A` +
                `*Price:* Rs ${total.toLocaleString()}%0A%0A` +
                `Please confirm this booking.`;

            const whatsappNumber = contactInfo?.whatsapp.replace(/\D/g, '') || '94771234567';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

            // Short delay to show success state before redirect
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    if (!listing) {
        return <Navigate to="/" />;
    }

    const subtotal = listing.price;
    const tax = subtotal * 0.1; // 10% tax for example
    const total = subtotal + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        bookingMutation.mutate({
            listingId: listing.id,
            guestName: formData.guestName,
            guestPhone: formData.guestPhone,
            guestEmail: formData.guestEmail,
            startDate: new Date().toISOString().split('T')[0], // Today as default
            totalPrice: total,
            status: 'PENDING'
        });
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-4 text-center">
                <div className="bg-emerald-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Submitted!</h1>
                <p className="text-gray-600 mb-8">
                    Your booking for <span className="font-bold text-gray-900">{listing.title}</span> has been saved.
                    We are now redirecting you to WhatsApp to finalize the details with our team.
                </p>
                <div className="flex flex-col gap-4 max-w-xs mx-auto">
                    <Button onClick={() => window.open(`https://wa.me/${contactInfo?.whatsapp.replace(/\D/g, '')}`, '_blank')} className="bg-emerald-600 hover:bg-emerald-700">
                        <MessageSquare className="h-4 w-4 mr-2" /> Open WhatsApp
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/')}>Return to Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h2 className="font-bold text-lg mb-4">Review Your Selection</h2>
                        <div className="flex gap-4">
                            <img src={listing.images[0]} alt={listing.title} className="w-24 h-24 object-cover rounded-lg" />
                            <div>
                                <h3 className="font-bold text-gray-900">{listing.title}</h3>
                                <p className="text-sm text-gray-500">{listing.location}</p>
                                <p className="text-primary-600 font-bold mt-1">Rs {listing.price.toLocaleString()}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="font-bold text-lg mb-4">Guest Information</h2>
                        <form id="booking-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    placeholder="John Doe"
                                    value={formData.guestName}
                                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    placeholder="john@example.com"
                                    value={formData.guestEmail}
                                    onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    placeholder="+94 77 123 4567"
                                    value={formData.guestPhone}
                                    onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                                />
                            </div>
                        </form>
                    </Card>

                    <Card className="p-6">
                        <h2 className="font-bold text-lg mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <label className="flex items-center p-4 border border-primary-100 bg-primary-50 rounded-xl cursor-pointer">
                                <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-primary-600" />
                                <span className="ml-3 font-medium text-gray-900">Pay on Arrival / Cash</span>
                            </label>
                            <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-not-allowed opacity-50">
                                <input type="radio" name="payment" disabled className="h-4 w-4 text-gray-400" />
                                <span className="ml-3 font-medium text-gray-500">Credit / Debit Card (Coming Soon)</span>
                            </label>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4 border-bottom pb-2">Order Summary</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Item Price</span>
                                <span>Rs {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Service Fee & Tax</span>
                                <span>Rs {tax.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>Rs {total.toLocaleString()}</span>
                            </div>
                        </div>
                        <Button
                            form="booking-form"
                            type="submit"
                            className="w-full mt-6 py-4 text-lg"
                            disabled={bookingMutation.isPending}
                        >
                            {bookingMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Confirm Booking'}
                        </Button>
                        <p className="text-xs text-gray-500 text-center mt-4">
                            By clicking confirm, you agree to our terms and conditions.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};
