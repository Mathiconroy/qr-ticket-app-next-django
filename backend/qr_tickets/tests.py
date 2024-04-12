from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from qr_tickets.models import User, Event

import random
import datetime


class EventsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='math', email='math@math.com', password='math123!')
        self.user.save()
        self.token = Token.objects.get(user__username='math')
        self.authorization_header_value = f'Token {self.token.key}'
        self.client.credentials(HTTP_AUTHORIZATION=self.authorization_header_value)

    def test_create_event(self):
        url = reverse('event-list')
        data = {
            'name': 'Test Event',
            'scheduled_datetime': datetime.datetime.now(),
            'description': 'Test Description',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_ticket_type(self):
        event = Event.objects.create(
            created_by=self.user,
            name='Test Event',
            scheduled_datetime=datetime.datetime.now(),
            description='Test Description',
        )
        url = reverse('ticket-type-list', args=[event.id])
        data = {
            'name': 'Test Ticket Type',
            'price': random.randint(1, 100),
            'max_quantity': random.randint(1, 100),
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
