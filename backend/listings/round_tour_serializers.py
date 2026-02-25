from rest_framework import serializers
from .round_tour_models import RoundTour, RoundTourImage

class RoundTourImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = RoundTourImage
        fields = ['id', 'url', 'order']

    def get_url(self, obj):
        request = self.context.get('request')
        return obj.get_url(request)

class RoundTourSerializer(serializers.ModelSerializer):
    images = RoundTourImageSerializer(many=True, read_only=True)
    image_urls = serializers.ListField(
        child=serializers.URLField(), write_only=True, required=False
    )

    class Meta:
        model = RoundTour
        fields = [
            'id', 'title', 'description', 'location', 'price',
            'rating', 'reviews_count', 'duration', 'group_size',
            'featured', 'created_at', 'updated_at',
            'itinerary', 'included', 'images', 'image_urls'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        image_urls = validated_data.pop('image_urls', [])
        round_tour = RoundTour.objects.create(**validated_data)
        for i, url in enumerate(image_urls):
            RoundTourImage.objects.create(round_tour=round_tour, url=url, order=i)
        return round_tour

    def update(self, instance, validated_data):
        image_urls = validated_data.pop('image_urls', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if image_urls is not None:
            instance.images.all().delete()
            for i, url in enumerate(image_urls):
                RoundTourImage.objects.create(round_tour=instance, url=url, order=i)
        return instance
