"""
Serializers for resort APIs.
"""
from rest_framework import serializers

from core.models import Cottage, Amenities


class AmenitiesSerializer(serializers.ModelSerializer):
    """Serializer for Amenities."""
    class Meta:
        model = Amenities
        fields = '__all__'
        read_only_fields = ['id']


class CottageSerializer(serializers.ModelSerializer):
    """Serializer for cottages."""
    amenities = AmenitiesSerializer(many=True, required=False)

    class Meta:
        model = Cottage
        fields = '__all__'
        read_only_fields = ['id']
