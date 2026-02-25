from rest_framework import serializers
from .models import Guide


class GuideSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Guide
        fields = [
            'id', 'user', 'name', 'image_url', 'fee_per_day',
            'languages', 'rating', 'experience', 'bio', 'is_available', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        return obj.get_image_url(request)
