from django.db import models

class RoundTour(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2, help_text='LKR per person/package')
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    reviews_count = models.PositiveIntegerField(default=0)
    duration = models.CharField(max_length=50, help_text='e.g., 7 Days / 6 Nights')
    group_size = models.CharField(max_length=50, blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    itinerary = models.JSONField(default=list, blank=True)
    included = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-featured', '-created_at']

class RoundTourImage(models.Model):
    round_tour = models.ForeignKey(RoundTour, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='round_tours/')
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
