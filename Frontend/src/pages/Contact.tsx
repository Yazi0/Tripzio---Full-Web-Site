import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { getContactInfo, sendContactMessage } from '../api/contact';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { data: contactInfo, isLoading: isInfoLoading } = useQuery({
        queryKey: ['contactInfo'],
        queryFn: getContactInfo
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const result = await sendContactMessage(formData);
            setSuccessMessage((result as any).message || 'Thank you! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setErrorMessage('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            {/* Hero Section */}
            <div className="bg-primary-900 text-white py-16 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-primary-100 italic">We'd love to hear from you. Get in touch with our team.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 border-l-4 border-primary-600">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>

                            {isInfoLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
                                </div>
                            ) : contactInfo ? (
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-primary-50 p-3 rounded-full">
                                            <MapPin className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Visit Us</h4>
                                            <p className="text-gray-600 mt-1 whitespace-pre-line">
                                                {contactInfo.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-primary-50 p-3 rounded-full">
                                            <Mail className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Email Us</h4>
                                            <p className="text-gray-600 mt-1">{contactInfo.email_1}</p>
                                            <p className="text-gray-600">{contactInfo.email_2}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-primary-50 p-3 rounded-full">
                                            <Phone className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Call Us</h4>
                                            <p className="text-gray-600 mt-1">{contactInfo.phone_1}</p>
                                            <p className="text-gray-600">{contactInfo.phone_2}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </Card>

                        {/* Interactive Map */}
                        <div className="h-64 rounded-xl overflow-hidden shadow-lg bg-gray-200 relative">
                            <iframe
                                src={contactInfo?.map_url?.includes('google.com/maps') ? contactInfo.map_url : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58290458401!2d79.78616447477504!3d6.921342674251034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b487495bc2!2sColombo!5e0!3m2!1sen!2slk!4v1708443654321!5m2!1sen!2slk"}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Map Location"
                                className="w-full h-full border-0"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                    />
                                </div>

                                {successMessage && (
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                                        ✅ {successMessage}
                                    </div>
                                )}
                                {errorMessage && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                                        ❌ {errorMessage}
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <Button type="submit" size="lg" className="px-8" disabled={isSubmitting}>
                                        <Send className="w-4 h-4 mr-2" />
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
