# Generated by Django 5.0.3 on 2024-03-16 02:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("qr_tickets", "0005_tickettype_max_quantity_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="ticketorderheader",
            name="qr_hash",
            field=models.TextField(default=""),
            preserve_default=False,
        ),
    ]
