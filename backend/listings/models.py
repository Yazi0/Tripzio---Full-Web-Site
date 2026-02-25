from django.db import models
from .round_tour_models import RoundTour, RoundTourImage



class Listing(models.Model):
    TYPE_CHOICES = [
        ('VEHICLE', 'Vehicle'),
        ('STAY', 'Stay'),
        ('TOUR', 'Tour'),
    ]
    TRANSMISSION_CHOICES = [('Automatic', 'Automatic'), ('Manual', 'Manual')]
    STAY_TYPE_CHOICES = [
        ('Hotel', 'Hotel'), ('Resort', 'Resort'), ('Villa', 'Villa'),
        ('Guesthouse', 'Guesthouse'), ('Hostel', 'Hostel'),
    ]
    VEHICLE_TYPE_CHOICES = [
        ('Car', 'Car'), ('Van', 'Van'), ('SUV', 'SUV'),
        ('Bus', 'Bus'), ('Tuk-Tuk', 'Tuk-Tuk'),
    ]
    TOUR_TYPE_CHOICES = [
        ('Cultural', 'Cultural'), ('Wildlife', 'Wildlife'),
        ('Whale Watching', 'Whale Watching'), ('Mountain', 'Mountain'),
        ('Temple', 'Temple'), ('Beach', 'Beach'), ('Adventure', 'Adventure'),
        ('Round Tour', 'Round Tour'),
    ]

    # --- Common Fields ---
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2, help_text='LKR per day/night/person')
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    reviews_count = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- Vehicle Fields ---
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPE_CHOICES, blank=True)
    seats = models.PositiveIntegerField(null=True, blank=True)
    driver_included = models.BooleanField(null=True, blank=True)
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES, blank=True)
    air_conditioned = models.BooleanField(null=True, blank=True)

    # --- Stay Fields ---
    stay_type = models.CharField(max_length=20, choices=STAY_TYPE_CHOICES, blank=True)
    rooms = models.PositiveIntegerField(null=True, blank=True)
    max_guests = models.PositiveIntegerField(null=True, blank=True)
    amenities = models.JSONField(default=list, blank=True)

    # --- Tour Fields ---
    duration = models.CharField(max_length=50, blank=True)
    tour_type = models.CharField(max_length=30, choices=TOUR_TYPE_CHOICES, blank=True)
    group_size = models.CharField(max_length=50, blank=True)
    itinerary = models.JSONField(default=list, blank=True)
    included = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"[{self.type}] {self.title}"

    class Meta:
        ordering = ['-featured', '-created_at']


class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='listings/')
    url = models.URLField(blank=True, help_text='External URL if not uploading a file')
    order = models.PositiveIntegerField(default=0)

    def get_url(self, request=None):
        if self.image:
            if request:
                return request.build_absolute_uri(self.image.url)
            return self.image.url
        return self.url

    class Meta:
        ordering = ['order']

# --- Proxy Models for separate Admin sections ---

class Vehicle(Listing):
    class Meta:
        proxy = True
        verbose_name = 'Vehicle'
        verbose_name_plural = 'Vehicles'

    def save(self, *args, **kwargs):
        self.type = 'VEHICLE'
        super().save(*args, **kwargs)

class Stay(Listing):
    class Meta:
        proxy = True
        verbose_name = 'Stay'
        verbose_name_plural = 'Stays'

    def save(self, *args, **kwargs):
        self.type = 'STAY'
        super().save(*args, **kwargs)

class Tour(Listing):
    class Meta:
        proxy = True
        verbose_name = 'Tour'
        verbose_name_plural = 'Tours'

    def save(self, *args, **kwargs):
        self.type = 'TOUR'
        super().save(*args, **kwargs)
