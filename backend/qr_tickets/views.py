from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework import mixins
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer


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
        return Response({"isAuthenticated": request.user.is_authenticated})


class EventList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
