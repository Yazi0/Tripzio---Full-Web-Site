from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Destination
from .serializers import DestinationSerializer


class DestinationViewSet(viewsets.ModelViewSet):
    serializer_class = DestinationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'location', 'category']
    ordering_fields = ['rating', 'count', 'name']
    ordering = ['-featured', 'name']

    def get_queryset(self):
        qs = Destination.objects.all()

        # Filter by category
        category = self.request.query_params.get('category')
        if category and category != 'All':
            qs = qs.filter(category=category)

        # Filter by current best time (month index 0-11)
        month = self.request.query_params.get('month')
        if month is not None:
            try:
                month_int = int(month)
                # Filter where seasons array contains this month
                qs = [d for d in qs if month_int in (d.seasons or [])]
                return qs
            except ValueError:
                pass

        return qs

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]
