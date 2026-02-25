from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ContactMessage, ContactInfo
from .serializers import ContactMessageSerializer, ContactInfoSerializer

@api_view(['POST'])
def send_contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Your message has been sent successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH'])
def get_contact_info(request):
    # Get the latest (and ideally only) contact info record
    info = ContactInfo.objects.first()
    if not info:
        info = ContactInfo.objects.create() # Create default if none exists

    if request.method == 'GET':
        serializer = ContactInfoSerializer(info)
        return Response(serializer.data)
    
    elif request.method == 'PATCH':
        if not (request.user.is_authenticated and request.user.role == 'ADMIN'):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
            
        serializer = ContactInfoSerializer(info, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
