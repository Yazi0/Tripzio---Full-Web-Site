import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getContactInfo } from '../../api/contact';
import { getMe } from '../../api/auth';
import {
    Loader2,
    Save,
    User,
    Phone,
    Mail,
    MapPin,
    Globe,
    Shield,
    Bell,
    CheckCircle
} from 'lucide-react';
import { apiClient } from '../../api/client';

export const AdminSettings = () => {
    const queryClient = useQueryClient();
    const [success, setSuccess] = useState('');

    const { data: contactInfo, isLoading: isContactLoading } = useQuery({
        queryKey: ['contactInfo-admin'],
        queryFn: getContactInfo
    });

    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ['me-admin'],
        queryFn: getMe
    });

    const [contactForm, setContactForm] = useState({
        address: '',
        email_1: '',
        email_2: '',
        phone_1: '',
        phone_2: '',
        whatsapp: '',
        map_url: '',
    });

    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (contactInfo) {
            setContactForm({
                address: contactInfo.address,
                email_1: contactInfo.email_1,
                email_2: contactInfo.email_2,
                phone_1: contactInfo.phone_1,
                phone_2: contactInfo.phone_2,
                whatsapp: contactInfo.whatsapp,
                map_url: contactInfo.map_url,
            });
        }
        if (user) {
            setProfileForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email,
                phone: user.phone || '',
            });
        }
    }, [contactInfo, user]);

    const updateContactMutation = useMutation({
        mutationFn: (data: any) => apiClient.patch('/contact/info/', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
            queryClient.invalidateQueries({ queryKey: ['contactInfo-admin'] });
            setSuccess('Contact information updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: (data: any) => apiClient.patch('/auth/me/', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me-admin'] });
            setSuccess('Admin profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        }
    });

    if (isContactLoading || isUserLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                    <p className="text-gray-500 text-sm">Manage site-wide configuration and your profile</p>
                </div>
                {success && (
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-bold">{success}</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary-600" />
                        Platform Info
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        These details are displayed on the public website's footer and contact page. Make sure they are accurate.
                    </p>
                </div>
                <Card className="md:col-span-2 p-6 border-none shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Physical Address
                            </label>
                            <Input
                                value={contactForm.address}
                                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Primary Email
                            </label>
                            <Input
                                value={contactForm.email_1}
                                onChange={(e) => setContactForm({ ...contactForm, email_1: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Email</label>
                            <Input
                                value={contactForm.email_2}
                                onChange={(e) => setContactForm({ ...contactForm, email_2: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Phone className="h-4 w-4" /> Primary Phone
                            </label>
                            <Input
                                value={contactForm.phone_1}
                                onChange={(e) => setContactForm({ ...contactForm, phone_1: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                            <Input
                                value={contactForm.whatsapp}
                                onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-gray-50">
                        <Button
                            onClick={() => updateContactMutation.mutate(contactForm)}
                            disabled={updateContactMutation.isPending}
                            className="shadow-lg shadow-primary-50"
                        >
                            {updateContactMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                            Update Site Info
                        </Button>
                    </div>
                </Card>

                <div className="md:col-span-1 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary-600" />
                        Admin Profile
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Your personal details used for the admin portal. Changing your email will change your login.
                    </p>
                </div>
                <Card className="md:col-span-2 p-6 border-none shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <Input
                                value={profileForm.firstName}
                                onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <Input
                                value={profileForm.lastName}
                                onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Login User)</label>
                            <Input
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-gray-50">
                        <Button
                            onClick={() => updateProfileMutation.mutate(profileForm)}
                            disabled={updateProfileMutation.isPending}
                            className="bg-gray-800 hover:bg-black shadow-lg shadow-gray-200"
                        >
                            {updateProfileMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                            Save Profile
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
