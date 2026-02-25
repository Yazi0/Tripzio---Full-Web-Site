import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Users,
    BookOpen,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Clock
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { getListings } from '../../api/listings';
import { getBookings } from '../../api/bookings';

export const Dashboard = () => {
    const { data: bookings = [] } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: () => getBookings()
    });

    const { data: listings = [] } = useQuery({
        queryKey: ['admin-listings'],
        queryFn: () => getListings()
    });

    const stats = [
        {
            label: 'Total Bookings',
            value: bookings.length,
            icon: BookOpen,
            trend: '+12%',
            trendUp: true,
            color: 'bg-blue-500'
        },
        {
            label: 'Total Revenue',
            value: `Rs ${(bookings.reduce((acc: number, b: any) => acc + (b.totalPrice || 0), 0)).toLocaleString()}`,
            icon: TrendingUp,
            trend: '+8%',
            trendUp: true,
            color: 'bg-emerald-500'
        },
        {
            label: 'Active Listings',
            value: listings.length,
            icon: Calendar,
            trend: 'Stable',
            trendUp: true,
            color: 'bg-amber-500'
        },
        {
            label: 'Total Users',
            value: '1.2k',
            icon: Users,
            trend: '+5%',
            trendUp: true,
            color: 'bg-purple-500'
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">Auto-refreshing in 30s</span>
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-6 border-none shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between">
                            <div className={cn("p-3 rounded-xl text-white shadow-lg", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                stat.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            )}>
                                {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings */}
                <div className="lg:col-span-2">
                    <Card className="p-6 border-none shadow-sm h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                            <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                        <th className="pb-4">Customer</th>
                                        <th className="pb-4">Booking</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {bookings.slice(0, 5).map((booking: any) => (
                                        <tr key={booking.id} className="group">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
                                                        {booking.customerName?.charAt(0) || 'U'}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{booking.customerName || 'Anonymous User'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <p className="text-sm font-medium text-gray-900">{booking.listingTitle}</p>
                                                <p className="text-xs text-gray-500">{new Date(booking.startDate).toLocaleDateString()}</p>
                                            </td>
                                            <td className="py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                    booking.status === 'CONFIRMED' ? "bg-emerald-50 text-emerald-600" :
                                                        booking.status === 'PENDING' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                                )}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="py-4 font-bold text-sm text-gray-900">
                                                Rs {booking.totalPrice?.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-gray-400">No recent bookings</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* System Activity */}
                <div className="lg:col-span-1">
                    <Card className="p-6 border-none shadow-sm h-full">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 font-primary">System Activity</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Server Status</p>
                                    <p className="text-xs text-gray-500 mt-0.5">All systems operational</p>
                                    <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase">99.9% Uptime</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Security Scan</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Last scan: 2 hours ago</p>
                                    <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase">No issues</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Internal helper for Tailwind classes
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
const ShieldCheck = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
