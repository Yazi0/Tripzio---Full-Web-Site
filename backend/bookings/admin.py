from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'listing', 'start_date', 'end_date', 'status', 'payment_status', 'total_price', 'created_at']
    list_filter = ['status', 'payment_status', 'payment_method']
    search_fields = ['user__email', 'listing__title', 'guest_name', 'guest_phone']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
