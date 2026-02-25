import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from contact.models import ContactInfo

def seed_contact_info():
    if ContactInfo.objects.exists():
        print("Contact Info already exists.")
        return
    
    ContactInfo.objects.create(
        address="123 Tourism Drive, Colombo 03, Sri Lanka",
        email_1="hello@tripzio.com",
        email_2="support@tripzio.com",
        phone_1="+94 11 234 5678",
        phone_2="+94 77 123 4567",
        map_url="https://images.unsplash.com/photo-1569668723429-9fb7e19bd65e?auto=format&fit=crop&q=80&w=1000"
    )
    print("Seeded Contact Info.")

if __name__ == "__main__":
    seed_contact_info()
