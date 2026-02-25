"""
Seed script to populate the database with initial data from the frontend mocks.
Run: python seed.py  (from the backend directory with venv activated)
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import User
from listings.models import Listing, ListingImage
from guides.models import Guide

print("=== Seeding Database ===")

# Create superuser/admin
if not User.objects.filter(email='admin@travell.lk').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@travell.lk',
        password='admin1234',
        role='ADMIN',
        first_name='Admin',
        last_name='User',
    )
    print("✅ Admin user created: admin@travell.lk / admin1234")
else:
    print("⚡ Admin already exists")

# Create test users
users_data = [
    {'username': 'provider1', 'email': 'provider@travell.lk', 'first_name': 'Kandy', 'last_name': 'Tours', 'role': 'PROVIDER', 'password': 'provider1234'},
    {'username': 'guide1', 'email': 'guide@travell.lk', 'first_name': 'Nimal', 'last_name': 'Perera', 'role': 'GUIDE', 'password': 'guide1234'},
    {'username': 'guest1', 'email': 'guest@travell.lk', 'first_name': 'John', 'last_name': 'Doe', 'role': 'GUEST', 'password': 'guest1234'},
]
for u in users_data:
    if not User.objects.filter(email=u['email']).exists():
        pwd = u.pop('password')
        user = User(**u)
        user.set_password(pwd)
        user.save()
        print(f"✅ User: {u['email']}")

# Create Guides
guides_data = [
    {'name': 'Sampath Perera', 'image_url': 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', 'fee_per_day': 5000, 'languages': ['English', 'Sinhala'], 'rating': 4.8, 'experience': '5 Years'},
    {'name': 'Nimali Fernando', 'image_url': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', 'fee_per_day': 4500, 'languages': ['English', 'German', 'Sinhala'], 'rating': 4.9, 'experience': '3 Years'},
    {'name': 'Kumar Sangakkara', 'image_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', 'fee_per_day': 6000, 'languages': ['English', 'Tamil', 'Sinhala'], 'rating': 4.7, 'experience': '8 Years'},
]
Guide.objects.all().delete()
for g in guides_data:
    Guide.objects.create(**g)
    print(f"✅ Guide: {g['name']}")

# Create Listings
Listing.objects.all().delete()

listings_data = [
    # Vehicles
    {
        'type': 'VEHICLE', 'title': 'Luxury Toyota Prado SUV',
        'description': 'Comfortable 4WD SUV perfect for family trips and safaris. Includes professional English-speaking driver.',
        'location': 'Colombo', 'price': 15000, 'rating': 4.8, 'reviews_count': 124,
        'vehicle_type': 'SUV', 'seats': 7, 'driver_included': True, 'transmission': 'Automatic', 'air_conditioned': True, 'featured': True,
        'image_urls': ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'],
    },
    {
        'type': 'VEHICLE', 'title': 'Toyota Hiace KDH Van',
        'description': 'Spacious van for group tours. High roof, adjustable seats, ample luggage space.',
        'location': 'Kandy', 'price': 18000, 'rating': 4.9, 'reviews_count': 89,
        'vehicle_type': 'Van', 'seats': 14, 'driver_included': True, 'transmission': 'Automatic', 'air_conditioned': True,
        'image_urls': ['https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&q=80&w=800'],
    },
    {
        'type': 'VEHICLE', 'title': 'Toyota KDH High Roof',
        'description': 'Spacious van for family trips',
        'location': 'Kandy', 'price': 12000, 'rating': 4.8, 'reviews_count': 25,
        'vehicle_type': 'Van', 'seats': 9, 'driver_included': True, 'transmission': 'Automatic', 'air_conditioned': True,
        'image_urls': ['https://images.unsplash.com/photo-1552161743-4b8c0678cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    },
    # Stays
    {
        'type': 'STAY', 'title': 'Cinnamon Grand Colombo',
        'description': '5-star luxury hotel in the heart of Colombo with sea views, pool, and fine dining.',
        'location': 'Colombo 03', 'price': 45000, 'rating': 4.7, 'reviews_count': 3200,
        'stay_type': 'Hotel', 'rooms': 500, 'max_guests': 4, 'amenities': ['Pool', 'Spa', 'Gym', 'WiFi', 'Ocean View'], 'featured': True,
        'image_urls': ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'],
    },
    {
        'type': 'STAY', 'title': 'Ella Jungle Resort',
        'description': 'Eco-friendly resort surrounded by nature. Perfect for hiking and relaxation.',
        'location': 'Ella', 'price': 12000, 'rating': 4.6, 'reviews_count': 450,
        'stay_type': 'Resort', 'rooms': 20, 'max_guests': 2, 'amenities': ['Nature Trails', 'Waterfall', 'Restaurant', 'WiFi'], 'featured': True,
        'image_urls': ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800'],
    },
    # Tours
    {
        'type': 'TOUR', 'title': 'Sigiriya & Dambulla Day Tour',
        'description': 'Visit the "Lion Rock" fortress and the Golden Temple of Dambulla. Includes lunch.',
        'location': 'Sigiriya', 'price': 8500, 'rating': 4.9, 'reviews_count': 210,
        'duration': '1 Day', 'tour_type': 'Cultural', 'group_size': 'Max 15',
        'itinerary': ['Pick up', 'Sigiriya Climb', 'Lunch', 'Dambulla Cave Temple', 'Drop off'],
        'included': ['Transport', 'Guide', 'Tickets', 'Lunch'], 'featured': True,
        'image_urls': ['https://tse2.mm.bing.net/th/id/OIP.-2M9Jk6cI3Xux0M1JzJ-fwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'],
    },
    {
        'type': 'TOUR', 'title': 'Yala National Park Safari',
        'description': "Spot leopards, elephants, and bears in Sri Lanka's most famous national park.",
        'location': 'Yala', 'price': 12000, 'rating': 4.8, 'reviews_count': 560,
        'duration': '6 Hours', 'tour_type': 'Wildlife', 'group_size': 'Private Jeep',
        'itinerary': ['Hotel Pickup', 'Safari Drive', 'Breakfast by Lake', 'Return'],
        'included': ['Jeep', 'Tracker', 'Park Fees', 'Refreshments'],
        'image_urls': ['https://i.ytimg.com/vi/hKUZi5Zfz64/maxresdefault.jpg'],
    },
    {
        'type': 'TOUR', 'title': 'Mirissa Whale Watching',
        'description': 'Set sail to the deep blue sea to witness the majestic Blue Whales.',
        'location': 'Mirissa', 'price': 9500, 'rating': 4.7, 'reviews_count': 340,
        'duration': '4 Hours', 'tour_type': 'Whale Watching', 'group_size': 'Public Boat',
        'itinerary': ['Hotel Pickup', 'Boat Ride', 'Whale Watching', 'Return'],
        'included': ['Boat Ticket', 'Breakfast', 'Insurance'],
        'image_urls': ['https://whalesong.com.au/wp-content/uploads/2020/02/Whalesong-cruises-humpback-whales-1536x910.png'],
    },
    {
        'type': 'TOUR', 'title': 'Ella Rock Hiking Adventure',
        'description': 'Hike through tea plantations to the summit of Ella Rock for breathtaking views.',
        'location': 'Ella', 'price': 4500, 'rating': 4.8, 'reviews_count': 180,
        'duration': '5 Hours', 'tour_type': 'Mountain', 'group_size': 'Max 8',
        'itinerary': ['Start at Railway Station', 'Tea Plantation Walk', 'Summit Climb', 'Relax at Top', 'Descent'],
        'included': ['Guide', 'Water', 'Snacks'],
        'image_urls': ['https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800'],
    },
    {
        'type': 'TOUR', 'title': 'Temple of the Tooth Relic',
        'description': 'Explore the sacred Temple of the Tooth Relic in Kandy, a UNESCO World Heritage site.',
        'location': 'Kandy', 'price': 3500, 'rating': 4.9, 'reviews_count': 890,
        'duration': '2 Hours', 'tour_type': 'Temple', 'group_size': 'Group',
        'itinerary': ['Entrance', 'Museum Visit', 'Shrine Room', 'Cultural Show'],
        'included': ['Guide', 'Entry Tickets', 'Flower Offering'],
        'image_urls': ['https://1.bp.blogspot.com/-1WHhCpJG5gE/Xt3pfP_RkKI/AAAAAAAAwDk/xRYLioQfSmYQTB_t7V3eIgPDvZlDGYrXACLcBGAsYHQ/s1600/Temple%2Bof%2Bthe%2BSacred%2BTooth%2BRelic.JPG'],
    },
    {
        'type': 'TOUR', 'title': 'Unawatuna Beach Relaxation',
        'description': 'Spend a day at one of the most beautiful beaches in the world.',
        'location': 'Unawatuna', 'price': 6000, 'rating': 4.6, 'reviews_count': 220,
        'duration': '1 Day', 'tour_type': 'Beach', 'group_size': 'Private',
        'itinerary': ['Morning Swim', 'Seafood Lunch', 'Snorkeling', 'Sunset Cocktails'],
        'included': ['Sunbed', 'Lunch', 'Snorkeling Gear'],
        'image_urls': ['https://turystycznyninja.pl/wp-content/uploads/2023/01/Unawatuna-Beach-Sri-Lanka-shutterstock.com-Marius-Dobilas.jpg'],
    },
]

for item in listings_data:
    image_urls = item.pop('image_urls', [])
    listing = Listing.objects.create(**item)
    for i, url in enumerate(image_urls):
        ListingImage.objects.create(listing=listing, url=url, order=i)
    print(f"✅ Listing: [{listing.type}] {listing.title}")

print("\n=== Seeding Complete! ===")
print("Admin Panel: http://127.0.0.1:8000/admin/")
print("API: http://127.0.0.1:8000/api/")
print("\nTest accounts:")
print("  Admin:    admin@travell.lk / admin1234")
print("  Provider: provider@travell.lk / provider1234")
print("  Guide:    guide@travell.lk / guide1234")
print("  Guest:    guest@travell.lk / guest1234")
