# Generated by Django 4.2.3 on 2023-07-30 01:00

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("qr_tickets", "0002_event_tickettype_ticket"),
    ]

    operations = [
        migrations.RenameField(
            model_name="ticket",
            old_name="bought_by",
            new_name="owner",
        ),
    ]
