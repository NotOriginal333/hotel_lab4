from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.conf import settings


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Amenities(models.Model):
    """Amenities for cottages and hotel."""
    name = models.CharField(max_length=100)
    additional_capacity = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} (+{self.additional_capacity})"


class Cottage(models.Model):
    """Cottage object."""
    CATEGORY_CHOICES = [
        ('standard', 'Standard'),
        ('luxury', 'Luxury'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES, default='standard')
    base_capacity = models.IntegerField()
    amenities = models.ManyToManyField(Amenities, related_name='cottages')
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    total_capacity = models.IntegerField(editable=False, default=0)

    def calculate_total_capacity(self):
        """Calculate the total capacity of the cottage including amenities."""
        base_capacity = self.base_capacity
        additional_capacity = sum(amenity.additional_capacity for amenity in self.amenities.all())
        total_capacity = base_capacity + additional_capacity

        return total_capacity

    def __str__(self):
        return f'{self.name}, {self.category}, {self.base_capacity}, {self.price_per_night}'
