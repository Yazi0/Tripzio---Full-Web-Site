import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import User

email = 'admin@tripzio.lk'
password = 'tripzio2012'
username = 'admin'

user = User.objects.filter(email=email).first()
if not user:
    user = User.objects.filter(username=username).first()

if user:
    user.email = email
    user.username = username
    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.role = 'ADMIN'
    user.save()
    print(f"Successfully updated admin user: {email}")
else:
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
        role='ADMIN'
    )
    print(f"Successfully created admin user: {email}")
