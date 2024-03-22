from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Event(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False)
    scheduled_datetime = models.DateTimeField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id} - {self.name}'


class TicketType(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    max_quantity = models.IntegerField(null=True)

    def __str__(self):
        return f'{self.id} - {self.name}'


# TODO: Actually think this through, you're basically storing passwords in plaintext lol.
# TODO: If the db leaks, the attacker can generate all the urls because they only need the hash.
# TODO: Maybe actually store the salt? That way if the db leaks, they can't do anything with the salt because they'd need the SECRET_KEY too.
class TicketOrderHeader(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    buyer = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    qr_hash = models.TextField()

    def __str__(self):
        return f'{self.id} - {self.event.name} bought by {self.buyer}'


class TicketOrderDetail(models.Model):
    order_header = models.ForeignKey(TicketOrderHeader, on_delete=models.CASCADE, related_name='tickets')
    ticket_type = models.ForeignKey(TicketType, on_delete=models.CASCADE)
    amount = models.IntegerField()

    def __str__(self):
        return f'{self.order_header.id} - {self.ticket_type.name} ({self.amount})'

    def serialize(self):
        return {
            'ticket_type': self.ticket_type.id,
            'amount': self.amount
        }
