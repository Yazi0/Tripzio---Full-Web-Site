from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.send_contact_message, name='send_contact_message'),
    path('info/', views.get_contact_info, name='get_contact_info'),
]
