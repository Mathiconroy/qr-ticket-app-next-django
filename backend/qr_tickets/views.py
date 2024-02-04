
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework import mixins
from rest_framework import generics
from qr_tickets.models import Event, TicketType
from qr_tickets.serializers import EventSerializer, TicketTypeSerializer


class LoginUser(APIView):
    """
    Logs a user in.
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request, format=None):
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print(f"Logged in user {user}")
        else:
            return Response({"message": "Invalid credentials."})
        return Response(request.data)


class WhoAmI(APIView):
    permission_classes = []

    def get(self, request):
        return Response({
            "username": request.user.username,
            "isAuthenticated": request.user.is_authenticated,
        })


class EventList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        return Event.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TicketTypeList(APIView):

    def get(self, request, event_id):
        ticketTypes = TicketTypeSerializer([ticketType for ticketType in TicketType.objects.filter(event_id=event_id, event__created_by=request.user)], many=True)
        return Response(ticketTypes.data)

    def post(self, request, event_id):
        tickeType = TicketTypeSerializer.create()

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        response = Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
        response.set_cookie('token', token.key)
        return response
