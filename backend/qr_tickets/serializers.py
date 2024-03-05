from django.contrib.auth import get_user_model
from qr_tickets.models import Event, TicketType, TicketOrderHeader, TicketOrderDetail
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
        TicketType.objects.create(
            event_id=validated_data['event_id'],
            name=validated_data['name'],
            price=validated_data['price']
        )


# TODO: Look up ListField, might be useful.
class TicketOrderHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketOrderHeader
        fields = ['id', 'buyer', 'event', 'created_at', 'tickets']
        depth = 1

    def create(self, validated_data):
        ticket_order_header = TicketOrderHeader(
            event_id=validated_data['event_id'],
            buyer=validated_data['buyer']
        )
        ticket_order_header.save()

        for ticket in validated_data['tickets']:
            print(ticket)
            ticket_type = TicketType.objects.get(pk=ticket['ticket_type_id'])
            ticket_order_detail = TicketOrderDetail(
                order_header=ticket_order_header,
                ticket_type=ticket_type,
                amount=ticket['amount']
            )
            ticket_order_detail.save()


class TicketOrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketOrderDetail
        fields = ['id', 'order_header', 'ticket_type', 'amount']
