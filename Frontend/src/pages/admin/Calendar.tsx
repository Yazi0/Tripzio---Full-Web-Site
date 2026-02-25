import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval,
    parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, Phone } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { getBookings } from '../../api/bookings';
import { cn } from '../../lib/utils';

export const AdminCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['admin-bookings-full'],
        queryFn: () => getBookings()
    });

    const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Booking Calendar</h1>
                    <p className="text-gray-500 text-sm">Schedule of all confirmed travel arrangements</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="text-lg font-bold text-gray-900 min-w-[150px] text-center">
                        {format(currentDate, 'MMMM yyyy')}
                    </span>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map(day => (
                    <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        const allDays = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className="grid grid-cols-7 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                {allDays.map((day, idx) => {
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isSelected = isSameDay(day, selectedDate);
                    const dayBookings = confirmedBookings.filter(b => isSameDay(parseISO(b.startDate), day));

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                "min-h-[120px] p-2 border-r border-b border-gray-100 transition-all cursor-pointer hover:bg-gray-50/50",
                                !isCurrentMonth && "bg-gray-50/30 text-gray-300",
                                isSelected && "ring-2 ring-inset ring-primary-500 z-10 bg-primary-50/20"
                            )}
                            onClick={() => setSelectedDate(day)}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={cn(
                                    "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full",
                                    isSameDay(day, new Date()) ? "bg-primary-600 text-white" : "text-gray-700",
                                    !isCurrentMonth && "text-gray-300"
                                )}>
                                    {format(day, 'd')}
                                </span>
                            </div>
                            <div className="space-y-1">
                                {dayBookings.slice(0, 3).map(booking => (
                                    <div
                                        key={booking.id}
                                        className={cn(
                                            "text-[10px] p-1 rounded px-1.5 font-bold truncate border-l-2 shadow-sm",
                                            booking.listingType === 'TOUR' ? "bg-emerald-50 text-emerald-700 border-emerald-500" :
                                                booking.listingType === 'STAY' ? "bg-amber-50 text-amber-700 border-amber-500" :
                                                    "bg-blue-50 text-blue-700 border-blue-500"
                                        )}
                                    >
                                        {booking.listingTitle}
                                    </div>
                                ))}
                                {dayBookings.length > 3 && (
                                    <div className="text-[10px] text-gray-400 font-bold pl-1">
                                        + {dayBookings.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderSidebar = () => {
        const dayBookings = confirmedBookings.filter(b => isSameDay(parseISO(b.startDate), selectedDate));

        return (
            <Card className="p-6 border-none shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <CalendarIcon className="h-5 w-5 text-primary-600" />
                    <div>
                        <h2 className="font-bold text-gray-900">{format(selectedDate, 'EEEE')}</h2>
                        <p className="text-xs text-gray-500">{format(selectedDate, 'MMMM do, yyyy')}</p>
                    </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                    {dayBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-10 opacity-40">
                            <Clock className="h-12 w-12 text-gray-300 mb-2" />
                            <p className="text-sm font-medium">No confirmed bookings</p>
                        </div>
                    ) : (
                        dayBookings.map(booking => (
                            <div key={booking.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-all cursor-pointer group">
                                <div className="flex items-start justify-between mb-3">
                                    <span className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                                        booking.listingType === 'TOUR' ? "bg-emerald-100 text-emerald-700" :
                                            booking.listingType === 'STAY' ? "bg-amber-100 text-amber-700" :
                                                "bg-blue-100 text-blue-700"
                                    )}>
                                        {booking.listingType}
                                    </span>
                                    <span className="text-xs font-bold text-primary-600">Rs {booking.totalPrice.toLocaleString()}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-3 group-hover:text-primary-600 transition-colors">
                                    {booking.listingTitle}
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <User className="h-3.5 w-3.5 text-gray-400" />
                                        <span className="font-medium">{booking.customerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                                        <span className="font-medium">{booking.customerPhone}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </div>
            <div className="w-full lg:w-[350px]">
                {renderSidebar()}
            </div>
        </div>
    );
};
