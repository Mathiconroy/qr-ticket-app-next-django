from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login


class LoginUser(APIView):
    """
    Logs a user in.
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request, format=None):
        print(request)
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print(f"Logged in user {user}")
        else:
            return Response({"message": "Invalid credentials."})
        return Response(request.data)
