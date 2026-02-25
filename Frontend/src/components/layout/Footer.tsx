import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getContactInfo } from '../../api/contact';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    const { data: contactInfo } = useQuery({
        queryKey: ['contactInfo'],
        queryFn: getContactInfo
    });

    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <img src="/logo.png" alt="Tripzio Logo" className="h-12 w-auto object-contain" />
                            <span className="text-2xl font-bold text-white">Tripzio</span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Experience the best of Sri Lanka with our curated marketplace. From luxury villas to authentic street food, find everything you need for an unforgettable journey.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social icons could go here */}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <li><Link to="/vehicles" className="text-sm text-gray-400 hover:text-white transition-colors">Vehicles</Link></li>
                            <li><Link to="/stays" className="text-sm text-gray-400 hover:text-white transition-colors">Stays & Villas</Link></li>
                            <li><Link to="/tours" className="text-sm text-gray-400 hover:text-white transition-colors">Tour Packages</Link></li>
                            <li><Link to="/destinations" className="text-sm text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><Link to="/help" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-6">Get in Touch</h3>
                        {contactInfo ? (
                            <ul className="space-y-4">
                                <li className="flex items-start text-sm text-gray-400">
                                    <MapPin className="h-5 w-5 mr-3 text-primary-500 shrink-0" />
                                    <span>{contactInfo.address}</span>
                                </li>
                                <li className="flex items-center text-sm text-gray-400">
                                    <Phone className="h-5 w-5 mr-3 text-primary-500 shrink-0" />
                                    <span>{contactInfo.phone_1}</span>
                                </li>
                                <li className="flex items-center text-sm text-gray-400">
                                    <Mail className="h-5 w-5 mr-3 text-primary-500 shrink-0" />
                                    <span>{contactInfo.email_1}</span>
                                </li>
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">Loading contact information...</p>
                        )}
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        &copy; {new Date().getFullYear()} Tripzio. All rights reserved. Developed for authentic Sri Lankan experiences.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-500 font-medium">
                        <Link to="/about" className="hover:text-white">Our Story</Link>
                        <Link to="/careers" className="hover:text-white">Careers</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
