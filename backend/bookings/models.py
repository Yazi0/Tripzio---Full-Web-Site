from django.db import models
from django.conf import settings
from listings.models import Listing


class Booking(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
        ('GUIDE_DECLINED', 'Guide Declined'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('UNPAID', 'Unpaid'),
        ('PAID', 'Paid'),
    ]
    PAYMENT_METHOD_CHOICES = [
        ('CASH', 'Cash'),
        ('CARD', 'Card'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings', null=True, blank=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='bookings')

    # Guest info
    guest_name = models.CharField(max_length=255, blank=True)
    guest_country = models.CharField(max_length=100, blank=True)
    guest_phone = models.CharField(max_length=30, blank=True)
    guest_id_passport = models.CharField(max_length=100, blank=True)

    # Booking details
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    guests = models.PositiveIntegerField(default=1)
    with_driver = models.BooleanField(null=True, blank=True)

    # Pricing
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    guide_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='UNPAID')
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHOD_CHOICES, blank=True)

    # Optional guide assignment
    guide = models.ForeignKey(
        'guides.Guide', on_delete=models.SET_NULL,
        null=True, blank=True, related_name='bookings'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Booking #{self.id} - {self.user.email} - {self.listing.title}"

    class Meta:
        ordering = ['-created_at']
