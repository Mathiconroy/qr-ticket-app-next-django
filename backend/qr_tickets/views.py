from rest_framework.views import APIView


class LoginUser(APIView):
    """
    Logs a user in.
    """
    authentication_classes = []

    def post(self, request, format=None):
        pass
