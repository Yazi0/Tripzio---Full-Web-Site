import React from 'react';
import { FileText, CheckCircle, AlertCircle, Clock, User } from 'lucide-react';

export const Terms = () => {
    const sections = [
        {
            title: "Acceptance of Terms",
            description: "By accessing and using Tripzio, you accept and agree to be bound by the terms and provision of this agreement. Continued use of our services constitutes acceptance of any updates to these terms.",
            icon: <CheckCircle className="h-5 w-5 text-green-600" />,
            note: "Please review terms periodically for updates",
            highlight: true
        },
        {
            title: "Booking Services",
            description: "Tripzio acts as an intermediary between guests and service providers. We are not responsible for the quality or safety of the services provided by third-party operators, though we strive to vet all partners thoroughly.",
            icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
            note: "We conduct background checks on all listed providers",
            highlight: false
        },
        {
            title: "Cancellations and Refunds",
            description: "Cancellation policies vary by provider. Please review the specific cancellation policy for each booking before confirming. Refunds are processed within 5-7 business days to your original payment method.",
            icon: <Clock className="h-5 w-5 text-blue-600" />,
            note: "Refund times may vary by payment provider",
            highlight: true
        },
        {
            title: "User Conduct",
            description: "Users agree not to misuse the platform, submit false information, or violate any local laws while using our services. We reserve the right to suspend accounts violating these terms.",
            icon: <User className="h-5 w-5 text-purple-600" />,
            note: "Zero tolerance for fraudulent activities",
            highlight: false
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-6">
                    <FileText className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Last updated: January 28, 2026</span>
                </div>
                <p className="text-gray-600 mt-6 max-w-3xl mx-auto">
                    These terms govern your use of Tripzio platform. By using our services, you agree to these terms.
                </p>
            </div>

            {/* Terms Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg ${section.highlight
                            ? 'border-primary-200 bg-gradient-to-br from-white to-primary-50'
                            : 'border-gray-200 bg-white'
                            }`}
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center ${section.highlight ? 'bg-primary-100' : 'bg-gray-100'
                                }`}>
                                {section.icon}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-semibold text-gray-900 bg-gray-200 px-3 py-1 rounded-full">
                                        Section {index + 1}
                                    </span>
                                    {section.highlight && (
                                        <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                                            Important
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>

                        {section.note && (
                            <div className={`p-4 rounded-xl ${section.highlight ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50 border border-gray-200'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <AlertCircle className={`h-4 w-4 ${section.highlight ? 'text-primary-600' : 'text-gray-500'}`} />
                                    <span className={`text-sm font-medium ${section.highlight ? 'text-primary-700' : 'text-gray-600'}`}>
                                        {section.note}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Additional Terms */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h3 className="font-bold text-2xl text-gray-900 mb-6 text-center">Additional Terms & Conditions</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Intellectual Property", desc: "All content on Tripzio is protected by copyright and trademark laws." },
                        { title: "Liability", desc: "Our liability is limited to the value of the booking in dispute." },
                        { title: "Governing Law", desc: "These terms are governed by the laws of Sri Lanka." },
                        { title: "Dispute Resolution", desc: "Disputes will be resolved through arbitration in Colombo." },
                        { title: "Account Termination", desc: "We may terminate accounts violating our terms without notice." },
                        { title: "Force Majeure", desc: "Not liable for delays due to events beyond our control." },
                    ].map((term, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                            <h4 className="font-bold text-gray-900 mb-2">{term.title}</h4>
                            <p className="text-sm text-gray-600">{term.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Final Note */}
                <div className="mt-8 pt-8 border-t border-gray-300 text-center">
                    <p className="text-gray-600">
                        By using Tripzio, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                            Download Terms (PDF)
                        </button>
                        <button className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            Contact Legal Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};