from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Listing
from .serializers import ListingSerializer


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.prefetch_related('images')
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'location', 'description']
    ordering_fields = ['price', 'rating', 'created_at']
    ordering = ['-featured', '-created_at']

    @property
    def pagination_class(self):
        if self.request.query_params.get('no_pagination') == 'true':
            return None
        from rest_framework.pagination import PageNumberPagination
        return PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()

        # Filter by type
        listing_type = self.request.query_params.get('type')
        if listing_type:
            qs = qs.filter(type=listing_type.upper())

        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            qs = qs.filter(price__gte=min_price)
        if max_price:
            qs = qs.filter(price__lte=max_price)

        # Filter by minimum rating
        rating = self.request.query_params.get('rating')
        if rating:
            qs = qs.filter(rating__gte=rating)

        # Filter by category (vehicle_type / stay_type / tour_type)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(
                vehicle_type=category
            ) | qs.filter(
                stay_type=category
            ) | qs.filter(
                tour_type=category
            )

        return qs

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        qs = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(qs, many=True, context={'request': request})
        return Response(serializer.data)
