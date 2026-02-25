from django.db import models


class Destination(models.Model):
    CATEGORY_CHOICES = [
        ('Beaches', 'Beaches'),
        ('Mountains', 'Mountains'),
        ('Cultural', 'Cultural'),
        ('Wildlife', 'Wildlife'),
        ('Historical', 'Historical'),
    ]

    # Slug ID (matches frontend id like 'colombo', 'kandy')
    slug = models.SlugField(unique=True, max_length=100)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    full_description = models.TextField()
    image = models.URLField(help_text='Main cover image URL')
    count = models.PositiveIntegerField(default=0, help_text='Number of experiences')
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    best_season = models.CharField(max_length=100)
    seasons = models.JSONField(default=list, help_text='Month indices (0=Jan ... 11=Dec) when best to visit')
    popular_activities = models.JSONField(default=list)
    coordinates_lat = models.DecimalField(max_digits=10, decimal_places=7)
    coordinates_lng = models.DecimalField(max_digits=10, decimal_places=7)
    images = models.JSONField(default=list, help_text='List of gallery image URLs')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-featured', 'name']
