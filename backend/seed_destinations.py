"""
Seed destinations data.
Run: python seed_destinations.py (from backend dir with venv activated)
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from destinations.models import Destination

Destination.objects.all().delete()

destinations = [
    {
        'slug': 'colombo',
        'name': 'Colombo',
        'description': 'The commercial capital, blending colonial heritage with modern urban life.',
        'full_description': 'Colombo is the bustling commercial capital of Sri Lanka, where historic colonial buildings stand alongside modern skyscrapers. Experience the vibrant street markets, visit the National Museum, and enjoy sunset views at Galle Face Green.',
        'image': 'https://i.ytimg.com/vi/2RaQp_j-wIQ/maxresdefault.jpg',
        'count': 125, 'rating': 4.7,
        'best_season': 'December to March',
        'seasons': [11, 0, 1, 2],
        'popular_activities': ['City Tours', 'Shopping', 'Cultural Sites', 'Nightlife'],
        'coordinates_lat': 6.9271, 'coordinates_lng': 79.8612,
        'images': [
            'https://media.onyx-hospitality.com/-/media/project/amari/common/property/colombo/hotel-photos/overview/exterior_1.jpg?rev=f341440a323c44519c52cb9087dd2672',
            'https://media.istockphoto.com/id/1457698429/photo/lotus-tower-sri-lanka.jpg?s=612x612&w=0&k=20&c=e-J8rcUWgtqUQc9bjBXKggn63fjOM19_Gt9SAVeUiEw=',
            'https://www.portcitycolombo.lk/wp-content/uploads/2024/04/View-From-Port-City-1200x901-1.jpg',
        ],
        'category': 'Cultural', 'featured': True,
    },
    {
        'slug': 'kandy',
        'name': 'Kandy',
        'description': 'The cultural capital in the hills, home to the Temple of the Sacred Tooth Relic.',
        'full_description': 'Nestled in the central highlands, Kandy is a UNESCO World Heritage site and the cultural heart of Sri Lanka. Visit the sacred Temple of the Tooth, stroll around Kandy Lake, and experience traditional dance performances.',
        'image': 'https://chaaliya.com/wp-content/uploads/2017/11/Kandy.jpg',
        'count': 84, 'rating': 4.8,
        'best_season': 'January to April',
        'seasons': [0, 1, 2, 3],
        'popular_activities': ['Temple Visits', 'Cultural Shows', 'Lake Walks', 'Botanical Gardens'],
        'coordinates_lat': 7.2906, 'coordinates_lng': 80.6337,
        'images': [
            'https://rootsabroadtravel.com/wp-content/uploads/2024/01/The-Best-Things-to-Do-in-Kandy-Sri-Lanka.jpg',
            'https://island.lk/wp-content/uploads/2023/09/kandy-perahera.jpg',
            'https://lakpura.com/cdn/shop/files/Kandy-Esala-Perahera_7726dc4e-161c-495b-ba3e-b958e84733d4.jpg?v=1719391228&width=1445',
        ],
        'category': 'Cultural', 'featured': True,
    },
    {
        'slug': 'galle',
        'name': 'Galle',
        'description': 'A historic fortified city on the southwest coast, famous for its Dutch Fort.',
        'full_description': 'Galle Fort is a UNESCO World Heritage site showcasing Dutch colonial architecture. Walk along the ramparts at sunset, explore boutique shops, and enjoy fresh seafood at beachside restaurants.',
        'image': 'https://besttimetovisitsrilanka.com/wp-content/uploads/2021/04/Galle-Fort-in-Sri-Lanka-1.jpg',
        'count': 92, 'rating': 4.6,
        'best_season': 'November to April',
        'seasons': [10, 11, 0, 1, 2, 3],
        'popular_activities': ['Fort Exploration', 'Beach Visits', 'Shopping', 'Sunset Views'],
        'coordinates_lat': 6.0535, 'coordinates_lng': 80.2210,
        'images': [
            'https://pohcdn.com/sites/default/files/styles/paragraph__live_banner__lb_image__1880bp/public/live_banner/galle.jpg',
            'https://i.ytimg.com/vi/1zWW2XRIZqc/maxresdefault.jpg',
            'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/12/b1/a5/the-heritage-galle-fort.jpg?w=900&h=-1&s=1',
        ],
        'category': 'Beaches',
    },
    {
        'slug': 'sigiriya',
        'name': 'Sigiriya',
        'description': 'Ancient rock fortress designated as a UNESCO World Heritage site.',
        'full_description': 'Sigiriya Rock Fortress, also known as Lion Rock, is an ancient palace and fortress complex. Climb to the top for breathtaking views, admire the famous frescoes, and explore the water gardens at the base.',
        'image': 'https://www.srilankaauthenticholidays.com/wp-content/uploads/2024/05/sigiriya.png',
        'count': 45, 'rating': 4.9,
        'best_season': 'January to March',
        'seasons': [0, 1, 2],
        'popular_activities': ['Rock Climbing', 'Historical Tours', 'Sunrise Views', 'Nature Walks'],
        'coordinates_lat': 7.9570, 'coordinates_lng': 80.7603,
        'images': [
            'https://www.edengardensigiriya.com/wp-content/uploads/2015/08/sigiriya-fort.jpg',
            'https://www.srilankaauthenticholidays.com/wp-content/uploads/2024/05/sigiriya.png',
            'https://www.remotelands.com/storage/media/603/conversions/b130130006-banner-size.jpg',
        ],
        'category': 'Historical',
    },
    {
        'slug': 'ella',
        'name': 'Ella',
        'description': 'A small town in the Badulla District, famous for its tea plantations and stunning views.',
        'full_description': 'Ella is a picturesque mountain town surrounded by lush tea plantations. Hike to Ella Rock, visit Nine Arch Bridge, and enjoy panoramic views from viewpoints throughout this charming hill station.',
        'image': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
        'count': 63, 'rating': 4.7,
        'best_season': 'December to February',
        'seasons': [11, 0, 1],
        'popular_activities': ['Hiking', 'Tea Estate Tours', 'Train Rides', 'Waterfall Visits'],
        'coordinates_lat': 6.8685, 'coordinates_lng': 81.0466,
        'images': [
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1572277409494-7d4a7b370e8a?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1552121802-1011a2f82ff1?auto=format&fit=crop&q=80&w=1200',
        ],
        'category': 'Mountains',
    },
    {
        'slug': 'yala',
        'name': 'Yala',
        'description': 'The most visited and second largest national park in Sri Lanka.',
        'full_description': "Yala National Park is renowned for its leopard population and diverse wildlife. Experience thrilling safari adventures, spot elephants, crocodiles, and a wide variety of bird species in their natural habitat.",
        'image': 'https://i.ytimg.com/vi/hKUZi5Zfz64/maxresdefault.jpg',
        'count': 38, 'rating': 4.8,
        'best_season': 'February to June',
        'seasons': [1, 2, 3, 4, 5],
        'popular_activities': ['Safari Tours', 'Bird Watching', 'Nature Photography', 'Camping'],
        'coordinates_lat': 6.3730, 'coordinates_lng': 81.5052,
        'images': [
            'https://www.travelsewhere.net/wp-content/uploads/2026/02/DSC_0432-6.jpg',
            'https://srilankanexpeditions.co.uk/images/main_slider/sri-lanka-wildlife/01.jpg',
            'https://theabroadguide.com/wp-content/uploads/2026/02/from-ella-to-yala-national-park-safari-with-tree-house-stay.jpg',
        ],
        'category': 'Wildlife',
    },
    {
        'slug': 'mirissa',
        'name': 'Mirissa',
        'description': 'A tropical paradise famous for whale watching and stunning sunsets.',
        'full_description': 'Mirissa is a vibrant beach town on the south coast, world-famous for blue whale watching. Relax on the coconut-lined beach, surf the waves, and witness the majestic giants of the ocean on a boat tour.',
        'image': 'https://i.ytimg.com/vi/pmKtgLchb9A/maxresdefault.jpg',
        'count': 76, 'rating': 4.8,
        'best_season': 'November to April',
        'seasons': [10, 11, 0, 1, 2, 3],
        'popular_activities': ['Whale Watching', 'Surfing', 'Beach Parties', 'Snorkeling'],
        'coordinates_lat': 5.9483, 'coordinates_lng': 80.4716,
        'images': [
            'https://media.istockphoto.com/id/1198786249/photo/tour-boats-with-guests-snorkelling-with-whale-sharks.jpg?s=612x612&w=0&k=20&c=3MG-hWJO9Gv53rec3OvspsksIaKqlvHMwW6sY2m_3Tg=',
            'https://www.voyager-srilanka.fr/wp-content/uploads/2021/02/restaurant-mirissa-1024x683.jpg',
            'https://i0.wp.com/shewalkstheworld.com/wp-content/uploads/2019/02/Surf-School-1.jpg?resize=768%2C578&ssl=1',
        ],
        'category': 'Beaches',
    },
]

for d in destinations:
    Destination.objects.create(**d)
    print(f"✅ Destination: {d['name']}")

print(f"\n✅ {len(destinations)} destinations seeded!")
