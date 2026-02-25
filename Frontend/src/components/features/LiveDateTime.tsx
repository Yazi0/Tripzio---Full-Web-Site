import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export const LiveDateTime = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatDay = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    };

    return (
        <div className={cn(
            "fixed top-24 right-8 z-40 flex flex-col items-center gap-1 transition-all duration-500 ease-in-out lg:flex hidden",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
            <div className="flex items-center gap-2 text-white drop-shadow-lg">
                <Clock className="h-6 w-6 text-primary-400" />
                <span className="text-2xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
                    {formatTime(dateTime)}
                </span>
            </div>

            <div className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] font-black tracking-[0.3em] text-primary-400 uppercase drop-shadow-lg">
                    {formatDay(dateTime)}
                </span>
                <span className="text-xs font-bold text-white/90 drop-shadow-lg">{formatDate(dateTime)}</span>
            </div>
        </div>
    );
};
