from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Guide
from .serializers import GuideSerializer


class GuideViewSet(viewsets.ModelViewSet):
    queryset = Guide.objects.filter(is_available=True)
    serializer_class = GuideSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'languages', 'bio']
    ordering_fields = ['rating', 'fee_per_day', 'experience']
    ordering = ['-rating']

    def get_queryset(self):
        qs = Guide.objects.all()
        # Filter by minimum seats for vehicles or guest count
        guest_count = self.request.query_params.get('guests')
        if guest_count:
            qs = qs  # Guides don't have capacity limit, return all
        return qs

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()

    def get_serializer_context(self):
        return {'request': self.request}
