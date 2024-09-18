# Generated by Django 4.0.10 on 2024-09-17 09:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion



class Migration(migrations.Migration):
    dependencies = [
        ('core', '0007_remove_booking_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='amenities',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE,
                                    to=settings.AUTH_USER_MODEL),
        ),
    ]