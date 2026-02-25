import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Menu, X, User as UserIcon, Map, Calendar, Car, Search, Home, Users, Phone, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    const [inquiryForm, setInquiryForm] = useState({
        name: '',
        contact: '',
        country: '',
        interest: '',
        description: ''
    });

    const handleInquirySubmit = () => {
        const { name, contact, country, interest, description } = inquiryForm;
        if (!name || !contact) {
            alert('Please fill in at least Name and Contact Number');
            return;
        }

        const message = `*New General Enquire*
Name: ${name}
Contact: ${contact}
Country: ${country}
Interested In: ${interest}
Description: ${description}`;

        const url = `https://wa.me/94776683072?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setIsInquiryOpen(false);
        setInquiryForm({ name: '', contact: '', country: '', interest: '', description: '' });
    };

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Destinations', href: '/destinations', icon: Map },
        { name: 'Vehicles', href: '/vehicles', icon: Car },
        { name: 'Stays', href: '/stays', icon: Calendar },
        { name: 'Tours', href: '/tours', icon: Map },
        { name: 'About', href: '/about', icon: Users },
        { name: 'Contact', href: '/contact', icon: Phone },
    ];

    return (
        <>
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                                <img src="/logo.png" alt="Tripzio Logo" className="h-10 w-auto object-contain" />
                                <span className="text-2xl font-bold text-primary-600">Tripzio</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            {navLinks.map((link) => {
                                if (link.name === 'Tours') {
                                    const isActive = location.pathname.startsWith('/tours') || location.pathname === '/round-tours';
                                    return (
                                        <div
                                            key={link.name}
                                            className="relative group"
                                            onMouseEnter={() => setIsToursDropdownOpen(true)}
                                            onMouseLeave={() => setIsToursDropdownOpen(false)}
                                        >
                                            <button
                                                className={cn(
                                                    "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
                                                    isActive
                                                        ? "text-primary-600 bg-primary-50"
                                                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                                                )}
                                            >
                                                {link.name}
                                                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isToursDropdownOpen && "rotate-180")} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {isToursDropdownOpen && (
                                                <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <Link
                                                        to="/round-tours"
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                                        onClick={() => setIsToursDropdownOpen(false)}
                                                    >
                                                        Round Tour
                                                    </Link>
                                                    <Link
                                                        to="/tours"
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                                        onClick={() => setIsToursDropdownOpen(false)}
                                                    >
                                                        Tour
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={cn(
                                            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                            isActive
                                                ? "text-primary-600 bg-primary-50"
                                                : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="hidden md:flex md:items-center md:space-x-4">
                            <Button
                                onClick={() => setIsInquiryOpen(true)}
                                className="rounded-full px-6 shadow-md hover:shadow-lg transition-all"
                            >
                                Enquire Now
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-xl z-40">
                        <div className="p-4 space-y-4">
                            <div className="pb-2">
                                <Button
                                    onClick={() => { setIsInquiryOpen(true); setIsOpen(false); }}
                                    className="w-full justify-center rounded-xl py-3"
                                >
                                    Inquiry Now
                                </Button>
                            </div>

                            <div className="space-y-1">
                                {navLinks.map((link) => {
                                    if (link.name === 'Tours') {
                                        const isActive = location.pathname.startsWith('/tours') || location.pathname === '/round-tours';
                                        return (
                                            <div key={link.name} className="space-y-1">
                                                <button
                                                    onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                                                        isActive
                                                            ? "bg-primary-50 text-primary-700 shadow-sm"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    )}
                                                >
                                                    <div className="flex items-center">
                                                        <div className={cn(
                                                            "flex items-center justify-center h-10 w-10 rounded-lg mr-3 transition-colors",
                                                            isActive ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
                                                        )}>
                                                            <link.icon className="h-5 w-5" />
                                                        </div>
                                                        {link.name}
                                                    </div>
                                                    <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", isToursDropdownOpen && "rotate-180")} />
                                                </button>

                                                {isToursDropdownOpen && (
                                                    <div className="pl-14 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                                        <Link
                                                            to="/round-tours"
                                                            className="block py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                                            onClick={() => { setIsOpen(false); setIsToursDropdownOpen(false); }}
                                                        >
                                                            Round Tour
                                                        </Link>
                                                        <Link
                                                            to="/tours"
                                                            className="block py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                                            onClick={() => { setIsOpen(false); setIsToursDropdownOpen(false); }}
                                                        >
                                                            Tour
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className={cn(
                                                "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-primary-50 text-primary-700 shadow-sm"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className={cn(
                                                "flex items-center justify-center h-10 w-10 rounded-lg mr-3 transition-colors",
                                                isActive ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
                                            )}>
                                                <link.icon className="h-5 w-5" />
                                            </div>
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Inquiry Modal */}
            {isInquiryOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">General Enquire</h2>
                                <p className="text-gray-500 text-sm">Tell us what you're looking for</p>
                            </div>
                            <button onClick={() => setIsInquiryOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="John Doe"
                                    value={inquiryForm.name}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number (WhatsApp)</label>
                                <input
                                    type="tel"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="+94 77 123 4567"
                                    value={inquiryForm.contact}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, contact: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="Your Country"
                                    value={inquiryForm.country}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, country: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">What are you interested in?</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="E.g., Wildlife Tour, Beach Stay, Vehicle Rental"
                                    value={inquiryForm.interest}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, interest: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description / Special Requests</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all h-32 resize-none"
                                    placeholder="Describe your requirements..."
                                    value={inquiryForm.description}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, description: e.target.value })}
                                />
                            </div>

                            <Button className="w-full py-4 text-lg font-bold mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all" onClick={handleInquirySubmit}>
                                Send Enquire  via WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
