from django.contrib.auth import get_user_model
from django.core.signing import Signer
from qr_tickets.models import Event, TicketType, TicketOrderHeader, TicketOrderDetail
from rest_framework import serializers
from rest_framework.reverse import reverse
from django.conf import settings

import math
import segno
from decimal import Decimal


class RangeValidator:
    def __init__(self, minimum=math.inf, maximum=-math.inf):
        self.minimum = minimum
        self.maximum = maximum

    def __call__(self, value):
        if value < self.minimum or value > self.maximum:
            message = f'Value {value} must be between {self.minimum} and {self.maximum}'
            raise serializers.ValidationError(message)


class UserSerializer(serializers.Serializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email']


class EventSerializer(serializers.ModelSerializer):
    scheduled_datetime = serializers.DateTimeField(format=settings.DATETIME_FORMAT)

    class Meta:
        model = Event
        fields = ['id', 'name', 'scheduled_datetime', 'description', 'created_at', 'edited_at']


class TicketTypeSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'))

    class Meta:
        model = TicketType
        fields = ['id', 'event', 'name', 'price', 'max_quantity']

    def create(self, validated_data):
        TicketType.objects.create(
            event_id=validated_data['event_id'],
            name=validated_data['name'],
            price=validated_data['price'],
            max_quantity=validated_data['max_quantity']
        )


class TicketOrderDetailSerializer(serializers.ModelSerializer):
    amount = serializers.IntegerField(min_value=1)

    class Meta:
        model = TicketOrderDetail
        fields = ['id', 'order_header', 'ticket_type', 'amount']


class TicketOrderHeaderSerializer(serializers.ModelSerializer):
    tickets = TicketOrderDetailSerializer(many=True)
    qr_svg = serializers.SerializerMethodField()

    class Meta:
        model = TicketOrderHeader
        fields = ['id', 'buyer', 'event', 'created_at', 'tickets', 'qr_svg']

    def get_qr_svg(self, obj):
        dict_to_hash = {
            'event': obj.event.id,
            'buyer': obj.buyer,
            'created_at': obj.created_at.isoformat(),
            'tickets': [
                {
                    'id': ticket.id,
                    'order_header': ticket.order_header.id,
                    'ticket_type': ticket.ticket_type.id,
                    'amount': ticket.amount
                } for ticket in obj.tickets.all()
            ]
        }
        signer = Signer()
        value = signer.sign_object(dict_to_hash)
        url_for_qr = f'{settings.BACKEND_DOMAIN}{reverse('redeem-ticket', args=[value])}'
        qrcode = segno.make(url_for_qr, micro=False)
        return qrcode.svg_inline(scale=3)

    def create(self, validated_data):
        # TODO: Probably delete this later or change the value stored in qr_hash.
        signer = Signer()
        dict_to_sign = {
            'event': validated_data['event_id'],
            'buyer': validated_data['buyer'],
            'tickets': validated_data['tickets']
        }
        qr_hash = signer.sign_object(dict_to_sign)
        ticket_order_header = TicketOrderHeader(
            event_id=validated_data['event_id'],
            buyer=validated_data['buyer'],
            qr_hash=qr_hash
        )
        ticket_order_header.save()

        for ticket in validated_data['tickets']:
            if ticket['amount'] > 0:
                ticket_type = TicketType.objects.get(pk=ticket['ticket_type_id'])
                ticket_order_header.tickets.create(
                    ticket_type=ticket_type,
                    amount=ticket['amount']
                )

        return ticket_order_header
