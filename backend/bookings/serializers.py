from rest_framework import serializers
from .models import Booking
from listings.serializers import ListingSerializer
from guides.serializers import GuideSerializer


class BookingSerializer(serializers.ModelSerializer):
    listing_title = serializers.CharField(source='listing.title', read_only=True)
    listing_type = serializers.CharField(source='listing.type', read_only=True)
    listing_image = serializers.SerializerMethodField()
    guide_name = serializers.CharField(source='guide.name', read_only=True, allow_null=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'listing', 'listing_title', 'listing_type', 'listing_image',
            'guest_name', 'guest_country', 'guest_phone', 'guest_id_passport',
            'start_date', 'end_date', 'guests', 'with_driver',
            'total_price', 'guide_price',
            'status', 'payment_status', 'payment_method',
            'guide', 'guide_name',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'user', 'payment_status', 'created_at', 'updated_at']

    def get_listing_image(self, obj):
        request = self.context.get('request')
        first_image = obj.listing.images.first()
        if first_image:
            return first_image.get_url(request)
        return None


class CreateBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'listing', 'guest_name', 'guest_country', 'guest_phone', 'guest_id_passport',
            'start_date', 'end_date', 'guests', 'with_driver',
            'total_price', 'guide_price', 'guide',
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user if user.is_authenticated else None
        return super().create(validated_data)
