import React from 'react';
import { Map, Users, Heart, Award, Shield, Smile } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Img from '../assets/images/WhyChooese.png';
import { useQuery } from '@tanstack/react-query';
import { getDestinations } from '../api/destinations';
import { getListings } from '../api/listings';

export const About = () => {
    const { data: destinations = [] } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => getDestinations()
    });

    const { data: listings = [] } = useQuery({
        queryKey: ['listings'],
        queryFn: () => getListings()
    });

    const displayStats = [
        { label: 'Destinations', value: `${destinations.length || 50}+`, icon: Map },
        { label: 'Verified Listings', value: `${listings.length || 100}+`, icon: Award },
        { label: 'Happy Travelers', value: '10k+', icon: Users },
        { label: 'Satisfaction', value: '100%', icon: Smile },
    ];

    const features = [
        {
            title: 'Curated Experiences',
            description: 'We handpick every destination and activity to ensure you get the most authentic Sri Lankan experience.',
            icon: Award
        },
        {
            title: 'Verified Partners',
            description: 'Work with trusted local guides, drivers, and hosts who have been vetted for quality and safety.',
            icon: Shield
        },
        {
            title: 'Customer First',
            description: 'Our dedicated support team is available 24/7 to assist you throughout your journey.',
            icon: Smile
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            {/* Hero Section */}
            <div className="relative bg-primary-900 text-white py-24 mb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://thumbs.dreamstime.com/b/breathtaking-golden-hour-sunset-over-ocean-stunning-seascape-photography-vibrant-colors-deep-sense-witness-beauty-353334471.jpg"
                        alt="Sri Lanka Landscape"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-800 text-primary-200 text-sm font-semibold mb-4 border border-primary-700">Our Story</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover the Heart of Sri Lanka</h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
                        We are passionate about connecting travelers with the authentic beauty, culture, and hospitality of our island home.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src={Img}
                            alt="Sri Lankan Culture"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            At Tripzio, our mission is to make travel to Sri Lanka accessible, safe, and unforgettable. We believe in sustainable tourism that benefits local communities while providing travelers with life-changing experiences.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Whether you're looking for a relaxing beach getaway, a thrilling wildlife safari, or a cultural immersion in ancient cities, we are here to help you craft your perfect itinerary.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16 mb-20 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {displayStats.map((stat) => (
                            <div key={stat.label} className="p-4">
                                <div className="inline-flex p-3 rounded-full bg-primary-50 mb-4">
                                    <stat.icon className="h-8 w-8 text-primary-600" />
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Why Choose Tripzio?</h2>
                    <p className="mt-4 text-xl text-gray-600">Your trusted partner for exploring Sri Lanka</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="p-8 text-center hover:border-primary-200 transition-colors">
                            <div className="inline-flex p-4 rounded-xl bg-primary-50 mb-6">
                                <feature.icon className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-primary-900 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Ready to start your adventure?</h2>
                        <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
                            Browse our curated list of vehicles, stays, and tours to plan your dream vacation in Sri Lanka.
                        </p>
                        <a href="/tours" className="inline-block bg-white text-primary-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                            Explore Tours
                        </a>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 bg-primary-800 rounded-full opacity-50"></div>
                    <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-64 h-64 bg-primary-800 rounded-full opacity-50"></div>
                </div>
            </div>
        </div>
    );
};
