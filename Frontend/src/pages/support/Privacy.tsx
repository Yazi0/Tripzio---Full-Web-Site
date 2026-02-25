import React from 'react';
import { Shield, Lock, Eye, Share2 } from 'lucide-react';

export const Privacy = () => {
    const sections = [
        {
            title: "Information We Collect",
            description: "We collect information you provide directly to us, such as when you create an account, make a booking, or contact support. This includes your name, email, phone number, and payment information.",
            icon: <Eye className="h-5 w-5 text-blue-600" />,
            color: "from-blue-50 to-blue-100",
            points: [
                "Personal identification information",
                "Booking and transaction details",
                "Communication records",
                "Device and usage data"
            ]
        },
        {
            title: "How We Use Your Information",
            description: "We use your information to facilitate bookings, communicate with you, verify your identity, and improve our platform security. Your data helps us personalize your experience and enhance our services.",
            icon: <Share2 className="h-5 w-5 text-green-600" />,
            color: "from-green-50 to-green-100",
            points: [
                "Process bookings and payments",
                "Provide customer support",
                "Improve platform security",
                "Personalize user experience"
            ]
        },
        {
            title: "Data Sharing",
            description: "We share necessary information with service providers (hotels, drivers, tour guides) to complete your bookings. We do not sell your personal data to third parties. Data is shared only when essential for service delivery.",
            icon: <Share2 className="h-5 w-5 text-purple-600" />,
            color: "from-purple-50 to-purple-100",
            points: [
                "Service providers for booking fulfillment",
                "Payment processors",
                "Legal authorities when required",
                "Analytics partners (anonymized)"
            ]
        },
        {
            title: "Security",
            description: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or disclosure. Our security protocols are regularly updated and audited.",
            icon: <Lock className="h-5 w-5 text-red-600" />,
            color: "from-red-50 to-red-100",
            points: [
                "256-bit SSL encryption",
                "Regular security audits",
                "GDPR compliance",
                "Secure data storage"
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-6">
                    <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">Last updated: January 28, 2026</span>
                </div>
            </div>

            {/* Policy Sections */}
            <div className="space-y-8">
                {sections.map((section, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                            <div className="flex-shrink-0">
                                <div className={`h-14 w-14 ${section.color} rounded-xl flex items-center justify-center`}>
                                    {section.icon}
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-sm font-semibold text-white bg-gray-900 px-3 py-1 rounded-full">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>

                                {section.points && (
                                    <ul className="space-y-2">
                                        {section.points.map((point, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-600">
                                                <div className="h-1.5 w-1.5 bg-primary-500 rounded-full"></div>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                <div className="text-center">
                    <h3 className="font-bold text-xl text-gray-900 mb-4">Your Privacy Matters</h3>
                    <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                        We are committed to protecting your personal information. If you have any questions about our privacy practices or wish to exercise your data rights, please contact our Data Protection Officer at{' '}
                        <span className="font-semibold text-primary-700">privacy@tripzio.lk</span>
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <Lock className="h-4 w-4" />
                        <span>Encrypted with military-grade security • GDPR Compliant • Regular Security Audits</span>
                    </div>
                </div>
            </div>
        </div>
    );
};