from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListingViewSet
from .round_tour_views import RoundTourViewSet

router = DefaultRouter()
router.register(r'round-tours', RoundTourViewSet, basename='roundtour')
router.register(r'', ListingViewSet, basename='listing')

urlpatterns = [
    path('', include(router.urls)),
]
