"""
Views for resort APIs.
"""
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from rest_framework import (
    viewsets,
    mixins,
    status,
)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import (
    Cottage,
    Amenities,
    Booking,
)
from resort import serializers


class CottageViewSet(viewsets.ModelViewSet):
    """Manage cottages in the database."""
    serializer_class = serializers.CottageSerializer
    queryset = Cottage.objects.all()

    def _params_to_ints(self, qs):
        """Convert a list of strings to integers."""
        return [int(str_id) for str_id in qs.split(',')]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                'amenities',
                OpenApiTypes.STR,
                description='Comma-separated list of amenities IDs to filter',
            ),
            OpenApiParameter(
                'category',
                OpenApiTypes.STR,
                description='Category of the cottage (e.g. standard, luxury)',
            ),
        ]
    )
    def get_queryset(self):
        """Retrieve amenities filtered by whether they are assigned to cottages."""
        assigned_only = self.request.query_params.get('assigned_only')
        queryset = self.queryset

        if assigned_only:
            queryset = queryset.filter(cottages__isnull=False).distinct()

        return queryset.filter(
            user=self.request.user,
        ).order_by('-id').distinct()

    def get_queryset(self):
        """Filter queryset for authenticated user."""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(recipe__isnull=False)
        return queryset.filter(
            user=self.request.user
        ).order_by('-name').distinct()


class BaseCottageAttrViewSet(mixins.UpdateModelMixin,
                             mixins.DestroyModelMixin,
                             mixins.ListModelMixin,
                             viewsets.GenericViewSet):
    """Base viewset for cottage attributes."""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Filter queryset for authenticated user."""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(cottage__isnull=False)
        return queryset.filter(
            user=self.request.user
        ).order_by('-name').distinct()


class AmenitiesViewSet(BaseCottageAttrViewSet,
                       mixins.CreateModelMixin):
    """Manage amenities in the database."""
    serializer_class = serializers.AmenitiesSerializer
    queryset = Amenities.objects.all()


class BookingViewSet(mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.ListModelMixin,
                     viewsets.GenericViewSet,
                     mixins.CreateModelMixin):
    """Manage booking in the database."""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.BookingSerializer
    queryset = Booking.objects.all()

    def get_queryset(self):
        """Filter queryset for authenticated user."""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(cottage__isnull=False)
        return queryset.filter(
            user=self.request.user
        ).order_by('-check_in').distinct()
