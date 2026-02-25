from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Booking
from .serializers import BookingSerializer, CreateBookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer

    def get_permissions(self):
        if self.action == 'create':
            return []  # Allow anyone to create a booking for now
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Booking.objects.none()
        
        if hasattr(user, 'role') and user.role in ['ADMIN']:
            return Booking.objects.select_related('listing', 'guide').all()
        elif hasattr(user, 'role') and user.role == 'GUIDE':
            return Booking.objects.select_related('listing', 'guide').filter(
                guide__user=user,
                listing__type='TOUR'
            )
        else:
            return Booking.objects.select_related('listing', 'guide').filter(user=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateBookingSerializer
        return BookingSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        booking = self.get_object()
        method = request.data.get('method', 'CARD')
        if method not in ['CASH', 'CARD']:
            return Response({'error': 'Invalid payment method.'}, status=status.HTTP_400_BAD_REQUEST)
        booking.payment_method = method
        if method == 'CARD':
            booking.payment_status = 'PAID'
        booking.status = 'CONFIRMED'
        booking.save()
        return Response(BookingSerializer(booking, context={'request': request}).data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        if booking.status == 'CANCELLED':
            return Response({'error': 'Booking is already cancelled.'}, status=status.HTTP_400_BAD_REQUEST)
        booking.status = 'CANCELLED'
        booking.save()
        return Response(BookingSerializer(booking, context={'request': request}).data)

    @action(detail=True, methods=['post'])
    def respond(self, request, pk=None):
        """Guide accepts or declines a booking."""
        booking = self.get_object()
        action_value = request.data.get('action')
        if action_value not in ['ACCEPT', 'DECLINE']:
            return Response({'error': 'Action must be ACCEPT or DECLINE.'}, status=status.HTTP_400_BAD_REQUEST)
        if action_value == 'ACCEPT':
            booking.status = 'CONFIRMED'
        else:
            booking.status = 'GUIDE_DECLINED'
        booking.save()
        return Response(BookingSerializer(booking, context={'request': request}).data)
