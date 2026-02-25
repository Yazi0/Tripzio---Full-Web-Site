from rest_framework import serializers
from .models import Destination


class DestinationSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField()
    id = serializers.CharField(source='slug', read_only=True)

    class Meta:
        model = Destination
        fields = [
            'id', 'slug', 'name', 'description', 'full_description',
            'image', 'count', 'rating', 'best_season', 'seasons',
            'popular_activities', 'coordinates', 'images', 'category', 'featured',
        ]

    def get_coordinates(self, obj):
        return {
            'lat': float(obj.coordinates_lat),
            'lng': float(obj.coordinates_lng),
        }
