import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../../components/ui/Card';
import { getBookings, updateBookingStatus } from '../../api/bookings';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export const AdminBookings = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = React.useState<'ALL' | 'TOUR' | 'STAY' | 'VEHICLE'>('ALL');

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['admin-bookings-full'],
        queryFn: () => getBookings()
    });

    const filteredBookings = bookings.filter(b =>
        activeTab === 'ALL' ? true : b.listingType === activeTab
    );

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => updateBookingStatus(id, status),
        onSuccess: (updatedBooking, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin-bookings-full'] });
            queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });

            // If confirmed, open WhatsApp message to guest
            if (variables.status === 'CONFIRMED') {
                const booking = bookings.find(b => b.id === variables.id);
                if (booking && booking.customerPhone) {
                    const message = `Halo ${booking.customerName || ''}, Your booking for *${booking.listingTitle}* has been *Approved*! we will contact you few minutes.`;
                    // Format phone number: remove non-digits, and handle local 0 prefix
                    let guestPhone = booking.customerPhone.replace(/\D/g, '');
                    if (guestPhone.startsWith('0')) {
                        guestPhone = '94' + guestPhone.substring(1);
                    } else if (guestPhone.length === 9) {
                        guestPhone = '94' + guestPhone;
                    }

                    const whatsappUrl = `https://wa.me/${guestPhone}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                }
            }
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    const tabs = [
        { id: 'ALL', name: 'All Bookings' },
        { id: 'TOUR', name: 'Tours' },
        { id: 'STAY', name: 'Stays' },
        { id: 'VEHICLE', name: 'Vehicles' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
                    <p className="text-gray-500 text-sm">Review and approve customer requests</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
                        Total: {filteredBookings.length}
                    </span>
                </div>
            </div>

            <div className="flex gap-1 p-1 bg-gray-100/50 rounded-xl w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-white text-primary-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Booking Details</th>
                                <th className="px-6 py-4">Total Price</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.map((booking: any) => (
                                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-xs font-mono text-gray-400">#{booking.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-900">{booking.customerName || 'Anonymous'}</p>
                                        <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-900">{booking.listingTitle}</p>
                                        <p className="text-xs text-primary-600 font-bold uppercase mt-0.5">{booking.listingType}</p>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> {new Date(booking.startDate).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-sm text-gray-900">Rs {booking.totalPrice?.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            booking.status === 'CONFIRMED' ? "bg-emerald-100 text-emerald-700" :
                                                booking.status === 'PENDING' ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                                        )}>
                                            {booking.status === 'CONFIRMED' && <CheckCircle className="h-3 w-3" />}
                                            {booking.status === 'PENDING' && <Clock className="h-3 w-3" />}
                                            {booking.status === 'CANCELLED' && <XCircle className="h-3 w-3" />}
                                            {booking.status === 'CONFIRMED' ? 'Approved' : booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {booking.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => mutation.mutate({ id: booking.id, status: 'CONFIRMED' })}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        title="Confirm"
                                                    >
                                                        <CheckCircle className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => mutation.mutate({ id: booking.id, status: 'CANCELLED' })}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <XCircle className="h-5 w-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

const Calendar = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>;
