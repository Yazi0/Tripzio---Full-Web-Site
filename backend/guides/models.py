from django.db import models
from django.conf import settings


class Guide(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='guide_profile', null=True, blank=True
    )
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='guides/', blank=True, null=True)
    image_url = models.URLField(blank=True, help_text='External image URL')
    fee_per_day = models.DecimalField(max_digits=10, decimal_places=2, help_text='LKR per day')
    languages = models.JSONField(default=list)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    experience = models.CharField(max_length=50, blank=True, help_text='e.g. 5 Years')
    bio = models.TextField(blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_image_url(self, request=None):
        if self.image:
            if request:
                return request.build_absolute_uri(self.image.url)
            return self.image.url
        return self.image_url

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-rating']
