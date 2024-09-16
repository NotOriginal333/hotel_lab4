"""
URL mapping for the resort app.
"""
from django.urls import (
    path,
    include
)
from rest_framework.routers import DefaultRouter

from resort import views

router = DefaultRouter()
router.register('cottages', views.CottageViewSet)
router.register('amenities', views.AmenitiesViewSet)

app_name = 'resort'

urlpatterns = [
    path('', include(router.urls)),
]
