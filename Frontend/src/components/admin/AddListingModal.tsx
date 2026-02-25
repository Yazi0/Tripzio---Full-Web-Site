import React, { useState } from 'react';
import { X, Loader2, Plus, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { createListing, createRoundTour } from '../../api/listings';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddListingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddListingModal = ({ isOpen, onClose }: AddListingModalProps) => {
    const queryClient = useQueryClient();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: 'TOUR',
        title: '',
        description: '',
        location: '',
        price: '',
        images: [''],
        // Tour specific
        duration: '',
        tourType: 'Cultural',
        groupSize: '',
        // Stay specific
        stayType: 'Hotel',
        rooms: '',
        maxGuests: '',
        // Vehicle specific
        vehicleType: 'Car',
        seats: '',
        driverIncluded: true,
        transmission: 'Automatic',
        airConditioned: true,
    });

    const mutation = useMutation({
        mutationFn: (data: any) => data.type === 'ROUND_TOUR' ? createRoundTour(data) : createListing(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-listings-full'] });
            onClose();
            setStep(1);
            setFormData({
                type: 'TOUR',
                title: '',
                description: '',
                location: '',
                price: '',
                images: [''],
                duration: '',
                tourType: 'Cultural',
                groupSize: '',
                stayType: 'Hotel',
                rooms: '',
                maxGuests: '',
                vehicleType: 'Car',
                seats: '',
                driverIncluded: true,
                transmission: 'Automatic',
                airConditioned: true,
            });
        },
    });

    if (!isOpen) return null;

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            ...formData,
            price: Number(formData.price),
            rooms: formData.rooms ? Number(formData.rooms) : undefined,
            maxGuests: formData.maxGuests ? Number(formData.maxGuests) : undefined,
            seats: formData.seats ? Number(formData.seats) : undefined,
            images: formData.images.filter(img => img.trim() !== ''),
        });
    };

    const addImage = () => setFormData({ ...formData, images: [...formData.images, ''] });
    const removeImage = (index: number) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-2xl bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Add New Listing</h2>
                        <p className="text-gray-500 text-sm">Step {step} of 2: {step === 1 ? 'Basic Information' : 'Type Details'}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="TOUR">Tour Package</option>
                                    <option value="ROUND_TOUR">Round Tour</option>
                                    <option value="STAY">Accomodation / Stay</option>
                                    <option value="VEHICLE">Vehicle Rental</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <Input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., Luxury Beach Villa in Galle"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <Input
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g., Galle, Sri Lanka"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
                                <Input
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="e.g., 25000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg outline-none h-32"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe the listing details..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Images (URLs)</label>
                                <div className="space-y-3">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <Input
                                                value={img}
                                                onChange={(e) => {
                                                    const newImages = [...formData.images];
                                                    newImages[idx] = e.target.value;
                                                    setFormData({ ...formData, images: newImages });
                                                }}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                            {formData.images.length > 1 && (
                                                <button type="button" onClick={() => removeImage(idx)} className="p-2 text-red-500 bg-red-50 rounded-lg">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" onClick={addImage} variant="outline" className="w-full flex items-center justify-center gap-2 border-dashed">
                                        <Plus className="h-4 w-4" /> Add Image URL
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {(formData.type === 'TOUR' || formData.type === 'ROUND_TOUR') && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g., 3 Days" />
                                    </div>
                                    {formData.type === 'TOUR' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tour Category</label>
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                value={formData.tourType}
                                                onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
                                            >
                                                <option value="Cultural">Cultural</option>
                                                <option value="Wildlife">Wildlife</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Beach">Beach</option>
                                                <option value="Relaxation">Relaxation</option>
                                            </select>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                                        <Input value={formData.groupSize} onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })} placeholder="e.g., Max 10" />
                                    </div>
                                </>
                            )}

                            {formData.type === 'STAY' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stay Category</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            value={formData.stayType}
                                            onChange={(e) => setFormData({ ...formData, stayType: e.target.value })}
                                        >
                                            <option value="Hotel">Hotel</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Resort">Resort</option>
                                            <option value="Homestay">Homestay</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
                                        <Input type="number" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} placeholder="e.g., 4" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                                        <Input type="number" value={formData.maxGuests} onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })} placeholder="e.g., 10" />
                                    </div>
                                </>
                            )}

                            {formData.type === 'VEHICLE' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            value={formData.vehicleType}
                                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                        >
                                            <option value="Car">Car</option>
                                            <option value="Van">Van</option>
                                            <option value="Bus">Bus</option>
                                            <option value="SUV">SUV</option>
                                            <option value="TukTuk">TukTuk</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                                        <Input type="number" value={formData.seats} onChange={(e) => setFormData({ ...formData, seats: e.target.value })} placeholder="e.g., 5" />
                                    </div>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input type="checkbox" checked={formData.driverIncluded} onChange={(e) => setFormData({ ...formData, driverIncluded: e.target.checked })} />
                                            Driver Included
                                        </label>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input type="checkbox" checked={formData.airConditioned} onChange={(e) => setFormData({ ...formData, airConditioned: e.target.checked })} />
                                            Air Conditioned
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </form>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between gap-4">
                    {step === 1 ? (
                        <>
                            <Button type="button" variant="outline" onClick={onClose} className="w-1/3">Cancel</Button>
                            <Button type="button" onClick={handleNext} className="w-1/3 ml-auto">Next Step</Button>
                        </>
                    ) : (
                        <>
                            <Button type="button" variant="outline" onClick={handleBack} className="w-1/3">Back</Button>
                            <Button type="submit" onClick={handleSubmit} className="w-1/3 ml-auto shadow-lg shadow-primary-200" disabled={mutation.isPending}>
                                {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Create Listing'}
                            </Button>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
};
