# Generated by Django 4.0.10 on 2024-09-16 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_amenities_user_cottage_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cottage',
            name='amenities',
            field=models.ManyToManyField(to='core.amenities'),
        ),
    ]