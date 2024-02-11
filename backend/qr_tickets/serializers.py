from django.contrib.auth import get_user_model
from qr_tickets.models import Event, Ticket, TicketType
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'scheduled_datetime', 'description', 'created_at', 'edited_at']


class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = ['id', 'event', 'name', 'price']

    def create(self, validated_data):
        ticket_type = TicketType.objects.create(
            event_id=validated_data['event_id'],
            name=validated_data['name'],
            price=validated_data['price']
        )
        ticket_type.save()


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['owner', 'ticket_type']
