from rest_framework.views import APIView
from rest_framework.response import Response


class LoginUser(APIView):
    """
    Logs a user in.
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request, format=None):
        print(request.data)
        return Response(request.data)
