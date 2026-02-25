from rest_framework import serializers
from .models import Listing, ListingImage


class ListingImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ListingImage
        fields = ['id', 'url', 'order']

    def get_url(self, obj):
        request = self.context.get('request')
        return obj.get_url(request)


class ListingSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)
    image_urls = serializers.ListField(
        child=serializers.URLField(), write_only=True, required=False
    )

    class Meta:
        model = Listing
        fields = [
            'id', 'type', 'title', 'description', 'location', 'price',
            'rating', 'reviews_count', 'featured', 'created_at', 'updated_at',
            # Vehicle
            'vehicle_type', 'seats', 'driver_included', 'transmission', 'air_conditioned',
            # Stay
            'stay_type', 'rooms', 'max_guests', 'amenities',
            # Tour
            'duration', 'tour_type', 'group_size', 'itinerary', 'included',
            # Images
            'images', 'image_urls',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        image_urls = validated_data.pop('image_urls', [])
        listing = Listing.objects.create(**validated_data)
        for i, url in enumerate(image_urls):
            ListingImage.objects.create(listing=listing, url=url, order=i)
        return listing

    def update(self, instance, validated_data):
        image_urls = validated_data.pop('image_urls', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if image_urls is not None:
            instance.images.all().delete()
            for i, url in enumerate(image_urls):
                ListingImage.objects.create(listing=instance, url=url, order=i)
        return instance
