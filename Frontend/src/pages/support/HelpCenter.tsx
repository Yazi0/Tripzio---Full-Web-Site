import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { HelpCircle, Phone, Mail, MessageCircle, ChevronRight, Shield, CreditCard, UserPlus } from 'lucide-react';
import { LiveChatWidget } from '../../components/features/LiveChatWidget';

export const HelpCenter = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* Hero Section */}
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-6">
                    <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How can we help you?</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get support, find answers, or reach out to our team for personalized assistance.</p>
            </div>

            {/* Contact Cards - Modern Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 rounded-2xl">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                        <Phone className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Call Support</h3>
                    <p className="text-gray-500 mb-6">Available 24/7 for urgent inquiries and assistance</p>
                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                        <p className="font-bold text-2xl text-primary-700 tracking-tight">+94 11 234 5678</p>
                    </div>
                    <p className="text-sm text-gray-400">International calls may incur charges</p>
                </Card>

                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 rounded-2xl">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mb-6">
                        <Mail className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Email Support</h3>
                    <p className="text-gray-500 mb-6">We'll get back to you within 24 hours</p>
                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                        <p className="font-bold text-2xl text-primary-700 tracking-tight">support@tripzio.lk</p>
                    </div>
                    <p className="text-sm text-gray-400">Response time: 2-4 hours during business days</p>
                </Card>

                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 rounded-2xl">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                        <MessageCircle className="h-7 w-7 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Live Chat</h3>
                    <p className="text-gray-500 mb-6">Chat with our support agents instantly</p>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2"
                    >
                        Start Chat
                        <ChevronRight className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-gray-400 mt-4">Average wait time: 2 minutes</p>
                </Card>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            q: "How do I cancel my booking?",
                            a: "You can cancel your booking from your dashboard under the 'Bookings' tab. Cancellation fees may apply depending on the provider's policy. Refunds are processed within 5-7 business days.",
                            icon: <CreditCard className="h-5 w-5 text-primary-600" />
                        },
                        {
                            q: "Is it safe to pay online?",
                            a: "Yes, we use industry-standard encryption (256-bit SSL) to protect your payment details. All transactions are PCI-DSS compliant and we verify all providers on our platform.",
                            icon: <Shield className="h-5 w-5 text-primary-600" />
                        },
                        {
                            q: "How do I become a provider?",
                            a: "Click on 'Register' and select 'Join as Provider'. You'll need to submit verification documents before your listings go live. Our team reviews applications within 2-3 business days.",
                            icon: <UserPlus className="h-5 w-5 text-primary-600" />
                        },
                    ].map((faq, i) => (
                        <Card key={i} className="p-0 overflow-hidden border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                            <div className="p-6 md:p-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {faq.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-xl text-gray-900 mb-3">{faq.q}</h3>
                                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Additional Help Section */}
                <div className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-primary-50 rounded-2xl border border-gray-200">
                    <div className="text-center">
                        <h3 className="font-bold text-2xl text-gray-900 mb-4">Still need help?</h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Browse our documentation or submit a support ticket for complex issues</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                Visit Documentation
                            </button>
                            <button className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                                Submit a Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Chat Widget */}
            <LiveChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
};