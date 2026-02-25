from django.contrib import admin
from .models import Listing, ListingImage, Vehicle, Stay, Tour


class ListingImageInline(admin.TabularInline):
    model = ListingImage
    extra = 1

class BaseListingAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'location', 'price', 'rating', 'featured', 'created_at']
    list_filter = ['type', 'featured', 'location']
    search_fields = ['title', 'location', 'description']
    ordering = ['-featured', '-created_at']
    inlines = [ListingImageInline]

@admin.register(Listing)
class ListingAdmin(BaseListingAdmin):
    list_filter = ['type', 'featured', 'vehicle_type', 'stay_type', 'tour_type']
    fieldsets = (
        ('Common Info', {
            'fields': ('type', 'title', 'description', 'location', 'price', 'rating', 'reviews_count', 'featured')
        }),
        ('Vehicle Specifics', {
            'classes': ('collapse',),
            'fields': ('vehicle_type', 'seats', 'driver_included', 'transmission', 'air_conditioned'),
        }),
        ('Stay Specifics', {
            'classes': ('collapse',),
            'fields': ('stay_type', 'rooms', 'max_guests', 'amenities'),
        }),
        ('Tour Specifics', {
            'classes': ('collapse',),
            'fields': ('duration', 'tour_type', 'group_size', 'itinerary', 'included'),
        }),
    )

@admin.register(Vehicle)
class VehicleAdmin(BaseListingAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).filter(type='VEHICLE')
    
    list_filter = ['featured', 'vehicle_type', 'transmission', 'air_conditioned']
    fieldsets = (
        ('Common Info', {
            'fields': ('title', 'description', 'location', 'price', 'rating', 'reviews_count', 'featured')
        }),
        ('Vehicle Details', {
            'fields': ('vehicle_type', 'seats', 'driver_included', 'transmission', 'air_conditioned'),
        }),
    )

@admin.register(Stay)
class StayAdmin(BaseListingAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).filter(type='STAY')
    
    list_filter = ['featured', 'stay_type']
    fieldsets = (
        ('Common Info', {
            'fields': ('title', 'description', 'location', 'price', 'rating', 'reviews_count', 'featured')
        }),
        ('Stay Details', {
            'fields': ('stay_type', 'rooms', 'max_guests', 'amenities'),
        }),
    )

@admin.register(Tour)
class TourAdmin(BaseListingAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).filter(type='TOUR')
    
    list_filter = ['featured', 'tour_type']
    fieldsets = (
        ('Common Info', {
            'fields': ('title', 'description', 'location', 'price', 'rating', 'reviews_count', 'featured')
        }),
        ('Tour Details', {
            'fields': ('duration', 'tour_type', 'group_size', 'itinerary', 'included'),
        }),
    )

from .round_tour_models import RoundTour, RoundTourImage

class RoundTourImageInline(admin.TabularInline):
    model = RoundTourImage
    extra = 1

@admin.register(RoundTour)
class RoundTourAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'price', 'rating', 'featured', 'created_at']
    list_filter = ['featured', 'location']
    search_fields = ['title', 'location', 'description']
    ordering = ['-featured', '-created_at']
    inlines = [RoundTourImageInline]
    fieldsets = (
        ('Common Info', {
            'fields': ('title', 'description', 'location', 'price', 'rating', 'reviews_count', 'featured')
        }),
        ('Round Tour Details', {
            'fields': ('duration', 'group_size', 'itinerary', 'included'),
        }),
    )

