from django.contrib import admin
from .models import Guide


@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ['name', 'fee_per_day', 'rating', 'experience', 'is_available', 'created_at']
    list_filter = ['is_available']
    search_fields = ['name', 'bio']
    ordering = ['-rating']
