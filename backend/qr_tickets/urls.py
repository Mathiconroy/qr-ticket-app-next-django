from django.urls import path
from .views import LoginUser, WhoAmI

urlpatterns = [
    path("login/", LoginUser.as_view()),
    path("whoami/", WhoAmI.as_view()),
]
