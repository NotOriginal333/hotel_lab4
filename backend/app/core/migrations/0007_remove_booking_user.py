# Generated by Django 4.0.10 on 2024-09-17 09:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_booking'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='user',
        ),
    ]
