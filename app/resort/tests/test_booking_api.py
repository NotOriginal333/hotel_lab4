"""
Tests for the booking API.
"""
from datetime import datetime

from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from core.models import Booking, Cottage
from resort.serializers import BookingSerializer

BOOKING_URL = reverse('resort:booking-list')


def create_user(email='user@example.com', password='testpass123'):
    """Create and return a user."""
    return get_user_model().objects.create_user(email=email, password=password)


def create_cottage(user, **kwargs):
    """Create and return a cottage."""
    return Cottage.objects.create(user=user, **kwargs)


class BookingSerializerTests(TestCase):
    """Test the Booking serializer."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()
        self.client.force_authenticate(self.user)
        self.cottage = create_cottage(
            self.user,
            name='Test Cottage',
            base_capacity=4,
            price_per_night='100.00'
        )

    def test_valid_booking_serializer(self):
        """Test valid booking serializer."""
        payload = {
            'cottage': self.cottage.id,
            'check_in': '2024-10-01',
            'check_out': '2024-10-05',
            'customer_name': 'John Doe',
            'customer_email': 'john.doe@example.com',
            'user': self.user.id
        }
        serializer = BookingSerializer(data=payload)
        self.assertTrue(serializer.is_valid())
        booking = serializer.save()

        check_in_date = datetime.strptime(payload['check_in'], '%Y-%m-%d').date()
        check_out_date = datetime.strptime(payload['check_out'], '%Y-%m-%d').date()

        self.assertEqual(booking.check_in, check_in_date)
        self.assertEqual(booking.check_out, check_out_date)
        self.assertEqual(booking.customer_name, payload['customer_name'])
        self.assertEqual(booking.customer_email, payload['customer_email'])

    def test_invalid_booking_serializer(self):
        """Test invalid booking serializer."""
        payload = {
            'cottage': self.cottage.id,
            'check_in': '2024-10-05',
            'check_out': '2024-10-01',
            'customer_name': 'John Doe',
            'customer_email': 'john.doe@example.com',
            'user': self.user.id
        }
        serializer = BookingSerializer(data=payload)
        self.assertFalse(serializer.is_valid())
        self.assertIn('non_field_errors', serializer.errors)


def detail_url(booking_id):
    """Return detail URL for booking."""
    return reverse('resort:booking-detail', args=[booking_id])


class PublicBookingApiTests(TestCase):
    """Test unauthenticated API requests for booking."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required for retrieving bookings."""
        res = self.client.get(BOOKING_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateBookingApiTests(TestCase):
    """Test authenticated API requests for booking."""

    def setUp(self):
        self.user = create_user()
        self.client = APIClient()
        self.client.force_authenticate(self.user)
        self.cottage = create_cottage(
            self.user,
            name='Test Cottage',
            base_capacity=4,
            price_per_night='100.00'
        )

    def test_create_booking(self):
        """Test creating a booking is successful."""
        payload = {
            'cottage': self.cottage.id,
            'check_in': '2024-10-01',
            'check_out': '2024-10-05',
            'customer_name': 'John Doe',
            'customer_email': 'john.doe@example.com',
            'user': self.user.id
        }
        res = self.client.post(BOOKING_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        booking = Booking.objects.get(id=res.data['id'])

        check_in_date = datetime.strptime(payload['check_in'], '%Y-%m-%d').date()
        check_out_date = datetime.strptime(payload['check_out'], '%Y-%m-%d').date()

        self.assertEqual(booking.check_in, check_in_date)
        self.assertEqual(booking.check_out, check_out_date)
        self.assertEqual(booking.customer_name, payload['customer_name'])
        self.assertEqual(booking.customer_email, payload['customer_email'])

    def test_list_bookings(self):
        """Test listing bookings."""
        Booking.objects.create(
            cottage=self.cottage,
            user=self.user,
            check_in='2024-10-01',
            check_out='2024-10-05',
            customer_name='John Doe',
            customer_email='john.doe@example.com'
        )
        res = self.client.get(BOOKING_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)

    def test_update_booking(self):
        """Test updating a booking."""
        booking = Booking.objects.create(
            cottage=self.cottage,
            user=self.user,
            check_in='2024-10-01',
            check_out='2024-10-05',
            customer_name='John Doe',
            customer_email='john.doe@example.com'
        )
        payload = {'customer_name': 'Jane Doe'}
        url = detail_url(booking.id)
        res = self.client.patch(url, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        booking.refresh_from_db()
        self.assertEqual(booking.customer_name, payload['customer_name'])

    def test_delete_booking(self):
        """Test deleting a booking."""
        booking = Booking.objects.create(
            cottage=self.cottage,
            user=self.user,
            check_in='2024-10-01',
            check_out='2024-10-05',
            customer_name='John Doe',
            customer_email='john.doe@example.com'
        )
        url = detail_url(booking.id)
        res = self.client.delete(url)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Booking.objects.filter(id=booking.id).exists())