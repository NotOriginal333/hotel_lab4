# Generated by Django 4.0.10 on 2024-09-16 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Amenities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('additional_capacity', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Cottage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('category', models.CharField(choices=[('standard', 'Standard'), ('luxury', 'Luxury')], max_length=255)),
                ('base_capacity', models.IntegerField()),
                ('price_per_night', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_capacity', models.IntegerField(default=0, editable=False)),
                ('amenities', models.ManyToManyField(related_name='cottages', to='core.amenities')),
            ],
        ),
    ]
