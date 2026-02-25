from rest_framework import serializers
from .models import ContactMessage, ContactInfo

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['address', 'email_1', 'email_2', 'phone_1', 'phone_2', 'whatsapp', 'map_url', 'updated_at']
