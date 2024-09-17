"""
Serializers for resort APIs.
"""
from rest_framework import serializers

from core.models import Cottage, Amenities, Booking


class AmenitiesSerializer(serializers.ModelSerializer):
    """Serializer for Amenities."""

    class Meta:
        model = Amenities
        fields = '__all__'
        read_only_fields = ['id']


class BookingSerializer(serializers.ModelSerializer):
    """Serializer for Booking."""

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['id']


class CottageSerializer(serializers.ModelSerializer):
    """Serializer for cottages."""
    amenities = AmenitiesSerializer(many=True, required=False)

    class Meta:
        model = Cottage
        fields = '__all__'
        read_only_fields = ['id']

    def _get_or_create_tags(self, amenities, cottage):
        """Handle getting or creating amenities as needed."""
        auth_user = self.context['request'].user
        for amenity in amenities:
            amenity_obj, created = Amenities.objects.get_or_create(
                user=auth_user,
                **amenity,
            )
            cottage.amenities.add(amenity_obj)

    def create(self, validated_data):
        """Create a cottage."""
        amenities = validated_data.pop('amenities', [])
        cottage = Cottage.objects.create(**validated_data)
        self._get_or_create_tags(amenities, cottage)

        return cottage
