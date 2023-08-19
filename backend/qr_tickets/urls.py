from django.urls import path
from .views import LoginUser, WhoAmI, EventList
from rest_framework.authtoken import views

urlpatterns = [
    path("api-token-auth/", views.obtain_auth_token),
    path("login/", LoginUser.as_view()),
    path("whoami/", WhoAmI.as_view()),
    path("events/", EventList.as_view()),
]
