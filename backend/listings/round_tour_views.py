from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .round_tour_models import RoundTour
from .round_tour_serializers import RoundTourSerializer

class RoundTourViewSet(viewsets.ModelViewSet):
    queryset = RoundTour.objects.prefetch_related('images')
    serializer_class = RoundTourSerializer
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

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()
