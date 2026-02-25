import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from listings.models import Listing, ListingImage

def seed_listings():
    # Clear existing listings
    Listing.objects.all().delete()

    listings_data = [
        # Vehicles
        {
            'type': 'VEHICLE',
            'title': 'Luxury Toyota Prado SUV',
            'description': 'Comfortable 4WD SUV perfect for family trips and safaris. Includes professional English-speaking driver.',
            'location': 'Colombo',
            'price': 15000,
            'rating': 4.8,
            'reviews_count': 124,
            'vehicle_type': 'SUV',
            'seats': 7,
            'driver_included': True,
            'transmission': 'Automatic',
            'air_conditioned': True,
            'featured': True,
            'images': ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800']
        },
        {
            'type': 'VEHICLE',
            'title': 'Toyota Hiace KDH Van',
            'description': 'Spacious van for group tours. High roof, adjustable seats, ample luggage space.',
            'location': 'Kandy',
            'price': 18000,
            'rating': 4.9,
            'reviews_count': 89,
            'vehicle_type': 'Van',
            'seats': 14,
            'driver_included': True,
            'transmission': 'Automatic',
            'air_conditioned': True,
            'images': ['https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&q=80&w=800']
        },
        # Stays
        {
            'type': 'STAY',
            'title': 'Cinnamon Grand Colombo',
            'description': '5-star luxury hotel in the heart of Colombo with sea views, pool, and fine dining.',
            'location': 'Colombo 03',
            'price': 45000,
            'rating': 4.7,
            'reviews_count': 3200,
            'stay_type': 'Hotel',
            'rooms': 500,
            'max_guests': 4,
            'amenities': ['Pool', 'Spa', 'Gym', 'WiFi', 'Ocean View'],
            'featured': True,
            'images': ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800']
        },
        {
            'type': 'STAY',
            'title': 'Ella Jungle Resort',
            'description': 'Eco-friendly resort surrounded by nature. Perfect for hiking and relaxation.',
            'location': 'Ella',
            'price': 12000,
            'rating': 4.6,
            'reviews_count': 450,
            'stay_type': 'Resort',
            'rooms': 20,
            'max_guests': 2,
            'amenities': ['Nature Trails', 'Waterfall', 'Restaurant', 'WiFi'],
            'featured': True,
            'images': ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800']
        },
        # Tours
        {
            'type': 'TOUR',
            'title': 'Sigiriya & Dambulla Day Tour',
            'description': 'Visit the "Lion Rock" fortress and the Golden Temple of Dambulla. Includes lunch.',
            'location': 'Sigiriya',
            'price': 8500,
            'rating': 4.9,
            'reviews_count': 210,
            'duration': '1 Day',
            'tour_type': 'Cultural',
            'group_size': 'Max 15',
            'itinerary': ['Pick up', 'Sigiriya Climb', 'Lunch', 'Dambulla Cave Temple', 'Drop off'],
            'included': ['Transport', 'Guide', 'Tickets', 'Lunch'],
            'featured': True,
            'images': ['https://tse2.mm.bing.net/th/id/OIP.-2M9Jk6cI3Xux0M1JzJ-fwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3']
        },
        {
            'type': 'TOUR',
            'title': 'Yala National Park Safari',
            'description': 'Spot leopards, elephants, and bears in Sri Lanka\'s most famous national park.',
            'location': 'Yala',
            'price': 12000,
            'rating': 4.8,
            'reviews_count': 560,
            'duration': '6 Hours',
            'tour_type': 'Wildlife',
            'group_size': 'Private Jeep',
            'itinerary': ['Hotel Pickup', 'Safari Drive', 'Breakfast by Lake', 'Return'],
            'included': ['Jeep', 'Tracker', 'Park Fees', 'Refreshments'],
            'images': ['https://i.ytimg.com/vi/hKUZi5Zfz64/maxresdefault.jpg']
        }
    ]

    for data in listings_data:
        images = data.pop('images', [])
        listing = Listing.objects.create(**data)
        for i, url in enumerate(images):
            ListingImage.objects.create(listing=listing, url=url, order=i)
        print(f"Created listing: {listing.title} ({listing.type})")

if __name__ == '__main__':
    seed_listings()
    print("Seeding complete!")
